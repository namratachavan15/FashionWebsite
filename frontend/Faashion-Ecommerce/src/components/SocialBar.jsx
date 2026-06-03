import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";

const SocialBar = () => {
  return (
    <>
      <style>
        {`
          .social-text {
            font-family: 'Cormorant Garamond', serif;
            margin-bottom: 10px;
            font-size: 16px;
          }

          .social-icons {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
            font-size: 14px;
            cursor: pointer;
          }

          @media (max-width: 768px) {
            .social-text {
              font-size: 14px;
            }

            .social-icons {
              gap: 12px;
              font-size: 12px;
            }
          }

          @media (max-width: 480px) {
            .social-text {
              font-size: 12px;
            }

            .social-icons {
              gap: 10px;
              font-size: 11px;
              flex-wrap: wrap;
            }
          }
        `}
      </style>

      <div
        className="container-fluid"
        style={{
          width: "100%",
          background: "#8f8776",
          padding: "20px 0",
          textAlign: "center",
          color: "#fff",
          margin: "0",
        }}
      >
        <div className="container-fluid p-0">
          <p className="social-text">Follow us on:</p>

          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaLinkedinIn />
            <FaPinterestP />
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialBar;