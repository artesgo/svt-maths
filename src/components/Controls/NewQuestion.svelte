<script>
import { settings, attempts } from "../../store/store";
function increment() {
  $attempts = 0;
  $settings.questionSet++;
}
</script>

<button on:click="{increment}" on:click>New Questions</button>
