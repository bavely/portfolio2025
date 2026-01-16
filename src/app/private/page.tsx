"use client"
import React, { useEffect, useState } from 'react'
import {getData} from "./action"
import { Contacts, columns } from "./columns"
import { DataTable } from "./data-table"
import { toast, Toaster } from "sonner"

const Private = () => {
    const [autorized, setAutorized] = useState(false);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Contacts[]>([{
        id: "",
        email: "",
        message: "",
        name: ""
    }]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password === process.env.NEXT_PUBLIC_PRIVATE) {
            setAutorized(true);
            toast.success("Access granted!");
        }else{
            setAutorized(false);
            toast.error("Sorry, authorized personnel only.");
        }
    }

    const handlegetData = async () => {
        setLoading(true);
        try {
            const incomingdata : Contacts[] = await getData();
            setData(incomingdata);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to load contact data");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handlegetData();
    }, []);
  return (
    <>
      <Toaster position="top-center" richColors />
      <section className="h-screen min-h-screen w-full items-center justify-center  flex lg:flex-row md:flex-row flex-col animate-fadein duration-1000 z-10 p-10 ">
          {autorized ? (
                  <div className="container mx-auto py-10  w-full">
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <p className="text-lg">Loading contact data...</p>
                    </div>
                  ) : (
                    <DataTable columns={columns} data={data} />
                  )}
                </div>
          ) : 
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
    </>
  )
}

export default Private