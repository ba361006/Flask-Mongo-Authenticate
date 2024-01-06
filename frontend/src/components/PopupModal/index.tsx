import { Box, Modal, Typography, IconButton } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { useEffect } from 'react';
// import { useAppSelector } from "../../hooks";

interface IProps {
  open: boolean;
  onClose: (arr: boolean) => void;
}

const PopupModal = ({ open, onClose }: IProps) => {
  useEffect(() => {}, []);

  const handleClose = () => {
    onClose(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          height: '90%',
          maxHeight: 800,
          maxWidth: 1200,
          overflow: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4
        }}
      >
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6'>Test Popup Modal</Typography>
          <Box>
            <IconButton onClick={handleClose}>
              <CloseRounded />
            </IconButton>
          </Box>
        </Box>
        <Typography>{`test content`}</Typography>
      </Box>
    </Modal>
  );
};

export default PopupModal;
