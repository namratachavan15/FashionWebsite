// Profile.jsx - Professional Redesign
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, LogOut, ShoppingBag, Save, ChevronRight, Home } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Profile = () => {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
useLayoutEffect(() => {
  window.scrollTo(0, 0);
}, []);
  useEffect(() => {
    if (user) {
      setData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setMessage({ type: "", text: "" });
  };

  const updateProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.put(`http://localhost:8081/users/${user.id}`, data);
      login("token", res.data);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      console.log(err);
      setMessage({ type: "error", text: "Update failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Get initials for avatar
  const getInitials = () => {
    const first = data.firstName?.charAt(0) || "";
    const last = data.lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "U";
  };

  return (
    <>
      <Header />
      <div className="profile-page">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <button onClick={() => navigate("/")} className="breadcrumb-link">
              <Home size={16} />
              <span>Home</span>
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">My Profile</span>
          </div>

          <div className="profile-header">
            <h1 className="profile-title">My Profile</h1>
            <p className="profile-subtitle">Manage your account information</p>
          </div>

          <div className="profile-grid">
            {/* Left Side - Avatar & Actions */}
            <div className="profile-sidebar">
              <div className="avatar-section">
                <div className="avatar">{getInitials()}</div>
                <h3>{data.firstName} {data.lastName}</h3>
                <p>{data.email}</p>
              </div>
              <div className="sidebar-actions">
                <button className="sidebar-btn active" onClick={() => {}}>
                  <User size={18} />
                  Profile Details
                </button>
                <button className="sidebar-btn" onClick={() => navigate("/orders")}>
                  <ShoppingBag size={18} />
                  Order History
                </button>
                <button className="sidebar-btn logout" onClick={handleLogout}>
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Right Side - Profile Form */}
            <div className="profile-form-card">
              <h2>Account Information</h2>
              <p className="form-subtitle">Update your personal details</p>

              {message.text && (
                <div className={`alert ${message.type}`}>
                  {message.type === "success" ? "✓" : "!"} {message.text}
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <div className="input-icon">
                    <User size={18} />
                    <input
                      name="firstName"
                      value={data.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <div className="input-icon">
                    <User size={18} />
                    <input
                      name="lastName"
                      value={data.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-icon">
                  <Mail size={18} />
                  <input
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>New Password</label>
                <div className="input-icon">
                  <Lock size={18} />
                  <input
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current"
                  />
                </div>
                <p className="password-note">Leave empty if you don't want to change password</p>
              </div>

              <button
                className="update-btn"
                onClick={updateProfile}
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner"></span>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    

      <style jsx>{`
        .profile-page {
          background: var(--bg-light);
          min-height: 100vh;
          padding: 30px 0 60px;
        }
        
        .container-custom {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }
        
        /* Breadcrumb */
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 30px;
          font-size: 13px;
          flex-wrap: wrap;
        }
        
        .breadcrumb-link {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition);
          font-size: 13px;
        }
        
        .breadcrumb-link:hover {
          color: var(--accent);
        }
        
        .breadcrumb-separator {
          color: var(--text-muted);
        }
        
        .breadcrumb-current {
          color: var(--primary-dark);
          font-weight: 600;
        }
        
        /* Header */
        .profile-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .profile-title {
          font-size: 42px;
          font-weight: 600;
          color: var(--primary-dark);
          margin-bottom: 8px;
          font-family: 'Playfair Display', serif;
        }
        
        .profile-subtitle {
          color: var(--text-muted);
          font-size: 14px;
        }
        
        /* Grid Layout */
        .profile-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 40px;
        }
        
        /* Sidebar */
        .profile-sidebar {
          background: white;
          border-radius: 24px;
          padding: 32px 24px;
          box-shadow: var(--shadow-sm);
          height: fit-content;
          position: sticky;
          top: 100px;
        }
        
        .avatar-section {
          text-align: center;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 24px;
        }
        
        .avatar {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--accent) 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          font-size: 36px;
          font-weight: 600;
          color: white;
          font-family: 'Playfair Display', serif;
        }
        
        .avatar-section h3 {
          font-size: 18px;
          margin-bottom: 6px;
          color: var(--text-dark);
        }
        
        .avatar-section p {
          font-size: 13px;
          color: var(--text-muted);
        }
        
        .sidebar-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .sidebar-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: transparent;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: var(--transition);
          font-size: 14px;
          font-weight: 500;
          color: var(--text-muted);
          width: 100%;
          text-align: left;
        }
        
        .sidebar-btn:hover {
          background: var(--accent-light);
          color: var(--accent);
        }
        
        .sidebar-btn.active {
          background: var(--accent-light);
          color: var(--accent);
        }
        
        .sidebar-btn.logout {
          color: #e74c3c;
          margin-top: 8px;
          border-top: 1px solid var(--border-light);
          padding-top: 16px;
        }
        
        .sidebar-btn.logout:hover {
          background: #fee2e2;
          color: #e74c3c;
        }
        
        /* Form Card */
        .profile-form-card {
          background: white;
          border-radius: 24px;
          padding: 32px;
          box-shadow: var(--shadow-sm);
        }
        
        .profile-form-card h2 {
          font-size: 24px;
          margin-bottom: 8px;
          color: var(--primary-dark);
        }
        
        .form-subtitle {
          color: var(--text-muted);
          font-size: 13px;
          margin-bottom: 28px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-light);
        }
        
        /* Alert */
        .alert {
          padding: 14px 16px;
          border-radius: 12px;
          margin-bottom: 24px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .alert.success {
          background: #e8f7ee;
          color: #2e7d32;
        }
        
        .alert.error {
          background: #fee2e2;
          color: #d32f2f;
        }
        
        /* Form Elements */
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        .form-group {
          margin-bottom: 24px;
        }
        
        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 8px;
          color: var(--text-dark);
        }
        
        .input-icon {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .input-icon svg {
          position: absolute;
          left: 14px;
          color: var(--text-muted);
          width: 18px;
          height: 18px;
        }
        
        .input-icon input {
          width: 100%;
          padding: 12px 12px 12px 42px;
          border: 1px solid var(--border-light);
          border-radius: 12px;
          font-size: 14px;
          transition: var(--transition);
          outline: none;
        }
        
        .input-icon input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(212, 165, 165, 0.1);
        }
        
        .password-note {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 6px;
        }
        
        .update-btn {
          width: 100%;
          padding: 14px;
          background: var(--primary-dark);
          color: white;
          border: none;
          border-radius: 40px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 8px;
        }
        
        .update-btn:hover:not(:disabled) {
          background: var(--accent);
          transform: translateY(-2px);
        }
        
        .update-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid white;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* Responsive */
        @media (max-width: 992px) {
          .profile-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .profile-sidebar {
            position: static;
          }
        }
        
        @media (max-width: 768px) {
          .profile-page {
            padding: 20px 0 40px;
          }
          
          .profile-title {
            font-size: 32px;
          }
          
          .profile-form-card {
            padding: 24px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
          
          .avatar {
            width: 80px;
            height: 80px;
            font-size: 28px;
          }
        }
      `}</style>
    </>
  );
};

export default Profile;