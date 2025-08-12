// UseCaseModal.jsx
import * as React from 'react';
import {
  Typography,
  Box,
  Chip,
  Modal
} from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  outline: 'none',
  border: '1px solid #ccc',
};

const UseCaseModal = ({ UseCaseDetails }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ }}>
      <Chip
        label="Use Case"
        onClick={handleOpen}
        clickable
        color="primary"
        variant="outlined"
        sx={{
          cursor: 'pointer',
          userSelect: 'none',
          fontWeight: 'medium',
          borderColor: 'black',
          color: 'black',
          width: '150px'
        }}
      />
      <Modal open={open} onClose={handleClose} aria-labelledby="contact-modal-title" aria-describedby="contact-modal-description">
        <Box sx={modalStyle}>
          <Typography id="contact-modal-title" variant="h6" component="h2" gutterBottom>
            Use Case
          </Typography>
          <Typography id="contact-modal-description" variant="body1">
            {UseCaseDetails}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default UseCaseModal;
