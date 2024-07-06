import { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../state";

import CustomGrid from "../custom-panel/index"

function SubCategories() {
  const { state, fetchData } = useContext(GlobalContext)
  const [subCategories, setSubCategories] = useState([])

  useEffect(() => {
    (async () => {
      const [subCategories, status] = await fetchData({
        path: state.routes.subCategories,
        query: `CategoryId=${state.card_selected.id}`,
      });

      if (status == 200) {
        setSubCategories(subCategories.data);
      }

    })()

  }, [])

  return <CustomGrid resource={state.routes.subCategories} title={"Sub categorias"}>{subCategories}</CustomGrid >
}

export default SubCategories