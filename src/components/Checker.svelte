<script>
    import { attempts } from './../store/store';
    function increment() {
        attempts.update(n => n + 1);
    }
</script>

<button on:click={increment}>Check</button>

