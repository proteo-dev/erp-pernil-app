import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";

import Alert from "./alert";

import { GlobalContext } from "../../state";

export default function InputModal({ location, handleClose }) {
  const { fetchData, state } = useContext(GlobalContext);
  const { categoryId } = useParams();
  const [modalState, setAlertModal] = useState({ open: false, message: "" });

  const handleCloseAlert = () => {
    setAlertModal((prev) => {
      return { ...prev, open: false };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formElements = e.currentTarget.elements;
    const inputs = {
      name: formElements.name.value,
    };

    if (location == state.routes.subCategories)
      inputs["CategoryId"] = categoryId;

    const [data, status] = await fetchData({
      method: "POST",
      path: location,
      data: inputs,
    });

    if (status == 201) {
      handleClose();
      window.location.replace("/");
    } else {
      setAlertModal({ open: true, message: data });
    }
  };

  return (
    <>
      <Modal open={true} onClose={() => handleClose()}>
        <ModalDialog>
          <DialogTitle>
            {location == state.routes.categories
              ? "CATEGORÍA"
              : "SUB-CATEGORÍA"}
          </DialogTitle>
          <DialogContent>
            Completá la información para crear la{" "}
            {location == state.routes.categories
              ? "categoría."
              : "subcategoría."}
          </DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input id="name" name="name" autoFocus required />
              </FormControl>
              <Button type="submit">Ok</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
      {modalState.open && (
        <Alert
          title="ALERTA"
          message={modalState.message}
          handleClose={handleCloseAlert}
        />
      )}
    </>
  );
}
