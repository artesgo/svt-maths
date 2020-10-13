<script lang="ts">
import { afterUpdate } from "svelte";
import { getDigits, getPosition } from "./line.utils";
import Digit from "./Digit.svelte";
export let answer;
let _answer = [];
afterUpdate(() => {
  _answer = getDigits(answer);
});
</script>

<div class="line">
  {#each _answer as value, index (value.id)}
    <Digit
      check="{false}"
      helper="{true}"
      position="{getPosition(_answer, index)}"
    />
  {/each}
</div>

<style lang="postcss">
.line {
  @apply flex justify-end items-start border-t border-dashed pt-1;
}
</style>
