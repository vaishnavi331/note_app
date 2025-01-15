import React,{useState} from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import NoteImg from "./images/note.png";
import "./css/Login.css";

 
const Signup =()=> {
    const[name,SetName]=useState('')
    const[email,SetEmail]=useState('')
    const[password,SetPassword]=useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/api/auth/signup', {
            name,
            email,
            password,
          });
          if (response.data.success) {
            navigate('/login'); // Use navigate here
          }
        } catch (error) {
          console.error(error.response?.data || error.message);
        }
      };
    
      // Rest of the code remains the same
    
    
    return(
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='border shadow p-6 w-80 bg-white'>
          <div className='img-logo'>
            <img src={NoteImg} alt='note-logo' />
          </div>

          <div>

            <h2 className='text-2xl font-bold mb-4 text-center'>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4 pt-5'>
                    <label className='block text-dark'>Name</label>
                    <input type="text" onChange={(e)=>SetName(e.target.value)} className='w-full px-3 py-2 border' placeholder='Enter Username'/>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Email</label>
                    <input type="email"  onChange={(e)=>SetEmail(e.target.value)} className='w-full px-3 py-2 border' placeholder='Enter Email'/>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Password</label>
                    <input type="password"  onChange={(e)=>SetPassword(e.target.value)} className='w-full px-3 py-2 border' placeholder='Enter Password'/>
                </div>
                <div className='mb-4'>
                    <button type="submit" className='w-full text-white py-2 signupbutton mb-3'>Signup</button>
                    <p className='text-center'>Already Have Account? 
                    <Link className="loginlink" to="/login">Login</Link>
                    </p>
                </div>
            </form>

            </div>
        </div>
    </div>
    )
} 

export default Signup;

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         console.log({ name, email, password }); // Debugging
    //         const response = await axios.post('http://localhost:5000/api/auth/register', {
    //             name,
    //             email,
    //             password,
    //           });
    //         if (response.data.success) {
    //             Navigate('/login');
    //         }
    //     } catch (error) {
    //         console.error(error.response?.data || error.message); 
           
            
    //     }
    // };   

   