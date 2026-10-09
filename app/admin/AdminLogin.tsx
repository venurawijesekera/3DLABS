'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const ERROR_MESSAGES: Record<string, string> = {
    google_not_configured: 'Google sign-in is not set up on this site yet.',
    google_failed: 'Google sign-in did not complete. Please try again.',
    google_unverified: 'Your Google email address is not verified.',
    google_mismatch: 'This email is already linked to a different Google account.',
    not_admin: 'That Google account does not have admin access.',
};

const fieldStyle: React.CSSProperties = {
    backgroundColor: '#0c0c0c', border: '1px solid #333', color: '#fff', width: '100%',
    padding: '12px 15px', borderRadius: '5px', outline: 'none'
};
const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '8px', color: '#a3a3a3' };
const groupStyle: React.CSSProperties = { marginBottom: '20px' };

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
    const [mode, setMode] = useState<'login' | 'reset'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [setupKey, setSetupKey] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('error');
        if (code) {
            setError(ERROR_MESSAGES[code] || 'Sign-in failed. Please try again.');
            window.history.replaceState(null, '', '/admin');
        }
    }, []);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/admin-auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mode === 'login'
                    ? { action: 'login', email, password }
                    : { action: 'setup', email, password, setupKey })
            });
            const data = await res.json();
            if (data.success) {
                onLogin();
            } else {
                setError(data.message || 'Sign-in failed');
            }
        } catch {
            setError('Connection error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const switchMode = (next: 'login' | 'reset') => {
        setMode(next);
        setError('');
        setPassword('');
    };

    return (
        <div className="auth-container" style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundImage: "url('/assets/img/bg.webp')", backgroundSize: 'cover', backgroundPosition: 'center',
            padding: '100px 20px 40px'
        }}>
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', padding: '20px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10
            }}>
                <Link href="/"><img src="/assets/img/3logo.webp" alt="3D Labs" style={{ height: '40px' }} /></Link>
                <Link href="/" className="cs_btn cs_style_1" style={{ color: '#fff', borderColor: '#fff' }}>Back Home</Link>
            </div>

            <div className="auth-box" style={{
                backgroundColor: '#171717', border: '1px solid #4f4747', padding: '40px', borderRadius: '10px',
                width: '100%', maxWidth: '500px', position: 'relative', zIndex: 2, boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
                <div style={{ textAlign: 'center', paddingBottom: '20px', marginBottom: '30px', borderBottom: '1px solid #4f4747' }}>
                    <div style={{ color: '#ffa415', fontWeight: 600, letterSpacing: '1px' }}>
                        <i className="fa-solid fa-shield-halved" style={{ marginRight: '10px' }}></i>
                        {mode === 'login' ? 'ADMIN LOGIN' : 'RESET ADMIN PASSWORD'}
                    </div>
                </div>

                {error && <div className="error-msg" style={{ color: '#ff4d4d', marginBottom: '15px', background: 'rgba(255, 77, 77, 0.1)', padding: '10px', borderRadius: '5px', fontSize: '14px' }}>{error}</div>}

                {mode === 'login' && (
                    <>
                        <a href="/api/admin-auth/google" style={{
                            width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px',
                            backgroundColor: '#0c0c0c', border: '1px solid #4f4747', color: '#fff', padding: '13px 20px',
                            borderRadius: '10px', fontWeight: 600, textDecoration: 'none'
                        }}>
                            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
                                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
                            </svg>
                            Continue with Google
                        </a>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '25px 0', color: '#6b6b6b', fontSize: '13px' }}>
                            <span style={{ flex: 1, height: '1px', background: '#4f4747' }}></span>
                            OR
                            <span style={{ flex: 1, height: '1px', background: '#4f4747' }}></span>
                        </div>
                    </>
                )}

                {mode === 'reset' && (
                    <p style={{ color: '#a3a3a3', fontSize: '14px', marginBottom: '20px' }}>
                        Enter the setup key from your site settings to create your admin account or choose a new password.
                    </p>
                )}

                <form onSubmit={submit}>
                    <div style={groupStyle}>
                        <label style={labelStyle}>Email Address</label>
                        <input type="email" className="cs_form_field" placeholder="Enter your admin email" required
                            value={email} onChange={e => setEmail(e.target.value)} style={fieldStyle} autoComplete="username" />
                    </div>
                    {mode === 'reset' && (
                        <div style={groupStyle}>
                            <label style={labelStyle}>Setup Key</label>
                            <input type="password" className="cs_form_field" placeholder="Enter the setup key" required
                                value={setupKey} onChange={e => setSetupKey(e.target.value)} style={fieldStyle} autoComplete="off" />
                        </div>
                    )}
                    <div style={groupStyle}>
                        <label style={labelStyle}>{mode === 'login' ? 'Password' : 'New Password'}</label>
                        <input type="password" className="cs_form_field" required
                            placeholder={mode === 'login' ? 'Enter your password' : 'At least 10 characters'}
                            minLength={mode === 'reset' ? 10 : undefined}
                            value={password} onChange={e => setPassword(e.target.value)} style={fieldStyle}
                            autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
                    </div>
                    <button type="submit" className="cs_btn cs_style_1 w-100" style={{ width: '100%', color: '#fff', borderColor: '#ffa415' }} disabled={loading}>
                        {loading ? 'Please wait...' : (
                            <>{mode === 'login' ? 'Login to Dashboard' : 'Save Password & Login'} <span><i className="fa-solid fa-arrow-right"></i></span></>
                        )}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                    <button type="button" onClick={() => switchMode(mode === 'login' ? 'reset' : 'login')}
                        style={{ background: 'none', border: 'none', color: '#a3a3a3', cursor: 'pointer', textDecoration: 'underline' }}>
                        {mode === 'login' ? 'Forgot password?' : 'Back to login'}
                    </button>
                </div>
            </div>
        </div>
    );
}
