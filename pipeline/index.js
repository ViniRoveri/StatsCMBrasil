import pipelineExport from "./pipelines/export.js"
import pipelineMaiores from "./pipelines/maiores.js"
import pipelineRecordes from './pipelines/recordes.js'
import pipelineCampeoes from "./pipelines/campeoes.js"
import fs from 'fs'
import pipelineRegionais from "./pipelines/regionais.js"

console.log('Starting pipeline...')

await pipelineExport()

const wcaExport = JSON.parse(
   fs.readFileSync("./wcaExport.json")
)

if(wcaExport.resultsAreComplete){
   pipelineMaiores()
   
   pipelineCampeoes()
   
   pipelineRecordes()

   pipelineRegionais()
}else{
   console.log('Pipeline not executed, results are incomplete.')
}

console.log('Pipeline finished sucessfully!')