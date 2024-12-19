import React from "react";

const Footer = ()=>{
  return(
    <div className="homepage_footer overflow">
    <div className="homepage_footer-content">
      <ul className="footer_content-left homepage_footer-list">
        <li className="footer_content-title">Customer Service</li>
        <li className="footer_content-description">Monday to Friday 9am - 9pm EST, Saturday 10am - 9pm EST :</li>
        <li>800-441-4488</li>
        <li>Email us</li>
      </ul>
      <ul className="footer_content-center homepage_footer-list">
        <li className="footer_content-title">Newsletter</li>
        <li className="footer_content-description">Receive our newsletter and discover our stories, collections, and surprises.</li>
        <li><button className="footer_content-btn">Subscribe</button></li>
      </ul>
      <ul className="footer_content-right homepage_footer-list">
        <li className="footer_content-title">Follow us</li>
        <li></li>
      </ul>
    </div>
    </div>
  )
}

export default Footer;