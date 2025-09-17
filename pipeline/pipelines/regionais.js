import fs from 'fs'
import peoplesStates from '../domain/constants/peoplesStates.js'
import eventsIds from '../domain/constants/eventsIds.js'

export default function pipelineRegionais(){
   console.log('Starting Regionais pipepline...')
   
   const wcaExport = JSON.parse(
      fs.readFileSync("./wcaExport.json")
   )

   let regionsData = {}

   for(let person of peoplesStates){
      let personRegion
      switch(person.state){
         case 'RS':
         case 'SC':
         case 'PR':
            personRegion = 'Sul'; break;
         case 'SP':
         case 'RJ':
         case 'MG':
         case 'ES':
            personRegion = 'Sudeste'; break;
         case 'MS':
         case 'MT':
         case 'GO':
         case 'DF':
            personRegion = 'Centro-Oeste'; break;
         case 'BA':
         case 'SE':
         case 'AL':
         case 'PE':
         case 'PB':
         case 'RN':
         case 'CE':
         case 'PI':
         case 'MA':
            personRegion = 'Nordeste'; break;
         case 'TO':
         case 'PA':
         case 'AM':
         case 'RR':
         case 'AM':
         case 'RO':
         case 'AC':
            personRegion = 'Norte'; break
      }

      if(!personRegion) continue

      const personRanksAverage = wcaExport.ranksAverage.filter(r => r.personId == person.id)
      const personRanksSingle = wcaExport.ranksSingle.filter(r => r.personId == person.id)

      if(personRanksAverage.length == 0 && personRanksSingle.length == 0) continue

      if(!regionsData[person.state]) {
         regionsData[person.state] = {
            average: {}, 
            single: {}
         }
      }
      if(!regionsData[personRegion]) {
         regionsData[personRegion] = {
            average: {}, 
            single: {}
         }
      }

      for(let rank of personRanksAverage){
         let obj = {
            personId: person.id,
            personName: wcaExport.people.find(p => p.id == person.id).name,
            result: rank.best,
            state: person.state
         }

         if(!regionsData[person.state].average[rank.eventId]) regionsData[person.state].average[rank.eventId] = []
         if(!regionsData[personRegion].average[rank.eventId]) regionsData[personRegion].average[rank.eventId] = []

         regionsData[person.state].average[rank.eventId].push(obj)
         regionsData[personRegion].average[rank.eventId].push(obj)
      }
      
      for(let rank of personRanksSingle){
         let obj = {
            personId: person.id,
            personName: wcaExport.people.find(p => p.id == person.id).name,
            result: rank.best,
            state: person.state
         }

         if(!regionsData[person.state].single[rank.eventId]) regionsData[person.state].single[rank.eventId] = []
         if(!regionsData[personRegion].single[rank.eventId]) regionsData[personRegion].single[rank.eventId] = []

         regionsData[person.state].single[rank.eventId].push(obj)
         regionsData[personRegion].single[rank.eventId].push(obj)
      }
   }

   if(fs.existsSync('./frontend/src/database/regionais')) fs.rmSync('./frontend/src/database/regionais', { recursive: true })
   fs.mkdirSync('./frontend/src/database/regionais')

   const regions = Object.keys(regionsData)
   for(let region of regions){
      const regionData = regionsData[region]

      fs.mkdirSync(`./frontend/src/database/regionais/${region}`)
      fs.mkdirSync(`./frontend/src/database/regionais/${region}/average`)
      fs.mkdirSync(`./frontend/src/database/regionais/${region}/single`)

      for(let event of eventsIds){
         const eventAverageData = regionData.average[event]
         if(eventAverageData){
            eventAverageData.sort((a, b) => Number(a.result) - Number(b.result))
            fs.writeFileSync(`./frontend/src/database/regionais/${region}/average/${event}.json`, JSON.stringify(eventAverageData))
         }
         
         const eventSingleData = regionData.single[event]
         if(eventSingleData){
            eventSingleData.sort((a, b) => Number(a.result) - Number(b.result))
            fs.writeFileSync(`./frontend/src/database/regionais/${region}/single/${event}.json`, JSON.stringify(eventSingleData))
         }
      }
   }

   console.log('Regionais pipeline finished sucessfully!')
}