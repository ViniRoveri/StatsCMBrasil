'use client'
import eventsInfos from "@/domain/constants/eventsInfos";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {
   baseUrl: string
   extraUrl?: string
   selectedEventName?: string
}

const container = `cursor-pointer mb-8 relative text-[18px] w-[127px] z-20`
const selectedText = `bg-vr-black border flex h-[44px] items-center justify-between px-2 rounded-t-[8px]`
const icon = `w-[18px]`
const options = `absolute bg-vr-black border flex flex-col left-0 rounded-b-[8px] top-[44px]`
const option = `px-4 py-3
[&:not(:last-child)]:border-b
hover:bg-vr-yellow hover:text-vr-black`

export default function EventSelector(props: Props){
   const [isOpen, setIsOpen] = useState(false)
   const containerElement = useRef<HTMLDivElement>(null)

   useEffect(()=>{
      function handleMouseUp(e: MouseEvent){
         if (containerElement.current && !containerElement.current.contains(e.target as Node)){
            setIsOpen(false)
         }
      }
      document.addEventListener('mouseup', handleMouseUp)

      return () => document.removeEventListener('mouseup', handleMouseUp)
   }, [containerElement])

   return (
      <div className={container} ref={containerElement}>
         <p className={`${selectedText} ${isOpen ? 'rounded-b-0' : 'rounded-b-[8px]'}`} onClick={() => setIsOpen(!isOpen)}>
            {props.selectedEventName || '...'}

            {isOpen ?
               <ChevronUpIcon className={icon}/>
               :
               <ChevronDownIcon className={icon}/>
            }
         </p>
         
         {isOpen ?
            <div className={options} style={{width: 'inherit'}}>
               {eventsInfos.map(e => {
                  const linkUrl = props.extraUrl ? props.baseUrl + e.id + props.extraUrl : props.baseUrl + e.id

                  return(
                     <Link className={option} href={linkUrl} key={e.id}>
                        {e.name}
                     </Link>
                  )
               })}
            </div>
         :
            <></>
         }
      </div>
   )
}