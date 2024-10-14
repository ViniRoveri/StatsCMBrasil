import pipelineExport from "./export.js"
import pipelineMaiores from "./maiores.js"
import pipelineRecordes from './recordes.js'
import pipelineCampeoes from "./campeoes.js"

console.log('Starting pipeline...')

await pipelineExport()

pipelineMaiores()

pipelineCampeoes()

pipelineRecordes()

console.log('Pipeline finished sucessfully!')