import EventSelector from "@/components/global/EventSelector";
import ResultTypeSelector from "@/components/global/ResultTypeSelector";
import Title from "@/components/global/Title";
import RecordesInfo from "@/components/recordes/RecordesInfo";
import eventsInfos from "@/domain/constants/eventsInfos";
import databaseService from '@/services/databaseService'

type Props = {
   params: { 
      eventId: string
      type: string
   }
}

export default async function page(props: Props){
   const params = await props.params

   const selectedResultType = params.type
   const selectedEventId = params.eventId
   const selectedEventName = eventsInfos.find(e => e.id == selectedEventId)?.name

   let recordesData
   if(selectedEventName) recordesData = databaseService.getRecordesByTypeAndEvent(selectedResultType, selectedEventId)

   return (
      <>
      <div className="max-w-[1000px] mx-auto">
         <Title>História dos Recordes</Title>

         <div className="flex gap-4">
            <EventSelector baseUrl={`/recordes/${selectedResultType}/`} selectedEventName={selectedEventName}/>
            <ResultTypeSelector baseUrl={`/recordes/`} extraUrl={`/${selectedEventId}`} selectedType={selectedResultType}/>
         </div>
      </div>

      {selectedEventName ?
         <RecordesInfo recordesData={recordesData} type={selectedResultType}/>
      :
         <></>
      }
      </>
   )
}