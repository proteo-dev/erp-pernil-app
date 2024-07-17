import { useState } from "react";

import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalOverflow from "@mui/joy/ModalOverflow";
import Typography from "@mui/joy/Typography";

import DataGrid from "../data-grid";

export default function SearchModal({ catchSelectedItem, operation }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (e) => {
    catchSelectedItem({ id: e.id, operation });
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Buscar
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalOverflow>
          <ModalDialog
            aria-labelledby="modal-dialog-overflow"
            layout="fullscreen"
          >
            <ModalClose />
            <Typography id="modal-dialog-overflow" level="h2">
              Búsqueda
            </Typography>
            <DataGrid operation={operation} handleSelect={handleSelect} />
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </>
  );
}
