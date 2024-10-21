import ImportanceSelector from "@/components/campeoes/ImportanceSelector"
import MaiorCampeaoCard from "@/components/campeoes/MaiorCampeaoCard"
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

const maioresCampeoesInfo = `flex flex-col gap-4 items-center justify-center`

export default async function page(props: Props){
   const maioresCampeoesOfEvent = await apiService.getMaioresCampeoesByEvent(props.params.eventId)
   const selectedEventName = eventsInfos.find(e => e.id == props.params.eventId)?.name

   let selectedMaioresCampeoesOfEvent = maioresCampeoesOfEvent
   if(titleImportances.includes(props.params.importance)){
      selectedMaioresCampeoesOfEvent = maioresCampeoesOfEvent.filter((c: any) => {
         if(props.params.importance == titleImportances[0] && c.nationalTitles.length > 0) return true 
         if(props.params.importance == titleImportances[1] && c.continentalTitles.length > 0) return true 
         if(props.params.importance == titleImportances[2] && c.worldTitles.length > 0) return true
         return false
      })

      selectedMaioresCampeoesOfEvent.forEach((m: any) => {
         if(props.params.importance == titleImportances[0]){ m.continentalTitles = []; m.worldTitles = []; }
         if(props.params.importance == titleImportances[1]){ m.nationalTitles = []; m.worldTitles = []; }
         if(props.params.importance == titleImportances[2]){ m.nationalTitles = []; m.continentalTitles = []; }
      })
   }

   let usedImportanceOptions: string[] = []
   if(maioresCampeoesOfEvent.some((m: any) => m.nationalTitles.length > 0)) usedImportanceOptions.push(titleImportances[0])
   if(maioresCampeoesOfEvent.some((m: any) => m.continentalTitles.length > 0)) usedImportanceOptions.push(titleImportances[1])
   if(maioresCampeoesOfEvent.some((m: any) => m.worldTitles.length > 0)) usedImportanceOptions.push(titleImportances[2])

   if(!usedImportanceOptions.includes(props.params.importance) && props.params.importance != 'Todos') redirect(`/campeoes/maiores/${props.params.eventId}/Todos`)

   return (
      <>
      <div className="max-w-[1000px] mx-auto">
         <GoAheadArrow link={`/campeoes/${props.params.eventId}/Todos`} text="Ver campeões por ano"/>

         <Title>Maiores Campeões</Title>

         <div className="flex gap-6 items-center">
            <EventSelector baseUrl="/campeoes/maiores/" extraUrl={`/${props.params.importance}`} selectedEventName={selectedEventName}/>

            <ImportanceSelector baseUrl={`/campeoes/maiores/${props.params.eventId}`} selectedName={props.params.importance} usedOptions={usedImportanceOptions}/>
         </div>
      </div>

      {selectedEventName ?
         <section className={maioresCampeoesInfo}>
            {selectedMaioresCampeoesOfEvent.map((campeaoData: any) => 
               <MaiorCampeaoCard campeaoData={campeaoData} key={campeaoData.personId}/>
            )}
         </section>
         :
         <></>
      }
      </>
   )
}