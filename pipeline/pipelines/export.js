import fs from 'fs'
import championshipTypes from '../domain/constants/championshipTypes.js'
import eventsIds from '../domain/constants/eventsIds.js'
import rl from 'node:readline'
import peoplesStates from '../domain/constants/peoplesStates.js'
import peopleIdsUnableToFindState from '../domain/constants/peopleIdsUnableToFindState.js'
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
               if(row[4] == 'Brazil' && row[3] == '1'){
                  tableJson.push({
                     name: row[0],
                     id: row[2]
                  })

                  allPeopleIds.push(row[2])
               }; break;
            case 'Results':
               if(eventsIds.includes(row[9]) && 
                  (allPeopleIds.includes(row[12]) || (championshipsIds.includes(row[8]) && (row[10] == 'f' || row[10] == 'c')))
               ){
                  tableJson.push({
                     pos: row[0],
                     best: row[1],
                     average: row[2],
                     value1: row[3],
                     value2: row[4],
                     value3: row[5],
                     value4: row[6],
                     value5: row[7],
                     competitionId: row[8],
                     eventId: row[9],
                     roundTypeId: row[10],
                     personId: row[12],
                     regionalSingleRecord: row[14],
                     regionalAverageRecord: row[15]
                  })
   
                  resultsCompetitionsIds.push(row[8])
               }; break;
            case 'Competitions':
               if(championshipsIds.includes(row[0]) || resultsCompetitionsIds.includes(row[0])){
                  tableJson.push({
                     id: row[0],
                     name: row[1],
                     year: row[16]
                  })

                  if(resultsCompetitionsIds.includes(row[0]) && Number(row[16]) > latestYearWithResult) latestYearWithResult = Number(row[16])

                  if(row[8] == 'Brazil') brazilCompsIds.push(row[0])

                  const compState = statesNames.find(s => row[7].includes(s))
                  if(compState) compsWithStates.push({id: row[0], state: compState}) 
               }; break;
            case 'RanksAverage':
               if(allPeopleIds.includes(row[1]) && eventsIds.includes(row[2])){
                  tableJson.push({
                     best: row[0],
                     personId: row[1],
                     eventId: row[2],
                     countryRank: row[5]
                  })
               }; break;
            case 'RanksSingle':
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

function createRegionaisUtilsFiles(wcaExport){
   console.log('Starting Regionais logic...')

   function sortIdsByRank(ids){
      ids.sort((a, b) => {
         const aBestRankSingle = Math.min(...wcaExport.ranksSingle.filter(r => r.personId == a).map(r => r.countryRank))
         const aBestRankAverage = Math.min(...wcaExport.ranksAverage.filter(r => r.personId == a).map(r => r.countryRank))
         const aBestRank = Math.min(aBestRankSingle, aBestRankAverage)
         
         const bBestRankSingle = Math.min(...wcaExport.ranksSingle.filter(r => r.personId == b).map(r => r.countryRank))
         const bBestRankAverage = Math.min(...wcaExport.ranksAverage.filter(r => r.personId == b).map(r => r.countryRank))
         const bBestRank = Math.min(bBestRankSingle, bBestRankAverage)

         return aBestRank - bBestRank
      })
   }

   let peopleIdsCompetedInBrazil = []
   let peopleWithStatesCompeted = []
   for(let result of wcaExport.results){
      if(brazilCompsIds.includes(result.competitionId) && !peopleIdsCompetedInBrazil.includes(result.personId) && peopleIdsToAddState.includes(result.personId)) {
         peopleIdsCompetedInBrazil.push(result.personId)

         const compWithState = compsWithStates.find(c => c.id == result.competitionId)
         if(compWithState){
            const personWithStates = peopleWithStatesCompeted.find(p => p.id == result.personId)

            if(personWithStates) {
               personWithStates.states.push(compWithState.state)
               personWithStates.comps++
            } else peopleWithStatesCompeted.push({id: result.personId, states: [compWithState.state], comps: 1})
         }
      }
   }
   peopleIdsCompetedInBrazil = peopleIdsCompetedInBrazil.filter(id => !peopleIdsUnableToFindState.includes(id))
   
   let peopleOnlyOneState = peopleWithStatesCompeted.filter(p => p.comps >= 5 && [...new Set(p.states)].length == 1)
   let peopleIdsOnlyOneState = peopleOnlyOneState.map(p => p.id)
   let peopleCompetedOnlyOneStateText = ''
   sortIdsByRank(peopleIdsOnlyOneState)
   for(let personId of peopleIdsOnlyOneState){
      const personState = peopleOnlyOneState.find(p => p.id == personId).states[0]
      peopleCompetedOnlyOneStateText += `{ id: '${personId}', state: '${statesInfo.find(i => i.name == personState).abbreviation}' }\n`
   }
   fs.writeFileSync('./regionaisUtils/peopleCompetedOnlyOneState.txt', peopleCompetedOnlyOneStateText)
   
   let peopleToAddStateText = ''
   peopleIdsCompetedInBrazil = peopleIdsCompetedInBrazil.filter(id => !peopleIdsOnlyOneState.includes(id))
   sortIdsByRank(peopleIdsCompetedInBrazil)
   for(let personId of peopleIdsCompetedInBrazil){
      peopleToAddStateText += `https://www.worldcubeassociation.org/persons/${personId}\n`
   }
   fs.writeFileSync('./regionaisUtils/peopleToAddState.txt', peopleToAddStateText)

   const peopleIdsDidntCompeteInBrazil = peopleIdsToAddState.filter(id => !peopleIdsOnlyOneState.includes(id) && !peopleIdsCompetedInBrazil.includes(id) && !peopleIdsUnableToFindState.includes(id))
   let didntCompeteInBrazilText = ''
   sortIdsByRank(peopleIdsDidntCompeteInBrazil)
   for(let personId of peopleIdsDidntCompeteInBrazil){
      didntCompeteInBrazilText += `https://www.worldcubeassociation.org/persons/${personId}\n`
   }
   fs.writeFileSync('./regionaisUtils/didntCompeteInBrazil.txt', didntCompeteInBrazilText)

   let unableToFindStateText = ''
   sortIdsByRank(peopleIdsUnableToFindState)
   for(let personId of peopleIdsUnableToFindState){
      if(personId) unableToFindStateText += `https://www.worldcubeassociation.org/persons/${personId}\n`
   }
   fs.writeFileSync('./regionaisUtils/unableToFindState.txt', unableToFindStateText)

   console.log('Regionais logic finished sucessfully!')
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
   wcaExport.championships = filterChampionships(wcaExport.unfilteredChampionships)

   const today = new Date()
   wcaExport.resultsAreComplete = latestYearWithResult >= today.getFullYear()

   fs.writeFileSync('./wcaExport.json', JSON.stringify(wcaExport))

   createRegionaisUtilsFiles(wcaExport)
   
   console.log('Export pipepline finished sucessfully!')
}