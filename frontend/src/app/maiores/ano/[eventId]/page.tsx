import EventSelector from "@/components/global/EventSelector";
import Title from "@/components/global/Title";
import MaioresAnoWinnersInfo from "@/components/maiores/ano/MaioresAnoWinnersInfo";
import eventsInfos from "@/domain/constants/eventsInfos";
import apiService from '@/services/apiService'

type Props = {
   params: { eventId: string }
}

export default async function page(props: Props){
   const maioresAnoWinners = await apiService.getMaioresAnoWinners()

   const selectedEventId = props.params.eventId
   const selectedEventName = eventsInfos.find(e => e.id == selectedEventId)?.name

   return (
      <>
      <div className="max-w-[1000px] mx-auto">
         <Title>Maiores do Ano</Title>

         <EventSelector baseUrl="/maiores/ano/" selectedEventName={selectedEventName}/>
      </div>

      {selectedEventName ?
         <MaioresAnoWinnersInfo maioresAnoWinners={maioresAnoWinners} eventId={selectedEventId}/>
      :
         <></>
      }
      </>
   )
}