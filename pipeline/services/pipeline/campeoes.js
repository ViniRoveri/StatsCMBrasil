import fs from 'fs'
import eventsIds from '../../domain/constants/eventsIds.js'
import championshipTypes from '../../domain/constants/championshipTypes.js'
import titleImportances from '../../domain/constants/titleImportances.js'

function compareImportance(a, b){
   if ( a.importance == titleImportances[0] || b.importance == titleImportances[2] ) return 1
   if ( a.importance == titleImportances[2] || b.importance == titleImportances[0] ) return -1
   return 0
}

function compareString(a, b){
   if ( a.personName < b.personName ) return -1
   if ( a.personName > b.personName ) return 1
   return 0
}

export default function pipelineCampeoes(){
   console.log('Starting Campeoes pipepline...')

   const wcaExport = JSON.parse(
      fs.readFileSync("./wcaExport.json")
   )

   if(!fs.existsSync('./frontend/src/database/campeoes')) fs.mkdirSync('./frontend/src/database/campeoes')
   if(!fs.existsSync('./frontend/src/database/campeoes/maiores')) fs.mkdirSync('./frontend/src/database/campeoes/maiores')

   const peopleIds = wcaExport.people.map(p => p.id)

   for(let event of eventsIds){
      let campeoesOfEvent = []
      let maioresCampeoesOfEvent = []

      for(let championship of wcaExport.unfilteredChampionships){
         let championResult

         if(championship.championship_type == championshipTypes[0]){
            const brazillianFinalsResults = wcaExport.results.filter(r => r.competitionId == championship.competition_id && r.eventId == event && (r.roundTypeId == 'f' || r.roundTypeId == 'c') && peopleIds.includes(r.personId))
            if(brazillianFinalsResults.length == 0) continue
            const bestBrazillianResult = brazillianFinalsResults.sort((a, b) => Number(a.pos) - Number(b.pos))[0]
            
            championResult = bestBrazillianResult
         }else{
            const winnerResult = wcaExport.results.find(r => r.competitionId == championship.competition_id && r.eventId == event && (r.roundTypeId == 'f' || r.roundTypeId == 'c') && r.pos == '1')
            if(!winnerResult) continue
            const winnerIsBrazillian = peopleIds.includes(winnerResult.personId)
            if(!winnerIsBrazillian) continue

            championResult = winnerResult
         }

         const competition = wcaExport.competitions.find(c => c.id == championship.competition_id)
         const person = wcaExport.people.find(p => p.id == championResult.personId)

         let campeaoOfEvent = {
            personId: person.id,
            personName: person.name,
            year: competition.year
         }

         if(!maioresCampeoesOfEvent.find(m => m.personId == person.id)){
            maioresCampeoesOfEvent.push({
               personId: person.id,
               personName: person.name,
               worldTitles: [],
               continentalTitles: [],
               nationalTitles: []
            })
         }

         switch(championship.championship_type){
            case championshipTypes[0]:
               campeaoOfEvent.importance = titleImportances[0];
               maioresCampeoesOfEvent.find(m => m.personId == person.id).nationalTitles.push(competition.year);
               break;
            case championshipTypes[1]:
               campeaoOfEvent.importance = titleImportances[1];
               maioresCampeoesOfEvent.find(m => m.personId == person.id).continentalTitles.push(competition.year);
               break;
            case championshipTypes[2]:
               campeaoOfEvent.importance = titleImportances[2];
               maioresCampeoesOfEvent.find(m => m.personId == person.id).worldTitles.push(competition.year);
               break;
         }

         campeoesOfEvent.push(campeaoOfEvent)
      }

      campeoesOfEvent.sort((a, b) => 
         Number(b.year) - Number(a.year)
         || compareImportance(a, b) 
      )
      maioresCampeoesOfEvent.sort((a, b) => 
         b.worldTitles.length - a.worldTitles.length 
         || b.continentalTitles.length - a.continentalTitles.length 
         || b.nationalTitles.length - a.nationalTitles.length
         || compareString(a, b)
      )
      maioresCampeoesOfEvent.forEach(m => {
         m.worldTitles.sort((a, b) => Number(a) - Number(b))
         m.continentalTitles.sort((a, b) => Number(a) - Number(b))
         m.nationalTitles.sort((a, b) => Number(a) - Number(b))
      })

      fs.writeFileSync(`./frontend/src/database/campeoes/${event}.json`, JSON.stringify(campeoesOfEvent))
      fs.writeFileSync(`./frontend/src/database/campeoes/maiores/${event}.json`, JSON.stringify(maioresCampeoesOfEvent))
   }

   console.log('Campeoes pipeline finished sucessfully!')
}