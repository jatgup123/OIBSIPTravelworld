import React from "react";
import ServiceCard from "./ServiceCard";
import {Col} from "reactstrap";

import weatherImg from '../assets/images/adventure.png';
import guideImg from '../assets/images/location.png';
import adventures from '../assets/images/adventures.png';
import bonfire from '../assets/images/bonfire.png';
import tent from '../assets/images/tent.png';
import hiking from '../assets/images/hiking.png';
import setting from '../assets/images/configuration.png';

const servicesData = [
    {
        imgUrl: weatherImg,
        title: "Adventures",
        desc: "Lorem ipsum",
    },
    {
        imgUrl: guideImg,
        title: "Best Tour Guide",
        desc: "Lorem ipsum",
    },
    {
        imgUrl: adventures,
        title: "Off Road",
        desc: "Lorem ipsum",
    },
    {
        imgUrl: bonfire,
        title: "Camp Fire",
        desc: "Lorem ipsum",
    },
    {
        imgUrl: tent,
        title: "Camping",
        desc: "Lorem ipsum",
    },
    {
        imgUrl: hiking,
        title: "Hiking",
        desc: "Lorem ipsum",
    },
    {
        imgUrl: setting,
        title: "Customization",
        desc: "Lorem ipsum",
    },
];

const ServiceList = () => {
    return(
        <>
            {servicesData.map((item, index)=>(
                    <Col lg="3" md='6' sm='12' className='mb-4' Key={index}>
                        <ServiceCard items={item}/>
                    </Col>
                ))}
        </>
    );
};

export default ServiceList;