import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type Props = {
   link: string
   text: string
}

const container = `flex items-center mb-4 text-[14px]`
const link = `flex items-center
hover:tracking-[1px]`
const icon = `mr-1 w-[18px]`

export default function GoBackArrow(props: Props){
   return (
      <div className={container}>
         <Link className={link} href={props.link}>
            <ArrowLeftIcon className={icon}/> {props.text}
         </Link>
      </div>
   )
}