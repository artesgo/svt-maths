<script lang="ts">
import { afterUpdate } from "svelte";
import Digit from "./Digit.svelte";
import { getDigits, getPosition } from "./line.utils";

export let term;
export let check: boolean = false;

let _term = [];

afterUpdate(() => {
  _term = getDigits(term);
});
</script>

<div class="line" class:answer="{check}">
  {#each _term as value, index (value.id)}
    <Digit
      check="{check}"
      value="{check ? '' : value.digit}"
      expected="{value.digit}"
      position="{getPosition(_term, index)}"
    />
  {/each}
</div>

<style lang="postcss">
.line {
  @apply flex justify-end items-start;
}
</style>
