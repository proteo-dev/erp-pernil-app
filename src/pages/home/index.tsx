import MainLayout from "../layout"
import { Outlet } from "react-router-dom"

function HomePage() {
	return <>
		<MainLayout />
		<section className="main">
			<Outlet />
		</section>
	</>
}

export default HomePage