import * as React from 'react';
import {
    Typography,
    Box,
    Button,
    Modal
} from '@mui/material';

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

const ContactModal =({contactDetails})=> {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return(
    <Box>
        <Button variant="contained" onClick={handleOpen}>
                Contact Details
        </Button>
        <Modal
                open={open}
                onClose={handleClose}
        >
            <Box sx={style}>
                <Typography>
                    Contact: {contactDetails}
                </Typography>
                </Box>
            </Modal>
    </Box>
        
  
  )
}
export default ContactModal;
