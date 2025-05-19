import React, { useState, useRef } from "react";

function XModal() {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);

  // Close modal if click outside modal-content
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpen(false);
      setFields({ username: "", email: "", dob: "", phone: "" });
      setErrors({});
    }
  };

  // Validate fields
  const validate = () => {
    const errs = {};
    if (!fields.username) errs.username = "Username is required";
    if (!fields.email) errs.email = "Email is required";
    if (!fields.dob) errs.dob = "Date of Birth is required";
    if (!fields.phone) errs.phone = "Phone number is required";
    return errs;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Email validation
    if (!fields.email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }
    // Phone validation
    if (!/^\d{10}$/.test(fields.phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }
    // DOB validation
    const dobDate = new Date(fields.dob);
    const now = new Date();
    if (dobDate > now) {
      alert("Invalid date of birth. Please enter a valid date.");
      return;
    }
    // Success: close modal
    setOpen(false);
    setFields({ username: "", email: "", dob: "", phone: "" });
    setErrors({});
  };

  // Handle input change
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  return (
    <div>
      {!open && (
        <button onClick={() => setOpen(true)}>Open Form</button>
      )}
      {open && (
        <div className="modal" onClick={handleBackdropClick} style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div
            className="modal-content"
            ref={modalRef}
            style={{
              background: "#fff", padding: 24, borderRadius: 8, minWidth: 320, position: "relative"
            }}
            onClick={e => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  id="username"
                  value={fields.username}
                  onChange={handleChange}
                  type="text"
                />
                {errors.username && <div style={{ color: "red" }}>{errors.username}</div>}
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  value={fields.email}
                  onChange={handleChange}
                  type="email"
                />
                {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  id="dob"
                  value={fields.dob}
                  onChange={handleChange}
                  type="date"
                />
                {errors.dob && <div style={{ color: "red" }}>{errors.dob}</div>}
              </div>
              <div>
                <label htmlFor="phone">Phone Number:</label>
                <input
                  id="phone"
                  value={fields.phone}
                  onChange={handleChange}
                  type="tel"
                  maxLength={10}
                />
                {errors.phone && <div style={{ color: "red" }}>{errors.phone}</div>}
              </div>
              <button type="submit" className="submit-button" style={{ marginTop: 16 }}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default XModal;