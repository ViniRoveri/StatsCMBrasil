import Table from "../global/Table"

type Props = {
   recordesData: any[]
   type: string
}

function formatarTempo(tempo: string){
   let tempoFormatado = (Number(tempo) / 100).toFixed(2)

   if(tempoFormatado.length > 5){
      const ms = tempo.slice(-2)
      const totalSeconds = Number(tempo.slice(0, -2))
      const minutes = Math.floor(totalSeconds / 60)
      const seconds = totalSeconds - (minutes * 60)

      tempoFormatado = `${minutes}:${String(seconds).padStart(2, '0')}.${ms}`
   }

   return tempoFormatado
}

export default function RecordesInfo(props: Props){
   let headers = ['Resultado', 'Recorde', 'Nome', 'Competição']
   if(props.type == 'average') headers.push('Solves')

   return (
      <Table 
         headers={headers}
         rows={props.recordesData.map(result => {
            const tempo = props.type == 'average' ? result.average : result.best
            const tempoFormatado = formatarTempo(tempo)

            let row = [
               result.eventId == '333fm' && props.type == 'single' ? tempo : tempoFormatado,
               result[props.type == 'average' ? 'regionalAverageRecord' : 'regionalSingleRecord'],
               result.personName,
               result.competitionName
            ]
            if(props.type == 'average'){
               let tempos = [result.value1, result.value2, result.value3]
               if(result.value4 != '0') tempos.push(result.value4)
               if(result.value5 != '0') tempos.push(result.value5)

               const temposFormatados = tempos.map(t => {
                  if(Number(t) == -1) return 'DNF'

                  if(result.eventId == '333fm') return t

                  return formatarTempo(t)
               })

               row.push(temposFormatados.join(' - '))
            }

            return row
         })}
      />
   )
}