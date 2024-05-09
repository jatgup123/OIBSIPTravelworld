import React from "react";
import "./service-card.css";

const ServiceCard = ({ items }) => {
  const { imgUrl, title, desc } = items;
  return (
    <div className="service__item">
      <div className="service__img">
          <img src={imgUrl} alt="" />
      </div>
      <h5>{title}</h5>
      <p>{desc}</p>
    </div>
  );
};

export default ServiceCard;
