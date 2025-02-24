import React, { useState } from 'react';
import { UserPlus, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../../lib/auth';

type AuthMode = 'login' | 'signup';

export function AuthForm() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    rollNo: '',
    department: '',
    interests: '',
    skills: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(formData.email, formData.password, {
          full_name: formData.name,
          roll_no: formData.rollNo,
          department: formData.department,
          interests: formData.interests.split(',').map(i => i.trim()),
          skills: formData.skills.split(',').map(s => s.trim())
        });
      }
      navigate('/dashboard');
    } catch (err) {
<<<<<<< HEAD
      setError(err instanceof Error ? err.message : 'An error occurred');
=======
      console.error('Auth error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during authentication');
>>>>>>> 85541e8 (p2)
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
=======
  const departments = [
    'Computer Science',
    'Information Technology',
    'Electronics and Communication',
    'Electrical and Electronics',
    'Mechanical',
    'Civil',
  ];

>>>>>>> 85541e8 (p2)
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-orange to-primary-yellow flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">REConnect</h1>
          <p className="text-gray-600 mt-2">Your Academic Digital Hub</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-lg font-medium ${
              mode === 'login'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <LogIn className="inline-block w-4 h-4 mr-2" />
            Login
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 rounded-lg font-medium ${
              mode === 'signup'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <UserPlus className="inline-block w-4 h-4 mr-2" />
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Roll Number"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.rollNo}
                onChange={(e) =>
                  setFormData({ ...formData, rollNo: e.target.value })
                }
                required
              />
<<<<<<< HEAD
              <input
                type="text"
                placeholder="Department"
=======
              <select
>>>>>>> 85541e8 (p2)
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                required
<<<<<<< HEAD
              />
=======
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
>>>>>>> 85541e8 (p2)
              <textarea
                placeholder="Interests (comma separated)"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.interests}
                onChange={(e) =>
                  setFormData({ ...formData, interests: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Skills you want to develop (comma separated)"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.skills}
                onChange={(e) =>
                  setFormData({ ...formData, skills: e.target.value })
                }
                required
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}