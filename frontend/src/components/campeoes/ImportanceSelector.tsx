'use client'
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {
   baseUrl: string
   selectedName?: string
   usedOptions: string[]
}

const container = `cursor-pointer mb-8 relative text-[18px] w-[161px] z-20`
const selectedText = `bg-vr-black border flex h-[44px] items-center justify-between px-2 rounded-t-[8px]`
const icon = `w-[18px]`
const options = `absolute bg-vr-black border flex flex-col left-0 rounded-b-[8px] top-[44px]`
const option = `px-4 py-3
[&:not(:last-child)]:border-b
hover:bg-vr-yellow hover:text-vr-black`

export default function ImportanceSelector(props: Props){
   const importances = ['Brasileiro', 'Sul-Americano', 'Mundial'].filter(i => props.usedOptions.includes(i))

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
            {props.selectedName && importances.includes(props.selectedName) ? props.selectedName : 'Todos'}

            {isOpen ?
               <ChevronUpIcon className={icon}/>
               :
               <ChevronDownIcon className={icon}/>
            }
         </p>
         
         {isOpen ?
            <div className={options} style={{width: 'inherit'}}>
               <Link className={option} href={`${props.baseUrl}/all`}>
                  Todos
               </Link>
               {importances.map(i => {
                  return(
                     <Link className={option} href={`${props.baseUrl}/${i}`} key={i}>
                        {i}
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