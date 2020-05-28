import stream from 'stream'
import UAParser from 'ua-parser-js'

const parser = new UAParser()

export const parseUserAgentString = new stream.Transform({
  readableObjectMode: true,
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
      const {rawData: { userAgentString }} = chunk

      parser.setUA(userAgentString)
      const { browser: { name: browser }, os: { name: os }} = parser.getResult()

      this.push({ ...chunk, userAgent: { browser, os } })
      callback()
  }
})