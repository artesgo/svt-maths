<script lang="ts">
import NotDivide from "./math/NotDivide.svelte";
import { Operations } from "../models/operations";
import { settings } from "../store/store";
import Divide from "./math/Divide.svelte";
let questions = new Array(4);
</script>

<section>
  {#each questions as question}
    {#if $settings.operation === Operations.divide}
      <div>
        <Divide />
      </div>
    {:else}
      <div>
        <NotDivide />
      </div>
    {/if}
  {/each}
</section>

<style>
@media (min-width: 1200px) {
  section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 60px;
  }
}
</style>
