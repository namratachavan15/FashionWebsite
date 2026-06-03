import { useNavigate } from "react-router-dom";

const BackHomeButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      style={{
        padding: "10px 20px",
        background: "#000",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        marginBottom: "20px",
      }}
    >
      ← Back To Home
    </button>
  );
};

export default BackHomeButton;