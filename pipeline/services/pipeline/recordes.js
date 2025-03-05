import fs from 'fs'
import eventsIds from '../../domain/constants/eventsIds.js'

export default function pipelineRecordes(){
   console.log('Starting Recordes pipepline...')

   const wcaExport = JSON.parse(
      fs.readFileSync("./wcaExport.json")
   )

   const people = wcaExport.people
   const peopleIds = people.map(p => p.id)

   const peopleResultsWithRecords = wcaExport.results.filter(r => 
      peopleIds.includes(r.personId) && (r.regionalSingleRecord != 'NULL' || r.regionalAverageRecord != 'NULL')
   )

   let averageRecords = {}
   let singleRecords = {}

   for(let event of eventsIds){
      averageRecords[event] = []
      singleRecords[event] = []
   }
   for(let result of peopleResultsWithRecords){
      const resultComp = wcaExport.competitions.find(c => c.id == result.competitionId)
      result.competitionName = resultComp.name

      const resultPerson = wcaExport.people.find(c => c.id == result.personId)
      result.personName = resultPerson.name
      
      if(result.regionalAverageRecord != 'NULL') averageRecords[result.eventId].push(result)
      if(result.regionalSingleRecord != 'NULL') singleRecords[result.eventId].push(result)
   }

   if(!fs.existsSync('./frontend/src/database/recordes')) fs.mkdirSync('./frontend/src/database/recordes')
   if(!fs.existsSync('./frontend/src/database/recordes/average')) fs.mkdirSync('./frontend/src/database/recordes/average')
   if(!fs.existsSync('./frontend/src/database/recordes/single')) fs.mkdirSync('./frontend/src/database/recordes/single')

   for(let event of eventsIds){
      averageRecords[event].reverse()
      fs.writeFileSync(`./frontend/src/database/recordes/average/${event}.json`, JSON.stringify(averageRecords[event]))

      singleRecords[event].reverse()
      fs.writeFileSync(`./frontend/src/database/recordes/single/${event}.json`, JSON.stringify(singleRecords[event]))
   }
   
   console.log('Recordes pipeline finished sucessfully!')
}