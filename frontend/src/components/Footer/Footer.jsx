import React from 'react';
import './footer.css';
import {Container, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const quick_links=[
  {
    path:'/home',
    display:'Home'
  },
  {
    path:'/about',
    display:'About'
  },
  {
    path:'/tours',
    display:'Tours'
  }
];

const quick_links2=[
  {
    path:'/terms-of-service',
    display:'Terms & Conditions'
  },
  {
    path:'/privacy-policy',
    display:'Privacy Policy'
  },
  {
    path:'/cancellation',
    display:'Cancellation and Refund Policy'
  },
  {
    path:'/support',
    display:'Customer Support'
  }
]; 

const Footer = () => {
  const year = new Date().getFullYear();

  return <footer className='footer'>
      <Container>
        <Row>
          <Col lg='3'>
              <div className="logo">
                <img src={logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste veniam laudantium odio, repellat exercitationem veritatis nostrum. Officia odit, ipsam, quod consequuntur delectus numquam alias rerum earum perferendis fuga, deleniti eligendi?</p>
                <div className="social__links d-flex align-items-center gap-4">
                  <span>
                    <Link to='#'><i class="ri-youtube-fill"></i></Link>
                  </span>
                  <span>
                    <Link to='#'><i class="ri-github-fill"></i></Link>
                  </span>
                  <span>
                    <Link to='#'><i class="ri-facebook-circle-fill"></i></Link>
                  </span>
                  <span>
                    <Link to='#'><i class="ri-instagram-fill"></i></Link>
                  </span>
                </div>
              </div>
          </Col>
          <Col lg='3'>
               <h5 className='footer__link-title'>Discover</h5>
               <ListGroup className='footer__quick-links'>
                   {
                     quick_links.map((item, index)=>(
                       <ListGroupItem Key={index} className='ps-0 border-0'>
                          <Link to={item.path}>{item.display}</Link>
                       </ListGroupItem>
                     ))
                   }
               </ListGroup>
          </Col>
          <Col lg='3'>
               <h5 className='footer__link-title'>Quick Links</h5>
               <ListGroup className='footer__quick-links'>
                   {
                     quick_links2.map((item, index)=>(
                       <ListGroupItem Key={index} className='ps-0 border-0'>
                          <Link to={item.path}>{item.display}</Link>
                       </ListGroupItem>
                     ))
                   }
               </ListGroup>
          </Col>
          <Col lg='3'>
               <h5 className='footer__link-title'>Contact</h5>
               <ListGroup className='footer__quick-links'>
      
                       <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                          <h6 className='mb-0 d-flex align-items-center gap-2'>
                            <span><i className="ri-map-pin-line"></i></span>
                            Address:
                          </h6>
                          <p className="mb-0">Chennai, TN, India</p>
                       </ListGroupItem>

                       <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                          <h6 className='mb-0 d-flex align-items-center gap-2'>
                            <span><i className="ri-mail-line"></i></span>
                            Email:
                          </h6>
                          <p className="mb-0">jjting247@gmail.com</p>
                       </ListGroupItem>

                       <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                          <h6 className='mb-0 d-flex align-items-center gap-2'>
                            <span><i className="ri-phone-fill"></i></span>
                            Phone:
                          </h6>
                          <p className="mb-0">+91 9696292382</p>
                       </ListGroupItem>
                     
               </ListGroup>
          </Col>
          <Col lg='12' className="text-center pt-5">
              <p className="copyright">Copyright {year}, design and develop by Jatin Gupta. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
  </footer>
};

export default Footer;
