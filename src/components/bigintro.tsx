"use client";
import React, { useEffect, useState } from "react";

const BigIntro = ({ children }: { children: React.ReactNode }) => {
  const [theBigIntro, setTheBigIntro] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setTheBigIntro(false);
    }, 1000);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <>
      {children}
      {theBigIntro && (
        <div
          className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-white animate-fadein duration-1000 dark:bg-[#020617]"
          aria-hidden="true"
        >
          <div className="spinner">
            <div className="spinner1" />
          </div>
        </div>
      )}
    </>
  );
};

export default BigIntro;
