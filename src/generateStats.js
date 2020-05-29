import { readFiles } from "./read/index.js"
import { enrichData } from "./enrich/index.js"
import { aggregateMetrics } from "./aggregate/index.js"
import { storeResult } from "./store/index.js"

export const generateStats = async (inputDirectory, outputDirectory = '/dev/null', print = false) => {
  const stream = readFiles(inputDirectory)

  const enrichedStream = enrichData(stream)

  const [aggregatedStream, metricsPromise] = aggregateMetrics(enrichedStream)

  storeResult(aggregatedStream, outputDirectory)

  const metrics = await metricsPromise
  if (print) {
    console.log(metrics)
  }
  return metrics
}
