<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  
  export let isOpen: boolean = false;
  export let onClose: () => void;
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpen) {
      onClose();
    }
  }
  
  function handleOverlayClick() {
    onClose();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <!-- オーバーレイ -->
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-40"
    on:click={handleOverlayClick}
    transition:fade={{ duration: 200 }}
  ></div>
  
  <!-- Drawerパネル -->
  <div
    class="fixed top-0 right-0 h-full w-full md:w-1/2 lg:w-2/5 bg-white dark:bg-gray-800 shadow-2xl z-50 overflow-y-auto"
    transition:fly={{ x: 400, duration: 300 }}
  >
    <div class="p-6">
      <!-- ヘッダー -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          完了済みTodo
        </h2>
        <button
          type="button"
          on:click={onClose}
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          aria-label="閉じる"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- コンテンツ -->
      <div>
        <slot />
      </div>
    </div>
  </div>
{/if}

