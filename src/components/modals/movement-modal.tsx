import { useContext, useState } from "react";

import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

import SearchModal from "./search-modal";
import Alert from "./alert";

import { GlobalContext } from "../../state";

export default function MovementModal({ operation, handleClose }) {
  const { fetchData, state } = useContext(GlobalContext);
  const [modalState, setAlertModal] = useState({ open: false, message: "" });
  const [isDataVisible, setDataVisible] = useState(false);

  const [elements, setElements] = useState({
    amountPerUnit: 1,
    amountToPaid: 1,
    units: 1,
    paymentMethod: "efectivo",
    agentId: "",
    ProductId: "",
  });

  const isSalesOperation = operation == "ventas";

  const handleCloseAlert = () => {
    setAlertModal((prev) => {
      return { ...prev, open: false };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputs = {
      ProductId: elements.ProductId,
      paymentMethod: elements.paymentMethod,
      units: elements.units,
      amount: elements.amountToPaid,
    };

    if (isSalesOperation) {
      inputs["ClientId"] = elements.agentId;
    } else {
      inputs["SupplierId"] = elements.agentId;
    }

    const method = "POST";
    const path = state.routes.movements;

    const [data, status] = await fetchData({ method, path, inputs });

    if (status == 201) {
      handleClose();
      location.replace("/");
    } else {
      setAlertModal({ open: true, message: data });
    }
  };

  const handleChange = async (e) => {
    const value = e.target.name || e.target.role;

    switch (value) {
      case "agent":
        setElements((prev) => {
          return {
            ...prev,
            agentId: e.target.value,
          };
        });
        break;

      case "product":
        setElements((prev) => {
          return {
            ...prev,
            ProductId: e.target.value,
          };
        });

        if (!parseInt(e.target.value)) {
          setDataVisible(false);
        } else {
          setDataVisible(true);
        }

        break;

      case "amountPerUnit":
        setElements((prev) => {
          return {
            ...prev,
            amountPerUnit: e.target.value,
            amountToPaid: e.target.value * prev.units,
          };
        });
        break;

      case "amountToPaid":
        setElements((prev) => {
          return {
            ...prev,
            amountToPaid: e.target.value,
            amountPerUnit: Math.round(e.target.value / prev.units),
          };
        });
        break;

      case "units":
        setElements((prev) => {
          return {
            ...prev,
            units: e.target.value,
            amountToPaid: prev.amountPerUnit * e.target.value,
          };
        });
        break;

      case "option":
        setElements((prev) => {
          return { ...prev, paymentMethod: e.target.innerText };
        });
        break;
    }
  };

  const catchSelectedItem = ({ data, operation }) => {
    switch (operation) {
      case "productos":
        setElements((prev) => {
          return {
            ...prev,
            ProductId: data.id,
            amountPerUnit: data.sellPrice,
            amountToPaid: data.sellPrice * prev.units,
          };
        });

        setDataVisible(true);
        break;

      case "ventas" || "compras":
        setElements((prev) => {
          return { ...prev, agentId: data.id };
        });

        break;
    }
  };

  return (
    <>
      <Modal open={true} onClose={() => handleClose()}>
        <ModalDialog>
          <DialogTitle>Movimientos</DialogTitle>
          <DialogContent>Completá la información.</DialogContent>
          <form id="movementForm" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Codigo producto</FormLabel>
                <Input
                  onChange={handleChange}
                  value={elements.ProductId}
                  type="number"
                  id="product"
                  name="product"
                  autoFocus
                  required
                  endDecorator={
                    <SearchModal
                      catchSelectedItem={catchSelectedItem}
                      operation="productos"
                    />
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  Codigo {isSalesOperation ? "cliente" : "proveedor"}
                </FormLabel>
                <Input
                  onChange={handleChange}
                  value={elements.agentId}
                  id="agent"
                  name="agent"
                  type="number"
                  autoFocus
                  required
                  endDecorator={
                    <SearchModal
                      catchSelectedItem={catchSelectedItem}
                      operation={operation}
                    />
                  }
                />
              </FormControl>
              {isDataVisible && (
                <>
                  <FormControl>
                    <FormLabel>Unidades</FormLabel>
                    <Input
                      onChange={handleChange}
                      id="units"
                      name="units"
                      type="number"
                      value={elements.units}
                      slotProps={{
                        input: {
                          min: 1,
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Monto X u.</FormLabel>
                    <Input
                      onChange={handleChange}
                      id="amountPerUnit"
                      name="amountPerUnit"
                      type="number"
                      startDecorator={"$"}
                      value={elements.amountPerUnit}
                      slotProps={{
                        input: {
                          min: 1,
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Monto total</FormLabel>
                    <Input
                      onChange={handleChange}
                      id="amountToPaid"
                      name="amountToPaid"
                      type="number"
                      startDecorator={"$"}
                      value={elements.amountToPaid}
                      slotProps={{
                        input: {
                          min: 1,
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Método de pago</FormLabel>
                    <Select onChange={handleChange} defaultValue="cash">
                      <Option id="cash" value="cash">
                        efectivo
                      </Option>
                      <Option id="transfer" value="transfer">
                        transferencia
                      </Option>
                      <Option id="mp" value="mp">
                        mercado pago
                      </Option>
                      <Option id="creditCard" value="creditCard">
                        tarjeta de credito
                      </Option>
                      <Option id="debitCard" value="debitCard">
                        tarjeta de debito
                      </Option>
                    </Select>
                  </FormControl>
                  <Button type="submit">Ok</Button>
                </>
              )}
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
