import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type Props = {
   link: string
   text: string
}

const container = `flex items-center justify-end mb-4 text-[14px]`
const link = `flex items-center
hover:tracking-[1px]`
const icon = `ml-1 w-[18px]`

export default function GoAheadArrow(props: Props){
   return (
      <div className={container}>
         <Link className={link} href={props.link}>
            {props.text} <ArrowUpRightIcon className={icon}/> 
         </Link>
      </div>
   )
}