import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Profile.css";

const Profile = ({ onClose, theme }) => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const [editingField, setEditingField] = useState("");
  const [editedUserData, setEditedUserData] = useState({
    firstName: "",
    surname: "",
    dateOfBirth: "",
    _id: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/users/${user.email || user.mobile}`
          );
          setUserData(response.data);
          setEditedUserData({
            ...response.data,
            firstName: "",
            surname: "",
            dateOfBirth: "",
          });

          if (response.data.profilePicture) {
            setPreviewImage(
              `http://localhost:5000/${response.data.profilePicture}`
            );
          }
        } catch (err) {
          setError("Failed to fetch user data");
        }
      };

      fetchUserData();
    } else {
      setError("User not found. Please log in again.");
    }
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    try {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    } catch (error) {
      console.error("Error creating object URL:", error);
      setPreviewImage(null);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", selectedFile);
      formData.append("firstName", editedUserData.firstName);
      formData.append("surname", editedUserData.surname);
      formData.append("dateOfBirth", editedUserData.dateOfBirth);

      const response = await axios.put(
        `http://localhost:5000/api/users/${editedUserData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUserData(response.data.user);
      setEditingField("");

      if (response.data.user.profilePicture) {
        setPreviewImage(
          `http://localhost:5000/${response.data.user.profilePicture}`
        );
      }
    } catch (err) {
      setError("Failed to update user data");
    }
  };

  const formatDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth) return "";
    const date = new Date(dateOfBirth);
    return date.toISOString().substring(0, 10);
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "";
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  return (
    <div className={`profile-drawer ${theme === "dark" ? "dark-theme" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        Close
      </button>
      <div className="profile-container">
        <h2>User Profile</h2>
        {error && <p className="error">{error}</p>}
        <div className="profile-picture-container">
          <div className="profile-picture">
            {previewImage ? (
              <img src={previewImage} alt="Profile" />
            ) : (
              <div className="no-profile-picture">No profile picture</div>
            )}
          </div>
          <label htmlFor="profilePicture" className="file-input">
            Change profile picture
          </label>
          <input
            type="file"
            id="profilePicture"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>
        <p>
          <strong>First Name:</strong>{" "}
          {editingField === "firstName" ? (
            <input
              type="text"
              name="firstName"
              value={editedUserData.firstName}
              onChange={handleChange}
            />
          ) : (
            <>
              {userData.firstName}{" "}
              <button onClick={() => handleEdit("firstName")}>Edit</button>
            </>
          )}
        </p>
        <p>
          <strong>Surname:</strong>{" "}
          {editingField === "surname" ? (
            <input
              type="text"
              name="surname"
              value={editedUserData.surname}
              onChange={handleChange}
            />
          ) : (
            <>
              {userData.surname}{" "}
              <button onClick={() => handleEdit("surname")}>Edit</button>
            </>
          )}
        </p>
        <p>
          <strong>Date of Birth:</strong>{" "}
          {editingField === "dateOfBirth" ? (
            <input
              type="date"
              name="dateOfBirth"
              value={editedUserData.dateOfBirth}
              onChange={handleChange}
            />
          ) : (
            <>
              {formatDateOfBirth(userData.dateOfBirth)}{" "}
              <button onClick={() => handleEdit("dateOfBirth")}>Edit</button>
            </>
          )}
        </p>
        <p>
          <strong>Age:</strong>{" "}
          {userData.dateOfBirth
            ? calculateAge(userData.dateOfBirth)
            : "Calculating..."}
        </p>
        {editingField && (
          <div>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => setEditingField("")}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
