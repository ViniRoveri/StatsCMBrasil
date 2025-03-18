'use client'
import CompetitorTable from "@/components/calculadoraHeadToHead/CompetitorTable";
import CurrentWinningAverage from "@/components/calculadoraHeadToHead/CurrentWinningAverage";
import { useState } from "react";

export default function page(){
   const [currentWinningAverage, setCurrentWinningAverage] = useState('')

   return (
      <>
      <CurrentWinningAverage setCurrentWinningAverage={setCurrentWinningAverage}/>

      <CompetitorTable competitorIndex={0} currentWinningAvg={currentWinningAverage}/>

      <CompetitorTable competitorIndex={1} currentWinningAvg={currentWinningAverage}/>
      </>
   )
}