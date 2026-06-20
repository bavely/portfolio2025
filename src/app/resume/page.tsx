"use client";
import React, { useEffect, useState } from "react";
import { loadDoc } from "./action";

const Resume = () => {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setLoading(true);
        const data = await loadDoc();
        setFile(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load resume:", err);
        setError("Failed to load resume. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  return (
    <section className="h-screen min-h-screen w-full items-center justify-center  flex lg:flex-col md:flex-col flex-col animate-fadein duration-1000 z-10 p-5 ">
      {loading && (
        <div className="flex items-center justify-center h-full">
          <p className="text-lg">Loading resume...</p>
        </div>
      )}
      
      {error && (
        <div className="flex items-center justify-center h-full">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      )}
      
      {!loading && !error && file && (
        <embed src={file} width="100%" height="100%" title="Resume PDF" />
      )}
    </section>
  );
};

export default Resume;
