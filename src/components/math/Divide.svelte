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
let dividend;
let divisor;
let helpers = [1, 2];

onMount(() => {
  settings.subscribe((settings) => {
    const ret = generateQuestion(settings.difficulty, settings.operation);
    let [_divisor, _dividend] = ret.terms;
    dividend = _dividend;
    divisor = _divisor;
    terms = ret.terms;
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
  {#each terms.reverse() as item, i}
    {#if i !== 0}{$settings.operation}{/if}{item}
  {/each}
</h2>

<div class="question">
  <div class="spacer"></div>
  <section>
    {#if answer !== undefined}
      <Line term="{answer}" check="{true}" />

      <div class="helper-adder">
        <div class="button">
          <Button icon="{Add16}" size="small" kind="tertiary" on:click="{add}">
            <span class="sr-only">Add</span>
            Work
          </Button>
        </div>
      </div>

      <div class="divisor-dividend">
        <div class="divisor">
          <Line term="{divisor}" />
        </div>
        <div class="division-symbol">
          <div class="division-unskew">
            <Line term="{dividend}" />
          </div>
        </div>
      </div>

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
        <HelperLine answer="{dividend}" />
      {/each}
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
  @apply flex flex-col justify-end items-end
    mr-2 w-4/5;
}
.helper-adder {
  position: relative;
}
.helper-adder .button {
  margin-top: 9px;
  @apply h-6 left-0 ml-2 px-3 absolute whitespace-no-wrap
    border rounded-sm border-coal;
}
.remove-helper {
  position: relative;
}

.remove-helper .button {
  margin-top: 9px;
  @apply left-0 ml-2 px-3 absolute whitespace-no-wrap
    border rounded-sm border-coal;
}
.divisor-dividend {
  display: flex;
  align-items: center;
}
.divisor {
  padding-top: 9px;
}
.division-symbol {
  transform: skew(-12deg, 0);
  @apply ml-2 pt-2 pl-2 
    border-coal border-solid border-t border-l;
}
.division-unskew {
  transform: skew(12deg, 0);
}
</style>
