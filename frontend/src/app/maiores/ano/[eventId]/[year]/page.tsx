import EventSelector from "@/components/global/EventSelector";
import GoBackArrow from "@/components/global/GoBackArrow";
import Title from "@/components/global/Title";
import MaioresAnoInfo from "@/components/maiores/ano/MaioresAnoInfo";
import eventsInfos from "@/domain/constants/eventsInfos";
import databaseService from '@/services/databaseService'

type Props = {
   params: { 
      eventId: string
      year: string
   }
}

export default function page(props: Props){
   const selectedYear = props.params.year
   const selectedEventId = props.params.eventId
   const selectedEventName = eventsInfos.find(e => e.id == selectedEventId)?.name

   let maioresAnoData
   if(selectedEventName) maioresAnoData = databaseService.getMaioresAnoByYearAndEvent(selectedYear, selectedEventId)

   return (
      <>
      <div className="max-w-[1000px] mx-auto">
         <GoBackArrow link={`/maiores/ano/${selectedEventId}`} text="Voltar à seleção de ano"/>

         <Title>Maiores do Ano - {selectedYear}</Title>

         <EventSelector baseUrl="/maiores/ano/" extraUrl={`/${selectedYear}`} selectedEventName={selectedEventName}/>
      </div>

      {selectedEventName ?
         <MaioresAnoInfo maioresAnoData={maioresAnoData}/>
      :
         <></>
      }
      </>
   )
}