import utilityService from "@/services/utilityService"

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
            <p className="font-title text-[28px]"></p>

            <p className="font-bold text-[20px]">{props.campeaoData.personName}</p>

            <p className="font-bold">{props.campeaoData.importance}</p>
         </div>
      </div>
   )
}