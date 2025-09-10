import Link from "next/link"
import { redirect } from "next/navigation"

type Props = {
   baseUrl: string
   extraUrl?: string
   selectedType: string
}

const container = `border flex h-[44px] rounded-[18px]`
const option = `flex items-center justify-center px-4`
const selectedOption = `bg-vr-yellow/25`

export default function ResultTypeSelector(props: Props){
   const linkAverage = props.extraUrl ? props.baseUrl + 'average' + props.extraUrl : props.baseUrl + 'average'
   const linkSingle = props.extraUrl ? props.baseUrl + 'single' + props.extraUrl : props.baseUrl + 'single'

   if(props.selectedType != 'average' && props.selectedType != 'single') redirect(linkAverage)

   return (
      <div className={container}>
         <Link className={`${option} ${props.selectedType == 'average' ? selectedOption : ''} border-r rounded-l-[16px]`} href={linkAverage}>Média</Link>

         <Link className={`${option} ${props.selectedType == 'single' ? selectedOption : ''} border-l rounded-r-[16px]`} href={linkSingle}>Single</Link>
      </div>
   )
}