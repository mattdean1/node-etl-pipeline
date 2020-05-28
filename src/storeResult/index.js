import { stringifyObject } from "./stringifyObject"

export const storeResult = (stream, outputFilePath) => {
  const outputStream = fs.createWriteStream(outputDataFilePath)
  return stream
    .pipe(stringifyObject)
    .pipe(outputStream)
}