<script lang="ts">
  export let value: string = '';
  export let placeholder: string = '';
  export let id: string = '';
  export let type: string = 'text';
  export let disabled: boolean = false;
  export let inputElement: HTMLInputElement | undefined = undefined;

  function handleInput(e: Event) {
    value = (e.target as HTMLInputElement).value;
  }
</script>

<input
  {type}
  {id}
  {value}
  bind:this={inputElement}
  {placeholder}
  {disabled}
  on:input={handleInput}
  on:keydown
  on:keyup
  on:keypress
  on:focus
  on:blur
  on:compositionstart
  on:compositionend
  class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
/>

