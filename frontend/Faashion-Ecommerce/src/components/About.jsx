import React from "react";
import { useNavigate } from "react-router-dom";
import { House, ChevronRight } from "lucide-react";

function About() {

  const navigate = useNavigate();

  return (
    <div style={styles.page}>

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
          onClick={() => navigate("/")}
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

        {/* ABOUT */}
        <span
          style={{
            color: "#000",
            fontWeight: "600",
          }}
        >
          About
        </span>

      </div>

      {/* HERO SECTION */}
      <div style={styles.hero}>

        <h1 style={styles.title}>
          ABOUT FASHION
        </h1>

        <p style={styles.subtitle}>
          Elegance is not about being noticed, it’s about being remembered.
        </p>

      </div>

      {/* STORY SECTION */}
      <div style={styles.section}>
        <h2 style={styles.heading}>Our Story</h2>
        <p style={styles.text}>
          Fashion is more than clothing — it is identity, confidence, and expression.
          We started our journey with a vision to bring premium fashion collections
          that feel luxurious yet comfortable for everyday life.
        </p>
      </div>

      {/* MISSION SECTION */}
      <div style={styles.section}>
        <h2 style={styles.heading}>Our Mission</h2>
        <p style={styles.text}>
          We aim to provide high-quality fashion products that empower people to
          express their individuality. Every design is carefully selected to ensure
          elegance, comfort, and modern trends.
        </p>
      </div>

      {/* FEATURES */}
      <div style={styles.grid}>

        <div style={styles.card}>
          <h3>✨ Premium Quality</h3>
          <p>Luxury fabrics with modern design approach.</p>
        </div>

        <div style={styles.card}>
          <h3>🚚 Fast Delivery</h3>
          <p>Quick, safe and reliable delivery service.</p>
        </div>

        <div style={styles.card}>
          <h3>💬 24/7 Support</h3>
          <p>Always here to help you anytime.</p>
        </div>

      </div>

    </div>
  );
}

const styles = {

  page: {
    fontFamily: "'Cormorant Garamond', serif",
    padding: "60px 20px",
    maxWidth: "1100px",
    margin: "auto",
    color: "#222",
  },

  hero: {
    textAlign: "center",
    padding: "80px 20px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #111, #444)",
    color: "#fff",
    marginBottom: "60px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },

  title: {
    fontSize: "48px",
    letterSpacing: "4px",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "18px",
    opacity: 0.85,
  },

  section: {
    marginBottom: "40px",
    padding: "20px",
    borderLeft: "4px solid #111",
  },

  heading: {
    marginBottom: "10px",
    fontSize: "24px",
  },

  text: {
    lineHeight: "1.8",
    color: "#444",
    fontSize: "16px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "50px",
  },

  card: {
    padding: "25px",
    borderRadius: "15px",
    background: "#fff",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
    textAlign: "center",
    transition: "0.3s",
    cursor: "pointer",
  },

};

export default About;