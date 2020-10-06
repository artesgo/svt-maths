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
        <button on:click="{add}">+ Work Line</button>
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
            <button on:click="{() => pop()}">- Work Line</button>
          </div>
        {/if}
        <HelperLine answer="{dividend}" />
      {/each}
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
  width: 70%;
  margin-right: 8px;
}
.helper-adder {
  position: relative;
}
.helper-adder button {
  position: absolute;
  left: 8px;
  top: 9px;
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
.divisor-dividend {
  display: flex;
  align-items: center;
}
.divisor {
  padding-top: 9px;
}
.division-symbol {
  margin-left: 8px;
  padding: 8px 0 0 8px;
  border-top: 1px solid black;
  border-left: 1px solid black;
  transform: skew(-12deg, 0);
}
.division-unskew {
  transform: skew(12deg, 0);
}
</style>
