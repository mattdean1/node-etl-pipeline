const inputDataFilePath = '../data/input_data.gz'
const outputDataFilePath = '../data/input_data'

import { readFile } from './readFile/index.js'
import { enrichData } from './enrichData/index.js'
import { aggregateMetrics } from './aggregateMetrics/index.js'


const main = async () => {
  // TODO: extract all files in a given directory
  // TODO: take directory as input on command line

  const stream = readFile(inputDataFilePath)
  const enrichedStream = enrichData(stream)
  
  const [aggregatedStream, metricsPromise] = aggregateMetrics(enrichedStream)

  storeResult(aggregatedStream, outputDataFilePath)

  const metrics = await metricsPromise
  console.log(metrics);
}

main()

