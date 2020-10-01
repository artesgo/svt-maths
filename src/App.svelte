<script lang="ts">
	import DifficultyControls from './components/Controls/DifficultyControls.svelte';
	import OperationControls from './components/Controls/OperationControls.svelte';
	import NewQuestion from './components/Controls/NewQuestion.svelte';
	import Checker from './components/Controls/Checker.svelte';
	import QuestionList from "./components/QuestionList.svelte";
	import { attempts, errors } from './store/store';
</script>

<main>
	<header>
		<h1>MQuest</h1>
		<div>
			<OperationControls />
			<DifficultyControls />
			<NewQuestion />
		</div>
	</header>

	<QuestionList  />

	<footer>
		<div class="container">
			<div>Your Stats:</div>
			<div>
				<div>Attempts: {$attempts}</div>
				<div>Errors: {$errors}</div>
			</div>
			<Checker />
		</div>
	</footer>
</main>

<style>
	header {
		border-bottom: 1px solid black;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	main {
		padding: 1em 1em 120px 1em;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			width: 60%;
		}
	}
	
    footer {
        bottom: 0;
        left: 0;
        width: 100%;
        position: fixed;
        border-top: 1px solid green;
		background: white;
    }
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px 48px;
    }
</style>