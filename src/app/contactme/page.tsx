import React from 'react'
import { Link } from 'next-view-transitions'

const Contct = () => {
  return (
    <section className="h-screen min-h-screen items-center justify-center flex lg:flex-row md:flex-row flex-col  animate-fadein duration-1000 ">

    <div className=" justify-center items-center text-center flex  flex-col  " >
      <h1 className="lg:text-4xl md:text-3xl text-2xl lg:font-bold animate-floating delay-1000"> Skills </h1>
        <Link href="/">
          <h1 className="text-2xl font-bold tracking-tighter md:text-5xl lg:text-7xl " >
            <span className="bg-gradient-to-r from-pink-500  to-yellow-500 bg-clip-text text-transparent">
              Home
            </span>
          </h1>
        </Link>
        <Link href="/about">
          <h1 className="text-2xl font-bold tracking-tighter md:text-5xl lg:text-7xl " >
            <span className="bg-gradient-to-r from-pink-500  to-yellow-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h1>
        </Link>
        </div>

    </section>
  )
}

export default Contct