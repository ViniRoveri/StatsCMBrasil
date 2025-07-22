import EventSelector from "@/components/global/EventSelector";
import Title from "@/components/global/Title";
import MaioresHistoriaGeral from "@/components/maiores/historia/MaioresHistoriaIGeral";
import MaioresHistoriaInfo from "@/components/maiores/historia/MaioresHistoriaInfo";
import eventsInfos from "@/domain/constants/eventsInfos";
import databaseService from '@/services/databaseService'

type Props = {
   params: { eventId: string }
}

export default function page(props: Props){
   const selectedEventName = eventsInfos.find(e => e.id == props.params.eventId)?.name
   
   let maioresHistoriaData
   if(props.params.eventId == 'geral') maioresHistoriaData = databaseService.getMaioresHistoriaByEvent('geral')
   else if(selectedEventName) maioresHistoriaData = databaseService.getMaioresHistoriaByEvent(props.params.eventId)

   return (
      <>
      <div className="max-w-[1000px] mx-auto">
         <Title>Maiores da História</Title>

         <EventSelector baseUrl="/maiores/historia/" selectedEventName={props.params.eventId == 'geral' ? 'Geral' : selectedEventName} addGeralOption/>
      </div>

      {selectedEventName ?
         <MaioresHistoriaInfo maioresHistoriaEventData={maioresHistoriaData}/>
      : props.params.eventId == 'geral' ?
         <MaioresHistoriaGeral maioresHistoriaGeralData={maioresHistoriaData}/>
      :
         <></>
      }
      </>
   )
}