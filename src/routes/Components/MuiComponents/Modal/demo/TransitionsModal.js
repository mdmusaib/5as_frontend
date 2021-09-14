import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import GridContainer from '@jumbo/components/GridContainer';
const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 8, 6),
    width: '500px',
    height: '50%',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  close: {
    width: '40px',
    backgroundColor: '#00bcd4',
    color: 'white',
  },
  ok: {
    width: '35px',
    backgroundColor: 'green',
    color: 'white',
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.active);
  const [value, setValue] = React.useState({ amount: 0, ...props.formValues });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // React.useEffect(() => {
  //   return () => setOpen(false);
  // }, []);
  
    // setOpen(false);
  // };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        // onClose={handleClose}
        // closeAfterTransition
        disableBackdropClick
        // BackdropComponent={Backdrop}
        // BackdropProps={{
        //   timeout: 500,
        // }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Grid item xs={12} sm={12} md={12}>
              {<props.component data={props.formValues}/>}
             
            </Grid>

            <div className={classes.buttonContainer}>
              {/* <button className={classes.close}>Close</button> */}
              <Button variant="contained" onClick={()=>props.onClose()} color="primary">
                Close
              </Button>
              <Button variant="contained" onClick={() => props.onOk(value)} color="primary">
                Ok
              </Button>
              {/* <button className={classes.ok}>Ok</button> */}
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
  }