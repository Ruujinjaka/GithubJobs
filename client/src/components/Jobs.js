import React, { useState } from 'react'
import {Typography} from '@material-ui/core'
import Job from './Job'
import { makeStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Modal from './Modal'

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
});


function Jobs({jobs}) {
    // Modal
    const [open, setOpen] = React.useState(false);
    const [selectedJob, selectJob] = React.useState({})

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // pagination
    const classes = useStyles();
    const numJobs = jobs.length
    const numPages = Math.ceil(numJobs / 50)
    const [activeStep, setActiveStep] = useState(0);
    const jobsOnPage = jobs.slice(activeStep * 50, (activeStep * 50 ) + 50)

    

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };


    return (
        
        <div className="jobs">
            <Modal open={open} job={selectedJob} handleClose={handleClose}/>
            <Typography variant='h4' component='h1'>Entry Level Software Jobs</Typography>
            <Typography variant='h6' component='h1'>Found {numJobs} jobs</Typography>
            { jobsOnPage.map((job, index) => <Job key={index} job= {job} onClick={() => {
                selectJob(job);
                handleClickOpen();
            }} />) }

            <div>
                Page { activeStep + 1 } of { numPages }
            </div>
            <MobileStepper
                variant="progress"
                steps={numPages}
                position="static"
                activeStep={activeStep}
                className={classes.root}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === 4}>
                    Next
                    <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    <KeyboardArrowLeft />
                    Back
                    </Button>
                }
            />
        </div>
        
    )
}

export default Jobs