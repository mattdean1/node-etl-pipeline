import stream from "stream"
import maxmind from "maxmind"

let countryLookup
let cityLookup

const openDBs = async () => {
  if (!countryLookup || !cityLookup) {
    [countryLookup, cityLookup] = await Promise.all([
      maxmind.open("./data/GeoLite2-Country.mmdb"),
      maxmind.open("./data/GeoLite2-City.mmdb"),
    ])
  }
}

const getCountry = ip => {
  const result = countryLookup.get(ip)
  if (!result || !result.country) return "Unknown"
  return result.country.names.en
}
const getCity = ip => {
  const result = cityLookup.get(ip)
  if (!result || !result.city) return "Unknown"
  return result.city.names.en
}

export const geocodeIP = new stream.Transform({
  readableObjectMode: true,
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    openDBs().then(() => {
      const {
        rawData: { ip },
      } = chunk
      const country = getCountry(ip)
      const city = getCity(ip)
      this.push({ ...chunk, geocode: { country, city } })
      callback()
    })
  },
})
