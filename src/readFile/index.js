import fs from "fs"
import path from "path"

import { extractZipFile } from "./extractZipFile.js"
import { parseTSV } from "./parseTSV.js"
import { createObjectFromArray } from "./createObjectFromArray.js"

export const readFiles = directoryPath => {
  const allFiles = fs.readdirSync(directoryPath, { withFileTypes: true })
  const dataFiles = allFiles.filter(f => f.isFile() && f.name.endsWith(".gz"))

  console.log(`Reading files: ${dataFiles.map(f => f.name)}`)

  const fileStreams = dataFiles.map(dirEnt =>
    fs.createReadStream(path.join(directoryPath, dirEnt.name))
  )

  for (let i = 0; i < fileStreams.length; i++) {
    fileStreams[i].on("end", () => {
      console.log(`\nFinished reading file ${dataFiles[i].name}`)
      if (i < fileStreams.length - 1) {
        const end = i === fileStreams.length - 2 // pass end: true to writeStream for final stream
        fileStreams[i + 1].pipe(extractZipFile, { end })
      }
    })
  }
  const end = fileStreams.length === 1
  fileStreams[0].pipe(extractZipFile, { end })

  const resultStream = extractZipFile.pipe(parseTSV).pipe(createObjectFromArray)

  return resultStream
}
