<script lang="ts">
import { Select, SelectItem } from "carbon-components-svelte";
import { Operations } from "../../models/operations";
import { settings, attempts } from "../../store/store";
function dispatchOperation(event) {
  if (event?.detail) {
    $attempts = 0;
    $settings.operation = event.detail;
  }
}
</script>

<Select
  size="sm"
  hideLabel
  labelText="Operation"
  on:change="{dispatchOperation}"
>
  <SelectItem value="{Operations.add}" text="Add" />
  <SelectItem value="{Operations.subtract}" text="Subtract" />
  <SelectItem value="{Operations.multiply}" text="Multiply" />
  <SelectItem value="{Operations.divide}" text="Divide" />
</Select>
