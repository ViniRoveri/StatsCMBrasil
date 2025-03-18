import { Dispatch, SetStateAction } from "react"
import TimeInput from "./TimeInput"
import $ from 'jquery'

type Props = {
   setCurrentWinningAverage: Dispatch<SetStateAction<string>>
}

const container = `flex flex-col items-center mb-8 text-center w-full`
const text = `bg-transparent font-title fw-bold mb-2 text-[22px] w-full`
const inputContainer = `border py-2 rounded-lg text-[20px]`

export default function CurrentWinningAverage(props: Props){
   return (
      <div className={container}>
         <label className={text}>Atual média vencedora:</label>

         <div className={inputContainer}>
            <TimeInput id="currentWinningAverage" onBlur={() =>
               props.setCurrentWinningAverage(
                  $('#currentWinningAverage').val() as string
               )
            } onlyNumbers={true}/>
         </div>
      </div>
   )
}