import Title from "@/components/global/Title";
import RegionaisOptionsList from "@/components/regionais/RegionaisOptionsList";
import estados from "@/domain/constants/estados";
import regioes from "@/domain/constants/regioes";

const regionaisOptionsLists = `flex flex-col gap-4 items-center justify-center max-w-[1100px] mx-auto`

export default function page(){
   return (
      <>
      <div className="max-w-[1000px] mx-auto">
         <Title>Rankings Regionais</Title>
      </div>

      <section className={regionaisOptionsLists}>
         <RegionaisOptionsList options={regioes} title='Regiões'/>
      
         <RegionaisOptionsList options={estados} title='Estados'/>
      </section>
      </>
   )
}