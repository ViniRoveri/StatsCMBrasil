import MaiorCampeaoCard from "@/components/campeoes/MaiorCampeaoCard"
import EventSelector from "@/components/global/EventSelector"
import GoBackArrow from "@/components/global/GoBackArrow"
import Title from "@/components/global/Title"
import eventsInfos from "@/domain/constants/eventsInfos"
import apiService from "@/services/apiService"

type Props = {
   params: { eventId: string }
}

const maioresCampeoesInfo = `flex flex-col gap-4 items-center justify-center`

export default async function page(props: Props){
   const maioresCampeoesOfEvent = await apiService.getMaioresCampeoesByEvent(props.params.eventId)
   const selectedEventName = eventsInfos.find(e => e.id == props.params.eventId)?.name

   return (
      <>
      <div className="max-w-[1000px] mx-auto">
         {/* <GoBackArrow link={`/campeoes/${props.params.eventId}/all`} text="Ver campeões por ano"/> */}

         <Title>Maiores Campeões</Title>

         <EventSelector baseUrl="/campeoes/maiores/" selectedEventName={selectedEventName}/>
      </div>

      {selectedEventName ?
         <section className={maioresCampeoesInfo}>
            {maioresCampeoesOfEvent.map((campeaoData: any) => 
               <MaiorCampeaoCard campeaoData={campeaoData} key={campeaoData.personId}/>
            )}
         </section>
         :
         <></>
      }
      </>
   )
}