import { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../state";

import CustomGrid from "../custom-grid/index"

function Categories() {
  const { state, fetchData } = useContext(GlobalContext)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    (async () => {
      const [categories, status] = await fetchData({ path: state.routes.categories });

      if (status == 200) {
        setCategories(categories.data);
      }

    })()
  }, [])

  return <CustomGrid resource={state.routes.categories} title={"Categorias"}>{categories}</CustomGrid >

}

export default Categories