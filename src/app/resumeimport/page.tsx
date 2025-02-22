"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { upload } from "./action";

const ResumeImporter = () => {

      const [autorized, setAutorized] = useState(false);
      const [password, setPassword] = useState("");
  const handleFileUpload = async (files: File[]) => {
    if (!files.length) return;

    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await upload(formData);
      console.log("File uploaded successfully:", response);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (password === process.env.NEXT_PUBLIC_PRIVATE) {
              setAutorized(true);
          }else{
              setAutorized(false);
              alert("Sorry, authorized personnel only :).");
          }
      }

  return (
    <section className="h-screen min-h-screen w-full items-center justify-center  flex lg:flex-row md:flex-row flex-col animate-fadein duration-1000 z-10 p-10 ">
        {autorized ? (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>  ) : 
            <div className="flex flex-col  items-center ">
            <form onSubmit={handleSubmit}>
                <input
                className='p-2 '
                type="password"
                placeholder="Password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                />
                <button type="submit">Submit</button>
            </form>
           
            </div>
       }

        </section>
  );
};

export default ResumeImporter;