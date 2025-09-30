import utilityService from "@/services/utilityService"
import Table from "../global/Table"
import Podium from "../global/Podium"
import PersonLink from "../global/PersonLink"

type Props = {
   rankingRegional: any[]
   isRegiao: boolean
}

export default async function RegionaisInfo(props: Props){
   const podiumPeopleData = props.rankingRegional.slice(0, 3)
   const podiumPeopleIds = podiumPeopleData.map(p => p.personId)
   const podiumImagesUrls = await utilityService.getPersonWcaImageUrlById(podiumPeopleIds)
   
   let headers = ['#', 'Nome', 'Resultado']
   if(props.isRegiao) headers.push('Estado')

   return (
      <>
         <Podium isRegional podiumImagesUrls={podiumImagesUrls} podiumPeopleData={podiumPeopleData}/>
         
         <Table 
            headers={headers}
            rows={props.rankingRegional.map((rank, index) => {
               let row = [
                  index + 1,
                  <PersonLink personId={rank.personId} personName={rank.personName}/>,
                  utilityService.formatTime(rank.result)
               ]
               if(props.isRegiao) row.push(rank.state)

               return row
            })}
         />
      </>
   )
}