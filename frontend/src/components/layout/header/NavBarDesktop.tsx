import navBarItems from "@/domain/constants/navBarItems"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"

type Props = {
   isOpen: boolean
   setIsOpen: Dispatch<SetStateAction<boolean>>
}

const nav = `bg-vr-black border-b-4 fixed h-[65px] hidden items-center justify-between left-0 top-0 w-full
lg:flex`
const navBarItem = `h-full py-3 text-center
[&:not(:last-child)_span]:border-r
hover:tracking-[1px]`
const navBarItemText = `flex h-full items-center justify-center px-3`

export default function NavBarDesktop(props: Props){
   return (
      <nav className={nav} style={{transform: `${props.isOpen ? 'translateY(65px)' : 'translateY(0)'}`}}>
         {navBarItems.map(i => 
            <Link className={navBarItem} href={i.url} key={i.text} onClick={() => props.setIsOpen(!props.isOpen)} style={{width: `calc(100vw/${navBarItems.length})`}}>
               <span className={navBarItemText}>
                  {i.text}
               </span>
            </Link>
         )}
      </nav>
   )
}