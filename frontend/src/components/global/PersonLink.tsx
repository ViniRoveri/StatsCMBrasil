import Link from "next/link";

type Props = {
   personId: string
   personName: string
   styles?: string
}

export default function PersonLink(props: Props){
   return (
      <Link className={`hover:underline ${props.styles ? props.styles : ''}`} href={`https://www.worldcubeassociation.org/persons/${props.personId}`} target="_blank">
         {props.personName}
      </Link>
   )
}