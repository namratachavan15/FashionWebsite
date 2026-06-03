import { createContext, useContext, useState, useEffect } from "react";

const ColorContext = createContext();

export const useColor = () => useContext(ColorContext);

const API = "http://localhost:8081";

export const ColorProvider = ({ children }) => {

  const [color, setColor] = useState([]);

  const getAllColors = () => {
    fetch(`${API}/color`)
      .then(res => {
        console.log("API RESPONSE:", res);   // ✅ check response
        return res.json();
      })
      .then(data => {
        console.log("COLOR DATA:", data);   // ✅ check data
        setColor(data);
      })
      .catch(err => console.log("ERROR:", err));
  }; // ✅ AUTO LOAD COLORS
  useEffect(() => {
    getAllColors();
  }, []);

  return (
    <ColorContext.Provider value={{ color }}>
      {children}
    </ColorContext.Provider>
  );
};