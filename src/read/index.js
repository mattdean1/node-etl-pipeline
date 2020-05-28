import fs from "fs"
import path from "path"

import { extractZipFile } from "./extractZipFile.js"
import { parseTSV } from "./parseTSV.js"
import { createObjectFromArray } from "./createObjectFromArray.js"

// read all .gz files in a given dir and pass them through the extraction pipeline:
// read -> extract/unzip -> parse tsv (returns array) -> convert array to object for easier access
export const readFiles = directoryPath => {
  const allFiles = fs.readdirSync(directoryPath, { withFileTypes: true })
  const dataFiles = allFiles.filter(f => f.isFile() && f.name.endsWith(".gz"))

  console.log(`Reading files: ${dataFiles.map(f => f.name)}`)

  const fileStreams = dataFiles.map(dirEnt =>
    fs.createReadStream(path.join(directoryPath, dirEnt.name))
  )

  // when one file ends, pipe the next one into the pipeline
  for (let i = 0; i < fileStreams.length; i++) {
    fileStreams[i].on("end", () => {
      console.log(`\nFinished reading file ${dataFiles[i].name}`)
      if (i < fileStreams.length - 1) {
        const end = i === fileStreams.length - 2 // pass end: true to writeStream for final stream
        fileStreams[i + 1].pipe(extractZipFile, { end })
      }
    })
  }

  // start reading the first file
  const end = fileStreams.length === 1
  fileStreams[0].pipe(extractZipFile, { end })

  return extractZipFile.pipe(parseTSV).pipe(createObjectFromArray)
}
