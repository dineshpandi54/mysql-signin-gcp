import React ,{useState} from 'react'
import './Home.css';
import StripeCheckout from 'react-stripe-checkout' 
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate =useNavigate();
  const[loading,setLoading] = useState(false);

  const [product,setProduct] = useState({
    name : "Product One",
    price : 200 * 100,
    productBy : "onlineStore"
  })

  const handlePayment = (token) => {

    setLoading(true);
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };
  
    return fetch("http://34.66.216.45:4000/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          navigate("/success") 
        } else {
          navigate("/cancel")
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("Payment Error:", err);
        window.location.href = "/cancel"; 
      });
  };

  return (
    <>
      {loading && <div className='spinner'>Procesing payment , please wait</div>}
      <StripeCheckout 
             stripeKey='pk_test_51R1jn4D12XjX1ZdTHHC538DiNc0Tyqk58aR2nyR4RjoryGH7OoA7Cpzzdp4fx2Uix0Umgv0qdW0OyYugEooJZTmR00fxDWIkQK'
             token={handlePayment}
             name='Buy Product one' 
             amount={product.price} 
             currency='inr'
      >
        <button className='app-btn'>Buy Now {product.price / 100}</button>

      </StripeCheckout>
    </>
  )
}

export default Home