import utilityService from "@/services/utilityService"

type Props = {
   campeaoData: any
   importanceToShow: string
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
               <p className="font-bold">{props.campeaoData.worldTitles.length > 0 && (props.importanceToShow == 'Mundial' || props.importanceToShow == 'Todos') ? 
                  `${props.campeaoData.worldTitles.length}x Mundial (${props.campeaoData.worldTitles.join(", ")})` 
               : ''}</p>

               <p className="font-bold">{props.campeaoData.continentalTitles.length > 0 && (props.importanceToShow == 'Sul-Americano' || props.importanceToShow == 'Todos') ? 
                  `${props.campeaoData.continentalTitles.length}x Sul-Americano (${props.campeaoData.continentalTitles.join(", ")})` 
               : ''}</p>

               <p className="font-bold">{props.campeaoData.nationalTitles.length > 0 && (props.importanceToShow == 'Brasileiro' || props.importanceToShow == 'Todos') ? 
                  `${props.campeaoData.nationalTitles.length}x Brasileiro (${props.campeaoData.nationalTitles.join(", ")})` 
               : ''}</p>
            </div>
         </div>
      </div>
   )
}