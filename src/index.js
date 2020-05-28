import fs from 'fs';

const inputDataFilePath = '../data/input_data.gz'
const outputDataFilePath = '../data/input_data'

import { extractZipFile } from './transforms/extractZipFile.js'
import { parseTSV } from './transforms/parseTSV.js'
import { createObjectFromArray } from './transforms/createObjectFromArray.js'
import { stringifyObject } from './transforms/stringifyObject.js'
import { geocodeIP } from './transforms/geocodeIP.js';
import { parseUserAgentString } from './transforms/parseUserAgentString.js';


const main = async () => {
  // TODO: extract all files in a given directory
  // TODO: take directory as input on command line
  
  try {
    const inputStream = fs.createReadStream(inputDataFilePath)
    const outputStream = fs.createWriteStream(outputDataFilePath)

    inputStream
      .pipe(extractZipFile)
      .pipe(parseTSV)
      .pipe(createObjectFromArray)
      .pipe(geocodeIP)
      .pipe(parseUserAgentString)
      .pipe(stringifyObject)
      .pipe(outputStream)
      .on("finish", () => console.log("Done"));    
  } catch (err) {
    console.error(err);
    console.error('Could not extract input data file');
    process.exitCode = 1;
  }
}

main()