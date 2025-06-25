// ContactModal.jsx

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ContactModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box display="flex" alignItems="center" flexDirection="column" textAlign="center">
          <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: 'success.main' }}>
            Message sent successfully!
          </Typography>
        </Box>
        {/* <Box mt={3} display="flex" justifyContent="flex-end">
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </Box> */}
      </Box>
    </Modal>
  );
}
