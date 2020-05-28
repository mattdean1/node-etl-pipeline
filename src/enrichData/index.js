import { geocodeIP } from "./geocodeIP.js"
import { parseUserAgentString } from "./parseUserAgentString.js"

export const enrichData = stream => {
  return stream
    .pipe(geocodeIP)
    .pipe(parseUserAgentString)
}