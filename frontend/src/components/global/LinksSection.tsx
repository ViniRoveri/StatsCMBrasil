import Link from "next/link"
import Title from "./Title"
import { ArrowUpRightIcon } from "@heroicons/react/16/solid"

type Props = {
   linksList: {text: string, title: string, url: string}[]
   otherTab: boolean
}

const linksItem = `mt-8`
const linksItemTitle = `border-b cursor-pointer flex items-center justify-between
hover:tracking-[1px]`
const linksItemTitleIcon = `h-[20px]`

export default function LinksSection(props: Props){
   return (
      <>
      {props.linksList.map(i =>
         <section className={linksItem} key={i.title}>
            <Link href={i.url} target={props.otherTab ? '_blank' : '_self'}>
               <Title class={linksItemTitle}>
                  - {i.title} <ArrowUpRightIcon className={linksItemTitleIcon}/>
               </Title>
            </Link>

            <p>{i.text}</p>
         </section>
      )}
      </>
   )
}