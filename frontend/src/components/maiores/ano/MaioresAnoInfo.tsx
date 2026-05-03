import PersonLink from "@/components/global/PersonLink"
import Podium from "@/components/global/Podium"
import Table from "@/components/global/Table"
import databaseService from "@/services/databaseService"
import utilityService from '@/services/utilityService'

type Props = {
   maioresAnoData: any[]
}

export default function MaioresAnoInfo(props: Props){
   const podiumPeopleData = props.maioresAnoData.slice(0, 3)
   const podiumPeopleIds = podiumPeopleData.map(p => p.personId)
   const podiumImagesUrls = databaseService.getPeopleAvatarsUrlById(podiumPeopleIds)
   
   return (
      <>
      <Podium podiumImagesUrls={podiumImagesUrls} podiumPeopleData={podiumPeopleData}/>

      <Table 
         headers={['#', 'Nome', 'Pontos Totais', 'Pts. Campeonatos', 'Pts. Recordes', 'Pts. Médias', 'Pts. Singles']}
         rows={props.maioresAnoData.map(personData => [
            personData.position,
            <PersonLink personId={personData.personId} personName={personData.personName}/>,
            utilityService.formatNumber(personData.totalPoints),
            utilityService.formatNumber(personData.championshipPoints),
            utilityService.formatNumber(personData.recordPoints),
            utilityService.formatNumber(personData.averagePoints),
            utilityService.formatNumber(personData.singlePoints)
         ])}
      />
      </>
   )
}