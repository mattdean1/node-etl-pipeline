import { readFiles } from "./read/index.js"
import { enrichData } from "./enrich/index.js"
import { aggregateMetrics } from "./aggregate/index.js"
import { storeResult } from "./store/index.js"

export const generateStats = async inputDirectory => {
  const objectStream = readFiles(inputDirectory)
  const enrichedStream = enrichData(objectStream)

  const [aggregatedStream, metricsPromise] = aggregateMetrics(enrichedStream)

  // storeResult(aggregatedStream, "./data/out")

  const metrics = await metricsPromise
  console.log(metrics)
}
