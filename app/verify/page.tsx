'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function VerifyContent() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resending, setResending] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const verificationId = searchParams.get('id');

  useEffect(() => {
    if (!verificationId) {
      router.push('/');
    }
  }, [verificationId, router]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: verificationId, code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    setResending(true);

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: '' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend OTP');
      }

      router.push(`/verify?id=${data.verificationId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setResending(false);
    }
  };

  if (!verificationId) {
    return null;
  }

  if (success) {
    return (
      <div className="container">
        <div className="success">Verification successful!</div>
        <p className="text-center">Your phone number has been verified.</p>
        <div className="text-center mt-20">
          <Link href="/" className="link">
            Verify another number
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Enter Code</h1>
      <p>Enter the 6-digit code sent to your phone</p>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleVerify}>
        <label htmlFor="code">Verification Code</label>
        <input
          id="code"
          type="text"
          placeholder="123456"
          maxLength={6}
          pattern="[0-9]{6}"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>

      <div className="text-center mt-20">
        <button
          onClick={handleResend}
          disabled={resending}
          style={{ background: 'transparent', color: '#667eea', textDecoration: 'underline' }}
        >
          {resending ? 'Resending...' : 'Resend code'}
        </button>
      </div>

      <div className="text-center mt-20">
        <Link href="/" className="link">
          Use a different number
        </Link>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="container">Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
