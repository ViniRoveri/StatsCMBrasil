import { HeartIcon } from "@heroicons/react/24/outline"

const footer = `border-t flex h-[30px] items-center justify-center mt-2 text-[12px]`
const icon = `h-[14px] mx-1`

export default function Footer(){
   return (
      <footer className={footer}>
         Feito com <HeartIcon className={icon}/> by Vini Roveri
      </footer>
   )
}