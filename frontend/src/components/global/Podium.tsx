import PodiumPersonInfo from "./podium/PodiumPersonInfo"

type Props = {
   isRegional?: boolean
   podiumImagesUrls: string[]
   podiumPeopleData: any[]
}

const container = `flex items-center justify-center`
const podium = `grid grid-cols-3 items-end max-w-[555px] mb-8`
const podiumStep = `flex flex-col gap-1 items-center`

export default function Podium(props: Props){
   return (
      <section className={container}>
         <div className={podium}>
            <div className={podiumStep}>
               {props.podiumPeopleData.length > 1 ?
                  <PodiumPersonInfo borderColor="#C0C0C0" isRegional={props.isRegional} personData={props.podiumPeopleData[1]} personImageUrl={props.podiumImagesUrls[1]}/>
               : <></>}
               
               <div className="border-l border-t h-[60px] w-full"/>
            </div>
            
            <div className={`${podiumStep} z-10`}>
               <PodiumPersonInfo borderColor="#FFD700" isRegional={props.isRegional} personData={props.podiumPeopleData[0]} personImageUrl={props.podiumImagesUrls[0]}/>
               <div className="border-l border-r border-t h-[90px] w-full"/>
            </div>
            
            <div className={podiumStep}>
               {props.podiumPeopleData.length > 2 ?
                  <PodiumPersonInfo borderColor="#CD7F32" isRegional={props.isRegional} personData={props.podiumPeopleData[2]} personImageUrl={props.podiumImagesUrls[2]}/>
               : <></>}
               
               <div className="border-r border-t h-[30px] w-full"/>
            </div>         
         </div>
      </section>
   )
}