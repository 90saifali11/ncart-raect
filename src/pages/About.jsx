import React from 'react';
import './About.css'; // Import the CSS file

function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-description">
        Welcome to Product E-Store! We are dedicated to providing the best products for our customers. Our mission is to offer a diverse range of high-quality products at competitive prices. Our team is passionate about customer satisfaction, and we strive to deliver an exceptional shopping experience every time.
      </p>
      <p className="about-description">
        Founded in [Year], our company has grown rapidly, thanks to our loyal customers and dedicated staff. We believe in continuous improvement and innovation, and we are always looking for new ways to enhance our services and product offerings.
      </p>
      <p className="about-description">
        Thank you for visiting our site. If you have any questions or feedback, feel free to contact us. We look forward to serving you!
      </p>
    </div>
  );
}

export default About;
