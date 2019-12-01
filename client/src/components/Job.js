import React from 'react'
import {Paper, Typography} from '@material-ui/core'

export default function Job({job, onClick}) {
    return (
        <Paper onClick={onClick} className="job" square={false} component="div">
            <div>
                <Typography variant="h6">{ job.title }</Typography>
                <Typography>{ job.company }</Typography>
                <Typography>{ job.location }</Typography>
            </div>

            <div>
                <Typography>{job.created_at.split(" ").slice(0, 3).join(" ")}</Typography>
            </div>
            
        </Paper>
    )
}
