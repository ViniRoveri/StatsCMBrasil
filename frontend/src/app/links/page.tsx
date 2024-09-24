import LinksSection from "@/components/global/LinksSection";
import Title from "@/components/global/Title";
import linksUteisItems from "@/domain/constants/linksUteisItems";

export default function page(){
   return (
      <section className="max-w-[800px] mx-auto">
         <Title>Links Úteis</Title>

         <LinksSection linksList={linksUteisItems} otherTab={true}/>
      </section>
   )
}