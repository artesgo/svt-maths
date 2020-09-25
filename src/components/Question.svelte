<script lang="ts">
    import { onMount } from "svelte";
	import { Operations } from './../models/operations';
	import { Difficulties } from './../models/difficulties';
    import Checker from "./Checker.svelte";
    import NewQuestion from "./NewQuestion.svelte";
    import { attempts } from "../store/store";
    import Line from "./Line.svelte";
    export let operation = Operations.subtract;
    export let difficulty = Difficulties.normal;
    let answer;
    let terms: number[] = [];

    onMount(() => {
        generateQuestion();
    });

    function generateQuestion() {
        let _diff = 10;
        if (difficulty === Difficulties.normal) {
            _diff = 100;
        } else if (difficulty === Difficulties.hard) {
            _diff = 1000;
        }
        terms = [];
        terms = [...terms, generateNumber(_diff)];
        terms = [...terms, generateNumber(_diff)];
        switch (operation) {
            case Operations.subtract:
                answer = terms.reduce((acc, i) => acc - i);
                break;
            case Operations.divide:
                answer = terms.reduce((acc, i) => acc * i);
                break;
            case Operations.multiply:
            default:
                answer = terms.reduce((acc, i) => acc + i);
                break;
        }
    }

    function generateNumber(diff: number): number {
        return Math.floor(Math.random() * diff);
    }
    function getOperator() {
        let op = '+';
        switch (operation) {
            case Operations.multiply:
                op = '*';
                break;
            case Operations.subtract:
                op = '-';
                break;
            case Operations.divide:
                op = '/';
                break;
            default:
                op = '+';
                break;
        }
        return op;
    }
</script>
<div class="question-text">
    Question:
    {#each terms as item, i}
        {#if i > 0}{getOperator()}{/if}{item}
    {/each}
</div>
<div class="question">
    <section>
        {#each terms as term, index}
        <Line {term} operator={(index === terms.length - 1) ? getOperator() : ''} />
        {/each}

        {#if answer}
        <Line term={answer} check={true}/>
        {/if}
    </section>
    <Checker />
    <NewQuestion on:click={generateQuestion} />
</div>
Attempts: {$attempts}

<style>
    .question {
        display: flex;
        align-items: flex-end;
    }
    section {
        display: flex;
        flex-direction: column;
        justify-content: end;
        align-items: flex-end;
        width: 300px;
        margin-right: 8px;
    }
</style>