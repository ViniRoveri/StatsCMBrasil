import pipelineExport from "./export.js"
import pipelineMaiores from "./maiores.js"
import pipelineRecordes from './recordes.js'
import pipelineCampeoes from "./campeoes.js"
import fs from 'fs'

console.log('Starting pipeline...')

await pipelineExport()

const wcaExport = JSON.parse(
   fs.readFileSync("./wcaExport.json")
)

if(wcaExport.resultsAreComplete){
   pipelineMaiores()
   
   pipelineCampeoes()
   
   pipelineRecordes()
}else{
   console.log('Pipeline not executed, results are incomplete.')
}

console.log('Pipeline finished sucessfully!')