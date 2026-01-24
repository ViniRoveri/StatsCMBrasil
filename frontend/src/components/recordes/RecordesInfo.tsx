import utilityService from "@/services/utilityService"
import Table from "../global/Table"
import PersonLink from "../global/PersonLink"

type Props = {
   recordesData: any[]
   type: string
}

export default async function RecordesInfo(props: Props){
   let headers = ['Resultado', 'Recorde', 'Nome', 'Competição']
   if(props.type == 'average') headers.push('Solves')

   await utilityService.getMultipleResultsAttempts(props.recordesData)

   return (
      <Table 
         headers={headers}
         rows={props.recordesData.map(result => {
            const tempo = props.type == 'average' ? result.average : result.best
            const tempoFormatado = utilityService.formatTime(tempo)

            let row = [
               result.eventId == '333fm' && props.type == 'single' ? tempo : tempoFormatado,
               result[props.type == 'average' ? 'regionalAverageRecord' : 'regionalSingleRecord'],
               <PersonLink personId={result.personId} personName={result.personName}/>,
               result.competitionName
            ]
            
            if(props.type == 'average'){
               const temposFormatados = result.attempts.map((t: any) => {
                  if(Number(t) == -1) return 'DNF'

                  if(result.eventId == '333fm') return t

                  return utilityService.formatTime(t)
               })

               row.push(temposFormatados.join(' - '))
            }

            return row
         })}
      />
   )
}