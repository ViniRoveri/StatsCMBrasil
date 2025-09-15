import peoplesStates from "../../pipeline/domain/constants/peoplesStates"

export default function checkForRepeatedIds(){
   console.log('*** CHECK FOR REPEATED IDS ***')

   let seen = []
   let repeated = []

   for(let person of peoplesStates){
      if(!person.id) continue
      
      if(seen.includes(person.id)) repeated.push(person.id)
      else seen.push(person.id)
   }

   if(repeated.length == 0) console.log('No repeated ids!')
   else {
      console.log('Repeated ids found:')
      for(let id of repeated) console.log(id)
   }
}