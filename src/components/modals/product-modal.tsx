import { useContext, useState, Fragment, useEffect } from "react";

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

import { GlobalContext } from "../../state";

export default function ProductModal({ action }) {
  const [elements, setElements] = useState({ title: "", stock: 1, buy: true, sell: true, service: false });
  const [open, setOpen] = useState<boolean>(true);

  const { fetchData, state } = useContext(GlobalContext);

  useEffect(() => {
    const getDataFromDb = async () => {
      const [response, status] = await fetchData({ path: `products/${state.card_selected.id}` })

      if (status == 200) {
        const { name, stock, buy, sell, isService } = response.data

        setElements({ title: name, stock, buy, sell, service: isService })
      } else {
        console.log(response);
      }
    }

    if (action == "GET") {
      getDataFromDb()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formElements = e.currentTarget.elements;

    const data = {
      name: formElements.title.value,
      stock: formElements.stock.value,
      isService: formElements.service.checked,
      buy: formElements.buy.checked,
      sell: formElements.sell.checked,
      SubcategoryId: state.card_selected.id,
    };

    setOpen(false);

    const [response, status] = await fetchData({ method: "POST", path: "products", data })

    if (status == 201) {
      location.replace("/")
    } else {
      console.log(response);
    }
  }

  return (
    <Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>PRODUCTOS</DialogTitle>
          <DialogContent>
            Completá la información del producto.
          </DialogContent>
          <form id="productForm" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Descripción</FormLabel>
                <Input value={elements.title} id="title" name="title" autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Tipo</FormLabel>
                <RadioGroup value={elements.service ? "service" : "product"} name="radio-buttons-group">
                  <Radio name="product" value="product" label="Producto" />
                  <Radio name="service" value="service" label="Servicio" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <Box sx={{ display: "flex", gap: 3 }}>
                  <Checkbox id="buy" name="buy" label="Compra" checked={elements.buy} />
                  <Checkbox id="sell" name="sell" label="Venta" checked={elements.sell} />
                </Box>
              </FormControl>
              <FormControl>
                <FormLabel>Stock</FormLabel>
                <Input
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
    </Fragment>
  );
}
