<script lang="ts">
import { Difficulties } from "./../../models/difficulties";
import { settings, attempts } from "../../store/store";
let difficulty;
function dispatchDifficulty() {
  $attempts = 0;
  $settings.difficulty = difficulty;
}
</script>

<select on:blur="{dispatchDifficulty}" bind:value="{difficulty}">
  <option value="{Difficulties.easy}">Easy</option>
  <option value="{Difficulties.normal}">Normal</option>
  <option value="{Difficulties.hard}">Hard</option>
</select>
