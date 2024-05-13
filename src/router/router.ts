import { Router } from '@vaadin/router';

const router = new Router(document.querySelector('.root'));

router.setRoutes([
	{ path: '/', component: 'login-page' },
	{
		path: '/home',
		component: 'home-page',
		children: [
			{ path: '/', component: 'categories-board' },
			{ path: '/productos', component: 'products-board' },
			{ path: '/productos/:category', component: 'custom-product' },
			{
				path: '/productos/:category/:product',
				component: 'product-overview',
			},
			{ path: '/crear', component: 'custom-form' },
		],
	},
]);

export { Router };
