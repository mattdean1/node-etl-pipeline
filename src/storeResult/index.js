import fs from 'fs'

import { stringifyObject } from "./stringifyObject.js"

export const storeResult = (stream, outputFilePath) => {
  const outputStream = fs.createWriteStream(outputFilePath)
  return stream
    .pipe(stringifyObject)
    .pipe(outputStream)
}