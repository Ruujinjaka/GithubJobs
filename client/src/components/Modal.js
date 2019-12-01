import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
        console.log(error, errorInfo)
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
}


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal({job, open, handleClose}) {
  
    if(!job.title){
        return <div></div>
    }

  return (
    <div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
            {job.title} - {job.company}
            <img src={job.company_logo} className="detail-logo"/>
        </DialogTitle>

        <DialogContent>
            <ErrorBoundary>
                <DialogContentText 
                id="alert-dialog-slide-description" 
                dangerouslySetInnerHTML={{__html: job.description}} />
            </ErrorBoundary>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>

          <Button>
              {/* _blank opens the page in a new tab */}
              <a href={job.url} target="_blank" style={{textDecoration: "none"}}>Apply</a>
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
