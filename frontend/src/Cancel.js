import React from 'react'
import './Success-Cancel.css';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {

    const navigate =useNavigate();

  return (
    <div className='cancel-page'>
    <div className="cancel-container">
        <h3>Payment Failed</h3>
        <button className='cancel-btn' onClick={()=>navigate('/home')}>Back</button>
    </div>
</div>
  )
}

export default Cancel