import peoplesStates from "../../pipeline/domain/constants/peoplesStates"

export default function abracmComparison(){
   console.log('*** ABRACM COMPARISON ***')

   fetch('https://diogojs.pythonanywhere.com/ranking')
   .then(res => res.json())
   .then(data => {
      let newData = []
      let updateData = []
      const ids = Object.keys(data.competitors)

      for(let id of ids){
         const personData = data.competitors[id]

         const myPersonData = peoplesStates.find(p => p.id == id)

         if(!myPersonData) newData.push({id: id, state: personData.state})
         
         if(myPersonData && myPersonData.state != personData.state) updateData.push({id: id, state: personData.state})
      }

      if(newData.length > 0){
         console.log('* NEW *')
         console.log(newData)
      }

      if(updateData.length > 0){
         console.log('* TO UPDATE *')
         console.log(updateData)
      }

      if(newData.length == 0 && updateData == 0) console.log('* ALL DATA IS SYNCED! *')
   })
}