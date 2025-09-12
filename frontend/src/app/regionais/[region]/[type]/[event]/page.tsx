import EventSelector from "@/components/global/EventSelector"
import GoBackArrow from "@/components/global/GoBackArrow"
import ResultTypeSelector from "@/components/global/ResultTypeSelector"
import Title from "@/components/global/Title"
import RegionaisInfo from "@/components/regionais/RegionaisInfo"
import estados from "@/domain/constants/estados"
import eventsInfos from "@/domain/constants/eventsInfos"
import regioes from "@/domain/constants/regioes"
import databaseService from "@/services/databaseService"
import { redirect } from "next/navigation"

type Props = {
   params: Promise<{
      region: string
      type: string
      event: string
   }>
}

export default async function page(props: Props){
   const params = await props.params
   const isRegiao = regioes.includes(params.region)
   const regionName = isRegiao ? params.region : estados.find(e => e.abbreviation == params.region)?.name
   const eventName = eventsInfos.find(e => e.id == params.event)?.name

   if(!regionName || !eventName) redirect('/regionais')

   const rankingRegional: any[] = databaseService.getRankingRegionalByRegionTypeAndEvent(params.region, params.type, params.event)

   return (
      <>
      <div className="max-w-[1000px] mx-auto">
         <GoBackArrow link='/regionais' text="Voltar à seleção de região"/>
         
         <Title>Ranking Regional - {regionName}</Title>

         <div className="flex gap-4">
            <EventSelector baseUrl={`/regionais/${params.region}/${params.type}/`} selectedEventName={eventName}/>
            <ResultTypeSelector baseUrl={`/regionais/${params.region}/`} extraUrl={`/${params.event}`} selectedType={params.type}/>
         </div>
      </div>

      {rankingRegional.length > 0 ?
         <RegionaisInfo isRegiao={isRegiao} rankingRegional={rankingRegional}/>
      :
         <p className="text-center">Ainda não há informações deste evento nesta região.</p>
      }
      </>
   )
}