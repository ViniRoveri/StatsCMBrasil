import eventsIds from '../../../domain/constants/eventsIds.js'
import maioresService from '../../maioresService.js'
import fs from 'fs'

export default function pipelineMaioresAno(championships, championshipsComps, people, ranksAverage, ranksSingle, peopleResults, competitions, championshipsResults){
   console.log('Initializing MaioresAno update...')

   const today = new Date()
   const currentYear = today.getFullYear()
   const considerLastYear = today.getMonth() == 0 && today.getDate() <= 15
   let yearsToAdd = [String(currentYear)]
   if(considerLastYear) yearsToAdd.push(String(currentYear - 1))
   
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

      if(!fs.existsSync('./docs/maioresAno')) fs.mkdirSync('./docs/maioresAno')
      if(!fs.existsSync(`./docs/maioresAno/${year}`)) fs.mkdirSync(`./docs/maioresAno/${year}`)

      winners[year] = {}
      for(let event of eventsIds){
         winners[year][event] = yearMaioresAnoData[event][0]

         fs.writeFileSync(`./docs/maioresAno/${year}/${event}.json`, JSON.stringify(yearMaioresAnoData[event]))
      }
   }

   fs.writeFileSync('./docs/maioresAno/winners.json', JSON.stringify(winners))
}