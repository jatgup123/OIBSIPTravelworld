import React, { useRef, useState, useEffect, useContext } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { Navigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import calculateAvgRating from "../utils/avgRating.js";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "./../utils/config.js";
//import location from "./location";

const Td = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const {user} = useContext(AuthContext);
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);
  const { photo, title, address, city, price, distance, reviews, maxGroupSize, desc, country} = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    console.log("reviewText",reviewText)

    try{
      if(!user || user===undefined || user===null){
        return alert('Please sign in');
      }

      const reviewObj = {
        username:user?.username,
        reviewText,
        rating:tourRating,
      }

      const res = await fetch(`${BASE_URL}/review/${id}`,{
        method:'post',
        headers:{
          'content-type':'application/json'
        },
        credentials:"include",
        body: JSON.stringify(reviewObj)
      })
      const result= await res.json();
      if(!res.ok){
        return alert(result.message);
      };
      return alert(result.message);
    }catch(err){
      alert(err.message);
    }
  };
  console.log(tour._id);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);
  const mapUrl = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=1%20${city},${country}+(Travel%20World)&t=&z=14&ie=UTF8&iwloc=B&output=embed`;
  /*const loc= ()=>{
    Navigate("/loc");
  }*/

  return (
    <>
      <section>
        <Container>
        {
          loading && <h4 className='text-center pt-5'>Loading....</h4>
        }
        {error && <h4 className='text-center pt-5'>{error}</h4>}
        {
          !loading && !error && (<Row>
            <Col lg="8">
              <div className="tour__content">
                <img src={photo} alt="" />

                <div className="tour__info">
                  <h2>{title}</h2>

                  <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i
                          class="ri-star-s-fill"
                          style={{ color: "var(--secondary-color)" }}
                        ></i>
                        {calculateAvgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not rated"
                        ): (
                          <span>{reviews?.length}</span>
                        )}
                      </span>

                      <span>
                        <i class="ri-map-pin-user-fill" ></i> {address}
                      </span>
                  </div>
                  <div className="tour__extra-details">
                      <span>
                        <i class="ri-map-pin-2-line" ></i> {city}
                      </span>
                      <span>
                        <i class="ri-money-dollar-circle-line"></i> ₹{price}
                      </span>
                      <span>
                        <i class="ri-map-pin-time-line"></i> {distance} k/m
                      </span>
                      <span>
                        <i class="ri-group-line"></i> {maxGroupSize} people
                      </span>
                  </div>
                  <h5>Description</h5>
                  <p>{desc}</p>
                  
                  <iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src={mapUrl}><a href="https://www.gps.ie/">gps devices</a></iframe>
                </div>
                <div className="tour-reviews mt-4">
                <h4>Reviews ({reviews?.length} reviews)</h4>
                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span onClick={() => setTourRating(1)}>
                          1 <i class="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(2)}>
                          2 <i class="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(3)}>
                          3 <i class="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(4)}>
                          4 <i class="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(5)}>
                          5 <i class="ri-star-s-fill"></i>
                        </span>
                      </div>
                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="share your thoughts"
                          required
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                    <ListGroup className="user__reviews">
                      {reviews?.map(review => (
                        <div className="review__item">
                          <img src={avatar} alt="" />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username}</h5>
                                <p>
                                  {new Date(review.createdAt).toLocaleDateString(
                                    "en-US",
                                    options
                                  )}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                 {review.rating}
                                <i class="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                </div>
              </div>
            </Col>
            <Col lg="4">
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
            
          </Row>)
        }
        </Container>
      </section>
    </>
    
  );
};
export default Td;