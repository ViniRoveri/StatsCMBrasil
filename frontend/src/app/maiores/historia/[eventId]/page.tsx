import EventSelector from "@/components/global/EventSelector";
import Title from "@/components/global/Title";
import MaioresHistoriaGeral from "@/components/maiores/historia/MaioresHistoriaIGeral";
import MaioresHistoriaInfo from "@/components/maiores/historia/MaioresHistoriaInfo";
import eventsInfos from "@/domain/constants/eventsInfos";
import databaseService from '@/services/databaseService'

type Props = {
   params: Promise<{ 
      eventId: string
   }>
}

export default async function page(props: Props){
   const params = await props.params

   const selectedEventName = eventsInfos.find(e => e.id == params.eventId)?.name
   
   let maioresHistoriaData
   if(params.eventId == 'geral') maioresHistoriaData = databaseService.getMaioresHistoriaByEvent('geral')
   else if(selectedEventName) maioresHistoriaData = databaseService.getMaioresHistoriaByEvent(params.eventId)

   return (
      <>
      <div className="max-w-[1000px] mx-auto">
         <Title>Maiores da História</Title>

         <EventSelector baseUrl="/maiores/historia/" selectedEventName={params.eventId == 'geral' ? 'Geral' : selectedEventName} addGeralOption/>
      </div>

      {selectedEventName ?
         <MaioresHistoriaInfo maioresHistoriaEventData={maioresHistoriaData}/>
      : params.eventId == 'geral' ?
         <MaioresHistoriaGeral maioresHistoriaGeralData={maioresHistoriaData}/>
      :
         <></>
      }
      </>
   )
}