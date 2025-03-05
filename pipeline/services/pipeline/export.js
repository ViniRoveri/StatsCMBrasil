import fs from 'fs'
import championshipTypes from '../../domain/constants/championshipTypes.js'
import eventsIds from '../../domain/constants/eventsIds.js'
import rl from 'node:readline'

let championshipsIds = []
let allPeopleIds = []
let resultsCompetitionsIds = []
let peopleInTop1000Ids = []

function filterChampionships(championships){
   let filteredChampionships = []

   const individualChampionshipsIds = [...new Set(championshipsIds)]
   
   for (let id of individualChampionshipsIds) {
      const championshipsWithId = championships.filter(c => c.competition_id == id)

      if (championshipsWithId.length == 1) {
         const selectedChampionship = championshipsWithId[0]
         filteredChampionships.push(selectedChampionship)
      } else {
         let selectedChampionship = championshipsWithId.find(c => c.championship_type == championshipTypes[2])

         if (!selectedChampionship) selectedChampionship = championshipsWithId.find(c => c.championship_type == championshipTypes[1])

         filteredChampionships.push(selectedChampionship)
      }
   }

   return filteredChampionships
}

async function getTableJson(tableName){
   let tableJson = []

   return new Promise(resolve => {
      rl.createInterface({ input: fs.createReadStream(`./database/WCA_export_${tableName}.tsv`) })
      .on('line', line => {
         const row = line.split('\t')
   
         switch(tableName){
            case 'championships':
               if(championshipTypes.includes(row[2])){
                  tableJson.push({
                     competition_id: row[1],
                     championship_type: row[2]
                  })
   
                  championshipsIds.push(row[1])
               }; break;
            case 'Persons':
               if(row[2] == 'Brazil'){
                  tableJson.push({
                     name: row[1],
                     id: row[4] 
                  })
   
                  allPeopleIds.push(row[4])
               }; break;
            case 'Results':
               if(eventsIds.includes(row[1]) && 
                  (allPeopleIds.includes(row[7]) || (championshipsIds.includes(row[0]) && row[2] == 'f'))
               ){
                  tableJson.push({
                     competitionId: row[0],
                     eventId: row[1],
                     roundTypeId: row[2],
                     pos: row[3],
                     best: row[4],
                     average: row[5],
                     personId: row[7],
                     value1: row[9],
                     value2: row[10],
                     value3: row[11],
                     value4: row[12],
                     value5: row[13],
                     regionalSingleRecord: row[14],
                     regionalAverageRecord: row[15]
                  })
   
                  resultsCompetitionsIds.push(row[0])
               }; break;
            case 'Competitions':
               if(championshipsIds.includes(row[0]) || resultsCompetitionsIds.includes(row[0])){
                  tableJson.push({
                     id: row[0],
                     name: row[1],
                     year: row[16]
                  })
               }; break;
            case 'RanksAverage':
               if(allPeopleIds.includes(row[0]) && eventsIds.includes(row[1]) && Number(row[5]) < 1000){
                  tableJson.push({
                     personId: row[0],
                     eventId: row[1],
                     best: row[2],
                     countryRank: row[5]
                  })
   
                  peopleInTop1000Ids.push(row[0])
               }; break;
            case 'RanksSingle':
               if(allPeopleIds.includes(row[0]) && eventsIds.includes(row[1]) && Number(row[5]) < 1000){
                  tableJson.push({
                     personId: row[0],
                     eventId: row[1],
                     best: row[2],
                     countryRank: row[5]
                  })
   
                  peopleInTop1000Ids.push(row[0])
               }; break;
         }
      })
      .on('close', () => {
         resolve(tableJson)
      })
   })
}

export default async function pipelineExport(){
   console.log('Starting Export pipepline...')

   const wcaExport = {
      unfilteredChampionships: await getTableJson('championships'),
      people: await getTableJson('Persons'),
      results: await getTableJson('Results'),
      competitions: await getTableJson('Competitions'),
      ranksAverage: await getTableJson('RanksAverage'),
      ranksSingle: await getTableJson('RanksSingle')
   }
   wcaExport.people = wcaExport.people.filter(p => peopleInTop1000Ids.includes(p.id))
   wcaExport.championships = filterChampionships(wcaExport.unfilteredChampionships)

   fs.writeFileSync('./wcaExport.json', JSON.stringify(wcaExport))

   console.log('Export pipepline finished sucessfully!')
}