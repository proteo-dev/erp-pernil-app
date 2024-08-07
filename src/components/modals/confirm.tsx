import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/joy/IconButton";
import Tooltip from "@mui/joy/Tooltip";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

export default function ConfirmDeletionModal({ handleDelete }) {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <>
      <Tooltip
        sx={{ position: "absolute", bottom: 0, right: 1 }}
        title="Eliminar"
      >
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
        >
          <DeleteIcon color="error" sx={{ height: "17px" }} />
        </IconButton>
      </Tooltip>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmación
          </DialogTitle>
          <Divider />
          <DialogContent>
            Está seguro que quiere eliminar el siguiente elemento?
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => {
                handleDelete(); // le tengo que pasar el id
                setOpen(false);
              }}
            >
              Eliminar
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
}
