import peopleIdsUnableToFindState from "../../pipeline/domain/constants/peopleIdsUnableToFindState.js"
import peoplesStates from "../../pipeline/domain/constants/peoplesStates.js"

export default function unableToFindStateCheck(){
   console.log('*** UNABLE TO FIND STATE CHECK ***')

   let seenIds = []
   let repeatedIds = []
   for(let personId of peopleIdsUnableToFindState){
      if(!personId) continue
      
      if(seenIds.includes(personId)) repeatedIds.push(personId)
      else seenIds.push(personId)
   }
   if(repeatedIds.length > 0){
      console.log('* REPEATED IDS FOUND: *')
      for(let id of repeatedIds) console.log(id)
   }

   const peopleAlreadyHaveState = peoplesStates.filter(p => p.id && peopleIdsUnableToFindState.includes(p.id))
   if(peopleAlreadyHaveState.length > 0){
      console.log('* PEOPLE THAT ALREADY HAVE STATE: *')
      for(let id of peopleAlreadyHaveState.map(p => p.id)) console.log(id)
      return
   }

   console.log('* ALL DATA IS CORRECT! *')
}