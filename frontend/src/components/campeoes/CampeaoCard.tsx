import utilityService from "@/services/utilityService"
import PersonLink from "../global/PersonLink"

type Props = {
   campeaoData: any
}

const container = `border flex max-w-[525px] p-4 rounded-[20px] w-full`
const image = `bg-center bg-cover bg-no-repeat border-[#FFD700] border-2 h-[100px] rounded-full w-[100px]`
const info = `flex flex-col gap-4 grow justify-center px-4 w-min`

export default async function CampeaoCard(props: Props){
   const personImageUrlArray = await utilityService.getPersonWcaImageUrlById([props.campeaoData.personId])
   const personImageUrl = personImageUrlArray[0]

   return (
      <div className={container}>
         <div className={image} style={{backgroundImage: `url(${personImageUrl})`}}/>

         <div className={info}>
            <p className="font-title text-[28px]">{props.campeaoData.year}</p>

            <PersonLink personId={props.campeaoData.personId} personName={props.campeaoData.personName} styles='font-bold text-[24px]'/>

            <p className="font-bold">{props.campeaoData.importance}</p>
         </div>
      </div>
   )
}