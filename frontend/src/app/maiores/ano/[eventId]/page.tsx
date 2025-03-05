import EventSelector from "@/components/global/EventSelector";
import Title from "@/components/global/Title";
import MaioresAnoWinnersInfo from "@/components/maiores/ano/MaioresAnoWinnersInfo";
import eventsInfos from "@/domain/constants/eventsInfos";
import databaseService from '@/services/databaseService'

type Props = {
   params: { eventId: string }
}

export default function page(props: Props){
   const maioresAnoWinners = databaseService.getMaioresAnoWinners()

   const selectedEventName = eventsInfos.find(e => e.id == props.params.eventId)?.name

   return (
      <>
      <div className="max-w-[1000px] mx-auto">
         <Title>Maiores do Ano</Title>

         <EventSelector baseUrl="/maiores/ano/" selectedEventName={selectedEventName}/>
      </div>

      {selectedEventName ?
         <MaioresAnoWinnersInfo maioresAnoWinners={maioresAnoWinners} eventId={props.params.eventId}/>
      :
         <></>
      }
      </>
   )
}