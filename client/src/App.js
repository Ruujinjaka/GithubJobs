import React, { useEffect, useState } from 'react';
import './App.css';
import Jobs from './components/Jobs'
import axios from 'axios'



const JOB_API_URL = "http://localhost:3001/jobs"

async function fetchJobs(updateCb){
  const jobs = await axios(JOB_API_URL)

  // update the job list everytime we fetch some jobs
  updateCb(jobs.data)
}


function App() {
  const [jobList, updateJobs] = useState([])

  useEffect(() => {
    fetchJobs(updateJobs);
  }, [])


  return (
    <div className="App">
      <Jobs jobs={jobList}/>
    </div>
  );
}

export default App;
