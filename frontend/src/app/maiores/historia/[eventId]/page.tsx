import EventSelector from "@/components/global/EventSelector";
import Title from "@/components/global/Title";
import MaioresHistoriaInfo from "@/components/maiores/historia/MaioresHistoriaInfo";
import eventsInfos from "@/domain/constants/eventsInfos";
import apiService from '@/services/apiService'

type Props = {
   params: { eventId: string }
}

export default async function page(props: Props){
   const selectedEventId = props.params.eventId
   const selectedEventName = eventsInfos.find(e => e.id == selectedEventId)?.name

   let maioresHistoriaData
   if(selectedEventName) maioresHistoriaData = await apiService.getMaioresHistoriaByEvent(selectedEventId)

   return (
      <>
      <div className="max-w-[1000px] mx-auto">
         <Title>Maiores da História</Title>

         <EventSelector baseUrl="/maiores/historia/" selectedEventName={selectedEventName}/>
      </div>

      {selectedEventName ?
         <MaioresHistoriaInfo maioresHistoriaEventData={maioresHistoriaData}/>
      :
         <></>
      }
      </>
   )
}