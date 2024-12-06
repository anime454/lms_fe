import { Button, Box, Typography, Modal } from "@mui/material";

interface myModalProps {
    open: boolean;
    onClose: () => void;
}

export const MyModal = ({ open, onClose }:myModalProps) => {

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

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-title" variant="h6" color="primary" textAlign="center">
                    Modal Title
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }} textAlign="center">
                    This is a clean modal with a blue theme.
                </Typography>
                <Box textAlign="center" mt={3}>
                    <Button variant="contained" color="primary" onClick={onClose}>
                        ตกลง
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}