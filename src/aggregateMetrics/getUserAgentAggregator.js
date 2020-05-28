import stream from 'stream'

export const getUserAgentAggregator = (result) => {
  const userMap = {}
  return new stream.Transform({
    highWaterMark: 2147483648, // 2gb 
    readableObjectMode: true,
    writableObjectMode: true,

    transform(chunk, encoding, callback) {
        const { userId } = chunk.rawData
        const { browser, os } = chunk.userAgent

        if (!userMap[userId]) {
          if (!result.browsers[browser]) result.browsers[browser] = 0
          result.browsers[browser]++

          if (!result.os[os]) result.os[os] = 0
          result.os[os]++

          userMap[userId] = true
        }

        this.push(chunk)
        callback()
    }
  })
}