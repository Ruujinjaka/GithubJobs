const axios =  require('axios')

const baseURL = 'https://jobs.github.com/positions.json'

// redis
var redis = require("redis"), client = redis.createClient();

// promisifying redis with util.promisify
const {promisify} = require('util');

const setAsync = promisify(client.set).bind(client);


async function fetchGithub() {
    let resultCount = 1, onPage = 0;
    const allJobs = [];

    // fetch all pages
    while(resultCount > 0){
        const res = await axios(`${baseURL}?page=${onPage}`)
        const jobs = await res.data
        resultCount = jobs.length
        allJobs.push(...jobs)
        console.log('got', jobs.length, 'jobs')
        onPage++
    }

    // total number of jobs
    console.log('got', allJobs.length, 'jobs')

    // filter algo
    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase()

        // algo logic
        if(
            jobTitle.includes('senior')||
            jobTitle.includes('manager')||
            jobTitle.includes('sr.') ||
            jobTitle.includes('architect')
        ) return false

        return true
    })

    // filtered jobs
    console.log('filtered down to: ', jrJobs.length)
    
    const success = await setAsync('github', JSON.stringify(jrJobs))
    console.log(success)
}



module.exports = fetchGithub;