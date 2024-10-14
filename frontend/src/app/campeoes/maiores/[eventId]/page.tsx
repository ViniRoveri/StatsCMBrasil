import MaioresCampeoesInfo from "@/components/campeoes/MaioresCampeoesInfo"
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

         <EventSelector baseUrl="/campeoes/maiores/" selectedEventName={props.params.eventId}/>
      </div>

      {selectedEventName ?
         <MaioresCampeoesInfo maioresCampeoesOfEvent={maioresCampeoesOfEvent}/>
         :
         <></>
      }
      </>
   )
}