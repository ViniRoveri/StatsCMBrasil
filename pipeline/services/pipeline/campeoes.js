import fs from 'fs'
import eventsIds from '../../domain/constants/eventsIds.js'
import championshipTypes from '../../domain/constants/championshipTypes.js'

export default function pipelineCampeoes(){
   console.log('Starting Campeoes pipepline...')

   const wcaExport = JSON.parse(
      fs.readFileSync("./docs/wcaExport.json")
   )

   if(!fs.existsSync('./docs/campeoes')) fs.mkdirSync('./docs/campeoes')
   if(!fs.existsSync('./docs/campeoes/maiores')) fs.mkdirSync('./docs/campeoes/maiores')

   for(let event of eventsIds){
      let campeoesOfEvent = []
      let maioresCampeoesOfEvent = []

      for(let championship of wcaExport.unfilteredChampionships){
         const championshipWinnerResult = wcaExport.results.find(r => r.competitionId == championship.competition_id && r.eventId == event && r.roundTypeId == 'f' && r.pos == '1')

         if(!championshipWinnerResult) continue
         
         const person = wcaExport.people.find(p => p.id == championshipWinnerResult.personId)
         const competition = wcaExport.competitions.find(c => c.id == championshipWinnerResult.competitionId)

         if(!person) continue

         campeoesOfEvent.push({
            competitionName: competition.name,
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

      fs.writeFileSync(`./docs/campeoes/${event}.json`, JSON.stringify(campeoesOfEvent))
      fs.writeFileSync(`./docs/campeoes/maiores/${event}.json`, JSON.stringify(maioresCampeoesOfEvent))
   }

   console.log('Campeoes pipeline finished sucessfully!')
}