<script>
    import { attempts } from './../store/store';
    function increment() {
        attempts.update(n => 0);
    }
</script>

<button on:click={increment} on:click>New</button>
