import React from "react";
import category1 from "../assets/images/productimage8.jpg";
import category2 from "../assets/images/productimage10.jpg";


const Categories2 = () => {
  

  return (
    <div className="container" style={{marginTop: "50px",
        marginBottom: "50px"}}>

      <div className="row justify-content-center">
        
        {/* Left Card */}
        <div className="col-md-5">
          <div style={{position: "relative",
      overflow: "hidden"}}>
            <img
              src={category1}
              alt="Special Edition"
              style={{width: "100%",
                height: "400px",
                objectFit: "cover"}}
            />
    <div style={{position: "absolute",
      bottom: 0,
      width: "100%",
      backgroundColor: "#8f8776",
      color: "white",
      textAlign: "center",
      padding: "12px 0",
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "18px"}}>Special Edition</div>
          </div>
        </div>

        {/* Right Card */}
        <div className="col-md-5">
          <div style={{position: "relative",
      overflow: "hidden"}}>
            <img
             src={category2}
              alt="Luxury Collection"
              style={{width: "100%",
                height: "400px",
                objectFit: "cover"}}
            />
     <div style={{position: "absolute",
      bottom: 0,
      width: "100%",
      backgroundColor: "#8f8776",
      color: "white",
      textAlign: "center",
      padding: "12px 0",
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "18px"}}>Luxury Collection</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Categories2;