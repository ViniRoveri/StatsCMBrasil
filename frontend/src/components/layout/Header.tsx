'use client'
import Link from "next/link"
import NavBarDesktop from "./header/NavBarDesktop"
import NavBarMobile from "./header/NavBarMobile"
import { useState } from "react"

const container = `border-b sticky top-0 z-50`
const header = `bg-vr-black cursor-pointer flex h-[65px] items-center justify-between max-w-[1200px] mx-auto px-6`
const title = `font-title min-w-[198px] text-[27px]
[&_*]:font-title`

export default function Header(){
   const [navbarMobileIsOpen, setNavbarMobileIsOpen] = useState(false)

   return (
      <section className={container}>
         <header className={header}>
            <Link href='/' onClick={() => setNavbarMobileIsOpen(false)}>
               <h1 className={title}>
                  Stats <span className="text-vr-green">C</span><span className="text-vr-yellow">M</span> <span className="text-vr-blue">B</span>rasil
               </h1>
            </Link>

            <NavBarMobile isOpen={navbarMobileIsOpen} setIsOpen={setNavbarMobileIsOpen}/>
            <NavBarDesktop/>
         </header>
      </section>
   )
}