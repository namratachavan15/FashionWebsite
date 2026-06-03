// Register.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const validate = () => {
    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.password ||
      !data.confirmPassword
    ) {
      return "All fields are required";
    }

    if (!/\S+@\S+\.\S+/.test(data.email)) {
      return "Invalid email format";
    }

    if (data.password.length < 4) {
      return "Password must be at least 4 characters";
    }

    if (data.password !== data.confirmPassword) {
      return "Passwords do not match";
    }

    return "";
  };

  const handleRegister = async () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const sendData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      };

      const res = await axios.post(
        "http://localhost:8081/users/register",
        sendData
      );

      setSuccess(res.data);
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      if (err.response?.data) {
        setError(err.response.data);
      } else {
        setError("Registration Failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* LEFT SIDE - HERO SECTION */}
      <div style={styles.leftPanel}>
        <div style={styles.brandContainer}>
         <h1 style={styles.brandName}>
  ÉLÉGANCE<span style={styles.brandSpan}>Studio</span>
</h1>
          <div style={styles.divider}></div>
         <p style={styles.tagline}>Luxury Fashion Boutique</p>
          <p style={styles.description}>Create an account to enjoy exclusive offers, early access to collections, and a personalized shopping experience.</p>
        </div>
        <div style={styles.heroImageContainer}>
          <div style={styles.heroImage}></div>
        </div>
      </div>

      {/* RIGHT SIDE - REGISTRATION FORM */}
      <div style={styles.rightPanel}>
        <div style={styles.formCard}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>Create Account</h2>
            <p style={styles.formSubtitle}>Join us and start your fashion journey</p>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div style={styles.errorMessage}>
              <span style={styles.errorIcon}>!</span>
              {error}
            </div>
          )}

          {/* SUCCESS MESSAGE */}
          {success && (
            <div style={styles.successMessage}>
              <span style={styles.successIcon}>✓</span>
              {success}
            </div>
          )}

          {/* TWO COLUMN LAYOUT FOR NAME FIELDS */}
          <div style={styles.row}>
            <div style={styles.halfWidth}>
              <label style={styles.label}>First Name</label>
              <input
                name="firstName"
                placeholder="Jane"
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.halfWidth}>
              <label style={styles.label}>Last Name</label>
              <input
                name="lastName"
                placeholder="Doe"
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="hello@example.com"
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Create a strong password"
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={isLoading}
            style={{
              ...styles.registerButton,
              ...(isLoading && styles.buttonDisabled)
            }}
          >
            {isLoading ? (
              <span style={styles.spinner}></span>
            ) : (
              "Create Account"
            )}
          </button>

          <div style={styles.loginContainer}>
            <p style={styles.loginText}>
              Already have an account?{" "}
              <Link to="/login" style={styles.loginLink}>
                Sign In
              </Link>
            </p>
          </div>

          {/* TERMS AND CONDITIONS */}
          <p style={styles.termsText}>
            By creating an account, you agree to our{" "}
            <a href="#" style={styles.termsLink}>Terms of Service</a> and{" "}
            <a href="#" style={styles.termsLink}>Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    backgroundColor: "#fff",
  },
  leftPanel: {
    flex: 1,
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "150px 40px",
    position: "relative",
    overflow: "hidden",
  },
  brandContainer: {
    zIndex: 2,
  },
  brandName: {
    fontSize: "42px",
    fontWeight: "300",
    letterSpacing: "4px",
    margin: 0,
    fontFamily: "'Playfair Display', serif",
  },
  brandSpan: {
    fontWeight: "700",
    color: "#e8b4b4",
  },
  divider: {
    width: "60px",
    height: "3px",
    backgroundColor: "#e8b4b4",
    margin: "20px 0",
  },
  tagline: {
    fontSize: "24px",
    fontWeight: "300",
    marginBottom: "16px",
    fontFamily: "'Playfair Display', serif",
  },
  description: {
    fontSize: "14px",
    opacity: 0.8,
    lineHeight: "1.6",
    maxWidth: "80%",
  },
  heroImageContainer: {
    zIndex: 2,
  },
  heroImage: {
    width: "100%",
    height: "300px",
    backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  formCard: {
    width: "520px",
    padding: "48px 40px",
    backgroundColor: "white",
    borderRadius: "24px",
    boxShadow: "0 20px 35px -10px rgba(0,0,0,0.1)",
  },
  formHeader: {
    textAlign: "center",
    marginBottom: "32px",
  },
  formTitle: {
    fontSize: "32px",
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: "8px",
    fontFamily: "'Playfair Display', serif",
  },
  formSubtitle: {
    fontSize: "14px",
    color: "#666",
  },
  errorMessage: {
    backgroundColor: "#fff2f0",
    color: "#ff4d4f",
    padding: "12px 16px",
    borderRadius: "12px",
    marginBottom: "20px",
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "1px solid #ffccc7",
  },
  errorIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "18px",
    height: "18px",
    backgroundColor: "#ff4d4f",
    color: "white",
    borderRadius: "50%",
    fontSize: "12px",
    fontWeight: "bold",
  },
  successMessage: {
    backgroundColor: "#f6ffed",
    color: "#52c41a",
    padding: "12px 16px",
    borderRadius: "12px",
    marginBottom: "20px",
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "1px solid #b7eb8f",
  },
  successIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "18px",
    height: "18px",
    backgroundColor: "#52c41a",
    color: "white",
    borderRadius: "50%",
    fontSize: "12px",
    fontWeight: "bold",
  },
  row: {
    display: "flex",
    gap: "16px",
    marginBottom: "20px",
  },
  halfWidth: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "500",
    color: "#333",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    fontSize: "14px",
    border: "1.5px solid #e8e8e8",
    borderRadius: "12px",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  },
  registerButton: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "8px",
    marginBottom: "20px",
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
  spinner: {
    display: "inline-block",
    width: "18px",
    height: "18px",
    border: "2px solid #fff",
    borderTopColor: "transparent",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
  },
  loginContainer: {
    textAlign: "center",
  },
  loginText: {
    fontSize: "14px",
    color: "#666",
  },
  loginLink: {
    color: "#1a1a2e",
    fontWeight: "600",
    textDecoration: "none",
    marginLeft: "4px",
  },
  termsText: {
    fontSize: "11px",
    color: "#999",
    textAlign: "center",
    marginTop: "24px",
  },
  termsLink: {
    color: "#e8b4b4",
    textDecoration: "none",
  },
};

export default Register;