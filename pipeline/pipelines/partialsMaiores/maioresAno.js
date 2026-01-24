import eventsIds from '../../domain/constants/eventsIds.js'
import maioresService from '../../services/maioresService.js'
import fs from 'fs'

export default function pipelineMaioresAno(championships, championshipsComps, people, ranksAverage, ranksSingle, peopleResults, competitions, championshipsResults){
   console.log('Initializing MaioresAno update...')

   const today = new Date()
   const currentYear = today.getFullYear()
   const considerLastYear = today.getMonth() == 0 && today.getDate() <= 15
   let yearsToAdd = [String(currentYear)]
   if(considerLastYear) yearsToAdd.push(String(currentYear - 1))
   
   let winnersJson = {}
   if(fs.existsSync("./frontend/src/database/maioresAno/winners.json")){
      winnersJson = JSON.parse(
         fs.readFileSync("./frontend/src/database/maioresAno/winners.json")
      )
   }

   let winners = {}
   for(let year of yearsToAdd){
      const yearChampionshipsIds = championshipsComps.filter(c => c.year == year).map(c => c.id)
      const yearChampionships = championships.filter(c => yearChampionshipsIds.includes(c.competition_id))

      const yearCompetitions = competitions.filter(c => c.year == year)
      const yearCompetitionsIds = yearCompetitions.map(c => c.id)

      const yearResults = championshipsResults.filter(r => yearChampionshipsIds.includes(r.competitionId))
      const yearPeopleResults = peopleResults.filter(r => yearCompetitionsIds.includes(r.competitionId))

      const idsPeopleWithResultThisYear = [...new Set(
         yearPeopleResults.map(r => r.personId)
      )]

      const yearMaioresAnoData = maioresService.getAllMaiores(yearChampionships, ranksAverage, ranksSingle, yearResults, yearPeopleResults, people, idsPeopleWithResultThisYear)

      if(!fs.existsSync('./frontend/src/database/maioresAno')) fs.mkdirSync('./frontend/src/database/maioresAno')
      if(!fs.existsSync(`./frontend/src/database/maioresAno/${year}`)) fs.mkdirSync(`./frontend/src/database/maioresAno/${year}`)

      winners[year] = {}
      for(let event of eventsIds){
         const yearEventResults = yearPeopleResults.filter(r => r.eventId == event)
         yearMaioresAnoData[event] = yearMaioresAnoData[event].filter(m => yearEventResults.some(r => r.personId == m.personId))

         winners[year][event] = yearMaioresAnoData[event][0]

         fs.writeFileSync(`./frontend/src/database/maioresAno/${year}/${event}.json`, JSON.stringify(yearMaioresAnoData[event]))
      }
      winnersJson[year] = winners[year]
   }

   fs.writeFileSync('./frontend/src/database/maioresAno/winners.json', JSON.stringify(winnersJson))
}