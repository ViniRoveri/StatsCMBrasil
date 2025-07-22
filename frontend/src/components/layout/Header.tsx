'use client'
import Link from "next/link"
import NavBarDesktop from "./header/NavBarDesktop"
import NavBarMobile from "./header/NavBarMobile"
import { useState } from "react"

const container = `bg-vr-black border-b h-[65px] sticky top-0 z-50`
const header = `cursor-pointer flex h-full items-center justify-between max-w-[1200px] mx-auto px-6`
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