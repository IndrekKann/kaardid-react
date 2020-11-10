import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Logo: React.FC = () => {
  return (
    <Link to="/">
      <img src={logo} className="Logo" alt="logo" />
    </Link>
  );
};

export default Logo;
