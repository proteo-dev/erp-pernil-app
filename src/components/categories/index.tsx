import { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../state";

import CustomPanel from "../custom-panel/index"

function Categories() {
  const { state, fetchData } = useContext(GlobalContext)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    (async () => {
      const [categories, status] = await fetchData({ path: state.routes.categories });

      if (status == 200) {
        setCategories(categories.data?.rows);
      }

    })()
  }, [])

  return <CustomPanel resource={state.routes.categories} title={"Categorias"}>{categories}</CustomPanel >

}

export default Categories