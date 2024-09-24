import EventSelector from "@/components/global/EventSelector";
import Title from "@/components/global/Title";
import MaioresAnoInfo from "@/components/maiores/ano/MaioresAnoInfo";
import eventsInfos from "@/domain/constants/eventsInfos";
import apiService from '@/services/apiService'
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Props = {
   params: { 
      eventId: string
      year: string
   }
}

export default async function page(props: Props){
   const selectedYear = props.params.year
   const selectedEventId = props.params.eventId
   const selectedEventName = eventsInfos.find(e => e.id == selectedEventId)?.name

   let maioresAnoData
   if(selectedEventName) maioresAnoData = await apiService.getMaioresAnoByYearAndEvent(selectedYear, selectedEventId)

   return (
      <>
      <div className="max-w-[1000px] mx-auto">
         <Link className="flex items-center mb-4 text-[14px]" href={`/maiores/ano/${selectedEventId}`}>
            <ArrowLeftIcon className="mr-1 w-[18px]"/> Voltar à seleção de ano
         </Link>

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