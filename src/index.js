import commander from 'commander'

import { readFile } from './readFile/index.js'
import { enrichData } from './enrichData/index.js'
import { aggregateMetrics } from './aggregateMetrics/index.js'
import { storeResult } from './storeResult/index.js'

const { program } = commander
const inputDataFilePath = '../data/input_data.gz'
const outputDataFilePath = '../data/input_data'

const generateStats = async (inputDirectory) => {
  console.log(inputDirectory);

  const stream = readFile(inputDataFilePath)
  const enrichedStream = enrichData(stream)
  
  const [aggregatedStream, metricsPromise] = aggregateMetrics(enrichedStream)

  storeResult(aggregatedStream, outputDataFilePath)

  const metrics = await metricsPromise
  console.log(metrics);
}

program
  .version('0.0.1')
  .description('ETL system for web events')
  .command('generate <input-directory>')
  .description('Generate event stats for country/city and user stats for browser/os')
  .option('-p, --print', 'Should print stats to terminal')
  .action((inputDirectory) => {
    generateStats(inputDirectory)
  })

program.parse(process.argv)

