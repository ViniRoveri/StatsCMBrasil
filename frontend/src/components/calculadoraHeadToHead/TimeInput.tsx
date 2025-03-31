import $ from 'jquery'

type Props = {
   id: string
   onBlur: Function

   onlyNumbers?: boolean
   width?: number
}

const input = `bg-transparent text-center w-[57px]`

export default function TimeInput(props: Props){
   function blockNonNumbers(){
      const value = $(`#${props.id}`).val() as string

      if(props.onlyNumbers){
         $(`#${props.id}`).val(
            value.replace(/\D/g, '')
         )
         return
      }

      const startsWithNumber = /^\d/g.test(value)
      const startsWithLetter = /^\D/g.test(value)

      if(startsWithNumber){
         $(`#${props.id}`).val(
            value.replace(/\D/g, '')
         )
      }else if(startsWithLetter){
         const lowercaseValue = value.toLowerCase()

         if(lowercaseValue != 'd' && lowercaseValue != 'dn' && lowercaseValue != 'dnf'){
            $(`#${props.id}`).val(
               value.replace(/.$/g, '')
            )
         }
      }
   }

   function fixInvalidTime(){
      const value = $(`#${props.id}`).val() as string

      if(/\D/g.test(value)){
         $(`#${props.id}`).val('DNF')
         return
      }

      if(!value) {
         $(`#${props.id}`).val('')
         return
      }

      var minutes, seconds
      minutes = seconds = 0

      if(value.length == 5){
         minutes = Number(value[0])
         seconds = Number(value.slice(1, 3))
      }else if (value.length > 2){
         seconds = Number(value.slice(0, -2))
      }

      if(value.length > 2){
         if(seconds >= 60){
            seconds -= 60
            minutes++
         }
      }

      var newValue = ''
      
      if(minutes > 0){
         newValue = `${minutes}:${seconds.toString().padStart(2, '0')}.${value.slice(-2)}`
      }else if (seconds > 0){
         newValue = `${seconds}.${value.slice(-2)}`
      }else{
         newValue = '0.' + value.padStart(2, '0')
      }

      $(`#${props.id}`).val(newValue)
   }

   function removeFormatting(){
      const value = $(`#${props.id}`).val() as string

      $(`#${props.id}`).val(
         value.replace('.', '').replace(':', '').replace(/^0+/, '')
      )
   }

   return (
      <input className={input} id={props.id} maxLength={5} onBlur={() => {
         fixInvalidTime()
         props.onBlur()
      }} onChange={blockNonNumbers} onFocus={removeFormatting} style={{width: props.width ? `${props.width}px` : '100%'}}/>
   )
}