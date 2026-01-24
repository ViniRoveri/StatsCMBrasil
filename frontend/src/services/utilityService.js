import axios from 'axios'

const utilityService = {
   async getMultipleResultsAttempts(results){
      for(let result of results){
         await this.getResultAttempts(result)
      }
   },

   async getPersonWcaImageUrlById(peopleIds){
      let urls = []

      for(let id of peopleIds){
         const wcaPage = (await axios.get(`https://www.worldcubeassociation.org/persons/${id}`)).data
 
         const linkWithStart = wcaPage.split(`class="avatar" src="`)[1]
         const linkWithEnd = linkWithStart.split('"')[0]
         
         urls.push(linkWithEnd)
      }
      
      return urls
   },

   async getResultAttempts(result){
      const apiReq = (await axios.get(`https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/results/${result.competitionId}/${result.eventId}.json`)).data
      const recordResult = apiReq.items.find(r => r.personId == result.personId && r.average == result.average && r.best == result.best)
      result.attempts = recordResult.solves.filter(s => s != 0)
   },

   formatNumber(number){
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
   },

   formatTime(time){
      let formattedTime = (Number(time) / 100).toFixed(2)

      if(formattedTime.length > 5){
         const ms = time.slice(-2)
         const totalSeconds = Number(time.slice(0, -2))
         const minutes = Math.floor(totalSeconds / 60)
         const seconds = totalSeconds - (minutes * 60)

         formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}.${ms}`
      }

      return formattedTime
   }
}

export default utilityService