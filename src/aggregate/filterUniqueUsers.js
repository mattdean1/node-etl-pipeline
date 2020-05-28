import stream from "stream"

const userMap = {}

export const filterUniqueUsers = new stream.Transform({
    highWaterMark: 2147483648, // 2gb
    readableObjectMode: true,
    writableObjectMode: true,

    transform(chunk, encoding, callback) {
      const { userId } = chunk.rawData

      if (!userMap[userId]) {
        userMap[userId] = true
        this.push(chunk)
      }
      // console.log('unique' + userId);
      
      callback()
    }
})
