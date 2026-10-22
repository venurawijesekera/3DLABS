'use client';
// Admin tab for BeamEngine licence keys: make keys, set how many computers each may use, end dates,
// turn keys off and sign computers out.
import { useEffect, useState } from 'react';

interface Session { id: string; name: string; machine: string; last_seen: number }
interface License {
    key: string; owner: string; email: string; plan: 'lifetime' | 'subscription' | 'trial'; seats: number;
    expires: number | null; revoked: boolean; notes: string; created: number; sessions: Session[];
}

const day = (ms: number | null) => (ms ? new Date(ms).toISOString().slice(0, 10) : '');
const endOfDay = (d: string) => (d ? Date.parse(d + 'T23:59:59Z') : null);
const ago = (ms: number, now: number) => {
    const m = Math.round((now - ms) / 60000);
    return m < 1 ? 'just now' : m < 60 ? `${m} min ago` : m < 1440 ? `${Math.round(m / 60)} h ago` : `${Math.round(m / 1440)} d ago`;
};
const blank = { owner: '', email: '', plan: 'lifetime', seats: 1, expires: '', notes: '' };

export default function LicensesTab({ token, onSignedOut }: { token: string; onSignedOut: () => void }) {
    const [licenses, setLicenses] = useState<License[]>([]);
    const [now, setNow] = useState(Date.now());
    const [publicKey, setPublicKey] = useState('');
    const [form, setForm] = useState(blank);
    const [msg, setMsg] = useState('');
    const [busy, setBusy] = useState(false);

    const api = async (op: string, body: Record<string, unknown> = {}) => {
        const res = await fetch('/api/beamengine-license/admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...body, op, token })
        });
        const data = await res.json().catch(() => ({}));
        if (res.status === 401) { onSignedOut(); throw new Error('auth'); }
        if (!res.ok || data.error) { alert(data.error || 'Something went wrong.'); throw new Error(data.error); }
        return data;
    };
    const load = async () => {
        const data = await api('list');
        setLicenses(data.licenses);
        setNow(data.now);
        setPublicKey(data.publicKey);
    };
    useEffect(() => { load().catch(() => {}); }, []);

    const create = async (e: React.FormEvent) => {
        e.preventDefault();
        setBusy(true);
        try {
            const r = await api('create', { ...form, expires: endOfDay(form.expires) });
            navigator.clipboard?.writeText(r.key).catch(() => {});
            setMsg(`Created ${r.key} (copied to the clipboard).`);
            setForm(blank);
            await load();
        } catch { /* shown above */ } finally {
            setBusy(false);
        }
    };
    const update = async (key: string, change: Record<string, unknown>) => {
        await api('update', { key, ...change }).catch(() => {});
        await load().catch(() => {});
    };

    return (
        <div>
            <div className="cs_card" style={cardStyle}>
                <h4 style={{ margin: '0 0 20px' }}>New BeamEngine licence key</h4>
                <form onSubmit={create} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'flex-end' }}>
                    <Field label="Customer name" grow><input style={inputStyle} value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} /></Field>
                    <Field label="Email" grow><input style={inputStyle} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
                    <Field label="Type">
                        <select style={inputStyle} value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })}>
                            <option value="lifetime">Lifetime</option>
                            <option value="subscription">Subscription</option>
                            <option value="trial">Trial</option>
                        </select>
                    </Field>
                    <Field label="Computers"><input style={{ ...inputStyle, width: '90px' }} type="number" min={1} value={form.seats} onChange={(e) => setForm({ ...form, seats: Number(e.target.value) })} /></Field>
                    <Field label="Ends on"><input style={inputStyle} type="date" value={form.expires} onChange={(e) => setForm({ ...form, expires: e.target.value })} /></Field>
                    <Field label="Notes" grow><input style={inputStyle} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></Field>
                    <button type="submit" disabled={busy} style={primaryBtnStyle}>Create key</button>
                </form>
                {msg && <p style={{ color: '#ffa415', margin: '15px 0 0' }}>{msg}</p>}
            </div>

            <div className="cs_card" style={{ ...cardStyle, marginTop: '20px', overflowX: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0 }}>Licence keys</h4>
                    <button onClick={() => load().catch(() => {})} style={refreshBtnStyle}>Refresh</button>
                </div>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Key</th><th style={thStyle}>Customer</th><th style={thStyle}>Type</th>
                            <th style={thStyle}>Computers signed in</th><th style={thStyle}>Status</th><th style={thStyle}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {licenses.length === 0 && <tr><td colSpan={6} style={{ ...tdStyle, color: '#888' }}>No keys yet. Create one above.</td></tr>}
                        {licenses.map((l) => {
                            const expired = l.expires !== null && now >= l.expires;
                            return (
                                <tr key={l.key}>
                                    <td style={tdStyle}>
                                        <div style={{ fontFamily: 'monospace', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{l.key}</div>
                                        <button style={{ ...smallBtnStyle, marginTop: '6px' }} onClick={() => navigator.clipboard?.writeText(l.key)}>Copy</button>
                                    </td>
                                    <td style={tdStyle}>
                                        <div>{l.owner || '—'}</div>
                                        <div style={mutedStyle}>{l.email}</div>
                                        {l.notes && <div style={mutedStyle}>{l.notes}</div>}
                                    </td>
                                    <td style={tdStyle}>
                                        <div>{l.plan[0].toUpperCase() + l.plan.slice(1)}</div>
                                        <div style={mutedStyle}>{l.expires ? `Ends ${day(l.expires)}` : 'No end date'}</div>
                                    </td>
                                    <td style={tdStyle}>
                                        <div style={mutedStyle}>{l.sessions.length} of {l.seats}</div>
                                        {l.sessions.map((s) => (
                                            <div key={s.id} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px', fontSize: '13px' }}>
                                                <span>{s.name || 'Computer'}</span>
                                                <span style={mutedStyle}>{ago(s.last_seen, now)}</span>
                                                <button style={smallBtnStyle} onClick={async () => {
                                                    if (!confirm(`Sign out ${s.name || 'this computer'}?`)) return;
                                                    await api('signout', { id: s.id }).catch(() => {});
                                                    await load().catch(() => {});
                                                }}>Sign out</button>
                                            </div>
                                        ))}
                                    </td>
                                    <td style={tdStyle}>
                                        <span style={{ ...pillStyle, ...(l.revoked || expired ? pillOff : pillOn) }}>
                                            {l.revoked ? 'Turned off' : expired ? 'Expired' : 'Active'}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                            <button style={smallBtnStyle} onClick={() => {
                                                const v = prompt('How many computers can use this key at the same time?', String(l.seats));
                                                if (v) update(l.key, { seats: Number(v) });
                                            }}>Computers</button>
                                            <button style={smallBtnStyle} onClick={() => {
                                                const v = prompt('End date (YYYY-MM-DD), or leave empty for no end date', day(l.expires));
                                                if (v !== null) update(l.key, { expires: endOfDay(v) });
                                            }}>End date</button>
                                            {l.revoked
                                                ? <button style={smallBtnStyle} onClick={() => update(l.key, { revoked: false })}>Turn on</button>
                                                : <button style={{ ...smallBtnStyle, color: '#ff4d4d', borderColor: '#ff4d4d' }} onClick={() => {
                                                    if (confirm(`Turn off ${l.key}? Computers using it are signed out at their next check-in.`)) update(l.key, { revoked: true });
                                                }}>Turn off</button>}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {publicKey && (
                    <p style={{ ...mutedStyle, marginTop: '20px', wordBreak: 'break-all' }}>
                        Licence server public key (built into BeamEngine): <span style={{ fontFamily: 'monospace' }}>{publicKey}</span>
                    </p>
                )}
            </div>
        </div>
    );
}

function Field({ label, grow, children }: { label: string; grow?: boolean; children: React.ReactNode }) {
    return (
        <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: grow ? '1 1 160px' : '0 0 auto' }}>
            <span style={labelStyle}>{label}</span>
            {children}
        </label>
    );
}

const cardStyle: React.CSSProperties = {
    backgroundColor: 'rgba(23, 23, 23, 0.4)', backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '30px'
};
const labelStyle: React.CSSProperties = { fontSize: '11px', color: '#888', textTransform: 'uppercase' };
const inputStyle: React.CSSProperties = { backgroundColor: '#111', color: '#fff', border: '1px solid #333', padding: '8px 12px', borderRadius: '4px' };
const primaryBtnStyle: React.CSSProperties = {
    backgroundColor: '#ffa415', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
};
const smallBtnStyle: React.CSSProperties = {
    backgroundColor: 'transparent', color: '#ddd', border: '1px solid #444', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px'
};
const refreshBtnStyle: React.CSSProperties = {
    backgroundColor: '#333', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px'
};
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', marginTop: '20px' };
const thStyle: React.CSSProperties = {
    textAlign: 'left', padding: '15px', borderBottom: '1px solid #333', color: '#ffa415', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px'
};
const tdStyle: React.CSSProperties = { padding: '15px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', verticalAlign: 'top' };
const mutedStyle: React.CSSProperties = { color: '#888', fontSize: '12px' };
const pillStyle: React.CSSProperties = { display: 'inline-block', padding: '2px 10px', borderRadius: '99px', fontSize: '11px', border: '1px solid' };
const pillOn: React.CSSProperties = { color: '#3fb950', borderColor: 'rgba(63, 185, 80, 0.5)' };
const pillOff: React.CSSProperties = { color: '#ff4d4d', borderColor: 'rgba(255, 77, 77, 0.5)' };
