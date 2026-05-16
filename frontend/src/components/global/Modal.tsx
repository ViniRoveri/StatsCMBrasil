import { XMarkIcon } from "@heroicons/react/24/outline"
import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react"

type Props = {
   modalData: {
      body: ReactNode
      title: string
   } | null
   setModalData: Dispatch<SetStateAction<{
    title: string;
    body: ReactNode;
   } | null>>
}

const container = `backdrop-blur-md fixed flex h-screen items-center justify-center left-0 top-0 w-screen z-100`
const modal = `bg-vr-black border max-w-[555px] rounded-xl w-[80%]`
const header = `border-b flex h-[40px] items-center justify-between px-4 py-2`
const title = `font-bold grow text-[20px]`
const icon = `cursor-pointer h-full`
const body = `p-4`

export default function Modal(props: Props){
   const refModal = useRef<HTMLDivElement>(null)

   useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
         if (refModal.current && !refModal.current.contains(event.target as Node)) {
            props.setModalData(null)
         }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => {
         document.removeEventListener("mousedown", handleClickOutside)
      }
   }, [refModal])

   if(!props.modalData) return <></>

   return (
      <section className={container}>
         <div className={modal} ref={refModal}>
            <div className={header}>
               <h2 className={title}>{props.modalData.title}</h2>
               <XMarkIcon className={icon} onClick={() => props.setModalData(null)} />
            </div>

            <div className={body}>
               {props.modalData.body}
            </div>
         </div>
      </section>
   )
}