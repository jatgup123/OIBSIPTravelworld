import React from 'react';
import uf from "./uf.js";

const data = (name, peoples, budget, props) => {
  console.log("Start", budget);

  const{tours, loading, error} = uf(); 

  const {
    photo,
    title,
    address,
    city,
    price,
    distance,
    reviews,
    maxGroupSize,
    desc,
    country,
  } = tours;
  

  //const { _id, photo, title, address, city, price, distance, reviews, maxGroupSize, desc, country} = tour;
  
  const amt = peoples * price;
  if (amt <= budget) {
    props.state.userData.product.name = title;
    props.state.userData.product.link = `${BASE_URL}/tours/${_id}`;
    props.state.userData.product.imageUrl = photo;
    props.state.userData.product.amount = amt;

    props.actions.finalResult(name, peoples, budget);
  }
};

export default data;
