import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";

const XModal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);

  useImperativeHandle(ref, () => ({
    isOpen: () => open,
    closeModal: () => {
      setOpen(false);
      setFields({ username: "", email: "", dob: "", phone: "" });
      setErrors({});
    },
    isClickInsideModal: (event) => {
      return modalRef.current && modalRef.current.contains(event.target);
    }
  }));

  const validate = () => {
    const errs = {};
    if (!fields.username) errs.username = "Username is required";
    if (!fields.email) errs.email = "Email is required";
    if (!fields.dob) errs.dob = "Date of Birth is required";
    if (!fields.phone) errs.phone = "Phone number is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (!fields.email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }
    if (!/^\d{10}$/.test(fields.phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }
    const dobDate = new Date(fields.dob);
    const now = new Date();
    if (dobDate > now) {
      alert("Invalid date of birth. Please enter a valid date.");
      return;
    }
    setOpen(false);
    setFields({ username: "", email: "", dob: "", phone: "" });
    setErrors({});
  };

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
        <div
          className="modal"
          style={{
            position: "fixed",
            top: "20vh",
            left: "50%",
            transform: "translateX(-50%)",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 0,
          }}
        >
          <div
            className="modal-content"
            ref={modalRef}
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 8,
              minWidth: 320,
              position: "relative",
              boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
            }}
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
});

export default XModal;