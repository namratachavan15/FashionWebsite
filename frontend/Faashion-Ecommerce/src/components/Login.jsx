// Login.jsx
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    if (!data.email || !data.password) {
      return "All fields are required";
    }

    if (!/\S+@\S+\.\S+/.test(data.email)) {
      return "Invalid email format";
    }

    return "";
  };

  const handleLogin = async () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8081/users/login",
        data
      );
      
      login("token", res.data);

      setSuccess("Login Successful");
      setError("");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      if (err.response?.data) {
        setError(err.response.data);
      } else {
        setError("Login Failed");
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

<p style={styles.description}>
  Discover premium dresses crafted with elegance, confidence, 
  and timeless modern style for every occasion.
</p>
        </div>
        <div style={styles.heroImageContainer}>
          <div style={styles.heroImage}></div>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div style={styles.rightPanel}>
        <div style={styles.formCard}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>Welcome Back</h2>
            <p style={styles.formSubtitle}>Sign in to continue your fashion journey</p>
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

          {/* FORM FIELDS */}
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
              placeholder="Enter your password"
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.forgotPassword}>
            <a href="#" style={styles.forgotLink}>Forgot Password?</a>
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            style={{
              ...styles.loginButton,
              ...(isLoading && styles.buttonDisabled)
            }}
          >
            {isLoading ? (
              <span style={styles.spinner}></span>
            ) : (
              "Sign In"
            )}
          </button>

          <div style={styles.registerContainer}>
            <p style={styles.registerText}>
              Don't have an account?{" "}
              <Link to="/register" style={styles.registerLink}>
                Create Account
              </Link>
            </p>
          </div>

          {/* DECORATIVE ELEMENTS */}
          <div style={styles.decorativeLine}>
            <span style={styles.line}></span>
            <span style={styles.orText}>Or continue with</span>
            <span style={styles.line}></span>
          </div>

          <div style={styles.socialButtons}>
            <button style={styles.socialBtn}>G</button>
            <button style={styles.socialBtn}>f</button>
            <button style={styles.socialBtn}>in</button>
          </div>
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

  padding: "150px 40px",   // SAME AS REGISTER
  minHeight: "100vh",
  boxSizing: "border-box",

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
  backgroundRepeat: "no-repeat",

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
    width: "480px",
    padding: "48px 40px",
    backgroundColor: "white",
    borderRadius: "24px",
    boxShadow: "0 20px 35px -10px rgba(0,0,0,0.1)",
  },
  formHeader: {
    textAlign: "center",
    marginBottom: "36px",
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
  forgotPassword: {
    textAlign: "right",
    marginBottom: "24px",
  },
  forgotLink: {
    fontSize: "12px",
    color: "#e8b4b4",
    textDecoration: "none",
    fontWeight: "500",
  },
  loginButton: {
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
  registerContainer: {
    textAlign: "center",
  },
  registerText: {
    fontSize: "14px",
    color: "#666",
  },
  registerLink: {
    color: "#1a1a2e",
    fontWeight: "600",
    textDecoration: "none",
    marginLeft: "4px",
  },
  decorativeLine: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    margin: "24px 0",
  },
  line: {
    flex: 1,
    height: "1px",
    backgroundColor: "#e8e8e8",
  },
  orText: {
    fontSize: "12px",
    color: "#999",
  },
  socialButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
  },
  socialBtn: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: "1.5px solid #e8e8e8",
    backgroundColor: "white",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default Login;