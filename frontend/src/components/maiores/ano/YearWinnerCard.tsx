import utilityService from "@/services/utilityService"
import { ArrowUpRightIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

type Props = {
   event: string
   winner: any
   year: string
}

const container = `border flex max-w-[525px] p-4 rounded-[20px] w-full
hover:scale-110`
const image = `bg-center bg-cover bg-no-repeat border-[#FFD700] border-2 h-[100px] rounded-full w-[100px]`
const info = `flex flex-col gap-4 grow justify-center px-4 w-min`
const yearInfo = `flex items-center justify-between`
const personInfo = `flex flex-col gap-1 text-[20px]`

export default async function YearWinnerCard(props: Props){
   const personImageUrlArray = await utilityService.getPersonWcaImageUrlById([props.winner.personId])
   const personImageUrl = personImageUrlArray[0]

   return (
      <Link className={container} href={`/maiores/ano/${props.event}/${props.year}`}>
         <div className={image} style={{backgroundImage: `url(${personImageUrl})`}}/>

         <div className={info}>
            <div className={yearInfo}>
               <p className="font-title text-[28px]">{props.year}</p>

               <ArrowUpRightIcon className="w-[22px]"/>
            </div>

            <div className={personInfo}>
               <p className="font-bold">{props.winner.personName}</p>
               <p>{utilityService.formatNumber(props.winner.totalPoints)} Pontos</p>
            </div>
         </div>
      </Link>
   )
}