import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import { Grid } from '@material-ui/core';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(props.active);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Grid item xs={12} sm={12} md={12}>
        <h2 id="simple-modal-title">{props.data.selectedDate.toDateString()}</h2>
      </Grid>



      <Button variant="contained" onClick={() => props.handler.onClose()} color="primary">
        Close
              </Button>
      <Button variant="contained" onClick={() => props.handler.onOk()} color="primary">
        Ok
              </Button>
      {/* <p id="simple-modal-description">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
      <SimpleModal /> */}
    </div>
  );

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


          {body}

        </Fade>
      </Modal>
    </div>
  );
}
