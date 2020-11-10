import React from "react";
import notfound from "../assets/404.png";
import Logo from "./Logo";

const NotFound: React.FC = () => {
  return (
    <div className="App">
      <Logo />
      <img src={notfound} alt="Not found" />
      Vabandame, antud lehekülge ei leitud.
    </div>
  );
};

export default NotFound;
