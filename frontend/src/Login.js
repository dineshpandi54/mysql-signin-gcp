import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';

const Login = () => {

    const[email,setEmail]=useState()
    const[password,setPassword]=useState()

    const navigate=useNavigate()

    const handleSubmit = async (event) =>{
        event.preventDefault();
        await axios.post('http://localhost:4000/login',{email,password})
        .then(res => {
            if(res.data === "success"){
                navigate('/home');
            }else{
                alert("Login Failed")
            }
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 bg-black'>
        <div className='p-3 rounded w-25 bg-white'>
        <h3>Login</h3>
            <form  onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" placeholder='Enter Email' className='form-control rounded-0' required onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' className='form-control rounded-0' required onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <button type='submit' className="btn btn-success w-100 rounded-0">Login</button>
                <p className='mt-3'>Don't have an Account ? <Link to={"/signup"} className="text-decoration-none">Create</Link></p>
                
            </form>
        </div>
    </div>
  )
}

export default Login