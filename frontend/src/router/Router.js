import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './../pages/Home';
import Login from './../pages/Login';
import Register from './../pages/Register';
import Searchresultlist from './../pages/Searchresultlist';
//import ThankYou from './../pages/ThankYou';
import Td from './../pages/TD1';
import Tours from './../pages/Tours';
import ThankYou from './../pages/ThankYou';
import App from './../App1';
import Loc from '../pages/Loc';
//import Cf from './../pages/checkoutfail';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/home'/>} />;
      <Route path="/home" element={<Home />} />;
      <Route path="/login" element={<Login />} />;
      <Route path="/register" element={<Register />} />;
      <Route path="/tours/search" element={<Searchresultlist />} />;
      <Route path="/tours/:id" element={<Td />} />;
      <Route path="/tours" element={<Tours />} />;
      <Route path="/checkout-success" element={<ThankYou />} />;
      <Route path="/terms-of-service" element={<ThankYou />} />;
      <Route path="/privacy-policy" element={<ThankYou />} />;
      <Route path="/cancellation" element={<ThankYou />} />;
      <Route path="/support" element={<ThankYou />} />;
      <Route path="/chatbot" element={<App />} />;
      <Route path="/loc" element={<Loc />} />;
    </Routes>
  );
};

export default Routers;
