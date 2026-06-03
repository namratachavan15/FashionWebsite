import React from "react";
import { Container, Button } from "react-bootstrap";

function LoadMoreSection() {
  return (
    <Container className="text-center my-5">
      
      {/* Showing Text */}
      <p style={{ fontSize: "16px", marginBottom: "20px" ,fontWeight:'500'}}>
        Showing 9 of 18
      </p>

      {/* View More Button */}
      <div className="d-flex justify-content-center mb-3">
        <Button
          variant="outline-secondary"
          style={{
            width: "50%",
            borderRadius: "0",
            padding: "10px 0",
            fontWeight:'500',
            color:'black'
          }}
        >
          View More
        </Button>
      </div>

      {/* Back to Top */}
      <p
        style={{
          fontSize: "14px",
          cursor: "pointer",
          marginTop: "10px",
          fontWeight:'500',
          fontSize:'18px'
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to Top ˄
      </p>
    </Container>
  );
}

export default LoadMoreSection;