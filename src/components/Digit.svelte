<script lang="ts">
    import { onMount } from 'svelte';

    import { attempts } from './../store/store';
    export let error = false;
    export let position = 'ones';
    export let value = '';
    export let expected = '';
    export let check: boolean = false;

    onMount(() => {
        if (check) {
            attempts.subscribe((att) => {
                if (att) {
                    doCheck();
                }
            });
        }
    });

    $: _value = getValue();

    function getValue() {
        if (check) {
            return $attempts > 0 ? value : '';
        }
        return value;
    }

    function doCheck() {
        error = false;
        if (expected != _value) {
            error = true;
        }
    }
</script>

<label>
    <input type="text"
        disabled={!check}
        class:error={error} 
        class:correct={!error && $attempts > 0 && check} 
        bind:value={_value} maxlength="1">
    {position}
</label>

<style>
    label {
        visibility: hidden;
        position: relative;
        width: 36px;
        height: 36px;
        margin-bottom: 8px;
    }
    input {
        left: 0;
        visibility: visible;
        position: absolute;
        border: 1px solid black;
        width: 36px;
        height: 36px;
        background: none;
        display: inline-block;
        text-align: center;
        color: #222;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input.error {
        background: pink;
    }

    input.correct {
        background: greenyellow;
    }
</style>