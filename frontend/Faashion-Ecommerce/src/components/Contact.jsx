import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Mail,
  Phone,
  House,
  ChevronRight,
} from "lucide-react";

const Contact = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully!");
    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #f8f5f1, #ece7df)",
        padding: "60px 20px",
        fontFamily:
          "'Cormorant Garamond', serif",
      }}
    >

      <div
        className="container"
        style={{
          maxWidth: "1200px",
          margin: "auto",
        }}
      >

        {/* BREADCRUMB */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
            fontSize: "14px",
            color: "#777",
          }}
        >

          {/* HOME */}
          <div
            onClick={() =>
              navigate("/")
            }
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              cursor: "pointer",
            }}
          >
            <House size={15} />
            <span>Home</span>
          </div>

          <ChevronRight size={15} />

          {/* CONTACT */}
          <span
            style={{
              color: "#000",
              fontWeight: "600",
            }}
          >
            Contact
          </span>

        </div>

        {/* TOP TITLE */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
        >

          <h1
            style={{
              fontSize: "60px",
              fontWeight: "bold",
              color: "#3d372f",
            }}
          >
            Contact Us
          </h1>

          <p
            style={{
              color: "#7b746a",
              fontSize: "22px",
              marginTop: "10px",
            }}
          >
            We'd love to hear from you
          </p>

        </div>

        {/* MAIN SECTION */}
        <div className="row">

          {/* LEFT SIDE */}
          <div className="col-lg-5 mb-4">

            <div
              style={{
                background: "#8f8776",
                color: "white",
                padding: "50px 35px",
                borderRadius: "15px",
                height: "100%",
                boxShadow:
                  "0 8px 25px rgba(0,0,0,0.1)",
              }}
            >

              <h2
                style={{
                  fontSize: "40px",
                  marginBottom: "30px",
                }}
              >
                Get In Touch
              </h2>

              {/* ADDRESS */}
              <div
                style={{
                  display: "flex",
                  marginBottom: "25px",
                  alignItems: "center",
                }}
              >
                <MapPin size={28} />
                <div
                  style={{
                    marginLeft: "15px",
                  }}
                >
                  <h4>Address</h4>
                  <p>
                    Ichalkaranji, Maharashtra,
                    India
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div
                style={{
                  display: "flex",
                  marginBottom: "25px",
                  alignItems: "center",
                }}
              >
                <Mail size={28} />
                <div
                  style={{
                    marginLeft: "15px",
                  }}
                >
                  <h4>Email</h4>
                  <p>
                    fashionstore@gmail.com
                  </p>
                </div>
              </div>

              {/* PHONE */}
              <div
                style={{
                  display: "flex",
                  marginBottom: "25px",
                  alignItems: "center",
                }}
              >
                <Phone size={28} />
                <div
                  style={{
                    marginLeft: "15px",
                  }}
                >
                  <h4>Phone</h4>
                  <p>
                    +91 9876543210
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE FORM */}
          <div className="col-lg-7">

            <div
              style={{
                background: "white",
                padding: "50px",
                borderRadius: "15px",
                boxShadow:
                  "0 8px 25px rgba(0,0,0,0.08)",
              }}
            >

              <h2
                style={{
                  marginBottom: "30px",
                  fontSize: "40px",
                  color: "#3d372f",
                }}
              >
                Send Message
              </h2>

              <form
                onSubmit={handleSubmit}
              >

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />

                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="6"
                  value={form.message}
                  onChange={handleChange}
                  required
                  style={textareaStyle}
                />

                <button
                  type="submit"
                  style={buttonStyle}
                >
                  Send Message
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "18px",
  outline: "none",
};

const textareaStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "18px",
  outline: "none",
  resize: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  background: "#8f8776",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "20px",
  cursor: "pointer",
};

export default Contact;