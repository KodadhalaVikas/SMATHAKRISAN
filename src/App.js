import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUp from './components/Signup';
import WelcomePage from './components/WelcomePage';
import FarmersPage from './components/FarmersPage';
import Profile from './components/Profile';
import './styles/App.css';
import logo from './Assets/logo.png';
function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="navbar-left">
            <img src={logo} alt="SmathaKrisan Logo" className="logo" />
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/farmers" element={<FarmersPage />} /> {/* Updated route for FarmersPage */}
        </Routes>

        <footer className="footer">
            <div className="footer-content">
              <h3>Services:</h3>
              <ul className="footer-links">
                <li>Machines</li>
                <li>Pesticides</li>
                <li>Farming ideas</li>
                <li>Agriculture Office</li>
              </ul>
              <h3>About Us</h3>
              <p>
                Farmers benefit from the application's informational support regarding farming
                procedures and other techniques essential to contemporary agriculture. Designed to help
                farmers who are illiterate, it provides methods, procedures, and advice on applying pesticides
                in the local languages. It is easy to use with features like voice commands and professional
                calling. By doing away with the requirement for physical resources, this digital technology not
                only makes it easier to disseminate knowledge but also enables access to it with less effort.
                Farmers can learn from each other's experiences and apply best practices in their own fields by
                using the program, which unites farmers worldwide and fosters collaboration and knowledge
                exchange. To share expertise and concentrate on simple, effective farming using
                environmentally friendly pesticides to preserve soil, the objective is to bring together farmers
                from all over the world.
              </p>
              <h3>Contact Us:</h3>
              <ul className="footer-contact-info">
                <li>Email: smathakrisan@agriculture.com</li>
                <li>Mobile No: 1234567890</li>
                <li>Address: Malla Reddy University, Maisammaguda, Dulapally, Hyderabad, Telangana 500043</li>
              </ul>
            </div>
          </footer>
        </div>
      </Router>
    );
  }

  const Home = () => {
    return (
      <div>
        <div className="navbar-right-middle">
          <LoginForm />
        </div>
      </div>
    );
  };
  
  const Services = () => {
    return <h1>Our Services</h1>;
  };
  
  const Products = () => {
    return <h1>Our Products</h1>;
  };
  
  const Contact = () => {
    return <h1>Contact Us</h1>;
  };
  
  export default App;