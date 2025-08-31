import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    dateOfBirth: "",
    country: "India",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "country") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
        mobile: "",
        mobilePlaceholder: value === "India" ? "1234567890" : "212-456-7890",
      }));
    } else if (name === "mobile") {
      let formattedMobile;
      if (formData.country === "India") {
        formattedMobile = value.replace(/\D/g, "").substring(0, 10);
      } else {
        formattedMobile = value
          .replace(/\D/g, "")
          .replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        if (formattedMobile.length > 12) {
          formattedMobile = formattedMobile.substring(0, 12);
        }
      }
      setFormData((prevState) => ({
        ...prevState,
        [name]: formattedMobile,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const strongPasswordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!strongPasswordRegex.test(formData.password)) {
      setPasswordError(
        "Password should start with a capital letter, contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Password and confirm password do not match.");
      return;
    }

    setPasswordError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        formData
      );
      console.log("User signed up:", response.data);
      navigate("/welcome");

      setFormData({
        firstName: "",
        surname: "",
        dateOfBirth: "",
        country: "India",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setSignUpError(
          "Account already exists with this mobile or email. Redirecting to login..."
        );
        setTimeout(() => {
          navigate("/login");
        }, 4000); // Redirect to login after 4 seconds
      } else {
        console.error("Error signing up:", error);
        setSignUpError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div>
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Enter your surname"
            required
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mobile-input">
          <label htmlFor="mobile">Mobile:</label>
          <div className="country-dropdown">
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="India">&#x1F1EE;&#x1F1F3; India</option>
              <option value="USA">&#x1F1FA;&#x1F1F8; USA</option>
            </select>
          </div>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder={formData.mobilePlaceholder || "Mobile Number"}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email (optional)"
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            autoComplete="new-password"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
            autoComplete="new-password"
          />
        </div>
        {passwordError && <div className="password-error">{passwordError}</div>}
        {signUpError && <div className="sign-up-error">{signUpError}</div>}
        <button type="submit" style={{ marginTop: "10px" }}>
          Sign Up
        </button>

        <div>
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
