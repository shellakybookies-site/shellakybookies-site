<script>
	import '@picocss/pico/css/pico.jade.css';
</script>

<header class="container">
	<nav>
		<ul>
			<strong>TITLE HERE</strong>
		</ul>
		<ul>
			<li>
				<details class="dropdown">
					<summary>Menu</summary>
					<ul dir="rtl">
						<li><a href="#">Profile</a></li>
						<li><a href="#">Settings</a></li>
						<li><a href="#">Security</a></li>
						<li><a href="#">Logout</a></li>
					</ul>
				</details>
			</li>
		</ul>
	</nav>
</header>
<main class="container">
	<slot />
</main>
