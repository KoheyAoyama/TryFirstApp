<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  export let isOpen: boolean = false;
  export let onClose: () => void;
  
  let menuElement: HTMLDivElement;
  
  function handleClickOutside(event: MouseEvent) {
    if (menuElement && !menuElement.contains(event.target as Node)) {
      onClose();
    }
  }
  
  onMount(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
  });
  
  onDestroy(() => {
    document.removeEventListener('click', handleClickOutside);
  });
  
  $: {
    if (isOpen) {
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 0);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
  }
</script>

<div bind:this={menuElement} class="relative">
  <slot name="trigger" />
  
  {#if isOpen}
    <div class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-10">
      <div class="py-1">
        <slot name="items" />
      </div>
    </div>
  {/if}
</div>

