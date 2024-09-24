import { ReactNode } from "react"

const h5 = `font-title mb-2 text-[24px]`

type Props = {
   children: ReactNode | string
   class?: string
}

export default function Title(props: Props){
   return (
      <h5 className={`${h5} ${props.class || ''}`}>
         {props.children}
      </h5>
   )
}