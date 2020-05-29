import { generateStats } from "../generateStats.js"

describe("integration test", () => {
  it('should generate stats for multiple data files', async () => {
    const result = await generateStats("src/test")

    expect(result).toEqual({
      topBrowsers: [
        ["Mobile Safari", 3],
        ["Chrome", 3],
        ["GSA", 1],
        ["IE", 1],
      ],
      topCities: [
        ["Sunbury-on-Thames", 4],
        ["Dunfermline", 4],
        ["Bristol", 2],
        ["Basildon", 2],
        ["Finchley", 2],
      ],
      topCountries: [["United Kingdom", 20]],
      topOS: [
        ["iOS", 4],
        ["Android", 2],
        ["Windows", 2],
      ],
    })
  })
})
