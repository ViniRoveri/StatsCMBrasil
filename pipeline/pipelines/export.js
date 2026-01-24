import fs from 'fs'
import championshipTypes from '../domain/constants/championshipTypes.js'
import eventsIds from '../domain/constants/eventsIds.js'
import rl from 'node:readline'
import peoplesStates from '../domain/constants/peoplesStates.js'
import statesNames from '../domain/constants/statesNames.js'
import statesInfo from '../domain/constants/statesInfo.js'

let championshipsIds = []
let allPeopleIds = []
let resultsCompetitionsIds = []
let latestYearWithResult = 0
let peopleIdsToNotCheckState = peoplesStates.map(p => p.id)
let peopleIdsToAddState = []
let brazilCompsIds = []
let compsWithStates = []
let resultsIds = []
const peopleWithStateAlreadyAdded = [...peopleIdsToNotCheckState]

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
            case 'persons':
               if(row[4] == 'Brazil' && row[3] == '1'){
                  tableJson.push({
                     name: row[0],
                     id: row[2]
                  })

                  allPeopleIds.push(row[2])
               }; break;
            case 'results':
               if(eventsIds.includes(row[6]) && 
                  (allPeopleIds.includes(row[8]) || (championshipsIds.includes(row[4]) && (row[5] == 'f' || row[5] == 'c')))
               ){
                  tableJson.push({
                     id: row[0],
                     pos: row[1],
                     best: row[2],
                     average: row[3],
                     competitionId: row[4],
                     roundTypeId: row[5],
                     eventId: row[6],
                     personId: row[8],
                     regionalSingleRecord: row[10],
                     regionalAverageRecord: row[11],
                  })
   
                  resultsCompetitionsIds.push(row[4])
                  resultsIds.push(row[0])
               }; break;
            case 'competitions':
               if(championshipsIds.includes(row[0]) || resultsCompetitionsIds.includes(row[0])){
                  tableJson.push({
                     id: row[0],
                     name: row[1],
                     year: row[14]
                  })

                  if(resultsCompetitionsIds.includes(row[0]) && Number(row[14]) > latestYearWithResult) latestYearWithResult = Number(row[14])

                  if(row[6] == 'Brazil') brazilCompsIds.push(row[0])

                  const compState = statesNames.find(s => row[5].includes(s))
                  if(compState) compsWithStates.push({id: row[0], state: compState, date: {year: Number(row[14]), month: Number(row[15]), day: Number(row[16])}}) 
               }; break;
            case 'ranks_average':
               if(allPeopleIds.includes(row[1]) && eventsIds.includes(row[2])){
                  tableJson.push({
                     best: row[0],
                     personId: row[1],
                     eventId: row[2],
                     countryRank: row[5]
                  })
               }; break;
            case 'ranks_single':
               if(allPeopleIds.includes(row[1]) && eventsIds.includes(row[2])){
                  tableJson.push({
                     best: row[0],
                     personId: row[1],
                     eventId: row[2],
                     countryRank: row[5]
                  })

                  if(!peopleIdsToNotCheckState.includes(row[1])){
                     peopleIdsToAddState.push(row[1])
                     peopleIdsToNotCheckState.push(row[1])
                  }
               }; break;
         }
      })
      .on('close', () => {
         resolve(tableJson)
      })
   })
}

function createRegionaisData(wcaExport){
   console.log('Starting Regionais logic...')

   let peopleIdsCompetedInBrazil = []
   let peopleWithCompsWithStates = []
   for(let result of wcaExport.results){
      if(brazilCompsIds.includes(result.competitionId) && !peopleIdsCompetedInBrazil.includes(result.personId)) peopleIdsCompetedInBrazil.push(result.personId)

      if(brazilCompsIds.includes(result.competitionId) && !peopleWithStateAlreadyAdded.includes(result.personId) && !peopleWithCompsWithStates.some(p => p.id == result.personId)){
         const compWithState = compsWithStates.find(c => c.id == result.competitionId)
         if(!compWithState) continue

         if(peopleWithCompsWithStates.some(p => p.id == result.personId && !p.compsWithStates.some(c => c.id == compWithState.id))){
            peopleWithCompsWithStates.find(p => p.id == result.personId).compsWithStates.push(compWithState)
         }else peopleWithCompsWithStates.push({id: result.personId, compsWithStates: [compWithState]})
      }
   }

   let newPeopleWithStates = []
   for(let person of peopleWithCompsWithStates){
      const firstCompStateName = person.compsWithStates.sort((a, b) => a.date.year - b.date.year || a.date.month - b.date.month || a.date.day - b.date.day)[0].state
      const personState = statesInfo.find(s => s.name == firstCompStateName).abbreviation

      newPeopleWithStates.push({id: person.id, state: personState})
   }

   const updatedPeoplesStates = new Set(peoplesStates.concat(newPeopleWithStates))
   let peoplesStatesText = 'const peoplesStates = [\n'
   for(let personState of updatedPeoplesStates){
      peoplesStatesText += `\t{ id: '${personState.id}', state: '${personState.state}' },\n`
   }
   peoplesStatesText += ']\n\n'
   peoplesStatesText += 'export default peoplesStates'
   fs.writeFileSync('./pipeline/domain/constants/peoplesStates.js', peoplesStatesText)

   const peopleIdsWithoutState = peopleIdsToAddState.filter(id => !peopleWithCompsWithStates.some(p => p.id == id))

   const peopleIdsUnableToFindState = peopleIdsWithoutState.filter(id => peopleIdsCompetedInBrazil.includes(id))
   let peopleUnableToFindStateText = ''
   for(let id of peopleIdsUnableToFindState){
      peopleUnableToFindStateText += `https://www.worldcubeassociation.org/persons/${id}\n`
   }
   fs.writeFileSync('./regionaisUtils/peopleUnableToFindState.txt', peopleUnableToFindStateText)
   
   const peopleIdsNotCompetedInBrazil = peopleIdsWithoutState.filter(id => !peopleIdsCompetedInBrazil.includes(id))
   let peopleIdsNotCompetedInBrazilText = ''
   for(let id of peopleIdsNotCompetedInBrazil){
      peopleIdsNotCompetedInBrazilText += `https://www.worldcubeassociation.org/persons/${id}\n`
   }
   fs.writeFileSync('./regionaisUtils/peopleNotCompetedInBrazil.txt', peopleIdsNotCompetedInBrazilText)

   console.log('Regionais logic finished sucessfully!')
}

export default async function pipelineExport(){
   console.log('Starting Export pipepline...')

   const wcaExport = {
      unfilteredChampionships: await getTableJson('championships'),
      people: await getTableJson('persons'),
      results: await getTableJson('results'),
      competitions: await getTableJson('competitions'),
      ranksAverage: await getTableJson('ranks_average'),
      ranksSingle: await getTableJson('ranks_single')
   }
   wcaExport.championships = filterChampionships(wcaExport.unfilteredChampionships)
   
   const today = new Date()
   wcaExport.resultsAreComplete = latestYearWithResult >= today.getFullYear()
   fs.writeFileSync('./wcaExport.json', JSON.stringify(wcaExport))

   createRegionaisData(wcaExport)
   
   console.log('Export pipepline finished sucessfully!')
}