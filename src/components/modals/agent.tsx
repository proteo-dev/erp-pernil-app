import { useContext, useState, useEffect } from "react";

import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Checkbox from "@mui/joy/Checkbox";

import Alert from "./alert";

import { GlobalContext } from "../../state";

export default function AgentModal({ location, agentId, action, handleClose }) {
  const { fetchData, state } = useContext(GlobalContext);
  const [modalState, setAlertModal] = useState({ open: false, message: "" });
  const [elements, setElements] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    socialNetwork: "",
    isActive: true,
  });

  let title: string;
  let path: string;

  if (location == state.routes.suppliers) {
    path = state.routes.suppliers;
    title = "PROVEEDORES";
  } else {
    path = state.routes.clients;
    title = "CLIENTES";
  }

  const handleCloseAlert = () => {
    setAlertModal((prev) => {
      return { ...prev, open: false };
    });
  };

  const getDataFromDb = async () => {
    const [response, status] = await fetchData({
      path: `${path}/${agentId}`,
    });

    if (status == 200) {
      setElements((prev) => {
        return {
          ...prev,
          ...response.data,
        };
      });
    } else {
      setAlertModal({ open: true, message: response });
    }
  };

  useEffect(() => {
    if (action == "GET") {
      getDataFromDb();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formElements = e.currentTarget.elements;

    const data = {
      name: formElements.name.value,
      address: formElements.address.value,
      email: formElements.email.value,
      socialNetwork: formElements.socialNetwork.value,
      phoneNumber: formElements.phoneNumber.value,
      isActive: formElements.isActive.checked,
    };

    let method = "POST";

    if (action == "GET") {
      method = "PATCH";
      path = `${path}/${agentId}`;
    }

    const [agent, status] = await fetchData({ method, path, data });

    if (
      (method == "POST" && status == 201) ||
      (method == "PATCH" && status == 200)
    ) {
      handleClose();
    } else {
      setAlertModal({ open: true, message: agent });
    }
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setElements((prev) => {
          return {
            ...prev,
            name: e.target.value,
          };
        });
        break;

      case "email":
        setElements((prev) => {
          return { ...prev, email: e.target.value };
        });
        break;

      case "address":
        setElements((prev) => {
          return {
            ...prev,
            address: e.target.value,
          };
        });
        break;

      case "socialNetwork":
        setElements((prev) => {
          return { ...prev, socialNetwork: e.target.value };
        });
        break;

      case "phoneNumber":
        setElements((prev) => {
          return {
            ...prev,
            phoneNumber: e.target.value,
          };
        });
        break;

      case "isActive":
        setElements((prev) => {
          return {
            ...prev,
            isActive: e.target.checked,
          };
        });
        break;
    }
  };

  return (
    <>
      <Modal open={true} onClose={() => handleClose()}>
        <ModalDialog sx={{ width: "450px" }}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>Completá la información.</DialogContent>
          <form id="agentForm" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input
                  onChange={handleChange}
                  value={elements.name}
                  id="name"
                  name="name"
                  placeholder="Nombre o razón social"
                  autoFocus
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Dirección</FormLabel>
                <Input
                  onChange={handleChange}
                  id="address"
                  name="address"
                  placeholder="Dirección"
                  value={elements.address}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ejemplo@dominio.com"
                  value={elements.email}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Red social</FormLabel>
                <Input
                  onChange={handleChange}
                  id="socialNetwork"
                  name="socialNetwork"
                  placeholder="www.dominio.com"
                  value={elements.socialNetwork}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Teléfono</FormLabel>
                <Input
                  onChange={handleChange}
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+54 11 1111 1111"
                  value={elements.phoneNumber}
                />
              </FormControl>
              <FormControl>
                <Checkbox
                  size="lg"
                  id="isActive"
                  name="isActive"
                  label="Activo"
                  checked={elements.isActive}
                  onChange={handleChange}
                />
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
