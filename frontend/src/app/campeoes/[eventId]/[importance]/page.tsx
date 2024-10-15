import CampeaoCard from "@/components/campeoes/CampeaoCard"
import ImportanceSelector from "@/components/campeoes/ImportanceSelector"
import EventSelector from "@/components/global/EventSelector"
import GoBackArrow from "@/components/global/GoBackArrow"
import Title from "@/components/global/Title"
import eventsInfos from "@/domain/constants/eventsInfos"
import apiService from "@/services/apiService"

type Props = {
   params: { eventId: string, importance: string }
}

const campeoesInfo = `flex flex-col gap-4 items-center justify-center`

export default async function page(props: Props){
   const campeoesOfEvent = await apiService.getCampeoesByEvent(props.params.eventId)
   const selectedEventName = eventsInfos.find(e => e.id == props.params.eventId)?.name
   
   let selectedCampeoesOfEvent = campeoesOfEvent.filter((c: any) => c.importance == props.params.importance)
   if(selectedCampeoesOfEvent.length == 0) selectedCampeoesOfEvent = campeoesOfEvent

   return (
      <>
      <div className="max-w-[1000px] mx-auto">
         <GoBackArrow link={`/campeoes/maiores/${props.params.eventId}`} text="Ver maiores campeões"/>

         <Title>Maiores Campeões</Title>

         <div className="flex gap-6 items-center">
            <EventSelector baseUrl="/campeoes/" selectedEventName={selectedEventName} extraUrl={`/${props.params.importance}`}/>

            <ImportanceSelector baseUrl={`/campeoes/${props.params.eventId}`} selectedName={props.params.importance} usedOptions={campeoesOfEvent.map((c: any) => c.importance)}/>
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