<script lang="ts">
    import { afterUpdate, onMount, tick } from 'svelte';
	import { UID } from './../utils/uid';
	import { place } from './../models/place';
    import Digit from "./Digit.svelte";
    export let term;
    export let check: boolean = false;
    let _term = [];

    afterUpdate(() => {
        _term = getDigits(term);
    });

    function getDigits(num: number): {id: number, digit: string}[] {
        return appendUid(num.toString().split(''));
    }

    function appendUid(digits: string[]): {id: number, digit: string}[] {
        return digits.map(digit => ({
            digit,
            id: UID.createId()
        }))
    }
    
    function getPosition(arr, index) {
        // what is the length of the array
        const length = arr.length;
        const places = place.slice(0,length).reverse();
        return places[index];
    }
</script>

<div class="line" class:answer={check}>
    {#each _term as value, index (value.id)}
    <Digit {check} 
        value={check ? '' : value.digit} 
        expected={value.digit} 
        position={getPosition(_term, index)} />
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