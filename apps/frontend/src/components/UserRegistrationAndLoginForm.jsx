import React, { useState } from 'react';
import axios from 'axios';

const UserRegistrationAndLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const url = isLogin ? '/api/auth/login' : '/api/auth/register';
            const response = await axios.post(url, { email, password });
            alert(response.data.message || 'Logged in successfully!');
            // Handle JWT token storage here
        } catch (err) {
            setError(err.response ? err.response.data.message : 'An error occurred.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            <button type="button" onClick={() => setIsLogin(!isLogin)}>
                Switch to {isLogin ? 'Register' : 'Login'}
            </button>
        </form>
    );
};

export default UserRegistrationAndLoginForm;