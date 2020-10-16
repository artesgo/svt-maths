<script lang="ts">
import { onDestroy } from "svelte";
import { attempts, errors } from "./../store/store";

export let error = false;
export let position = "ones";
export let value = "";
export let expected = "";
export let check: boolean = false;
export let helper: boolean = false;
let _value = getValue();
let ref;

// question: what's the diff between code run in the script vs in onMount?
// answer:

const unsub = attempts.subscribe((att) => {
  if (att && check) {
    doCheck();
  }
});

onDestroy(() => {
  check = false;
  unsub();
});

function getValue() {
  if (check) {
    return $attempts > 0 ? value : "";
  }
  return value;
}

function doCheck() {
  error = false;
  if (expected != _value) {
    error = true;
    errors.update((n) => n + 1);
  }
}
function focus() {
  ref.select();
}
</script>

{#if _value !== undefined}
  <label class:helper>
    <input
      type="text"
      bind:this="{ref}"
      on:click="{focus}"
      disabled="{!check && !helper}"
      class:error
      class:correct="{!error && $attempts > 0 && check}"
      bind:value="{_value}"
      maxlength="1"
    />
    {position}
  </label>
{/if}

<style lang="postcss">
label {
  @apply relative w-6 h-6 mb-2 invisible;
}
input {
  @apply w-6 h-6 border left-0 
    absolute visible inline-block
    text-center text-coal bg-none;
}

label.helper input {
  @apply bg-orange-lighter;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input.error {
  @apply bg-rose-bright;
}

input.correct {
  @apply bg-green-bright;
}
</style>
