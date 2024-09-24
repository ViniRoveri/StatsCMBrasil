import fs from 'fs'
import eventsIds from '../../domain/constants/eventsIds.js'

export default async function pipelineRecordes(){
   console.log('Starting Recordes pipepline...')

   const wcaExport = JSON.parse(
      fs.readFileSync("./docs/wcaExport.json")
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

   if(!fs.existsSync('./docs/recordes')) fs.mkdirSync('./docs/recordes')
   if(!fs.existsSync('./docs/recordes/average')) fs.mkdirSync('./docs/recordes/average')
   if(!fs.existsSync('./docs/recordes/single')) fs.mkdirSync('./docs/recordes/single')

   for(let event of eventsIds){
      averageRecords[event].reverse()
      fs.writeFileSync(`./docs/recordes/average/${event}.json`, JSON.stringify(averageRecords[event]))

      singleRecords[event].reverse()
      fs.writeFileSync(`./docs/recordes/single/${event}.json`, JSON.stringify(singleRecords[event]))
   }
   
   console.log('Recordes pipeline finished sucessfully!')
}