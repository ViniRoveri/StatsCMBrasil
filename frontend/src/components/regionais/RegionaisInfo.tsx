import utilityService from "@/services/utilityService"
import Table from "../global/Table"
import Link from "next/link"

type Props = {
   rankingRegional: any[]
}

export default function RegionaisInfo(props: Props){
   return (
      <Table 
         headers={['#', 'Nome', 'Resultado']}
         rows={props.rankingRegional.map((rank, index) => [
            index + 1,
            <Link className="hover:underline" href={`https://www.worldcubeassociation.org/persons/${rank.personId}`} target="_blank">{rank.personName}</Link>,
            utilityService.formatTime(rank.result)
         ])}
      />
   )
}