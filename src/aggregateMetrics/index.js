// TODO: keep track of max aggs as we go along

import { getEventAggregator } from "./getEventAggregator.js"
import { getUserAgentAggregator } from './getUserAgentAggregator.js' 

const getTopN = (n, map) => {
  const values = Object.entries(map)
  const sorted = values.sort((a, b) => b[1] - a[1])
  return sorted.slice(0, n)
}

export const aggregateMetrics = stream => {
  const countryAgg = {}
  const getCountry = line => line.geocode.country
  const aggregateCountries = getEventAggregator(countryAgg, getCountry)

  const cityAgg = {}
  const getCity = line => line.geocode.city
  const aggregateCities = getEventAggregator(cityAgg, getCity)

  const userAgentResult = {browsers: {}, os: {}}
  const aggregateUserAgent = getUserAgentAggregator(userAgentResult)

  const resultStream = stream
    .pipe(aggregateCountries)
    .pipe(aggregateCities)
    .pipe(aggregateUserAgent)

  const resultsPromise = new Promise(res => {
    resultStream.on('finish', () => {
      const topCountries = getTopN(5, countryAgg)
      const topCities = getTopN(5, cityAgg)
      const topBrowsers = getTopN(5, userAgentResult.browsers)
      const topOS = getTopN(5, userAgentResult.os)
      res({ topCountries, topCities, topBrowsers, topOS })
    })
  })

  return [resultStream, resultsPromise]
}