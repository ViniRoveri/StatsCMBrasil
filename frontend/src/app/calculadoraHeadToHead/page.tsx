'use client'
import CalculadoraButtons from "@/components/calculadoraHeadToHead/CalculadoraButtons";
import CompetitorTable from "@/components/calculadoraHeadToHead/CompetitorTable";
import CurrentWinningAverage from "@/components/calculadoraHeadToHead/CurrentWinningAverage";
import Modal from "@/components/global/Modal";
import Title from "@/components/global/Title";
import calculadoraDatabaseService from "@/services/calculadoraDatabaseService";
import { ReactNode, useEffect, useState } from "react";
import $ from 'jquery'

export default function page(){
   const [currentWinningAverage, setCurrentWinningAverage] = useState('')
   const [apiId, setApiId] = useState('')
   const [switchUpdateAverages, setSwitchUpdateAverages] = useState(false)
   const [modalData, setModalData] = useState<{ title: string, body: ReactNode } | null>(null)
   
   const emptyCompetitorCalcs = {
      bpa: '-',
      wpa: '-',
      toWin: '-',
      avg: '-'
   }
   const [competitor1Calcs, setCompetitor1Calcs] = useState(emptyCompetitorCalcs)
   const [competitor2Calcs, setCompetitor2Calcs] = useState(emptyCompetitorCalcs)

   function getCalculadoraData(){
      return {
         competitor1: {
            name: $('#0_name').val(),
            time1: $('#0_1').val(),
            time2: $('#0_2').val(),
            time3: $('#0_3').val(),
            time4: $('#0_4').val(),
            time5: $('#0_5').val(),
            bpa: competitor1Calcs.bpa,
            wpa: competitor1Calcs.wpa,
            toWin: competitor1Calcs.toWin,
            avg: competitor1Calcs.avg,
         },
   
         competitor2: {
            name: $('#1_name').val(),
            time1: $('#1_1').val(),
            time2: $('#1_2').val(),
            time3: $('#1_3').val(),
            time4: $('#1_4').val(),
            time5: $('#1_5').val(),
            bpa: competitor2Calcs.bpa,
            wpa: competitor2Calcs.wpa,
            toWin: competitor2Calcs.toWin,
            avg: competitor2Calcs.avg
         }
      }
   }

   async function updateApi(){
      if(!apiId) return

      const calculadoraData = getCalculadoraData()
      
      const success = await calculadoraDatabaseService.update(apiId, calculadoraData)
      if(!success){
         setModalData({ 
            title: 'Erro ao atualizar a API.', 
            body: 'Ocorreu um erro ao atualizar a API. Tente novamente mais tarde.' 
         })
      }
   }

   function updateAverages(){
      setSwitchUpdateAverages(!switchUpdateAverages)
   }

   useEffect(() => {
      updateApi()
   }, [apiId, competitor1Calcs, competitor2Calcs])

   return (
      <>
      <div className="max-w-[1000px] mb-8 mx-auto">
         <Title>Calculadora de Head to Head</Title>
      </div>

      <CurrentWinningAverage setCurrentWinningAverage={setCurrentWinningAverage} />

      <CompetitorTable competitorCalcs={competitor1Calcs} competitorIndex={0} currentWinningAvg={currentWinningAverage} otherCompetitorCalcs={competitor2Calcs} setCompetitorCalcs={setCompetitor1Calcs} switchUpdateAverages={switchUpdateAverages} updateApi={updateApi}/>

      <CompetitorTable competitorCalcs={competitor2Calcs} competitorIndex={1} currentWinningAvg={currentWinningAverage} otherCompetitorCalcs={competitor1Calcs} setCompetitorCalcs={setCompetitor2Calcs} switchUpdateAverages={switchUpdateAverages} updateApi={updateApi}/>

      <CalculadoraButtons competitor1Calcs={competitor1Calcs} competitor2Calcs={competitor2Calcs} getCalculadoraData={getCalculadoraData} setApiId={setApiId} setModalData={setModalData} updateAverages={updateAverages}/>
      
      <Modal modalData={modalData} setModalData={setModalData}/>
      </>
   )
}