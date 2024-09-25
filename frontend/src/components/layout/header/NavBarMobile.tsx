'use client'
import navBarItems from "@/domain/constants/navBarItems"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useState } from "react"

const container = `lg:hidden`
const icon = `h-[40px]`
const nav = `bg-vr-black border-l-4 fixed flex flex-col h-[calc(100vh_-_65px)] items-center left-0 overflow-y-scroll top-[65px] w-screen`
const navBarItem = `cursor-pointer py-5 text-center w-4/5
[&:not(:last-child)]:border-b
hover:tracking-[2px]`

export default function NavBarMobile(){
   const [isOpen, setIsOpen] = useState(false)

   return (
      <div className={container}>
         <button onClick={() => setIsOpen(!isOpen)} type="button">
            {isOpen ?
               <XMarkIcon className={icon}/>
            :
               <Bars3Icon className={icon}/>
            }
         </button>

         <nav className={nav} style={{transform: `${isOpen ? 'translateX(0)' : 'translateX(100vw)'}`}}>
            {navBarItems.map(i => 
               <Link className={navBarItem} href={i.url} key={i.text} onClick={() => setIsOpen(!isOpen)}>{i.text}</Link>
            )}
         </nav>
      </div>
   )
}