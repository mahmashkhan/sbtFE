import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import WarningIcon from '@mui/icons-material/Warning';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 400 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 3,
  p: { xs: 3, sm: 4 },
  textAlign: 'center',
};

export default function ModalLayout({ open, setOpen, onDelete }) {
  const handleClose = () => setOpen(false);

  const handleConfirmDelete = async () => {
    try {
      await onDelete();
      setOpen(false);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <WarningIcon color="error" sx={{mb:1}}/>
        <Typography
          id="modal-title"
          variant="h6"
          fontWeight="bold"
          color="text.primary"
        >
          Confirm Deletion  
        </Typography>
        

        <Typography
          id="modal-description"
          sx={{ mt: 2, color: 'text.secondary', fontSize: '0.95rem' }}
        >
          Are you sure you want to delete this item? This action cannot be undone.
        </Typography>

        <Box
          sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}


