<script>
import { Button } from "carbon-components-svelte";
import { settings, attempts } from "../../store/store";
function increment() {
  $attempts = 0;
  $settings.questionSet++;
}
</script>

<Button size="small" kind="secondary" on:click on:click="{increment}">
  New Questions
</Button>
