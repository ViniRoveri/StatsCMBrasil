import EventSelector from "@/components/global/EventSelector";
import Title from "@/components/global/Title";
import MaioresAnoWinnersInfo from "@/components/maiores/ano/MaioresAnoWinnersInfo";
import eventsInfos from "@/domain/constants/eventsInfos";
import databaseService from '@/services/databaseService'

type Props = {
   params: { eventId: string }
}

export default async function page(props: Props){
   const params = await props.params

   const maioresAnoWinners = databaseService.getMaioresAnoWinners()

   const selectedEventName = eventsInfos.find(e => e.id == params.eventId)?.name

   return (
      <>
      <div className="max-w-[1000px] mx-auto">
         <Title>Maiores do Ano</Title>

         <EventSelector baseUrl="/maiores/ano/" selectedEventName={selectedEventName}/>
      </div>

      {selectedEventName ?
         <MaioresAnoWinnersInfo maioresAnoWinners={maioresAnoWinners} eventId={params.eventId}/>
      :
         <></>
      }
      </>
   )
}