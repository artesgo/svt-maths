<script lang="ts">
import { onMount } from "svelte";
import { attempts, errors, settings } from "./../../store/store";
import { Operations } from "./../../models/operations";
import { Difficulties } from "./../../models/difficulties";
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
            <button on:click="{() => pop()}">- Work Line</button>
          </div>
        {/if}
        <HelperLine answer="{answer}" />
      {/each}

      <hr />

      <div class="helper-adder">
        <button on:click="{add}">+ Work Line</button>
      </div>
      <Line term="{answer}" check="{true}" />
    {/if}
  </section>
  <div class="spacer"></div>
</div>

<style>
h2 {
  font-size: 18px;
}
.question {
  display: flex;
  align-items: flex-end;
}
.spacer {
  width: 100%;
}
section {
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: flex-end;
  margin-right: 8px;
}
.helper-adder {
  position: relative;
}
.helper-adder button {
  position: absolute;
  left: 8px;
  white-space: nowrap;
  height: 36px;
}
.remove-helper {
  position: relative;
}
.remove-helper button {
  position: absolute;
  left: 8px;
  top: 9px;
  height: 24px;
  white-space: nowrap;
  padding: 0 4px;
}
hr {
  width: 100%;
  margin: 0 0 8px 0;
  /* padding: 0; */
}
</style>
