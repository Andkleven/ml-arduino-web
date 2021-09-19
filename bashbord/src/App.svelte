<script>
	import Chart from './Chart.svelte';
</script>

<main>
	<h1>Hello World!</h1>
	<Chart/>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}


	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>