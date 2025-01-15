import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import NoteImg from "./images/note.png";
import "./css/Login.css";


const Login = () => {
    const [email, SetEmail] = useState('')
    const [password, SetPassword] = useState('')
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    // const {login}=useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            if (response.data.success) {
                // Login(response.data.user)
                localStorage.setItem("token", response.data.token)
                navigate('/')
            }
            else {
                // Handle unsuccessful login attempts
                setError(response.data.message || 'Login failed. Please try again.');
                console.error(error.response?.data || error.message);
            }
        } catch (err) {
            // Catch any network or server errors
            console.error(err);
            setError('An error occurred while logging in. Please check your credentials and try again.');
        }
    };
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='border shadow p-6 w-80 bg-white'>
                 <div className='img-logo'>
                            <img src={NoteImg} alt='note-logo' />
                          </div>

                          <div>
                <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Email</label>
                        <input type="email" onChange={(e) => SetEmail(e.target.value)} className='w-full px-3 py-2 border' placeholder='Enter Email' required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Password</label>
                        <input type="password" onChange={(e) => SetPassword(e.target.value)} className='w-full px-3 py-2 border' placeholder='Enter Password' required />
                    </div>
                    <div className='mb-4'>
                        <button type="submit" className='w-full signupbutton text-white py-2 mb-3'>Login</button>
                        <p className='text-center'>Do Not Have Account?
                            <Link className="loginlink" to="/signup"> Register</Link>
                        </p>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )


}




export default Login