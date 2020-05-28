import { readFiles } from "./read/index.js"
import { enrichData } from "./enrich/index.js"
import { aggregateMetrics } from "./aggregate/index.js"
import { storeResult } from "./store/index.js"

export const generateStats = async inputDirectory => {
  const stream = readFiles(inputDirectory)

  const enrichedStream = enrichData(stream)

  const [aggregatedStream, metricsPromise] = aggregateMetrics(enrichedStream)

  storeResult(aggregatedStream, "/dev/null")

  const metrics = await metricsPromise
  console.log(metrics)
}
