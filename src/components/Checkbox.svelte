<script lang="ts">
  export let checked: boolean = false;
  export let onChange: ((checked: boolean) => void) | undefined = undefined;
  
  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (onChange) {
      onChange(target.checked);
    }
  }
</script>

<input
  type="checkbox"
  {checked}
  on:change={handleChange}
  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
/>

