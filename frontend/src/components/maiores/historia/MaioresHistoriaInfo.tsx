import Podium from "@/components/global/Podium"
import Table from "@/components/global/Table"
import utilityService from '@/services/utilityService'

type Props = {
   maioresHistoriaEventData: any[]
}

export default async function MaioresHistoriaInfo(props: Props){
   const podiumPeopleData = props.maioresHistoriaEventData.slice(0, 3)
   const podiumPeopleIds = podiumPeopleData.map(p => p.personId)
   const podiumImagesUrls = await utilityService.getPersonWcaImageUrlById(podiumPeopleIds)
   
   return (
      <>
      <Podium podiumImagesUrls={podiumImagesUrls} podiumPeopleData={podiumPeopleData}/>

      <Table 
         headers={['#', 'Nome', 'Pontos Totais', 'Pts. Campeonatos', 'Pts. Recordes', 'Pts. Médias', 'Pts. Singles']}
         rows={props.maioresHistoriaEventData.map(personData => [
            personData.position,
            personData.personName,
            personData.totalPoints,
            personData.championshipPoints,
            personData.recordPoints,
            personData.averagePoints,
            personData.singlePoints
         ])}
      />
      </>
   )
}