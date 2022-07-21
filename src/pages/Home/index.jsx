import React from "react";
import Images from "../../assets/index.jsx";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <nav style={{ paddingBlock: "1rem", paddingInline: "2rem" }} className="w-100 d-flex justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <img src={Images.logo} alt="" />
          <div>Logo</div>
        </div>
        <Link style={{ textDecoration: "none" }} to="/login">
          <div style={{ cursor: "pointer", color: "black" }} className="d-flex align-items-center gap-2">
            <img src={Images.user} alt="" />
            <div>Login</div>
          </div>
        </Link>
      </nav>
      <div style={{ height: "100vh" }} className="w-100 d-flex flex-column justify-content-center align-items-center">
        <div className="fs-1">lorem ipsum</div>
        <div style={{ width: "20%", height: "1px", background: "gray", marginBlock: "3rem" }}></div>
        <div className="d-flex gap-5 align-items-center">
          <div style={{ width: "15rem", height: "10rem", border: "1px solid gray" }} className="d-flex align-items-center justify-content-center">
            <img style={{ width: "5rem", height: "5rem" }} src={Images.sample} alt="" />
          </div>
          <div style={{ width: "15rem", height: "10rem", border: "1px solid gray" }} className="d-flex align-items-center justify-content-center">
            <img style={{ width: "5rem", height: "5rem" }} src={Images.sample} alt="" />
          </div>
          <div style={{ width: "15rem", height: "10rem", border: "1px solid gray" }} className="d-flex align-items-center justify-content-center">
            <img style={{ width: "5rem", height: "5rem" }} src={Images.sample} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
