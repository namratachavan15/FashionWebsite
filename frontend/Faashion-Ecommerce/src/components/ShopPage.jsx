import React, { useState } from 'react';
import { Menu, Search, User, ShoppingBag } from "lucide-react";

function ShopPage() {
  const [open, setOpen] = useState(false);
  return (

      
    <div className="position-relative overflow-hidden" style={{height:'17vh'}}>

{/* SIDEBAR */}
<div
  style={{
    position: "fixed",
    top: 0,
    left: open ? "0" : "-250px",
    width: "250px",
    height: "100%",
    background: "white",
    transition: "0.3s",
    padding: "20px",
    zIndex: 20,
  }}
>

   {/* Close Button */}
<div style={{ display: "flex", justifyContent: "flex-end" }}>
<span
onClick={() => setOpen(false)}
style={{
  fontSize: "22px",
  cursor: "pointer",
  fontWeight: "bold",
}}
>
✕
</span>
</div>
  <h3>Menu</h3>
  <p>Home</p>
  <p>About</p>
  <p>Contact</p>
</div>

{/* NAVBAR (ONLY ONE) */}
<header className="position-absolute top-0 start-0 w-100 bg-white d-flex align-items-center justify-content-between px-4 py-3 z-3">

  {/* Left */}
  <Menu size={20} onClick={() => setOpen(!open)} style={{ cursor: "pointer" }} />

  {/* Center Logo */}
  <h1
    className="position-absolute top-50 start-50 translate-middle m-0"
    style={{ letterSpacing: "6px", fontFamily: "serif", fontSize: "20px" }}
  >
    FASHION
  </h1>

  {/* Right */}
  <div className="d-flex gap-3">
    <Search size={18} />
    <User size={18} />
    <ShoppingBag size={18} />
  </div>
</header>
  
    </div>
  );
}

export default ShopPage;