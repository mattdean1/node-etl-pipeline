import { readFiles } from './readFile/index.js'
import { enrichData } from './enrichData/index.js'
import { aggregateMetrics } from './aggregateMetrics/index.js'
import { storeResult } from './storeResult/index.js'

const outputDataFilePath = './data/out'

export const generateStats = async (inputDirectory) => {
  console.log(inputDirectory);

  const stream = readFiles(inputDirectory)
  const enrichedStream = enrichData(stream)
  
  const [aggregatedStream, metricsPromise] = aggregateMetrics(enrichedStream)

  // storeResult(aggregatedStream, outputDataFilePath)

  const metrics = await metricsPromise
  console.log(metrics);
}