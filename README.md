# node-etl-pipeline

Experiment with Node streams implementing a data processing pipeline CLI.

Data is an event log of pageviews, gzipped .tsv with header `date, time, userid, url, ip, useragent`

The pipeline has 4 stages:

## 1. Read
  - Read .gz files from disk (input directory passed in via the CLI)
  - Extract / unzip
  - Parse the TSV (using [csv-parse](https://www.npmjs.com/package/csv-parse), that returns an array for each record)
  - Convert that array to an object for more readable access
  
## 2. Enrich
  - Geocode IP address to get city/country - using [geoip2 databases](https://dev.maxmind.com/geoip/geoip2/geolite2/) for lookup
  - Parse useragent string to get os/browser - using [ua-parser-js](https://www.npmjs.com/package/ua-parser-js)
  
## 3. Aggregate
  - Build a map of `{ country/city: numberOfEvents }`
  - Filter events so userId is unique
  - Build a similar map for `{ browser/os: numberOfUsers }`
  - Iterate over those maps to find the top 5 in each category
  
## 4. Store
  - Write the final stream somewhere (file passed in via the cli)
  
  
------

## How to run

- Install the latest version of node (14) e.g. using [nvm](https://github.com/nvm-sh/nvm)
- Install [yarn](https://yarnpkg.com/)
- `yarn`
- Drop your gzip files in the data dir
- `yarn generate ./data`


The cli is built using [commander](https://www.npmjs.com/package/commander) so you can also run `yarn cli` to see the options and get help.

At the moment the scalability bottleneck is the filtering of unique users - the map of userIds is held in memory. In production that could be replaced with a key/value store like redis or dynamodb.

  
### Next steps

So far I spent about a day, with more time I'd look to implement the following:

- More tests
- Add config params e.g. start/end date
- Replace in-memory user map with k/v store e.g. redis
- Deploy / host it somewhere


