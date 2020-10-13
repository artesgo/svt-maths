<script lang="ts">
import { onMount } from "svelte";
import { Button } from "carbon-components-svelte";
import Add16 from "carbon-icons-svelte/lib/Add16";
import Subtract16 from "carbon-icons-svelte/lib/Subtract16";
import { settings } from "./../../store/store";
import { generateQuestion } from "./../../utils/generator";

import Line from "./../Line.svelte";
import HelperLine from "./../HelperLine.svelte";

let answer;
let terms = [];
let helpers = [];

onMount(() => {
  settings.subscribe((settings) => {
    const ret = generateQuestion(settings.difficulty, settings.operation);
    terms = [...ret.terms];
    answer = ret.answer;
  });
});

function pop() {
  helpers.splice(0, 1);
  helpers = [...helpers];
}

function add() {
  helpers = [...helpers, 0];
}
</script>

<h2 class="question-text">
  Question:
  {#each terms as item, i}
    {#if i < terms.length - 1 && i !== 0}{$settings.operation}{/if}{item}
  {/each}
</h2>

<div class="question">
  <div class="spacer"></div>
  <section>
    {#each terms as term, index}
      <Line term="{term}" />
    {/each}

    {#if answer !== undefined}
      {#each helpers as term, hi}
        {#if helpers.length === hi + 1}
          <div class="remove-helper">
            <div class="button">
              <Button
                icon="{Subtract16}"
                size="small"
                kind="tertiary"
                on:click="{() => pop()}"
              >
                <span class="sr-only"> Remove </span>
                Work
              </Button>
            </div>
          </div>
        {/if}
        <HelperLine answer="{answer}" />
      {/each}

      <hr />

      <div class="helper-adder">
        <div class="button">
          <Button icon="{Add16}" size="small" kind="tertiary" on:click="{add}">
            <span class="sr-only">Add</span>
            Work
          </Button>
        </div>
      </div>
      <Line term="{answer}" check="{true}" />
    {/if}
  </section>
  <div class="spacer"></div>
</div>

<style lang="postcss">
h2 {
  @apply text-lg;
}
.question {
  @apply flex items-end;
}
.spacer {
  @apply w-full;
}
section {
  @apply mr-1 flex flex-col justify-end items-end;
}
.helper-adder {
  position: relative;
}
.helper-adder .button {
  position: absolute;
  white-space: nowrap;
  @apply h-5 left-0 ml-1 px-0
    border rounded-sm border-coal;
}
.remove-helper {
  position: relative;
}
.remove-helper .button {
  position: absolute;
  top: 9px;
  white-space: nowrap;
  @apply px-0 left-0 ml-1;
}
hr {
  @apply w-full mb-1;
}
</style>
