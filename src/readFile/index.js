import fs from 'fs'

import { extractZipFile } from './extractZipFile.js'
import { parseTSV } from './parseTSV.js'
import { createObjectFromArray } from './createObjectFromArray.js'

export const readFile = path => {
  const stream = fs.createReadStream(path)
  return stream
    .pipe(extractZipFile)
    .pipe(parseTSV)
    .pipe(createObjectFromArray)
}