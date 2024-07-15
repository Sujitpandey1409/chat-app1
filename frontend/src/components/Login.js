import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login } from '../utils/api';
import { useSnackbar } from 'notistack';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const { login: loginUser } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const { data } = await login(formData);
            loginUser(data.token);
            enqueueSnackbar('Login successful!', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Login failed!', { variant: 'error' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-4 border rounded">
            <h2 className="text-2xl mb-4">Login</h2>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full mb-2 p-2 border rounded"
            />
            {errors.username && <div className="text-red-500 text-sm mb-2">{errors.username}</div>}
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full mb-2 p-2 border rounded"
            />
            {errors.password && <div className="text-red-500 text-sm mb-2">{errors.password}</div>}
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
        </form>
    );
};

export default Login;
