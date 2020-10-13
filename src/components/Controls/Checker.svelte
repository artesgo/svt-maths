<script>
import { attempts } from "../../store/store";
function increment() {
  attempts.update((n) => n + 1);
}
</script>

<button on:click="{increment}">Check</button>

<style lang="postcss">
button {
  @apply bg-orange-lighter
    border-orange-dark
    text-coal
    font-semibold
    border rounded-sm
    py-1 px-2;
}
button:hover {
  @apply bg-orange;
}
</style>
