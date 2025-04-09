import { Link } from "react-router-dom"
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa"
import "./Footer.css"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-box">
          <h3 className="footer-heading">CONNECT WITH US</h3>
          <div className="footer-contact-item">
            <FaPhone className="footer-icon" />
            <span>+91 9567843340</span>
          </div>
          <div className="footer-contact-item">
            <FaEnvelope className="footer-icon" />
            <span>info@deepnetsoft.com</span>
          </div>
        </div>

        <div className="footer-box logo-center">
          <div className="footer-logo-text">
            <span className="footer-logo-deep">DEEP</span>
            <span className="footer-logo-net">NET</span>
            <span className="footer-logo-soft">SOFT</span>
          </div>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="footer-box">
          <h3 className="footer-heading">FIND US</h3>
          <div className="footer-contact-item">
            <FaMapMarkerAlt className="footer-icon" />
            <span>First floor, Geo Infopark, Infopark EPIP, Kakkanad</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} Deepnetsoft Solutions. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/" className="footer-link">Terms & Conditions</Link>
          <Link to="/" className="footer-link">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
