### Prerequisites

- Install the latest version of node (14) e.g. using [nvm](https://github.com/nvm-sh/nvm)
- Install [yarn](https://yarnpkg.com/)

### How to run

1. Drop your gzip files in the data dir
2. `yarn generate ./data`

The cli is built using [commander](https://www.npmjs.com/package/commander) so you can also run `yarn cli` to see the options and get help.

### How it works

I experimented with Node streams to pass data through the pipeline as quickly as possible.

There are 4 stages to the pipeline, corresponding to the folder names:

1. Read
  - Read the .gz files from disk (input dir passed in via the cli)
  - Extract / unzip
  - Parse the TSV (using [csv-parse](https://www.npmjs.com/package/csv-parse), that returns an array for each record)
  - Convert that array to an object for easier access to properties
2. Enrich
  - Geocode IP address to get city/country - using [geoip2 databases](https://dev.maxmind.com/geoip/geoip2/geolite2/) for lookup
  - Parse useragent string to get os/browser - using [ua-parser-js](https://www.npmjs.com/package/ua-parser-js)
3. Aggregate
  - Build a map of `{ country/city: numberOfEvents }`
  - Filter out events so there is only one for each userId
  - Build a similar map for `{ browser/os: numberOfUsers }`
  - Iterate over those maps to find the top 5 in each category
4. Store
  - Write the final stream somewhere (file passed in via the cli)
  
### Next steps

So far I spent 1 day on the task, with more time I'd look to implement the following:

- Unit / integration tests
- Task B: Serve the results via api (with start/end date params)
- Add e.g. a cron task to recompute the stats
- Add an upload endpoint -> recompute stats
