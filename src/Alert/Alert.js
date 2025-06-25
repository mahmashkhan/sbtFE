import * as React from 'react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const CustomAlert = ({ open, setOpen, type = 'success', message = '' }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert onClose={handleClose} severity={type} sx={{ width: '120%', color:'#ffffff ' }} variant="filled">
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomAlert;
