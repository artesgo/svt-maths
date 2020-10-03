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

<style>
.line {
  display: flex;
  justify-content: right;
  align-items: flex-start;
  border-top: 1px dashed black;
  padding-top: 8px;
}
</style>
