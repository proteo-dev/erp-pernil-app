
function LoginPage() {

	return <main className="login__container">
		<h1 className="login__title"> P E R N I L </h1>

		<form className="login__form" autoComplete="off">
			<input type="name" name="username" placeholder="U S E R N A M E" required />
			<input type="password" name="password" placeholder="P A S S W O R D" required />
			<button type="submit" name="button">Login</button>
		</form>
	</main>
}

export default LoginPage

{/* addListeners() {
		const formEl = this.querySelector('.login__form') as HTMLFormElement;

		formEl.addEventListener('submit', async (e) => {
			e.preventDefault();

			const username = formEl.username.value;
			const password = formEl.password.value;

			console.log('username -->', username);
			console.log('password -->', password);

			// Lógica de login.

			Router.go('/');
		});
	} */}
