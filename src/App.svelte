<script lang="ts">
	import Question from "./components/Question.svelte";
</script>

<main>
	<Question></Question>
</main>

<style>
	main {
		padding: 1em;
		width: 640px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>