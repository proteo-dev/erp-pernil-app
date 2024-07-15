import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

function Alert({ title, message, handleClose }) {
    return <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={true}
        onClose={handleClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
        <Sheet
            variant="outlined"
            sx={{
                maxWidth: 500,
                borderRadius: 'md',
                p: 3,
                boxShadow: 'lg',
            }}>
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <Typography
                component="h2"
                id="modal-title"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                mb={1}
            >{title}</Typography>
            <Typography id="modal-desc" textColor="text.tertiary">{message}</Typography>
        </Sheet>
    </Modal>
}

export default Alert