import Podium from "@/components/global/Podium"
import Table from "@/components/global/Table"
import eventsInfos from "@/domain/constants/eventsInfos"
import utilityService from '@/services/utilityService'
import Link from "next/link"

type Props = {
   maioresHistoriaGeralData: any[]
}

export default async function MaioresHistoriaGeral(props: Props){
   const podiumPeopleData = props.maioresHistoriaGeralData.slice(0, 3)
   const podiumPeopleIds = podiumPeopleData.map(p => p.personId)
   const podiumImagesUrls = await utilityService.getPersonWcaImageUrlById(podiumPeopleIds)
   
   return (
      <>
      <Podium podiumImagesUrls={podiumImagesUrls} podiumPeopleData={podiumPeopleData}/>

      <Table 
         headers={['#', 'Nome', 'Pontos Totais', ...eventsInfos.map(e => e.name)]}
         rows={props.maioresHistoriaGeralData.map(personData => [
            personData.position,
            <Link className="hover:underline" href={`https://www.worldcubeassociation.org/persons/${personData.personId}`} target="_blank">{personData.personName}</Link>,
            utilityService.formatNumber(personData.totalPoints),
            ...eventsInfos.map(e => personData[e.id] ? utilityService.formatNumber(personData[e.id]) : '0')
         ])}
      />
      </>
   )
}