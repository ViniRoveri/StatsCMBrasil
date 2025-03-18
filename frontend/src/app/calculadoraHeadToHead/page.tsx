'use client'
import CompetitorTable from "@/components/calculadoraHeadToHead/CompetitorTable";
import CurrentWinningAverage from "@/components/calculadoraHeadToHead/CurrentWinningAverage";
import { useState } from "react";

const container = `flex flex-col items-center gap-6 max-w-[888px] mx-auto`

export default function page(){
   const [currentWinningAverage, setCurrentWinningAverage] = useState('')

   return (
      <section className={container}>
         <CurrentWinningAverage setCurrentWinningAverage={setCurrentWinningAverage}/>

         <CompetitorTable competitorIndex={0} currentWinningAvg={currentWinningAverage}/>

         <CompetitorTable competitorIndex={1} currentWinningAvg={currentWinningAverage}/>
      </section>
   )
}