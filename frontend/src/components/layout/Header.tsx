'use client'
import Link from "next/link"
import NavBarDesktop from "./header/NavBarDesktop"
import NavBarMobile from "./header/NavBarMobile"
import { useState } from "react"
import { Bars3Icon, HomeIcon, XMarkIcon } from "@heroicons/react/24/outline"

const container = `bg-vr-black border-b h-[65px] sticky top-0 z-50`
const header = `bg-vr-black flex h-full items-center justify-between max-w-[1200px] mx-auto px-6 relative`
const homeIcon = `h-[32px]`
const title = `font-title min-w-[198px] text-[27px]
[&_*]:font-title`
const navbarIcon = `h-[38px]`
const navbars = `relative z-40`

export default function Header(){
   const [navbarIsOpen, setNavbarIsOpen] = useState(false)

   return (
      <>
      <section className={container}>
         <header className={header}>
            <Link href='/' onClick={() => setNavbarIsOpen(false)}>
               <HomeIcon className={homeIcon}/>
            </Link>

            <h1 className={title}>
               Stats <span className="text-vr-green">C</span><span className="text-vr-yellow">M</span> <span className="text-vr-blue">B</span>rasil
            </h1>

            <button onClick={() => setNavbarIsOpen(!navbarIsOpen)} type="button">
               {navbarIsOpen ?
                  <XMarkIcon className={navbarIcon}/>
                  :
                  <Bars3Icon className={navbarIcon}/>
               }
            </button>
         </header>
      </section>
      
      <div className={navbars}>
         <NavBarMobile isOpen={navbarIsOpen} setIsOpen={setNavbarIsOpen}/>
         <NavBarDesktop isOpen={navbarIsOpen} setIsOpen={setNavbarIsOpen}/>
      </div>
      </>
   )
}