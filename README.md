# GithubJobs
See available jobs at Github

**I created a react app that displays a list of Github jobs as well links to apply for them.**


### IMPORTANT CONCEPTS AND ARCHITECTURE
- FrontEnd (made with react.js)
- API (uses Node and Express to fetch data from a Redis database)
- Redis for caching
- Cron Worker that fetches data periodically using the github jobs api

All other jobs besides Junior Dev SWE positions are filtered out using a simple algo.
