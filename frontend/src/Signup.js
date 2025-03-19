import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const Signup = () => {

        const[name,setName]=useState();
        const[email,setEmail]=useState();
        const[password,setPassword]=useState();
    
        const navigate = useNavigate();
        const handleSubmit = async (event) =>{
            event.preventDefault();
            await axios.post('http://localhost:4000/signup',{name,email,password})
            .then(res => {
                navigate('/login');
            })
            .catch(err => console.log(err))
        }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 bg-black'>
    <div className='p-3 rounded w-25 bg-white'>
        <h3>Signup</h3>
        <form onSubmit={handleSubmit}>
        <div className='mb-3'>
                <label htmlFor="name"><strong>Name</strong></label>
                <input type="text" placeholder='Enter Name' required className='form-control rounded-0' onChange={(event) => setName(event.target.value)}/>
            </div>
            <div className='mb-3'>
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" placeholder='Enter Email'required className='form-control rounded-0' onChange={(event) => setEmail(event.target.value)}/>
            </div>
            <div className='mb-3'>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" placeholder='Enter Password' required className='form-control rounded-0' onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <button type='submit' className="btn btn-success w-100 rounded-0">Signup</button>
            <p className='mt-3'>Already have an Account ? <Link to={"/login"} className="text-decoration-none">Login</Link></p>
        </form>
    </div>
</div>
  )
}

export default Signup