import {
  type FormEvent,
  useState,
} from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('');

  const [error, setError] =
    useState('');

  const [submitting, setSubmitting] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError(
        'Password must contain at least 8 characters.'
      );
      return;
    }

    setSubmitting(true);

    try {
      await signup(
        fullName,
        email,
        password
      );

      navigate('/login');
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to create account.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <h1>CareerAI</h1>

          <p>
            Create your PlacementPilot account.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Full name

            <input
              type="text"
              value={fullName}
              onChange={(event) =>
                setFullName(event.target.value)
              }
              placeholder="Your full name"
              autoComplete="name"
              required
            />
          </label>

          <label>
            Email

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label>
            Password

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Minimum 8 characters"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>

          <label>
            Confirm password

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              placeholder="Re-enter password"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <button
            className="btn primary auth-submit"
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? 'Creating account...'
              : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}

          <Link to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}