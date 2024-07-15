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
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Box from "@mui/joy/Box";
import Checkbox from "@mui/joy/Checkbox";

import Alert from "./alert";

import { GlobalContext } from "../../state";

export default function ProductModal({ action, handleClose }) {
  const { fetchData, state } = useContext(GlobalContext);
  const [modalState, setAlertModal] = useState({ open: false, message: "" });
  const [elements, setElements] = useState({
    title: "",
    stock: 1,
    buy: true,
    sell: true,
    product: false,
    service: false,
  });

  const handleCloseAlert = () => {
    setAlertModal((prev) => {
      return { ...prev, open: false }
    })
  };

  const getDataFromDb = async () => {
    const [response, status] = await fetchData({
      path: `products/${state.card_selected.id}`,
    });

    if (status == 200) {
      const { name, stock, buy, sell, isService } = response.data;

      setElements((prev) => {
        return {
          ...prev,
          title: name,
          stock,
          buy,
          sell,
          service: isService,
          product: !isService,
        };
      });
    } else {
      alert(response);
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
      name: formElements.title.value,
      stock: formElements.stock.value,
      isService: formElements.service.checked,
      buy: formElements.buy.checked,
      sell: formElements.sell.checked,
      CategoryId: state.card_selected.CategoryId,
      SubcategoryId: state.card_selected.id,
    };

    let method = "POST";
    let path = "products";

    if (action == "GET") {
      method = "PATCH";
      path = "products/" + state.card_selected.id;
    }

    const [product, status] = await fetchData({ method, path, data });

    if (method == "POST" && status == 201 || method == "PATCH" && status == 200) {
      handleClose()
      location.replace("/");
    } else {
      setAlertModal({ open: true, message: product.response })
    }
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "title":
        setElements((prev) => {
          return {
            ...prev,
            title: e.target.value,
          };
        });
        break;
      case "product":
        setElements((prev) => {
          return {
            ...prev,
            product: e.target.checked,
            service: !e.target.checked,
          };
        });
        break;
      case "service":
        setElements((prev) => {
          return {
            ...prev,
            service: e.target.checked,
            product: !e.target.checked,
          };
        });
        break;
      case "buy":
        setElements((prev) => {
          return { ...prev, buy: e.target.checked };
        });
        break;
      case "sell":
        setElements((prev) => {
          return { ...prev, sell: e.target.checked };
        });
        break;
      case "stock":
        setElements((prev) => {
          return {
            ...prev,
            stock: e.target.value,
          };
        });
        break;
    }
  };

  return <>
    <Modal open={true} onClose={() => handleClose()}>
      <ModalDialog>
        <DialogTitle>PRODUCTOS</DialogTitle>
        <DialogContent>Completá la información del producto.</DialogContent>
        <form id="productForm" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Descripción</FormLabel>
              <Input
                onChange={handleChange}
                value={elements.title}
                id="title"
                name="title"
                autoFocus
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Tipo</FormLabel>
              <RadioGroup name="radio-buttons-group">
                <Radio
                  onChange={handleChange}
                  name="product"
                  value="product"
                  label="Producto"
                  checked={elements.product}
                />
                <Radio
                  onChange={handleChange}
                  name="service"
                  value="service"
                  label="Servicio"
                  checked={elements.service}
                />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <Box sx={{ display: "flex", gap: 3 }}>
                <Checkbox
                  onChange={handleChange}
                  id="buy"
                  name="buy"
                  label="Compra"
                  checked={elements.buy}
                />
                <Checkbox
                  onChange={handleChange}
                  id="sell"
                  name="sell"
                  label="Venta"
                  checked={elements.sell}
                />
              </Box>
            </FormControl>
            <FormControl>
              <FormLabel>Stock</FormLabel>
              <Input
                onChange={handleChange}
                id="stock"
                name="stock"
                type="number"
                placeholder="Stock"
                value={elements.stock}
                slotProps={{
                  input: {
                    min: 0,
                    step: 1,
                  },
                }}
              />
            </FormControl>
            <Button type="submit">Ok</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
    {modalState.open && <Alert title="ALERTA" message={modalState.message} handleClose={handleCloseAlert} />}
  </>
}
