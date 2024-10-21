import CampeaoCard from "@/components/campeoes/CampeaoCard"
import ImportanceSelector from "@/components/campeoes/ImportanceSelector"
import EventSelector from "@/components/global/EventSelector"
import GoAheadArrow from "@/components/global/GoAheadArrow"
import Title from "@/components/global/Title"
import eventsInfos from "@/domain/constants/eventsInfos"
import titleImportances from "@/domain/constants/titleImportances"
import apiService from "@/services/apiService"
import { redirect } from "next/navigation"

type Props = {
   params: { eventId: string, importance: string }
}

const campeoesInfo = `flex flex-col gap-4 items-center justify-center`

export default async function page(props: Props){
   const campeoesOfEvent = await apiService.getCampeoesByEvent(props.params.eventId)
   const selectedEventName = eventsInfos.find(e => e.id == props.params.eventId)?.name
   const usedImportanceOptions = campeoesOfEvent.map((c: any) => c.importance)
   
   let selectedCampeoesOfEvent = campeoesOfEvent
   if(titleImportances.includes(props.params.importance)) selectedCampeoesOfEvent = campeoesOfEvent.filter((c: any) => c.importance == props.params.importance)

   if(!usedImportanceOptions.includes(props.params.importance) && props.params.importance != 'Todos') redirect(`/campeoes/maiores/${props.params.eventId}/Todos`)

   return (
      <>
      <div className="max-w-[1000px] mx-auto">
         <GoAheadArrow link={`/campeoes/maiores/${props.params.eventId}/Todos`} text="Ver maiores campeões"/>

         <Title>Campeões por Ano</Title>

         <div className="flex gap-6 items-center">
            <EventSelector baseUrl="/campeoes/" selectedEventName={selectedEventName} extraUrl={`/${props.params.importance}`}/>

            <ImportanceSelector baseUrl={`/campeoes/${props.params.eventId}`} selectedName={props.params.importance} usedOptions={usedImportanceOptions}/>
         </div>
      </div>

      {selectedEventName ?
         <section className={campeoesInfo}>
            {selectedCampeoesOfEvent.map((campeaoData: any) => 
               <CampeaoCard campeaoData={campeaoData} key={campeaoData.personId}/>
            )}
         </section>
         :
         <></>
      }
      </>
   )
}