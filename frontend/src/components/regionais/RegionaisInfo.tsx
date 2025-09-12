import utilityService from "@/services/utilityService"
import Table from "../global/Table"
import Link from "next/link"

type Props = {
   rankingRegional: any[]
   isRegiao: boolean
}

export default function RegionaisInfo(props: Props){
   let headers = ['#', 'Nome', 'Resultado']
   if(props.isRegiao) headers.push('Estado')

   return (
      <Table 
         headers={headers}
         rows={props.rankingRegional.map((rank, index) => {
            let row = [
               index + 1,
               <Link className="hover:underline" href={`https://www.worldcubeassociation.org/persons/${rank.personId}`} target="_blank">{rank.personName}</Link>,
               utilityService.formatTime(rank.result)
            ]
            if(props.isRegiao) row.push(rank.state)

            return row
         })}
      />
   )
}