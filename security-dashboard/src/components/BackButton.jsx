import React from "react";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  let navigate = useNavigate();
  return (
    <>
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/002/205/875/small/backward-arrow-icon-free-vector.jpg"
        width={50}
        height={50}
        onClick={() => navigate(-1)}
        alt="Back Button"
      />
    </>
  );
};

export default BackButton;
