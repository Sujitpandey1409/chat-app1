import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import { SnackbarProvider } from 'notistack';

const App = () => {
    return (
        <AuthProvider>
            <SnackbarProvider maxSnack={3}>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/chat" element={
                            <PrivateRoute>
                                <Chat />
                            </PrivateRoute>
                        } />
                    </Routes>
                </Router>
            </SnackbarProvider>
        </AuthProvider>
    );
};

export default App;
