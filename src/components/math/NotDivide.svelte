<script lang='ts'>
    import { onMount } from "svelte";
    import { attempts, errors, settings } from "./../../store/store";
	import { Operations } from './../../models/operations';
    import { Difficulties } from './../../models/difficulties';
    import { generateQuestion } from './../../utils/generator';

    import Line from "./../Line.svelte";

    let answer;
    let terms = [];
    let helpers = [1];

    onMount(() => {
        settings.subscribe((settings) => {
            const ret = generateQuestion(settings.difficulty, settings.operation);
            terms = [...ret.terms];
            answer = ret.answer;
        });
    });
</script>

<h2 class="question-text">
    Question:
    {#each terms as item, i}
        {#if i < terms.length - 1 && i !== 0}{$settings.operation}{/if}{item}
    {/each}
</h2>
<div class="question">
    <section>
        {#each terms as term, index}
        <Line {term} />
        {/each}

        {#each helpers as term}
        <Line term={''} />
        {/each}

        {#if answer !== undefined}
        <Line term={answer} check={true}/>
        {/if}
    </section>
</div>

<style>
    h2 {
        font-size: 18px;
    }
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