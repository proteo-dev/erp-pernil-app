// <form class="form">
// 	<input id=inputName type=text placeholder=Nombre required class=input />

// 	<div class=checkboxes>
// 		<div class="fields-container">
// 			<div>
// 				<label>Servicio</label>
// 				<input id=inputService type=radio name=productType class=radioBox />
// 			</div>

// 			<div>
// 				<label>Producto</label>
// 				<input id=inputProduct type=radio name=productType class=radioBox checked />
// 			</div>
// 		</div>

// 		<div class="fields-container">
// 			<div>
// 				<label for="buyCheck">Compra</label>
// 				<input id=inputBuy type=checkbox name=buyCheck class=checkbox checked />
// 			</div>

// 			<div>
// 				<label for="sellCheck">Venta</label>
// 				<input id=inputSell type=checkbox name=sellCheck class=checkbox checked />
// 			</div>
// 		</div>

// 		<div class="fields-container">
// 			<input id=inputStock type=number placeholder=Stock required class=input />
// 		</div>

// 		<div class="fields-container">
// 			<label for="inactiveCheck">Inactivo</label>
// 			<input id=inputInactive type=checkbox name=inactiveCheck class=checkbox />
// 		</div>
// 	</div>

// 	<input type=submit class=button />
// </form>

//   async addListeners() {
//     const ls = State.getState;

//     const formEl = this.shadow.querySelector(".form") as HTMLElement;

//     const inputNameEl = this.shadow.querySelector(
//       "#inputName"
//     ) as HTMLInputElement;
//     const inputProductEl = this.shadow.querySelector("#inputProduct") as any;
//     const inputServiceEl = this.shadow.querySelector("#inputService") as any;
//     const inputBuyEl = this.shadow.querySelector("#inputBuy") as any;
//     const inputSellEl = this.shadow.querySelector("#inputSell") as any;
//     const inputInactiveEl = this.shadow.querySelector("#inputInactive") as any;
//     const inputStockEl = this.shadow.querySelector(
//       "#inputStock"
//     ) as HTMLInputElement;

//     const name = inputNameEl.value;
//     const isProduct = inputProductEl.value;
//     const isService = inputServiceEl.value;
//     const buy = inputBuyEl.value;
//     const sell = inputSellEl.value;
//     const stock = inputStockEl.value;
//     const inactive = inputInactiveEl.value;

//     const action = this.getAttribute("action");

//     switch (action) {
//       case "get":
//         const [product, status] = await State.fetchData({
//           path: `${State.Routes.products}/${ls.card_selected.id}`,
//           method: "get",
//         });

//         if (status == 200) {
//           const { name, isProduct, isService, buy, sell, inactive, stock } =
//             product.data;

//           inputNameEl.value = name;
//           inputStockEl.value = stock;

//           inputProductEl.checked = isProduct;
//           inputServiceEl.checked = isService;
//           inputBuyEl.checked = buy;
//           inputSellEl.checked = sell;
//           inputInactiveEl.checked = inactive;
//         }

//         // const body: any = {
//         // 	name,
//         // 	stock,
//         // 	isProduct,
//         // 	isService,
//         // 	buy,
//         // 	sell,
//         // 	inactive,
//         // 	SubcategoryId: ls.card_selected.id,
//         // };

//         // State.fetchData({ path: State.Routes.products, method: "update", body });
//         break;

//       default:
//         formEl.addEventListener("submit", () => {
//           const body: any = {
//             name,
//             stock,
//             isProduct,
//             isService,
//             buy,
//             sell,
//             inactive,
//             SubcategoryId: ls.card_selected.id,
//           };

//           State.fetchData({
//             path: State.Routes.products,
//             method: "post",
//             body,
//           });
//         });
//         break;
//     }
//   }
// }

import * as React from "react";
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

export default function ProductModal() {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>PRODUCTOS</DialogTitle>
          <DialogContent>
            Completá la información para crear el producto.
          </DialogContent>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Tipo</FormLabel>
                <RadioGroup defaultValue="female" name="radio-buttons-group">
                  <Radio value="Product" label="Producto" />
                  <Radio value="service" label="Servicio" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <Box sx={{ display: "flex", gap: 3 }}>
                  <Checkbox label="Compra" defaultChecked />
                  <Checkbox label="Venta" defaultChecked />
                </Box>
              </FormControl>
              <FormControl>
                <FormLabel>Stock</FormLabel>
                <Input
                  type="number"
                  placeholder="Stock"
                  defaultValue={1}
                  slotProps={{
                    input: {
                      min: 0,
                      step: 1,
                    },
                  }}
                />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
