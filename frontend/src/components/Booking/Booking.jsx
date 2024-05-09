import React,{useState, useContext} from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
//import { useNavigate } from "react-router-dom"; 
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";
import { loadStripe } from '@stripe/stripe-js';

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  //const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName:'',
    phone:'',
    guestSize:1,
    bookAt:''
  })

  const handleChange = e=>{
    setBooking(prev=>({...prev, [e.target.id]:e.target.value}))
  };

  const serviceFee = 1000;
  const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee);

  const handleClick = async e=>{
    e.preventDefault();
    console.log(booking, "32");
    try{
      if(!user || user===undefined || user===null){
        return alert('Please Sign In');
      }
      // const res = await fetch(`${BASE_URL}/booking/checkout-session/${tour._id}`,{
      //   method: 'post',
      //   headers:{
      //     'Access-Control-Allow-Origin':'*',
      //     'content-type':'application/json'
      //   },
      //   credentials:'include',
      //   body: JSON.stringify(booking)
      // })
      //const stripe = await loadStripe("pk_live_51P5QcsSCJtFPRgZg2IQKsu0jH23O8q5sZt0hgOZuVpcdH9wYuOyNfWz6D12HQS3TdiK1ztbXLNNfSP8xPp47FUiY00ztTFwoKk");
      const stripe = await loadStripe("pk_test_51P5QcsSCJtFPRgZgEp06GvaHi8KHT1gIEfRpnBsFj4nnxMSy9dwdvNhpgXeL9kYINZKUUYL0IrFKxXHzNNr6S7u800wGTkc1uP");
      //const stripe = await loadStripe("pk_test_51PArYJSItme94gaH3cSC9V3GXQ1McIs9quEnVbyQSSQi22bBNT1Mr0o45r2qvCgBhXCcsqkxt4PtFD5iQzGoFiAR00vrKvDr9r");
      const res = await fetch(
        `${BASE_URL}/booking/checkout-session/${tour._id}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            //Authorization: `Bearer ${user.token}` // Assuming you have a token-based authentication
          },
          credentials: "include",
          body: JSON.stringify(booking)
        }
      );
      console.log(res,"45");
      const result = await res.json()
      
      const r = stripe.redirectToCheckout({
        sessionId: result.id
      })
      if(r.error){
        console.log(r.error);
      }
      console.log(result,"61");
      if(!res.ok) {
        return alert(result.message)
      }

      //if(result.url){
        //window.location.href = result.url
      //}
      //navigate("/thank-you");
    }catch(err){
      alert(err.message);
    }
    
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ₹{price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i class="ri-star-s-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
            <FormGroup>
              <input type="text" placeholder="Full Name" id="fullName"
                required onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
              <input type="number" placeholder="Phone" id="phone"
                required onChange={handleChange}/>
            </FormGroup>
            <FormGroup className="d-flex align-items-center gap-3">
              <input type="date" placeholder="Date" id="bookAt"
                required onChange={handleChange}/>
              <input type="number" placeholder="Guests" id="guestSize"
                required onChange={handleChange}/>
            </FormGroup>
        </Form>
      </div>
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
               <h5 className="d-flex align-items-center gap-1">₹{price} <i class="ri-close-line"></i> 1 person</h5>
               <span> ₹{price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
               <h5>Service charge</h5>
               <span> ₹{serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
               <h5>Total</h5>
               <span> ₹{totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>Book Now</Button>
      </div>
    </div>
  );
};

export default Booking;
