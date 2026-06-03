import { createContext, useContext, useState, useEffect } from "react";

const SizeContext = createContext();

export const useSize = () => useContext(SizeContext);

const API = "http://localhost:8081";

export const SizeProvider = ({ children }) => {

  const [size, setsize] = useState([]); 

  const getAllsize = () => {
    fetch(`${API}/size`)
      .then(res => {
        console.log("API RESPONSE:", res);   // ✅ check response
        return res.json();
      })
      .then(data => {
        console.log("SIZE  DATA:", data);   // ✅ check data
        setsize(data);
      })
      .catch(err => console.log("ERROR:", err));
  }; // ✅ AUTO LOAD COLORS
  useEffect(() => {
    getAllsize();
  }, []);

  return (
    <SizeContext.Provider value={{ size }}>
      {children}
    </SizeContext.Provider>
  );
};