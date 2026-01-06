'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPass, setLoginPass] = useState('');
    const [signupData, setSignupData] = useState({ name: '', phone: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/client-auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'login', email: loginEmail, password: loginPass })
            });
            const data = await res.json();

            if (data.success) {
                localStorage.setItem('3dlabs_client', JSON.stringify(data.client));
                window.location.href = '/'; // Force reload to update header
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err: any) {
            // Fallback for demo purposes if API doesn't exist
            console.error("Login Error (API likely missing):", err);
            // For development/migration testing without backend:
            if (loginEmail === "demo@example.com" && loginPass === "demo") {
                const demoUser = { name: "Demo User", email: loginEmail };
                localStorage.setItem('3dlabs_client', JSON.stringify(demoUser));
                window.location.href = '/';
                return;
            }
            setError('Connection error or invalid credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/client-auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'signup', ...signupData })
            });
            const data = await res.json();

            if (data.success) {
                alert("Account Created Successfully! Please log in.");
                setActiveTab('login');
                setLoginEmail(signupData.email);
            } else {
                setError(data.message || 'Signup failed');
            }
        } catch (err) {
            console.error("Signup Error:", err);
            setError('Connection error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: "url('/assets/img/bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '20px'
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 10
            }}>
                <Link href="/"><img src="/assets/img/3logo.png" alt="Logo" style={{ height: '40px' }} /></Link>
                <Link href="/" className="cs_btn cs_style_1" style={{ color: '#fff', borderColor: '#fff' }}>Back Home</Link>
            </div>

            <div className="auth-box" style={{
                backgroundColor: '#171717',
                border: '1px solid #4f4747',
                padding: '40px',
                borderRadius: '10px',
                width: '100%',
                maxWidth: '500px',
                position: 'relative',
                zIndex: 2,
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
                <div className="auth-tabs" style={{ display: 'flex', marginBottom: '30px', borderBottom: '1px solid #4f4747' }}>
                    <div
                        className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => setActiveTab('login')}
                        style={{
                            flex: 1,
                            textAlign: 'center',
                            padding: '15px',
                            cursor: 'pointer',
                            color: activeTab === 'login' ? '#ffa415' : '#a3a3a3',
                            fontWeight: 600,
                            transition: '0.3s',
                            borderBottom: activeTab === 'login' ? '2px solid #ffa415' : 'none'
                        }}
                    >
                        LOGIN
                    </div>
                    <div
                        className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
                        onClick={() => setActiveTab('signup')}
                        style={{
                            flex: 1,
                            textAlign: 'center',
                            padding: '15px',
                            cursor: 'pointer',
                            color: activeTab === 'signup' ? '#ffa415' : '#a3a3a3',
                            fontWeight: 600,
                            transition: '0.3s',
                            borderBottom: activeTab === 'signup' ? '2px solid #ffa415' : 'none'
                        }}
                    >
                        SIGN UP
                    </div>
                </div>

                {/* LOGIN FORM */}
                {activeTab === 'login' && (
                    <form onSubmit={handleLogin}>
                        {error && <div className="error-msg" style={{ color: '#ff4d4d', marginBottom: '15px', background: 'rgba(255, 77, 77, 0.1)', padding: '10px', borderRadius: '5px', fontSize: '14px' }}>{error}</div>}
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#a3a3a3' }}>Email Address</label>
                            <input
                                type="email"
                                className="cs_form_field"
                                placeholder="Enter your email"
                                required
                                value={loginEmail}
                                onChange={e => setLoginEmail(e.target.value)}
                                style={{ backgroundColor: '#0c0c0c', border: '1px solid #333', color: '#fff', width: '100%', padding: '12px 15px', borderRadius: '5px', outline: 'none' }}
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#a3a3a3' }}>Password</label>
                            <input
                                type="password"
                                className="cs_form_field"
                                placeholder="Enter your password"
                                required
                                value={loginPass}
                                onChange={e => setLoginPass(e.target.value)}
                                style={{ backgroundColor: '#0c0c0c', border: '1px solid #333', color: '#fff', width: '100%', padding: '12px 15px', borderRadius: '5px', outline: 'none' }}
                            />
                        </div>
                        <button type="submit" className="cs_btn cs_style_1 w-100" style={{ width: '100%', color: '#fff', borderColor: '#ffa415' }} disabled={loading}>
                            {loading ? 'Processing...' : (
                                <>Login <span><i className="fa-solid fa-arrow-right"></i></span></>
                            )}
                        </button>
                    </form>
                )}

                {/* SIGNUP FORM */}
                {activeTab === 'signup' && (
                    <form onSubmit={handleSignup}>
                        {error && <div className="error-msg" style={{ color: '#ff4d4d', marginBottom: '15px', background: 'rgba(255, 77, 77, 0.1)', padding: '10px', borderRadius: '5px', fontSize: '14px' }}>{error}</div>}
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#a3a3a3' }}>Full Name</label>
                            <input
                                type="text"
                                className="cs_form_field"
                                required
                                value={signupData.name}
                                onChange={e => setSignupData({ ...signupData, name: e.target.value })}
                                style={{ backgroundColor: '#0c0c0c', border: '1px solid #333', color: '#fff', width: '100%', padding: '12px 15px', borderRadius: '5px', outline: 'none' }}
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#a3a3a3' }}>Phone Number</label>
                            <input
                                type="text"
                                className="cs_form_field"
                                required
                                value={signupData.phone}
                                onChange={e => setSignupData({ ...signupData, phone: e.target.value })}
                                style={{ backgroundColor: '#0c0c0c', border: '1px solid #333', color: '#fff', width: '100%', padding: '12px 15px', borderRadius: '5px', outline: 'none' }}
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#a3a3a3' }}>Email Address</label>
                            <input
                                type="email"
                                className="cs_form_field"
                                required
                                value={signupData.email}
                                onChange={e => setSignupData({ ...signupData, email: e.target.value })}
                                style={{ backgroundColor: '#0c0c0c', border: '1px solid #333', color: '#fff', width: '100%', padding: '12px 15px', borderRadius: '5px', outline: 'none' }}
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#a3a3a3' }}>Password</label>
                            <input
                                type="password"
                                className="cs_form_field"
                                required
                                value={signupData.password}
                                onChange={e => setSignupData({ ...signupData, password: e.target.value })}
                                style={{ backgroundColor: '#0c0c0c', border: '1px solid #333', color: '#fff', width: '100%', padding: '12px 15px', borderRadius: '5px', outline: 'none' }}
                            />
                        </div>
                        <button type="submit" className="cs_btn cs_style_1 w-100" style={{ width: '100%', color: '#fff', borderColor: '#ffa415' }} disabled={loading}>
                            {loading ? 'Creating Account...' : (
                                <>Create Account <span><i className="fa-solid fa-arrow-right"></i></span></>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
