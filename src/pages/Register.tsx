import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        navigate('/login');
      } else {
        setError('Registration failed. Try a different username.');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleRegister} className="space-y-4">
        {error && (
          <div className="px-4 py-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <Input
          label="Username"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={loading}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
        />
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>

      <p className="text-center text-gray-600 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
          Login here
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
