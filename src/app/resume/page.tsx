"use client";
import React, { useEffect, useState } from "react";
// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
import { loadDoc } from "./action";


const Resume = () => {
  const [file, setFile] = useState("");

  useEffect(() => {
    loadDoc().then((data) => {
      setFile(data);
    });
  }, []);

  //     setLoading(true);
  //     const buffer = await loadDoc();
  //     Buffer.from(buffer);
  //     // setDoc(<Document >
  //     //     <Page
  //     //       style={{
  //     //         padding: 40,
  //     //         paddingTop: 32,
  //     //       }}
  //     //     >
  //     //       <Text>{buffer}</Text>
  //     //     </Page>
  //     //   </Document>);
  //     setLoading(false);
  //   }

  // useEffect(() => {

  // //   fetchData();
  // }, []);

  return (
    <section className="h-screen min-h-screen w-full items-center justify-center  flex lg:flex-col md:flex-col flex-col animate-fadein duration-1000 z-10 p-5 ">

<embed  src={file} width="100%" height="100%" title="Resume PDF" />

      {/* <div className="w-full h-screen flex justify-center items-center"> */}
        {/* <Worker  workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
          <div className="w-full h-full dark:bg-slate-800 mt-40">
            {file && <Viewer  renderLoader={() => <div>Loading...</div>}  fileUrl={file}  />}
          </div>
        </Worker> */}
      {/* </div> */}
    </section>
  );
};

export default Resume;
