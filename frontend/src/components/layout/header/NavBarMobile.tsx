import navBarItems from "@/domain/constants/navBarItems"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"

type Props = {
   isOpen: boolean
   setIsOpen: Dispatch<SetStateAction<boolean>>
}

const container = `lg:hidden`
const icon = `h-[40px]`
const nav = `bg-vr-black border-l-4 fixed flex flex-col h-[calc(100vh_-_65px)] items-center left-0 overflow-y-scroll top-[65px] w-screen`
const navBarItem = `cursor-pointer py-5 text-center w-4/5
[&:not(:last-child)]:border-b
hover:tracking-[1px]`

export default function NavBarMobile(props: Props){
   return (
      <div className={container}>
         <button onClick={() => props.setIsOpen(!props.isOpen)} type="button">
            {props.isOpen ?
               <XMarkIcon className={icon}/>
            :
               <Bars3Icon className={icon}/>
            }
         </button>

         <nav className={nav} style={{transform: `${props.isOpen ? 'translateX(0)' : 'translateX(100vw)'}`}}>
            {navBarItems.map(i => 
               <Link className={navBarItem} href={i.url} key={i.text} onClick={() => props.setIsOpen(!props.isOpen)}>{i.text}</Link>
            )}
         </nav>
      </div>
   )
}