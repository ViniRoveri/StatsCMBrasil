import Title from "@/components/global/Title";

export default function page(){
   return (
      <section className="max-w-[1000px] mx-auto">
         <div className="mb-12">
            <Title>Regra de Cálculo dos Maiores</Title>
            <p>Os cálculos são os mesmos pros rankings de Maiores da História e Maiores do Ano, só mudando as pessoas qualificadas e os resultados considerados.</p>
            <p>Os pontos são divididos em Pontos de Competições, Pontos de Recordes, Pontos de Médias e Pontos de Singles. Após isso são calculados os Pontos Totais, que vão definir a colocação da pessoa no ranking de Maiores.</p>
         </div>
         
         <div className="mb-8">
            <Title>Qualificados pro ranking</Title>
            <p>São qualificados pro ranking de cada evento aqueles que cumprirem ao menos uma das condições:</p>
            <p>- Está atualmente no top 10 do Brasil de média.</p>
            <p>- Tem um recorde no evento.</p>
            <p>- Esteve em um pódium de alguma competição importante (Brasileiro, Sul-Americano ou Mundial).</p>
            <p>- Já foi finalista de uma competição importante E está atualmente no top 100 de média do Brasil.</p>
         </div>
         
         <div className="mb-8">
            <Title>Pontos de Competições</Title>
            <p>São consideradas apenas competições importantes (Brasileiro, Sul-Americano ou Mundial), e apenas os resultados em finais destas competições.</p>
            <p>Para cada competição são adicionados pontos da seguinte forma:</p>
            <p>- Pontos de colocação: 25 - Colocação final na competição.</p>
            <p>- Bônus de pódium: Para terceiro lugar 2 pontos, para segundo lugar 4 pontos e para campeão 10 pontos.</p>
            <p>- Peso da competição: Para Brasileiro 1 ponto, para Sul-Americano 2 pontos e para Mundial 10 pontos.</p>
            <p>- Formula final: (Pontos de colocação + Bônus de pódium) * Peso da competição</p>
            <p>- Por fim o resultado da formula final é adicionado ao total de Pontos de Competições.</p>
         </div>
         
         <div className="mb-8">
            <Title>Pontos de Recordes</Title>
            <p>São considerados os recordes nacionais, continentais e mundiais no evento.</p>
            <p>Para cada recorde são adicionados pontos da seguinte forma:</p>
            <p>- Pontos de Recordes de Médias e Pontos de Recordes de Singles são somados separadamente.</p>
            <p>- Para recordes nacionais 1 ponto, para continentais 2 pontos e para mundiais 10 pontos.</p>
            <p>- Formula final: (Pontos de Recordes de Médias * 3) + Pontos de Recordes de Singles</p>
            <p>- Por fim o resultado da formula final é adicionado ao total de Pontos de Recordes.</p>
         </div>
         
         <div className="mb-8">
            <Title>Pontos de Médias/Singles</Title>
            <p>Médias e Singles seguem a mesma regra de pontuação, mesmo sendo calculados separadamente.</p>
            <p>É apenas um cálculo por pessoa feito da seguinte forma:</p>
            <p>- Ranking Atual: O ranking que a melhor média/single da pessoa está no ranking do Brasil na WCA.</p>
            <p>- Número no Top 100: A quantidade de médias/singles que a pessoa tem entre as 100 melhores médias/singles já feitas no Brasil.</p>
            <p>- Formula Final: (101 - Ranking Atual) + Número no Top 100</p>
         </div>
         
         <div className="mb-8">
            <Title>Pontuação Total</Title>
            <p>A soma dos pontos de cada pessoa no evento dando os pesos devidos aos aspectos mais importantes.</p>
            <p>Após a aplicação dos seguintes pesos, os valores de cada pontuação são arredondados para o número inteiro mais próximo antes da soma final.</p>
            <p>- Formula Final: (Pontos de Competições * 8) + (Pontos de Recordes * 4) + (Pontos de Médias / 4) + (Pontos de Singles / 8)</p>
         </div>
         
         <div>
            <Title>Maiores da História - Geral</Title>
            <p>Como é calculada a pontuação de cada pessoa na categoria "Geral" dos Maiores da História.</p>
            <p>O peso de cada evento:</p>
            <p>- 3x3: 4 pontos</p>
            <p>- 2x2, 4x4, 5x5 e 3x3 OH: 2.5 pontos</p>
            <p>- 6x6, 7x7, 3x3 BLD: 2 pontos</p>
            <p>- Clock, Megaminx, Pyraminx, Skewb, Square-1: 1.5 pontos</p>
            <p>- 3x3 FM, 4x4 BLD, 5x5 BLD: 1 ponto</p>
            <p>- Formula Final por evento: Pontos da pessoa no ranking do evento * Peso do Evento</p>
            <p>Após a execução desta formula pra todos eventos, os pontos da pessoa em cada evento são somados e o total a classifica no ranking.</p>
         </div>
      </section>
   )
}