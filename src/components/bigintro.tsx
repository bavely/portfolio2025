"use client";
import React, { useEffect, useState } from "react";

const BigIntro = ({ children }: { children: React.ReactNode }) => {
  const [theBigIntro, setTheBigIntro] = useState(true);

  const handleTimeout = () => {
    setTimeout(() => {
      setTheBigIntro(false);
    }, 1000);
  };

  useEffect(() => {
    handleTimeout();
  }, []);

  return (
    <>
      {theBigIntro ? (
        <div className="h-screen min-h-screen items-center justify-center flex lg:flex-row md:flex-row flex-col  animate-fadein duration-1000 ">

<div className="spinner">
    <div className="spinner1">
      
    </div>
</div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default BigIntro;
