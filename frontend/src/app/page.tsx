import LinksSection from "@/components/global/LinksSection";
import Title from "@/components/global/Title";
import homePageItems from "@/domain/constants/homePageItems";

export default function page(){
   return (
      <section className="max-w-[800px] mx-auto">
         <section className="mb-12 text-center">
            <Title class="!text-[30px]">Bem-vindo ao Stats CM Brasil!</Title>

            <p>Este site foi criado para manter viva a memória e história do cubo mágico no Brasil! Trazendo os GOATs de cada categoria, os recordes, rankings, e tudo que seja de curiosidade e estatística sobre nosso esporte!</p>
         </section>

         <LinksSection linksList={homePageItems} otherTab={false}/>
      </section>
   )
}