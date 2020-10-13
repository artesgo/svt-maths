<script lang="ts">
import TailwindCss from "./TailwindCss.svelte";
import CarbonCss from "./CarbonCss.svelte";
import Auth from "./components/firebase/auth/Auth.svelte";
import DifficultyControls from "./components/Controls/DifficultyControls.svelte";
import OperationControls from "./components/Controls/OperationControls.svelte";
import NewQuestion from "./components/Controls/NewQuestion.svelte";
import Checker from "./components/Controls/Checker.svelte";
import QuestionList from "./components/QuestionList.svelte";
import { attempts, errors } from "./store/store";
import GlobalCss from "./GlobalCss.svelte";
</script>

<header>
  <GlobalCss />
  <CarbonCss />
  <TailwindCss />
  <div class="app-header">
    <h1>Svelte Mathematics</h1>
    <Auth />
  </div>
  <div class="app-controls">
    <OperationControls />
    <DifficultyControls />
    <NewQuestion />
  </div>
</header>
<main>
  <QuestionList />

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

<style lang="postcss">
header {
  @apply flex justify-between
    px-4
    border-b bg-gray-bright;
}

.app-header {
  @apply flex flex-col justify-between;
}

.app-header h1 {
  @apply text-xl pt-3;
}

.app-controls {
  @apply flex flex-col justify-end;
}

main {
  @apply mx-auto p-3 pb-8;
}

@media (min-width: 640px) {
  header {
    margin: 0 auto;
  }
  main {
    @apply w-4/5;
  }
}

footer {
  position: fixed;
  @apply w-full left-0 bottom-0
    bg-gray-bright border-t;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @apply py-4 px-6;
}
</style>
