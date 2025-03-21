import { useEffect, useState } from "react";
import Table from "../global/Table";
import TimeInput from "./TimeInput";
import $ from 'jquery'

type Props = {
   competitorIndex: number
   currentWinningAvg: string
}

const tableHeaders = ['1', '2', '3', '4', '5', 'Avg', 'BPA', 'WPA', 'To Win']

const container = `mb-4`
const containerCompetitorName = `max-w-[777px] mx-auto`
const competitorName = `bg-transparent font-title fw-bold mb-4 text-[22px] w-full`

export default function CompetitorTable(props: Props){
   const [avg, setAvg] = useState('-')
   const [bpa, setBpa] = useState('-')
   const [wpa, setWpa] = useState('-')
   const [toWin, setToWin] = useState('-')

   function updateAverages(){
      const timesStrings = [
         $('#' + props.competitorIndex + '_1').val() as string,
         $('#' + props.competitorIndex + '_2').val() as string,
         $('#' + props.competitorIndex + '_3').val() as string,
         $('#' + props.competitorIndex + '_4').val() as string,
         $('#' + props.competitorIndex + '_5').val() as string
      ]

      let times: (number | string)[] = []

      for(let timeString of timesStrings){
         if(!timeString) continue

         if(timeString == 'DNF'){
            times.push(timeString)
         }else{
            const unformattedTime = unformatTime(timeString)
            times.push(unformattedTime)
         }
      }

      if(times.filter(i => i == 'DNF').length >= 2){
         setAvg('DNF')

         setBpa('-')
         setWpa('-')
         setToWin('-')
      }
      else if(times.length == 5){
         updateAvg(times)

         setBpa('-')
         setWpa('-')
         setToWin('-')
      }else if(times.length == 4){
         updateBpa(times)
         updateWpa(times)
         updateToWin(times)

         setAvg('-')
      }else if(times.length == 3){
         updateToWin(times)

         setAvg('-')
         setBpa('-')
         setWpa('-')
      }else{
         setAvg('-')
         setBpa('-')
         setWpa('-')
         setToWin('-')
      }
   }

   function updateAvg(times: (number | string)[]){
      const sortedTimes = sortTimes(times)
      sortedTimes.shift()
      sortedTimes.pop()

      const newAvg = calculateAverage(sortedTimes)

      setAvg(
         formatTime(newAvg)
      )
   }

   function updateBpa(times: (number | string)[]){
      const sortedTimes = sortTimes(times)
      sortedTimes.pop()

      const bpa = calculateAverage(sortedTimes)

      setBpa(
         formatTime(bpa)
      )
   }

   function updateWpa(times: (number | string)[]){
      if(times.includes('DNF')){
         setWpa('DNF')
         return
      }

      const sortedTimes = sortTimes(times)
      sortedTimes.shift()

      const wpa = calculateAverage(sortedTimes)

      setWpa(
         formatTime(wpa)
      )
   }

   function updateToWin(times: (number | string)[]){
      if(!props.currentWinningAvg){
         setToWin('-')
         return
      }

      const unformattedCurrentWinningAverage = unformatTime(props.currentWinningAvg)
      const targetSumString = ((unformattedCurrentWinningAverage - 0.01) * 3).toFixed(2)
      const targetSum = Number(targetSumString)

      const sortedTimes = sortTimes(times)
      let consideredTimes = [...sortedTimes]
      if(times.length == 3){
         consideredTimes.shift()
      }else{
         consideredTimes.shift()
         consideredTimes.pop()
      }

      if(consideredTimes.includes('DNF')){
         setToWin('-')
         return
      }

      let currentSum = 0
      for(let time of consideredTimes){
         if(typeof time == 'string') continue

         currentSum += time
      }

      if(currentSum > targetSum){
         setToWin('N/P')
         return
      }

      const necessaryTimeString = (targetSum - currentSum + 0.01).toFixed(2)
      const necessaryTime = Number(necessaryTimeString)
      if(times.length == 3){
         setToWin(
            formatTime(necessaryTime)
         )
      }else{
         const firstTime = sortedTimes[0]
         const lastTime = sortedTimes[sortedTimes.length - 1]

         if(typeof firstTime != 'string' && necessaryTime < firstTime){
            setToWin('N/P')
         }else if(typeof lastTime != 'string' && necessaryTime >= lastTime){
            setToWin('W')
         }else{
            setToWin(
               formatTime(necessaryTime)
            )
         }
      }
   }

   function calculateAverage(times: (number | string)[]){
      let sum = 0
      for(let time of times){
         if(typeof time == 'string') continue

         sum += time
      }
      const average = (sum / 3)
      
      return average
   }

   function formatTime(time: number){
      const seconds = time.toFixed(2)

      if(time >= 60){
         const minutes = Math.floor(time / 60)
         const leftoverSeconds = time - (60 * minutes)

         return `${minutes}:${leftoverSeconds}`
      }

      return String(seconds)
   }

   function unformatTime(timeString: string){
      const unformattedTime = timeString.replace(':', '').replace('.', '').replace(/^0+/, '')

      let minutes, seconds
      minutes = seconds = 0
      if(unformattedTime.length == 5){
         minutes = Number(unformattedTime[0])
         seconds = Number(unformattedTime.slice(1, 3))

         seconds += 60 * minutes
      }else if(unformattedTime.length > 2){
         seconds = Number(unformattedTime.slice(0, -2))
      }

      const finalTimeString = `${seconds}.${unformattedTime.slice(-2)}`

      return Number(finalTimeString)
   }

   function sortTimes(times: (number | string)[]){
      return [...times].sort((a, b) => {
         if(typeof a == 'string') return 1
         else if(typeof b == 'string') return -1
         else return a - b
      })
   }

   useEffect(()=>{
      updateAverages()
   }, [props.currentWinningAvg])

   return (
      <form autoComplete="off" className={container}>
         <div className={containerCompetitorName}>
            <input className={competitorName} maxLength={50} placeholder='Nome do Competidor'/>
         </div>

         <Table notFixed={true} headers={tableHeaders} rows={[[
            <TimeInput id={props.competitorIndex + '_1'} onBlur={updateAverages} width={57}/>,
            <TimeInput id={props.competitorIndex + '_2'} onBlur={updateAverages} width={57}/>,
            <TimeInput id={props.competitorIndex + '_3'} onBlur={updateAverages} width={57}/>,
            <TimeInput id={props.competitorIndex + '_4'} onBlur={updateAverages} width={57}/>,
            <TimeInput id={props.competitorIndex + '_5'} onBlur={updateAverages} width={57}/>,
            avg,
            bpa,
            wpa,
            toWin
         ]]}/>
      </form>
   )
}