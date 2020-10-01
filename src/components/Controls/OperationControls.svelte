<script lang="ts">
    import { Operations } from '../../models/operations';
    import { settings } from '../../store/store';
    let operation;
    function dispatchOperation() {
        $settings.operation = operation;
    }
</script>

<select on:blur={dispatchOperation} bind:value={operation}>
    <option value={Operations.add}>Add</option>
    <option value={Operations.subtract}>Subtract</option>
    <option value={Operations.multiply}>Multiply</option>
    <option value={Operations.divide}>Divide</option>
</select>