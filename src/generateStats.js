import { readFiles } from "./readFile/index.js"
import { enrichData } from "./enrichData/index.js"
import { aggregateMetrics } from "./aggregateMetrics/index.js"
import { storeResult } from "./storeResult/index.js"

export const generateStats = async inputDirectory => {
  const stream = readFiles(inputDirectory)
  const enrichedStream = enrichData(stream)

  const [aggregatedStream, metricsPromise] = aggregateMetrics(enrichedStream)

  // storeResult(aggregatedStream, "./data/out")

  const metrics = await metricsPromise
  console.log(metrics)
}
