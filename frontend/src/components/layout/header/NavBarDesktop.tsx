import navBarItems from "@/domain/constants/navBarItems"
import Link from "next/link"

const nav = `hidden items-center justify-between
lg:flex`
const navBarItem = `cursor-pointer px-6 text-center
[&:not(:first-child)]:border-l
hover:tracking-[1px]`

export default function NavBarDesktop(){
   return (
      <nav className={nav}>
         {navBarItems.map(i => 
            <Link className={navBarItem} href={i.url} key={i.text}>{i.text}</Link>
         )}
      </nav>
   )
}