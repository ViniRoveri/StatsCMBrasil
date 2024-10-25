import championshipTypes from "../domain/constants/championshipTypes.js"
import eventsIds from "../domain/constants/eventsIds.js"
import recordTypes from '../domain/constants/recordTypes.js'

const maioresService = {
   calculateAveragePoints(personId, ranksAverage, top100AveragesResultsOat){
      const currentAverageRanking = ranksAverage.find(r => r.personId == personId).countryRank

      const numberInTop100 = top100AveragesResultsOat.filter(r => r.personId == personId).length

      const averagePoints = (101 - currentAverageRanking) + numberInTop100

      return averagePoints > 0 ? averagePoints : 0
   },

   calculateChampionshipPoints(championships, results, eventId, personId){
      let totalChampionshipPoints = 0

      for(let championship of championships){
         const finalsResults = results
         .filter(r => r.competitionId == championship.competition_id && r.eventId == eventId && r.personId == personId)

         for(let result of finalsResults){
            const placementPoints = result.pos < 25 ? 25 - result.pos : 0

            let podiumBonus = 0
            switch(result.pos){
               case '3':
                  podiumBonus = 2; break;
               case '2':
                  podiumBonus = 4; break;
               case '1':
                  podiumBonus = 10; break;
            }

            let championshipWeight = 0
            switch(championship.championship_type){
               case championshipTypes[0]:
                  championshipWeight = 1; break;
               case championshipTypes[1]:
                  championshipWeight = 2; break;
               case championshipTypes[2]:
                  championshipWeight = 6; break;
            }

            if(Number(result.best) > 0){
               const championshipResultPoints = (placementPoints + podiumBonus) * championshipWeight
               totalChampionshipPoints += championshipResultPoints
            }
         }
      }
      
      return totalChampionshipPoints
   },

   calculateRecordPoints(personResults, eventId){
      const resultsWithRecords = personResults
      .filter(r => r.eventId == eventId && (r.regionalSingleRecord != 'NULL' || r.regionalAverageRecord != 'NULL'))

      let averageRecordsPoints = 0
      let singleRecordsPoints = 0

      for(let result of resultsWithRecords){
         const isAverageRecord = result.regionalAverageRecord != 'NULL'
         const isSingleRecord = result.regionalSingleRecord != 'NULL'

         if(isAverageRecord){
            switch(result.regionalAverageRecord){
               case recordTypes[0]:
                  averageRecordsPoints += 1; break;
               case recordTypes[1]:
                  averageRecordsPoints += 2; break;
               case recordTypes[2]:
                  averageRecordsPoints += 6; break;
            }
         }

         if(isSingleRecord){
            switch(result.regionalSingleRecord){
               case recordTypes[0]:
                  singleRecordsPoints += 1; break;
               case recordTypes[1]:
                  singleRecordsPoints += 2; break;
               case recordTypes[2]:
                  singleRecordsPoints += 6; break;
            }
         }
      }

      return (averageRecordsPoints * 3) + singleRecordsPoints
   },

   calculateSinglePoints(personId, ranksSingle, top100SinglesResultsOat){
      const currentSingleRanking = ranksSingle.find(r => r.personId == personId).countryRank

      const numberInTop100 = top100SinglesResultsOat.filter(r => r.personId == personId).length

      const singlePoints = (101 - currentSingleRanking) + numberInTop100

      return singlePoints > 0 ? singlePoints : 0
   },

   getAllMaiores(championships, ranksAverage, ranksSingle, results, peopleResults, people, legalPeopleIds){
      let allMaiores = {}

      for(let eventId of eventsIds){
         const maioresOfEvent = this.getMaioresByEvent(championships, ranksAverage, ranksSingle, results, eventId, peopleResults, people, legalPeopleIds)
 
         allMaiores[eventId] = maioresOfEvent
      }

      return allMaiores
   },

   getMaioresByEvent(championships, ranksAverage, ranksSingle, results, eventId, peopleResults, people, legalPeopleIds){
      let maioresOfEvent = []

      const top25RanksSinglePeopleIds = ranksSingle.filter(r => r.eventId == eventId && r.countryRank <= 25).map(r => r.personId)
      const top25PeopleResults = peopleResults.filter(r => r.eventId == eventId && top25RanksSinglePeopleIds.includes(r.personId))
      const top100AveragesResultsOat = top25PeopleResults.filter(r => r.average > 0).sort((a, b) => a.average - b.average).slice(0, 100)
      let top25PeopleSingles = []
      for(let result of top25PeopleResults){
         const resultTimes = [
            {personId: result.personId, single: result.value1}, 
            {personId: result.personId, single: result.value2}, 
            {personId: result.personId, single: result.value3}, 
            {personId: result.personId, single: result.value4}, 
            {personId: result.personId, single: result.value5}
         ]

         top25PeopleSingles = top25PeopleSingles.concat(resultTimes)
      }
      const top100SinglesResultsOat = top25PeopleSingles.filter(r => r.single > 0).sort((a, b) => a.single - b.single).slice(0, 100)
      
      let qualifiedPeopleIds = this.getQualifiedPeopleIdsByEvent(championships, ranksAverage, results, eventId, peopleResults)
      if(legalPeopleIds){
         qualifiedPeopleIds = qualifiedPeopleIds.filter(id => legalPeopleIds.includes(id))
      }

      const qualifiedPeopleResults = peopleResults.filter(r => qualifiedPeopleIds.includes(r.personId))

      for(let personId of qualifiedPeopleIds){
         const personResults = qualifiedPeopleResults.filter(r => r.personId == personId)

         const championshipPoints = Math.round(this.calculateChampionshipPoints(championships, results, eventId, personId) * 8)
         const recordPoints = Math.round(this.calculateRecordPoints(personResults, eventId) * 4)
         const averagePoints = Math.round(this.calculateAveragePoints(personId, ranksAverage, top100AveragesResultsOat) / 4)
         const singlePoints = Math.round(this.calculateSinglePoints(personId, ranksSingle, top100SinglesResultsOat) / 8)

         const personName = people.find(p => p.id == personId).name

         const personData = {
            personId,
            personName,
            championshipPoints,
            recordPoints,
            averagePoints,
            singlePoints,
            totalPoints: championshipPoints + recordPoints + averagePoints + singlePoints
         }

         if(personData.totalPoints > 0) maioresOfEvent.push(personData)
      }

      maioresOfEvent.sort((a, b) => b.totalPoints - a.totalPoints).forEach((m, i) => {m.position = i + 1})

      return maioresOfEvent
   },

   getQualifiedPeopleIdsByEvent(championships, ranksAverage, results, eventId, peopleResults){
      const byTop25Average = ranksAverage
      .filter(r => r.eventId == eventId && r.countryRank <= 25)
      .map(r => r.personId)

      const eventResultsWithRecords = peopleResults.filter(r => r.eventId == eventId && (r.regionalAverageRecord != 'NULL' || r.regionalSingleRecord != 'NULL'))
      const qualifiedByRecords = eventResultsWithRecords.map(r => r.personId)

      let byPodium = []
      let byFinalsAndTop100 = []

      for(let championship of championships){
         const finalsResults = results
         .filter(r => r.competitionId == championship.competition_id && r.eventId == eventId && Number(r.best) > 0)

         const peopleInPodiumIds = finalsResults
         .filter(r => r.pos <= 3 && r.personCountryId == 'Brazil')
         .map(r => r.personId)
         byPodium = byPodium.concat(peopleInPodiumIds)

         const peopleInFinalsIds = finalsResults.map(r => r.personId)
         for(let personInFinalsId of peopleInFinalsIds){
            const personRankAverage = ranksAverage.find(r => r.personId == personInFinalsId && r.eventId == eventId)
            
            if(personRankAverage){
               if(personRankAverage.countryRank <= 100){
                  byFinalsAndTop100.push(personInFinalsId)
               }
            }
         }
      }

      const allQualifiedPeopleIdsUnfiltered = [
         ...byTop25Average,
         ...byPodium,
         ...byFinalsAndTop100,
         ...qualifiedByRecords
      ]
      const qualifiedPeopleIds = [...new Set(allQualifiedPeopleIdsUnfiltered)]

      return qualifiedPeopleIds
   }
}

export default maioresService