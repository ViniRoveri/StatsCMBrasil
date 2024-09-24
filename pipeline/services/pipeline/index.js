import pipelineExport from "./export.js";
import pipelineMaiores from "./maiores.js";
import pipelineRecordes from './recordes.js'

console.log('Starting pipeline...')

await pipelineExport()

await pipelineMaiores()

await pipelineRecordes()

console.log('Pipeline finished sucessfully!')