import State from "@/domain/types/State"
import RegionaisOptionCard from "./RegionaisOptionCard"

type Props = {
   title: string
   options: (string | State)[]
}

const container = `w-full`
const h2 = `font-title mb-2 text-[24px]`
const ul = `flex flex-wrap gap-4 items-center justify-center`

export default function RegionaisOptionsList(props: Props){
   return (
      <section className={container}>
         <h2 className={h2}>- {props.title}</h2>

         <ul className={ul}>
            {props.options.map(option => 
               <RegionaisOptionCard key={typeof option == 'string' ? option : option.abbreviation} region={option}/>
            )}
         </ul>
      </section>
   )
}