<script lang="ts">
  import Input from './components/Input.svelte';
  import Button from './components/Button.svelte';
  import Checkbox from './components/Checkbox.svelte';
  import Drawer from './components/Drawer.svelte';
  import Menu from './components/Menu.svelte';

  interface Todo {
    id: number;
    text: string;
    completed: boolean;
    tags: string[];
  }

  let todos: Todo[] = [];
  let newTodoText: string = '';
  let newTodoTags: string = '';
  let newTagInput: string = '';
  let editingId: number | null = null;
  let editingText: string = '';
  let editingTags: string[] = [];
  let editingTagInput: string = '';
  let selectedTag: string | null = null;
  let isDrawerOpen: boolean = false;
  let completedSelectedTag: string | null = null;
  let openMenuId: number | null = null;
  
  let tagInputElement: HTMLInputElement;

  // すべてのタグを取得（重複なし）
  $: allTags = [...new Set(todos.flatMap(todo => todo.tags))];
  
  // 完了済みTodoのタグ
  $: completedTags = [...new Set(todos.filter(t => t.completed).flatMap(todo => todo.tags))];

  // 未完了Todoのフィルタリングリスト
  $: activeTodos = todos.filter(todo => {
    // 未完了のみ
    if (todo.completed) {
      return false;
    }
    
    // タグでフィルタリング
    if (selectedTag && !todo.tags.includes(selectedTag)) {
      return false;
    }
    
    return true;
  });
  
  // 完了済みTodoのフィルタリングリスト
  $: completedTodos = todos.filter(todo => {
    // 完了済みのみ
    if (!todo.completed) {
      return false;
    }
    
    // タグでフィルタリング
    if (completedSelectedTag && !todo.tags.includes(completedSelectedTag)) {
      return false;
    }
    
    return true;
  });

  function parseTags(tagString: string): string[] {
    return tagString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
  }

  function addTodo() {
    if (newTodoText.trim() === '') return;
    
    // タグ入力中のテキストがあれば自動的に追加
    if (newTagInput.trim() !== '') {
      addTagToNew();
    }
    
    const tags = parseTags(newTodoTags);
    
    const newTodo: Todo = {
      id: Date.now(),
      text: newTodoText.trim(),
      completed: false,
      tags: tags,
    };
    
    todos = [...todos, newTodo];
    newTodoText = '';
    newTodoTags = '';
  }

  function deleteTodo(id: number) {
    todos = todos.filter(todo => todo.id !== id);
  }

  function toggleComplete(id: number) {
    todos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }

  function startEdit(todo: Todo) {
    editingId = todo.id;
    editingText = todo.text;
    editingTags = [...todo.tags];
  }

  function saveEdit() {
    if (editingId === null || editingText.trim() === '') return;
    
    todos = todos.map(todo =>
      todo.id === editingId
        ? { ...todo, text: editingText.trim(), tags: editingTags }
        : todo
    );
    
    editingId = null;
    editingText = '';
    editingTags = [];
  }

  function addTagToEditing() {
    if (editingTagInput.trim() !== '') {
      const tag = editingTagInput.trim();
      if (!editingTags.includes(tag)) {
        editingTags = [...editingTags, tag];
      }
      editingTagInput = '';
    }
  }

  function removeTagFromEditing(tag: string) {
    editingTags = editingTags.filter(t => t !== tag);
  }

  function addTagToNew() {
    if (newTagInput.trim() !== '') {
      const tag = newTagInput.trim();
      if (!newTodoTags.split(',').map(t => t.trim()).includes(tag)) {
        newTodoTags = newTodoTags
          ? `${newTodoTags}, ${tag}`
          : tag;
      }
      newTagInput = '';
    }
  }


  function cancelEdit() {
    editingId = null;
    editingText = '';
    editingTags = [];
  }

  function handleTodoInputKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (event.ctrlKey || event.metaKey) {
        // Ctrl+Enter or Cmd+Enter で直接追加
        addTodo();
      } else {
        // Enter でタグ入力フィールドにフォーカス
        event.preventDefault();
        tagInputElement?.focus();
      }
    }
  }
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
  <div class="max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
      Todoアプリ
    </h1>

    <!-- 2カラムレイアウト -->
    <div class="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6">
      <!-- 左カラム: Todo入力 -->
      <div class="space-y-6">
        <!-- Todo追加フォーム -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Todo
              </label>
              <Input
                bind:value={newTodoText}
                placeholder="新しいTodoを入力... (Enter: タグ入力へ / Ctrl+Enter: 直接追加)"
                on:keydown={handleTodoInputKeydown}
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                タグ（オプション）
              </label>
              <Input
                bind:value={newTagInput}
                bind:inputElement={tagInputElement}
                placeholder="タグを入力してEnterで追加..."
                on:keydown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTagToNew();
                  }
                }}
              />
            </div>
            {#if newTodoTags}
              <div class="flex flex-wrap gap-2">
                {#each parseTags(newTodoTags) as tag}
                  <span
                    class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      on:click={() => {
                        const tags = parseTags(newTodoTags).filter(t => t !== tag);
                        newTodoTags = tags.join(', ');
                      }}
                      class="hover:text-blue-600 dark:hover:text-blue-300"
                    >
                      ×
                    </button>
                  </span>
                {/each}
              </div>
            {/if}
            <div>
              <button
                type="button"
                on:click={addTodo}
                disabled={!newTodoText.trim()}
                class="w-full px-4 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
              >
                Todoを追加
              </button>
            </div>
          </div>
        </div>

        <!-- 完了済み表示ボタン -->
        <button
          type="button"
          on:click={() => isDrawerOpen = true}
          class="w-full px-4 py-2 rounded-lg font-medium text-sm transition-colors bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 flex items-center justify-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          完了済みを表示
        </button>
      </div>

      <!-- 右カラム: フィルターとTodo一覧 -->
      <div class="space-y-6">
        <!-- タグフィルター -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">タグでフィルター</span>
          
          {#if allTags.length > 0}
            <div class="flex flex-wrap gap-2">
              <button
                type="button"
                on:click={() => selectedTag = null}
                class="px-3 py-1 rounded-md text-sm transition-colors {selectedTag === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}"
              >
                すべて
              </button>
              {#each allTags as tag}
                <button
                  type="button"
                  on:click={() => selectedTag = selectedTag === tag ? null : tag}
                  class="px-3 py-1 rounded-md text-sm transition-colors {selectedTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}"
                >
                  {tag}
                </button>
              {/each}
            </div>
          {:else}
            <p class="text-sm text-gray-500 dark:text-gray-400">タグがありません</p>
          {/if}
        </div>

        <!-- 未完了Todoリスト -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-visible">
      {#if activeTodos.length === 0}
        <div class="p-8 text-center text-gray-500 dark:text-gray-400">
          {#if todos.filter(t => !t.completed).length === 0}
            未完了のTodoがありません。すべて完了しました！
          {:else if selectedTag}
            「{selectedTag}」タグの未完了Todoがありません。
          {:else}
            Todoがありません。上記のフォームから追加してください。
          {/if}
        </div>
      {:else}
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          {#each activeTodos as todo (todo.id)}
            <li class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              {#if editingId === todo.id}
                <!-- 編集モード -->
                <div class="space-y-3">
                  <div class="flex items-center gap-2">
                    <div class="flex-1">
                      <Input
                        bind:value={editingText}
                        on:keydown={(e) => {
                          if (e.key === 'Enter') {
                            saveEdit();
                          } else if (e.key === 'Escape') {
                            cancelEdit();
                          }
                        }}
                      />
                    </div>
                    <Button onClick={saveEdit} variant="primary">
                      保存
                    </Button>
                    <Button onClick={cancelEdit} variant="secondary">
                      キャンセル
                    </Button>
                  </div>
                  <div>
                    <Input
                      bind:value={editingTagInput}
                      placeholder="タグを入力してEnterで追加..."
                      on:keydown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTagToEditing();
                        }
                      }}
                    />
                  </div>
                  {#if editingTags.length > 0}
                    <div class="flex flex-wrap gap-2">
                      {#each editingTags as tag}
                        <span
                          class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            on:click={() => removeTagFromEditing(tag)}
                            class="hover:text-blue-600 dark:hover:text-blue-300"
                          >
                            ×
                          </button>
                        </span>
                      {/each}
                    </div>
                  {/if}
                </div>
              {:else}
                <!-- 表示モード -->
                <div class="space-y-2">
                  <div class="flex items-center gap-3">
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                    />
                    <span
                      class="flex-1 text-gray-900 dark:text-gray-100 {todo.completed
                        ? 'line-through text-gray-500 dark:text-gray-400'
                        : ''}"
                    >
                      {todo.text}
                    </span>
                    
                    <!-- オプションメニュー -->
                    <Menu 
                      isOpen={openMenuId === todo.id} 
                      onClose={() => openMenuId = null}
                    >
                      <button
                        slot="trigger"
                        type="button"
                        on:click|stopPropagation={() => openMenuId = openMenuId === todo.id ? null : todo.id}
                        class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        aria-label="オプション"
                      >
                        <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                      </button>
                      
                      <div slot="items">
                        <button
                          type="button"
                          on:click={() => {
                            startEdit(todo);
                            openMenuId = null;
                          }}
                          class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          編集
                        </button>
                        <button
                          type="button"
                          on:click={() => {
                            deleteTodo(todo.id);
                            openMenuId = null;
                          }}
                          class="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          削除
                        </button>
                      </div>
                    </Menu>
                  </div>
                  {#if todo.tags.length > 0}
                    <div class="flex flex-wrap gap-2 ml-7">
                      {#each todo.tags as tag}
                        <span
                          class="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm"
                        >
                          {tag}
                        </span>
                      {/each}
                    </div>
                  {/if}
                </div>
              {/if}
            </li>
          {/each}
        </ul>
      {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 完了済みTodoのDrawer -->
<Drawer isOpen={isDrawerOpen} onClose={() => isDrawerOpen = false}>
  <!-- タグフィルター -->
  {#if completedTags.length > 0}
    <div class="mb-4">
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">タグでフィルター</span>
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          on:click={() => completedSelectedTag = null}
          class="px-3 py-1 rounded-md text-sm transition-colors {completedSelectedTag === null
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}"
        >
          すべて
        </button>
        {#each completedTags as tag}
          <button
            type="button"
            on:click={() => completedSelectedTag = completedSelectedTag === tag ? null : tag}
            class="px-3 py-1 rounded-md text-sm transition-colors {completedSelectedTag === tag
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}"
          >
            {tag}
          </button>
        {/each}
      </div>
    </div>
  {/if}

  <!-- 完了済みTodoリスト -->
  {#if completedTodos.length === 0}
    <div class="p-8 text-center text-gray-500 dark:text-gray-400">
      {#if completedSelectedTag}
        「{completedSelectedTag}」タグの完了済みTodoがありません。
      {:else}
        完了済みのTodoがありません。
      {/if}
    </div>
  {:else}
    <ul class="divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {#each completedTodos as todo (todo.id)}
        <li class="p-4 bg-gray-50 dark:bg-gray-700">
          <div class="space-y-2">
            <div class="flex items-center gap-3">
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              <span class="flex-1 text-gray-500 dark:text-gray-400 line-through">
                {todo.text}
              </span>
              <Button
                onClick={() => deleteTodo(todo.id)}
                variant="danger"
              >
                削除
              </Button>
            </div>
            {#if todo.tags.length > 0}
              <div class="flex flex-wrap gap-2 ml-7">
                {#each todo.tags as tag}
                  <span
                    class="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm opacity-75"
                  >
                    {tag}
                  </span>
                {/each}
              </div>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</Drawer>

