import Podium from "@/components/global/Podium"
import Table from "@/components/global/Table"
import utilityService from '@/services/utilityService'
import Link from "next/link"

type Props = {
   maioresAnoData: any[]
}

export default async function MaioresAnoInfo(props: Props){
   const podiumPeopleData = props.maioresAnoData.slice(0, 3)
   const podiumPeopleIds = podiumPeopleData.map(p => p.personId)
   const podiumImagesUrls = await utilityService.getPersonWcaImageUrlById(podiumPeopleIds)
   
   return (
      <>
      <Podium podiumImagesUrls={podiumImagesUrls} podiumPeopleData={podiumPeopleData}/>

      <Table 
         headers={['#', 'Nome', 'Pontos Totais', 'Pts. Campeonatos', 'Pts. Recordes', 'Pts. Médias', 'Pts. Singles']}
         rows={props.maioresAnoData.map(personData => [
            personData.position,
            <Link className="hover:underline" href={`https://www.worldcubeassociation.org/persons/${personData.personId}`} target="_blank">{personData.personName}</Link>,
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