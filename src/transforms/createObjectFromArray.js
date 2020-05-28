import stream from 'stream'

export const createObjectFromArray = new stream.Transform({
  readableObjectMode: true,
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    const [date, time, userId, url, ip, userAgentString] = chunk
    this.push({ rawData: { date, time, userId, url, ip, userAgentString } })
    callback()
  }
})