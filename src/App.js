import logo from './logo.svg';
import './App.css';
import StripeCheckout from "react-stripe-checkout";
import React,{useState} from "react";

function App() {

  const [product,setProduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: "faceBook",
  });

  // console.log(process.env.REACT_APP_KEY)


  const makePayment = token => {
    const body = {
      token,
      product
    };
    const headers = {
      "Content-Type": "application/json"
    };

    return fetch("http://localhost:4500/payment", { // Corrected URL string
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Payment failed');
    })
    .then((data) => {
      console.log("Payment successful!", data);
    })
    .catch((error) => console.error("Payment error:", error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <StripeCheckout 
          stripeKey="pk_test_51NNawlSE7ZntMqC3euqicMcL5NY7ysOgX01tluTTs8jR6PHAUd4zRXR9LQaZ1kuH22ua8X1DfEnLziJJdxr7EBgC00Os2qgXjT"   // This is stripe publish key
          token={makePayment} 
          name="Buy React">
          <button className="btn btn-large pink">
            Buy React for just ${product.price}  {/* Updated button text */}
          </button>
        </StripeCheckout>
      </header>
    </div>
  ); 
}

export default App;
