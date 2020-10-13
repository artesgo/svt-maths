<script lang="ts">
import { Select, SelectItem } from "carbon-components-svelte";
import { Difficulties } from "./../../models/difficulties";
import { settings, attempts } from "../../store/store";
function dispatchDifficulty(event) {
  if (event?.detail) {
    $attempts = 0;
    $settings.difficulty = Number.parseInt(event.detail);
  }
}
</script>

<Select
  size="sm"
  hideLabel
  labelText="Difficulty"
  on:change="{dispatchDifficulty}"
>
  <SelectItem value="{Difficulties.easy.toString()}" text="Easy" />
  <SelectItem value="{Difficulties.normal.toString()}" text="Normal" />
  <SelectItem value="{Difficulties.hard.toString()}" text="Hard" />
</Select>
