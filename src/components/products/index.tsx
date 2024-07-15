import { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../state";

import CustomGrid from "../custom-panel/index"

function Products() {
  const { state, fetchData } = useContext(GlobalContext)
  const [products, setProducts] = useState([])

  useEffect(() => {
    (async () => {
      const [products, status] = await fetchData({
        path: state.routes.products,
        query: `SubcategoryId=${state.card_selected.id}`,
      });

      if (status == 200) {
        setProducts(products.data?.rows);
      }
    })()

  }, [])

  return <CustomGrid resource={state.routes.products} title={"Productos"}>{products}</CustomGrid>
}

export default Products