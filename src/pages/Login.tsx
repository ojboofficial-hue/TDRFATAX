import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="px-4 py-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <Input
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={loading}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      <p className="text-center text-gray-600 mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
          Register here
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
