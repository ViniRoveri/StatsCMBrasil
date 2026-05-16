import { Dispatch, SetStateAction, useEffect } from "react";
import Table from "../global/Table";
import TimeInput from "./TimeInput";
import $ from 'jquery'

type Props = {
   competitorCalcs: any
   competitorIndex: number
   currentWinningAvg: string
   otherCompetitorCalcs: any
   setCompetitorCalcs: Dispatch<SetStateAction<any>>
   switchUpdateAverages: boolean
   updateApi: Function
}

const tableHeaders = ['1', '2', '3', '4', '5', 'Avg', 'BPA', 'WPA', 'To Win']

const container = `mb-4`
const containerCompetitorName = `max-w-[777px] mx-auto`
const competitorName = `bg-transparent font-title mb-4 text-[22px] w-full`

export default function CompetitorTable(props: Props){
   function setCalc(field: string, value: string){
      props.setCompetitorCalcs((prev: any) => {
         return { ...prev, [field]: value }
      })
   }

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
         setCalc('avg', 'DNF')

         setCalc('bpa', '-')
         setCalc('wpa', '-')
         setCalc('toWin', '-')
      }
      else if(times.length == 5){
         updateAvg(times)

         setCalc('bpa', '-')
         setCalc('wpa', '-')
         setCalc('toWin', '-')
      }else if(times.length == 4){
         updateBpa(times)
         updateWpa(times)
         updateToWin(times)

         setCalc('avg', '-')
      }else if(times.length == 3){
         updateToWin(times)

         setCalc('avg', '-')
         setCalc('bpa', '-')
         setCalc('wpa', '-')
      }else{
         setCalc('avg', '-')
         setCalc('bpa', '-')
         setCalc('wpa', '-')
         setCalc('toWin', '-')
      }
   }

   function updateAvg(times: (number | string)[]){
      const sortedTimes = sortTimes(times)
      sortedTimes.shift()
      sortedTimes.pop()

      const newAvg = calculateAverage(sortedTimes)

      setCalc('avg', formatTime(newAvg))
   }

   function updateBpa(times: (number | string)[]){
      const sortedTimes = sortTimes(times)
      sortedTimes.pop()

      const bpa = calculateAverage(sortedTimes)

      setCalc('bpa', formatTime(bpa))
   }

   function updateWpa(times: (number | string)[]){
      if(times.includes('DNF')){
         setCalc('wpa', 'DNF')
         return
      }

      const sortedTimes = sortTimes(times)
      sortedTimes.shift()

      const wpa = calculateAverage(sortedTimes)

      setCalc('wpa', formatTime(wpa))
   }

   function updateToWin(times: (number | string)[]){
      if(!props.currentWinningAvg && props.otherCompetitorCalcs.avg == '-'){
         setCalc('toWin', '-')
         return
      }

      const unformattedCurrentWinningAverage = props.currentWinningAvg ? unformatTime(props.currentWinningAvg) : 0
      const unformattedOtherCompetitorAverage = props.otherCompetitorCalcs.avg != '-' ? unformatTime(props.otherCompetitorCalcs.avg) : 0
      let currentBestAvg
      if(!unformattedCurrentWinningAverage){
         currentBestAvg = unformattedOtherCompetitorAverage
      }else if(!unformattedOtherCompetitorAverage){
         currentBestAvg = unformattedCurrentWinningAverage
      }else if(unformattedCurrentWinningAverage < unformattedOtherCompetitorAverage){
         currentBestAvg = unformattedCurrentWinningAverage
      }else if(unformattedOtherCompetitorAverage < unformattedCurrentWinningAverage){
         currentBestAvg = unformattedOtherCompetitorAverage
      }else{
         currentBestAvg = unformattedCurrentWinningAverage
      }

      
      const targetSumString = ((currentBestAvg - 0.01) * 3).toFixed(2)
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
         setCalc('toWin', '-')
         return
      }

      let currentSum = 0
      for(let time of consideredTimes){
         if(typeof time == 'string') continue

         currentSum += time
      }

      if(times.length == 4 && currentSum > targetSum){
         setCalc('toWin', 'N/P')
         return
      }

      const necessaryTimeString = (targetSum - currentSum + 0.01).toFixed(2)
      const necessaryTime = Number(necessaryTimeString)
      const bestTime = sortedTimes[0]
      const worstTime = sortedTimes[sortedTimes.length - 1]
      if(times.length == 3){
         if(typeof bestTime != 'string' && necessaryTime < bestTime){
            setCalc('toWin', "-")
         }else{
            setCalc('toWin', formatTime(necessaryTime))
         }
      }else{
         if(typeof bestTime != 'string' && necessaryTime < bestTime){
            setCalc('toWin', 'N/P')
         }else if(typeof worstTime != 'string' && necessaryTime >= worstTime){
            setCalc('toWin', 'W')
         }else{
            setCalc('toWin', formatTime(necessaryTime))
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
         return `${minutes}:${leftoverSeconds.toFixed(2).toString().padStart(5, '0')}`
      }

      return seconds.toString()
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

   useEffect(() => {
      updateAverages()
   }, [props.currentWinningAvg, props.otherCompetitorCalcs.avg, props.switchUpdateAverages])

   return (
      <form autoComplete="off" className={container}>
         <div className={containerCompetitorName}>
            <input className={competitorName} id={props.competitorIndex + '_name'} maxLength={50} onBlur={() => props.updateApi()} placeholder='Nome do Competidor'/>
         </div>

         <Table notFixed={true} headers={tableHeaders} rows={[[
            <TimeInput id={props.competitorIndex + '_1'} onBlur={updateAverages} width={57}/>,
            <TimeInput id={props.competitorIndex + '_2'} onBlur={updateAverages} width={57}/>,
            <TimeInput id={props.competitorIndex + '_3'} onBlur={updateAverages} width={57}/>,
            <TimeInput id={props.competitorIndex + '_4'} onBlur={updateAverages} width={57}/>,
            <TimeInput id={props.competitorIndex + '_5'} onBlur={updateAverages} width={57}/>,
            props.competitorCalcs.avg,
            props.competitorCalcs.bpa,
            props.competitorCalcs.wpa,
            props.competitorCalcs.toWin
         ]]}/>
      </form>
   )
}