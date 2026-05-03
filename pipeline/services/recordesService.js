import axios from 'axios'

const recordesService = {
   async getRecordResultAttempts(result){
      const apiReq = (await axios.get(`https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/refs/heads/v1/results/${result.competitionId}/${result.eventId}.json`)).data
      const recordResult = apiReq.items.find(r => r.personId == result.personId && r.average == result.average && r.best == result.best)
      return recordResult.solves.filter(s => s != 0)
   }
}

export default recordesService