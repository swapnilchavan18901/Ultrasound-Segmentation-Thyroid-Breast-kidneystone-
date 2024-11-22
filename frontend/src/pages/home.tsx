import React from 'react';
import  bg1  from "../assets/bg.jpg";
import '../css/style.css'
const Home = () => {
  return (
    <div>
{/* Hero Section */}
<section
  className="hero-section text-center py-5"
  style={{
    backgroundImage: bg1,    
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
  }}
>
    {/* <img style={{dis}} src={bg1} alt="" height={600} width={600}/> */}
  <div className="d-flex flex-column justify-content-center align-items-center h-100">
    <h1 className="display-4">Advanced Ultrasound Services for Doctors</h1>
    <p className="lead mt-3">
      Accurate, efficient, and AI-powered ultrasound diagnostics tailored for medical professionals.
    </p>
    {/* Get Started Section */}
    <div className="d-flex flex-column align-items-center mt-4">
      <a href="#book-appointment" className="btn btn-primary mb-3" style={{ width: '200px' }}>
        Book an Appointment
      </a>
      <a href="#services" className="btn border" style={{ width: '200px' }}>

        Learn More
      </a>
    </div>
  </div>
</section>



      {/* Features Section */}
      <section className="features-section py-5 " id="features">
        <div className="container flex-column">
          <h2 className="text-center mb-4">Why Choose Our Ultrasound Services?</h2>
          <div className="row">
            <div className="col-md-4 text-center">
              <i className="bi bi-lightning-charge-fill display-4 mb-3"></i>
              <h4>AI-Powered Diagnostics</h4>
              <p>Automated analysis for quicker and more accurate results.</p>
            </div>
            <div className="col-md-4 text-center">
              <i className="bi bi-shield-lock-fill display-4 mb-3"></i>
              <h4>Secure Data Management</h4>
              <p>Your patient data is protected with end-to-end encryption.</p>
            </div>
            <div className="col-md-4 text-center">
              <i className="bi bi-globe2 display-4 mb-3"></i>
              <h4>24/7 Access</h4>
              <p>Access your reports anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section bg-light py-5" id="services">
        <div className="container flex-column">
          <h2 className="text-center mb-4">Our Specialized Ultrasound Services</h2>
          <div className="row">
            {/* Breast Cancer Ultrasound */}
            <div className="col-md-4">
              <div className="card mb-3">
                <div className="card-body text-center">
                  <h5>Breast Cancer Detection</h5>
                  <p>High-quality breast ultrasound scans for early cancer detection and diagnosis.</p>
                  <a href="#book-appointment" className="btn btn-primary">Learn More</a>
                </div>
              </div>
            </div>

            {/* Thyroid Ultrasound */}
            <div className="col-md-4">
              <div className="card mb-3">
                <div className="card-body text-center">
                  <h5>Thyroid Ultrasound</h5>
                  <p>Precise thyroid imaging to detect abnormalities and ensure accurate diagnosis.</p>
                  <a href="#book-appointment" className="btn btn-primary">Learn More</a>
                </div>
              </div>
            </div>

            {/* Liver Ultrasound */}
            <div className="col-md-4">
              <div className="card mb-3">
                <div className="card-body text-center">
                  <h5>Liver Ultrasound</h5>
                  <p>Comprehensive liver scans to assess liver health and diagnose conditions.</p>
                  <a href="#book-appointment" className="btn btn-primary">Learn More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section py-5" id="contact">
        <div className="container flex-column" >
          <h2 className="text-center mb-4">Contact Us</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter your name" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea className="form-control" id="message" rows="4" placeholder="Your message"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        &copy; {new Date().getFullYear()} Ultrasound Services for Doctors | All Rights Reserved
      </footer>
    </div>
  );
};

export default Home;

