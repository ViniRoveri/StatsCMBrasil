import State from "@/domain/types/State"
import Link from "next/link"

type Props = {
   region: string | State
}

const container = `border flex items-center max-w-[500px] p-4 rounded-[20px] w-full
hover:scale-[104%]`
const image = `w-1/4`
const name = `font-title grow text-[27px] text-center`

export default function RegionaisOptionCard(props: Props){
   const regionName = typeof props.region == 'string' ? props.region : props.region.name
   const regionAbbreviation = typeof props.region == 'string' ? props.region : props.region.abbreviation

   return (
      <Link className={container} href={`/regionais/${regionAbbreviation}/average/333`}>
         <img className={image} src={`/img/regions/${regionAbbreviation}.png`} />

         <p className={name}>{regionName}</p>
      </Link>
   )
}