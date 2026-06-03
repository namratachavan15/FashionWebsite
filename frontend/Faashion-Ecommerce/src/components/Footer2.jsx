import React from "react";
import { Container, Dropdown } from "react-bootstrap";

const Footer2 = () => {
  return (
    <>
      <style>
        {`
          .footer-main {
            // padding: 40px 0;
            font-family: serif;
            width: 100%;
          }

          .footer-container {
            text-align: center;
          }

          .footer-title {
            font-size: 48px;
            letter-spacing: 3px;
            margin-bottom: 10px;
          }

          .footer-copy {
            font-size: 14px;
            margin-bottom: 20px;
            color: #555;
          }

          .footer-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            font-size: 14px;
            flex-wrap: wrap;
          }

          .footer-links a {
            text-decoration: none;
            color: #000;
          }

          .footer-links a:hover {
            color: #8f8776;
          }

          .footer-language {
            font-size: 14px;
            margin-bottom: 20px;
            color: #333;
          }

          /* Tablet */
          @media (max-width: 768px) {
            .footer-main {
              padding: 40px 20px;
            }

            .footer-title {
              font-size: 34px;
            }

            .footer-links {
              gap: 15px;
              font-size: 13px;
            }
          }

          /* Mobile */
          @media (max-width: 480px) {
            .footer-main {
              padding: 30px 15px;
            }

            .footer-title {
              font-size: 26px;
              letter-spacing: 2px;
            }

            .footer-copy {
              font-size: 12px;
            }

            .footer-links {
              flex-direction: column;
              gap: 10px;
              font-size: 12px;
            }

            .footer-language {
              font-size: 12px;
            }
          }
        `}
      </style>

      <footer className="footer-main">
        <Container className="footer-container">
          
          {/* Language Dropdown */}
          <Dropdown className="mb-3">
            <Dropdown.Toggle
              variant="light"
              className="footer-language"
            >
              Worldwide / English
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>English</Dropdown.Item>
              <Dropdown.Item>Hindi</Dropdown.Item>
              <Dropdown.Item>French</Dropdown.Item>
              <Dropdown.Item>Spanish</Dropdown.Item>
              <Dropdown.Item>German</Dropdown.Item>
              <Dropdown.Item>Chinese</Dropdown.Item>
              <Dropdown.Item>Japanese</Dropdown.Item>
              <Dropdown.Item>Arabic</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Title */}
          <h1 className="footer-title">FASHION</h1>

          {/* Copyright */}
          <p className="footer-copy">
            All rights reserved ©2024
          </p>

          {/* Links */}
          <div className="footer-links">
            <a href="#">Cookie Policy</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Legal Notes</a>
          </div>

        </Container>
      </footer>
    </>
  );
};

export default Footer2;