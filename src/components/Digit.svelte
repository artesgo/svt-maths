<script lang="ts">
    import { onDestroy } from 'svelte';

    import { attempts, errors } from './../store/store';
    export let error = false;
    export let position = 'ones';
    export let value = '';
    export let expected = '';
    export let check: boolean = false;
    export let helper: boolean = false;
    let _value = getValue();

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
            return $attempts > 0 ? value : '';
        }
        return value;
    }

    function doCheck() {
        error = false;
        if (expected != _value) {
            error = true;
            errors.update(n => n + 1);
        }
    }
</script>

{#if _value !== undefined}
<label class:helper={helper}>
    <input type="text"
        disabled={!check && !helper}
        class:error={error}
        class:correct={!error && $attempts > 0 && check}
        bind:value={_value} maxlength="1">
    {position}
</label>
{/if}

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

    label.helper {
        height: 24px;
    }

    label.helper input {
        height: 24px;
        background: plum;
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