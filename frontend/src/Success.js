import React from 'react'
import './Success-Cancel.css';
import { useNavigate } from 'react-router-dom';

const Success = () => {

    const navigate =useNavigate();

  return (
    <div className='success-page'>
    <div className="success-container">
        <h3>Payment Successful</h3>
        <button className='success-btn' onClick={()=>navigate('/home')}>Back</button>
    </div>
    
</div>
  )
}

export default Success