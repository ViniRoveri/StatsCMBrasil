import Link from "next/link"
import NavBarDesktop from "./header/NavBarDesktop"
import NavBarMobile from "./header/NavBarMobile"

const container = `border-b sticky top-0 z-50`
const header = `bg-vr-black flex h-[65px] items-center justify-between max-w-[1200px] mx-auto px-6`
const title = `font-title min-w-[198px] text-[27px]
[&_*]:font-title`

export default function Header(){
   return (
      <section className={container}>
         <header className={header}>
            <Link href='/'>
               <h1 className={title}>
                  Stats <span className="text-vr-green">C</span><span className="text-vr-yellow">M</span> <span className="text-vr-blue">B</span>rasil
               </h1>
            </Link>

            <NavBarMobile/>
            <NavBarDesktop/>
         </header>
      </section>
   )
}