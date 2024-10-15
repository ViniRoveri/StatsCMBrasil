import utilityService from "@/services/utilityService"

type Props = {
   campeaoData: any
}

const container = `border flex max-w-[525px] p-4 rounded-[20px] w-full`
const image = `bg-center bg-cover bg-no-repeat border-[#FFD700] border-2 h-[100px] rounded-full w-[100px]`
const info = `flex flex-col gap-4 grow justify-center px-4 w-min`
const titlesList = `text-[20px]`

export default async function MaiorCampeaoCard(props: Props){
   const personImageUrlArray = await utilityService.getPersonWcaImageUrlById([props.campeaoData.personId])
   const personImageUrl = personImageUrlArray[0]

   return (
      <div className={container}>
         <div className={image} style={{backgroundImage: `url(${personImageUrl})`}}/>

         <div className={info}>
            <p className="font-title text-[28px]">{props.campeaoData.personName}</p>

            <div className={titlesList}>
               <p className="font-bold">{props.campeaoData.worldTitles > 0 ? `${props.campeaoData.worldTitles}x Mundial` : ''}</p>
               <p className="font-bold">{props.campeaoData.continentalTitles > 0 ? `${props.campeaoData.continentalTitles}x Sul-Americano` : ''}</p>
               <p className="font-bold">{props.campeaoData.nationalTitles > 0 ? `${props.campeaoData.nationalTitles}x Brasileiro` : ''}</p>
            </div>
         </div>
      </div>
   )
}