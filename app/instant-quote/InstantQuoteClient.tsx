'use client';

import { useState, useRef, useEffect } from 'react';
import STLViewer from '../../components/STLViewer';

const API_URL = "https://api.3dlabs.lk/slice";
const MATERIALS = [
    "PLA", "PETG", "ABS", "ASA",
    "PETG-CF", "ABS-CF", "ABS-FR",
    "PC", "PC-CF",
    "TPU-95A", "TPE-85A", "HIPS",
    "PA6", "PA12", "PA6-CF", "PA6-GF"
];
const COLOR_SUPPORTED_MATS = ["PLA", "PETG", "ABS", "ASA", "TPU-95A"];

interface FileItem {
    id: string;
    file: File;
    ref: string;
    isCustom: boolean;
    customSettings: {
        material: string;
        color: string;
        infill: string;
        supports: boolean;
    };
    qty: number;
    result: any;
    status: 'Pending' | 'Processing' | 'Done' | 'Error';
    price: number;
}

export default function InstantQuoteClient() {
    const [fileQueue, setFileQueue] = useState<FileItem[]>([]);
    const [globalMaterial, setGlobalMaterial] = useState('PLA');
    const [globalColor, setGlobalColor] = useState('Black');
    const [globalInfill, setGlobalInfill] = useState('20');
    const [globalSupports, setGlobalSupports] = useState(true);

    const [grandTotal, setGrandTotal] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);

    const [guestDetails, setGuestDetails] = useState<{ name: string, phone: string } | null>(null);
    const [showGuestModal, setShowGuestModal] = useState(false);
    const [tempGuestName, setTempGuestName] = useState('');
    const [tempGuestPhone, setTempGuestPhone] = useState('');

    // Sidebar details
    const [custName, setCustName] = useState('');
    const [custStart, setCustContact] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load guest details from session
    useEffect(() => {
        const stored = sessionStorage.getItem('3dlabs_guest');
        if (stored) {
            const p = JSON.parse(stored);
            setGuestDetails(p);
            setCustName(p.name);
            setCustContact(p.phone);
        }

        const clientStr = localStorage.getItem('3dlabs_client');
        if (clientStr) {
            const client = JSON.parse(clientStr);
            // If logged in, we assume we have name/phone or fetch profile
            // For now just prefill if available
            if (client.name) setCustName(client.name);
            if (client.phone) setCustContact(client.phone);
        }
    }, []);

    const handleFiles = (files: FileList | null) => {
        if (!files) return;
        const newItems: FileItem[] = Array.from(files)
            .filter(f => f.name.toLowerCase().endsWith('.stl'))
            .map(f => ({
                id: Math.random().toString(36).substr(2, 9),
                file: f,
                ref: 'Pending',
                isCustom: false,
                customSettings: { material: 'PLA', color: 'Black', infill: '20', supports: true },
                qty: 1,
                result: null,
                status: 'Pending',
                price: 0
            }));

        setFileQueue(prev => [...prev, ...newItems]);
    };

    const removeFile = (id: string) => {
        setFileQueue(prev => prev.filter(f => f.id !== id));
    };

    const updateItem = (id: string, updates: Partial<FileItem>) => {
        setFileQueue(prev => prev.map(item => {
            if (item.id === id) {
                const updated = { ...item, ...updates };
                // If settings changed, reset status
                if (updates.isCustom !== undefined || updates.customSettings) {
                    updated.status = 'Pending';
                    updated.result = null;
                    updated.price = 0;
                    updated.ref = 'Pending';
                }
                return updated;
            }
            return item;
        }));
    };

    const updateCustomSettings = (id: string, field: string, value: any) => {
        setFileQueue(prev => prev.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    status: 'Pending',
                    result: null,
                    price: 0,
                    ref: 'Pending',
                    customSettings: { ...item.customSettings, [field]: value }
                };
            }
            return item;
        }));
    };

    // Recalculate Grand Total
    useEffect(() => {
        const total = fileQueue.reduce((acc, item) => acc + (item.price || 0), 0);
        setGrandTotal(total);
    }, [fileQueue]);

    const calculateCardPrice = (unitPrice: number, qty: number) => {
        const raw = unitPrice * qty;
        return Math.ceil(raw / 5) * 5;
    };

    const processQueue = async () => {
        setIsProcessing(true);
        setProgress(0);
        let completed = 0;
        const total = fileQueue.length;

        // Check Guest/Auth
        const clientStr = localStorage.getItem('3dlabs_client');
        if (!clientStr && !guestDetails) {
            setShowGuestModal(true);
            setIsProcessing(false);
            return;
        }

        // Process items
        const newQueue = [...fileQueue];

        for (let i = 0; i < newQueue.length; i++) {
            const item = newQueue[i];
            if (item.status === 'Done' && item.result) {
                completed++;
                continue;
            }

            // Update status to processing
            newQueue[i] = { ...item, status: 'Processing' };
            setFileQueue([...newQueue]);

            const mat = item.isCustom ? item.customSettings.material : globalMaterial;
            const inf = item.isCustom ? item.customSettings.infill : globalInfill;
            const sup = item.isCustom ? item.customSettings.supports : globalSupports;

            try {
                const form = new FormData();
                form.append('stl_file', item.file);
                form.append('material', mat);
                form.append('infill', inf);
                form.append('supports', sup ? 'on' : 'off');

                const res = await fetch(API_URL, { method: 'POST', body: form });
                if (!res.ok) throw new Error('API Error');
                const data = await res.json();

                const price = calculateCardPrice(data.total_estimate_LKR, item.qty);

                newQueue[i] = {
                    ...item,
                    status: 'Done',
                    result: data,
                    ref: data.reference,
                    price: price
                };
            } catch (e) {
                console.error(e);
                newQueue[i] = { ...item, status: 'Error' };
            }

            setFileQueue([...newQueue]);
            completed++;
            setProgress((completed / total) * 100);
        }

        setIsProcessing(false);
    };

    const handleGuestSubmit = () => {
        if (!tempGuestName || !tempGuestPhone) return alert("Please fill details");
        const details = { name: tempGuestName, phone: tempGuestPhone };
        sessionStorage.setItem('3dlabs_guest', JSON.stringify(details));
        setGuestDetails(details);
        setCustName(details.name);
        setCustContact(details.phone);
        setShowGuestModal(false);
        processQueue();
    };

    // Update Queue when globals change
    useEffect(() => {
        // Determine which items need reset
        setFileQueue(prev => prev.map(item => {
            if (!item.isCustom) {
                // If using globals, reset status
                return { ...item, status: 'Pending', result: null, price: 0, ref: 'Pending' };
            }
            return item;
        }));
    }, [globalMaterial, globalInfill, globalSupports]);

    return (
        <>
            <div className="iq_layout">
                {/* Sidebar */}
                <div className="iq_sidebar">
                    <h5 className="mb-3">Global Settings</h5>

                    <div className="mb-3">
                        <label className="form-label" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#aaa' }}>Material</label>
                        <select className="form-select" value={globalMaterial} onChange={e => setGlobalMaterial(e.target.value)}>
                            {MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>

                    {COLOR_SUPPORTED_MATS.includes(globalMaterial) && (
                        <div className="mb-3">
                            <label className="form-label" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#aaa' }}>Color</label>
                            <select className="form-select" value={globalColor} onChange={e => setGlobalColor(e.target.value)}>
                                <option value="Black">Black</option>
                                <option value="White">White</option>
                                <option value="Grey">Grey</option>
                                <option value="Blue">Blue</option>
                                <option value="Red">Red</option>
                            </select>
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="form-label" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#aaa' }}>Infill</label>
                        <select className="form-select" value={globalInfill} onChange={e => setGlobalInfill(e.target.value)}>
                            <option value="10">10%</option>
                            <option value="20">20%</option>
                            <option value="30">30%</option>
                            <option value="40">40%</option>
                            <option value="50">50%</option>
                            <option value="80">80%</option>
                            <option value="100">100% Solid</option>
                        </select>
                    </div>

                    <div className="form-check form-switch mb-4">
                        <input className="form-check-input" type="checkbox" checked={globalSupports} onChange={e => setGlobalSupports(e.target.checked)} id="gSup" />
                        <label className="form-check-label" htmlFor="gSup">Enable Supports</label>
                    </div>

                    <button className="btn-calculate" onClick={processQueue} disabled={isProcessing}>
                        {isProcessing ? <><i className="fa-solid fa-spinner fa-spin"></i> Processing...</> : <><i className="fa-solid fa-calculator"></i> Calculate / Recalculate</>}
                    </button>

                    {isProcessing && (
                        <div style={{ height: '6px', background: '#333', borderRadius: '3px', marginTop: '15px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', background: '#ffb703', width: `${progress}%`, transition: 'width 0.3s ease' }}></div>
                        </div>
                    )}

                    <div className="iq_grand_total">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                            <span>Total Qty:</span>
                            <strong>{fileQueue.reduce((acc, i) => acc + i.qty, 0)}</strong>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <span>Grand Total:</span>
                            <div className="text-end">
                                <h3 className="m-0" style={{ fontSize: '24px', fontWeight: 800 }}>LKR {grandTotal}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-top border-secondary">
                        <h6 className="mb-3">Your Details</h6>
                        <input type="text" className="form-control mb-2" placeholder="Name" value={custName} onChange={e => setCustName(e.target.value)} />
                        <input type="tel" className="form-control mb-2" placeholder="Phone Number" value={custStart} onChange={e => setCustContact(e.target.value)} />
                        <textarea className="form-control mb-2" placeholder="Notes (Optional)" rows={2} style={{ resize: 'none' }}></textarea>
                        <button className="btn-whatsapp">
                            <i className="fa-brands fa-whatsapp"></i> Order via WhatsApp
                        </button>
                    </div>

                    <div className="iq_disclaimer">
                        <strong><i className="fa-solid fa-triangle-exclamation"></i> Disclaimer:</strong><br />
                        Prices generated by TECHNOTRONIC FUTURISTICS via 3D Labs API. Prices provided are estimates and may vary by ±10%.
                    </div>
                </div>

                {/* File List */}
                <div className="iq_file_list">
                    <div
                        className="iq_dropzone mb-4"
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('iq_active'); }}
                        onDragLeave={e => { e.currentTarget.classList.remove('iq_active'); }}
                        onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('iq_active'); handleFiles(e.dataTransfer.files); }}
                    >
                        <i className="fa-solid fa-cloud-arrow-up fa-3x mb-3 text-muted"></i>
                        <h5>Drag & Drop Files</h5>
                        <p className="text-muted small">Multiple .STL files (Max 100MB)</p>
                        <button className="btn btn-sm btn-outline-light mt-2">Browse Files</button>
                    </div>
                    <input type="file" ref={fileInputRef} multiple accept=".stl" style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />

                    {fileQueue.length === 0 && (
                        <div className="text-center text-muted py-5">
                            <i className="fa-solid fa-layer-group fa-3x mb-3"></i>
                            <h3>No files uploaded</h3>
                            <p>Upload .STL files to see them here.</p>
                        </div>
                    )}

                    {fileQueue.map(item => (
                        <div key={item.id} className="iq_card">
                            <div className="iq_card_left" style={{ width: '220px', minWidth: '220px' }}>
                                <div className="iq_3d_viewer">
                                    <STLViewer file={item.file} color={item.isCustom ? item.customSettings.color : globalColor} />
                                </div>
                            </div>
                            <div className="iq_card_right" style={{ flex: 1 }}>
                                <div className="iq_card_header">
                                    <div className="iq_filename" title={item.file.name}>{item.file.name}</div>
                                    <button className="iq_remove_btn" onClick={() => removeFile(item.id)}><i className="fa-solid fa-trash"></i></button>
                                </div>

                                <div className="iq_ref_display">
                                    Ref: <span>{item.ref}</span>
                                </div>

                                <label className="custom-switch">
                                    <input type="checkbox" checked={item.isCustom} onChange={e => updateItem(item.id, { isCustom: e.target.checked })} />
                                    <span>Customize Settings for this file</span>
                                </label>

                                <div className={`iq_card_settings ${item.isCustom ? 'custom-active' : ''}`} style={{ opacity: item.isCustom ? 1 : 0.5, pointerEvents: item.isCustom ? 'all' : 'none' }}>
                                    <div>
                                        <label>Material</label>
                                        <select className="form-select form-select-sm" value={item.customSettings.material} onChange={e => updateCustomSettings(item.id, 'material', e.target.value)}>
                                            {MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label>Color</label>
                                        <select className="form-select form-select-sm" value={item.customSettings.color} onChange={e => updateCustomSettings(item.id, 'color', e.target.value)}>
                                            <option value="Black">Black</option>
                                            <option value="White">White</option>
                                            <option value="Grey">Grey</option>
                                            <option value="Blue">Blue</option>
                                            <option value="Red">Red</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Infill</label>
                                        <select className="form-select form-select-sm" value={item.customSettings.infill} onChange={e => updateCustomSettings(item.id, 'infill', e.target.value)}>
                                            <option value="10">10%</option>
                                            <option value="20">20%</option>
                                            <option value="30">30%</option>
                                            <option value="40">40%</option>
                                            <option value="50">50%</option>
                                            <option value="80">80%</option>
                                            <option value="100">100%</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Supports</label>
                                        <select className="form-select form-select-sm" value={item.customSettings.supports ? 'true' : 'false'} onChange={e => updateCustomSettings(item.id, 'supports', e.target.value === 'true')}>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="iq_card_footer">
                                    <div className="d-flex align-items-center gap-2">
                                        <label className="mb-0">Qty:</label>
                                        <input type="number" min="1" value={item.qty} className="form-control form-control-sm" style={{ width: '70px' }} onChange={e => updateItem(item.id, { qty: parseInt(e.target.value) || 1 })} />
                                    </div>
                                    <div className="iq_price_wrapper">
                                        <div className="iq_price_tag">
                                            {item.status === 'Done' ? `LKR ${item.price}` : '--'}
                                        </div>
                                        <div className="iq_status">
                                            {item.status === 'Pending' && <span className="iq_status_badge pending">Pending</span>}
                                            {item.status === 'Processing' && <span className="iq_status_badge processing">Processing</span>}
                                            {item.status === 'Done' && <span className="iq_status_badge done">Done</span>}
                                            {item.status === 'Error' && <span className="iq_status_badge error">Error</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Guest Modal */}
            {showGuestModal && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.8)' }} tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content" style={{ background: '#1a1a1a', color: '#fff', border: '1px solid #333' }}>
                            <div className="modal-header" style={{ borderBottom: '1px solid #333' }}>
                                <h5 className="modal-title">Enter Your Details</h5>
                            </div>
                            <div className="modal-body">
                                <p className="small mb-3">Please provide your name and contact number to view your quote estimate.</p>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" placeholder="Your Name" value={tempGuestName} onChange={e => setTempGuestName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contact Number</label>
                                    <input type="tel" className="form-control" placeholder="07xxxxxxxx" value={tempGuestPhone} onChange={e => setTempGuestPhone(e.target.value)} />
                                </div>
                            </div>
                            <div className="modal-footer" style={{ borderTop: '1px solid #333' }}>
                                <button type="button" className="btn btn-warning w-100" onClick={handleGuestSubmit}>Continue to Quote</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
