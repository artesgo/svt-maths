<script lang="ts">
import { afterUpdate } from "svelte";
import { fly } from "svelte/transition";
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
    <div transition:fly="{{ y: -100, x: 0, duration: 300 }}">
      <Digit
        check="{check}"
        value="{check ? '' : value.digit}"
        expected="{value.digit}"
        position="{getPosition(_term, index)}"
      />
    </div>
  {/each}
</div>

<style>
.line {
  display: flex;
  justify-content: right;
  align-items: flex-start;
}

.answer {
  border-top: 1px solid black;
  padding-top: 8px;
}
</style>
