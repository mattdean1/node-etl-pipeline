import stream from 'stream'

export const stringifyObject = new stream.Transform({
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    this.push(`${JSON.stringify(chunk)}\n`)
    callback()
  }
})