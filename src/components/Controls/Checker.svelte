<script>
import { attempts } from "../../store/store";
function increment() {
  attempts.update((n) => n + 1);
}
</script>

<button on:click="{increment}">Check</button>

<style>
button {
  background: greenyellow;
  border: 1px solid green;
  padding: 12px;
}
</style>
