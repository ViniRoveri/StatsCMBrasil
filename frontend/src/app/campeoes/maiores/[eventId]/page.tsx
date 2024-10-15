import MaiorCampeaoCard from "@/components/campeoes/MaiorCampeaoCard"
import EventSelector from "@/components/global/EventSelector"
import Title from "@/components/global/Title"
import eventsInfos from "@/domain/constants/eventsInfos"
import apiService from "@/services/apiService"

type Props = {
   params: { eventId: string }
}

export default async function page(props: Props){
   const maioresCampeoesOfEvent = await apiService.getMaioresCampeoesByEvent(props.params.eventId)
   const selectedEventName = eventsInfos.find(e => e.id == props.params.eventId)?.name

   return (
      <>
      <div className="max-w-[1000px] mx-auto">
         <Title>Maiores Campeões</Title>

         <EventSelector baseUrl="/campeoes/maiores/" selectedEventName={selectedEventName}/>
      </div>

      {selectedEventName ?
         <section className="flex flex-col gap-4 items-center justify-center">
            {maioresCampeoesOfEvent.map((campeaoData: any) => 
               <MaiorCampeaoCard campeaoData={campeaoData} key={campeaoData.personId}/>
            )}
         </section>
         :
         <></>
      }
      </>
   )
}