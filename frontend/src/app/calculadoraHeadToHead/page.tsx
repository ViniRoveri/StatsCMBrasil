'use client'
import CalculadoraButtons from "@/components/calculadoraHeadToHead/CalculadoraButtons";
import CompetitorTable from "@/components/calculadoraHeadToHead/CompetitorTable";
import CurrentWinningAverage from "@/components/calculadoraHeadToHead/CurrentWinningAverage";
import Title from "@/components/global/Title";
import { useState } from "react";

export default function page(){
   const [currentWinningAverage, setCurrentWinningAverage] = useState('')
   const [switchUpdateAverages, setSwitchUpdateAverages] = useState(false)

   function updateAverages(){
      setSwitchUpdateAverages(!switchUpdateAverages)
   }

   return (
      <>
      <div className="max-w-[1000px] mb-8 mx-auto">
         <Title>Calculadora de Head to Head</Title>
      </div>

      <CurrentWinningAverage setCurrentWinningAverage={setCurrentWinningAverage}/>

      <CompetitorTable competitorIndex={0} currentWinningAvg={currentWinningAverage} switchUpdateAverages={switchUpdateAverages}/>

      <CompetitorTable competitorIndex={1} currentWinningAvg={currentWinningAverage} switchUpdateAverages={switchUpdateAverages}/>

      <CalculadoraButtons updateAverages={updateAverages}/>
      </>
   )
}