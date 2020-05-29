import { generateStats } from './generateStats.js'
import { readFiles } from "./read/index.js"
import { enrichData } from "./enrich/index.js"
import { aggregateMetrics } from "./aggregate/index.js"
import { storeResult } from "./store/index.js"

jest.mock('./read/index.js')
jest.mock('./enrich/index.js')
jest.mock('./aggregate/index.js')
jest.mock('./store/index.js')

describe('generateStats', () => {
  it('should return aggregated metrics', async () => {
    readFiles.mockReturnValue('stream')
    enrichData.mockReturnValue('enrichedStream')
    aggregateMetrics.mockReturnValue(['aggregatedStream', new Promise(res => res('result'))])

    const result = await generateStats('inputDir', 'outputDir', true)
    expect(readFiles).toBeCalledWith('inputDir')
    expect(enrichData).toBeCalledWith('stream')
    expect(aggregateMetrics).toBeCalledWith('enrichedStream')
    expect(storeResult).toBeCalledWith('aggregatedStream', 'outputDir')
    expect(result).toEqual('result')
  })

  it('should use default values for output dir and print if not provided', async () => {
    readFiles.mockReturnValue('stream')
    enrichData.mockReturnValue('enrichedStream')
    aggregateMetrics.mockReturnValue(['aggregatedStream', new Promise(res => res('result'))])

    const result = await generateStats('inputDir')
    expect(readFiles).toBeCalledWith('inputDir')
    expect(enrichData).toBeCalledWith('stream')
    expect(aggregateMetrics).toBeCalledWith('enrichedStream')
    expect(storeResult).toBeCalledWith('aggregatedStream', '/dev/null')
    expect(result).toEqual('result')
  })
})