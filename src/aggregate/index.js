import { getAggregator } from "./getAggregator.js"
import { filterUniqueUsers } from "./filterUniqueUsers.js"

const getTopN = (n, map) => {
  const values = Object.entries(map)
  const sorted = values.sort((a, b) => b[1] - a[1])
  return sorted.slice(0, n)
}

export const aggregateMetrics = stream => {
  const [countries, aggregateCountries] = getAggregator(line => line.geocode.country)
  const [cities, aggregateCities] = getAggregator(line => line.geocode.city)
  const [browsers, aggregateBrowsers] = getAggregator(line => line.userAgent.browser)
  const [os, aggregateOS] = getAggregator(line => line.userAgent.os)

  const resultStream = stream
    .pipe(aggregateCountries)
    .pipe(aggregateCities)
    .pipe(filterUniqueUsers)
    .pipe(aggregateBrowsers)
    .pipe(aggregateOS)

  const resultsPromise = new Promise(res => {
    resultStream.on("finish", () => {
      const topCountries = getTopN(5, countries)
      const topCities = getTopN(5, cities)
      const topBrowsers = getTopN(5, browsers)
      const topOS = getTopN(5, os)
      res({ topCountries, topCities, topBrowsers, topOS })
    })
  })

  return [resultStream, resultsPromise]
}
