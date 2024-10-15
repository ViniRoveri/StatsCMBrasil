import fs from 'fs'
import eventsIds from '../../domain/constants/eventsIds.js'
import championshipTypes from '../../domain/constants/championshipTypes.js'

function compareString(a, b){
   if ( a.personName < b.personName ) return -1
   if ( a.personName > b.personName ) return 1
   return 0
}

export default function pipelineCampeoes(){
   console.log('Starting Campeoes pipepline...')

   const wcaExport = JSON.parse(
      fs.readFileSync("./docs/wcaExport.json")
   )

   if(!fs.existsSync('./docs/campeoes')) fs.mkdirSync('./docs/campeoes')
   if(!fs.existsSync('./docs/campeoes/maiores')) fs.mkdirSync('./docs/campeoes/maiores')

   const peopleIds = wcaExport.people.map(p => p.id)

   for(let event of eventsIds){
      let campeoesOfEvent = []
      let maioresCampeoesOfEvent = []

      for(let championship of wcaExport.unfilteredChampionships){
         let championResult

         if(championship.championship_type == championshipTypes[0]){
            const brazillianFinalsResults = wcaExport.results.filter(r => r.competitionId == championship.competition_id && r.eventId == event && r.roundTypeId == 'f' && peopleIds.includes(r.personId))
            if(brazillianFinalsResults.length == 0) continue
            const bestBrazillianResult = brazillianFinalsResults.sort((a, b) => Number(a.pos) - Number(b.pos))[0]
            
            championResult = bestBrazillianResult
         }else{
            const winnerResult = wcaExport.results.find(r => r.competitionId == championship.competition_id && r.eventId == event && r.roundTypeId == 'f' && r.pos == '1')
            if(!winnerResult) continue
            const winnerIsBrazillian = peopleIds.includes(winnerResult.personId)
            if(!winnerIsBrazillian) continue

            championResult = winnerResult
         }

         const competition = wcaExport.competitions.find(c => c.id == championship.competition_id)
         const person = wcaExport.people.find(p => p.id == championResult.personId)

         campeoesOfEvent.push({
            importance: championship.championship_type,
            personName: person.name,
            year: competition.year,
         })

         if(!maioresCampeoesOfEvent.find(m => m.personId == person.id)){
            maioresCampeoesOfEvent.push({
               personId: person.id,
               personName: person.name,
               worldTitles: 0,
               continentalTitles: 0,
               nationalTitles: 0
            })
         }

         switch(championship.championship_type){
            case championshipTypes[0]:
               maioresCampeoesOfEvent.find(m => m.personId == person.id).nationalTitles += 1;
               break;
            case championshipTypes[1]:
               maioresCampeoesOfEvent.find(m => m.personId == person.id).continentalTitles += 1;
               break;
            case championshipTypes[2]:
               maioresCampeoesOfEvent.find(m => m.personId == person.id).worldTitles += 1;
               break;
         }
      }

      campeoesOfEvent.sort((a, b) => 
         Number(b.year) - Number(a.year)
         || championshipTypes.indexOf(b.importance) - championshipTypes.indexOf(a.importance) 
      )
      maioresCampeoesOfEvent.sort((a, b) => 
         b.worldTitles - a.worldTitles 
         || b.continentalTitles - a.continentalTitles 
         || b.nationalTitles - a.nationalTitles
         || compareString(a, b)
      )

      fs.writeFileSync(`./docs/campeoes/${event}.json`, JSON.stringify(campeoesOfEvent))
      fs.writeFileSync(`./docs/campeoes/maiores/${event}.json`, JSON.stringify(maioresCampeoesOfEvent))
   }

   console.log('Campeoes pipeline finished sucessfully!')
}