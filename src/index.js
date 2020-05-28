import commander from 'commander'

import { generateStats } from './generateStats.js'

const { program } = commander

program
  .version('0.0.1')
  .description('ETL system for web events')
  .command('generate <input-directory>')
  .description('Generate event stats for country/city and user stats for browser/os')
  .option('-p, --print', 'Should print stats to terminal')
  .action((inputDirectory) => generateStats(inputDirectory))

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const main = async () => {
  let x = true
  program.parseAsync(process.argv).then(() => { x = false })
  while (x) {
    console.log('working');
    await sleep(2000)
  }
}

main()