import stream from "stream"

export const getAggregator = (getValue) => {
  const result = {}
  const passThroughStream = new stream.Transform({
    readableObjectMode: true,
    writableObjectMode: true,

    transform(chunk, encoding, callback) {  
      const value = getValue(chunk)

      if (!result[value]) result[value] = 0
      result[value]++

      this.push(chunk)
      callback()
    },
  })

  return [result, passThroughStream]
}
