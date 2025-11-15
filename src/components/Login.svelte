<script lang="ts">
  import { authStore } from '../stores/auth';
  import Input from './Input.svelte';
  import Button from './Button.svelte';

  let email = '';
  let password = '';
  let isSignUp = false;
  let errorMessage = '';
  let successMessage = '';
  let isLoading = false;

  // IME (日本語入力) 判定用フラグ
  let isComposing = false;

  async function handleSubmit() {
    errorMessage = '';
    successMessage = '';
    isLoading = true;

    if (!email || !password) {
      errorMessage = 'メールアドレスとパスワードを入力してください';
      isLoading = false;
      return;
    }

    if (password.length < 6) {
      errorMessage = 'パスワードは6文字以上である必要があります';
      isLoading = false;
      return;
    }

    try {
      if (isSignUp) {
        const result = await authStore.signUp(email, password);
        if (result.success) {
          successMessage = '登録が完了しました。確認メールをご確認ください。';
          email = '';
          password = '';
        } else {
          errorMessage = result.error || '登録に失敗しました';
        }
      } else {
        const result = await authStore.signIn(email, password);
        if (!result.success) {
          errorMessage = result.error || 'ログインに失敗しました';
        }
      }
    } catch (error) {
      errorMessage = '予期しないエラーが発生しました';
      console.error('Auth error:', error);
    } finally {
      isLoading = false;
    }
  }

  function toggleMode() {
    isSignUp = !isSignUp;
    errorMessage = '';
    successMessage = '';
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !isComposing) {
      handleSubmit();
    }
  }
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
        {isSignUp ? '新規登録' : 'ログイン'}
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Todoアプリ
      </p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <form class="space-y-6" on:submit|preventDefault={handleSubmit}>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            メールアドレス
          </label>
          <Input
            id="email"
            type="email"
            bind:value={email}
            placeholder="your@email.com"
            disabled={isLoading}
            on:keydown={handleKeydown}
            on:compositionstart={() => (isComposing = true)}
            on:compositionend={() => (isComposing = false)}
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            パスワード
          </label>
          <Input
            id="password"
            type="password"
            bind:value={password}
            placeholder="••••••••"
            disabled={isLoading}
            on:keydown={handleKeydown}
            on:compositionstart={() => (isComposing = true)}
            on:compositionend={() => (isComposing = false)}
          />
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            6文字以上
          </p>
        </div>

        {#if errorMessage}
          <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
            <p class="text-sm text-red-600 dark:text-red-400">
              {errorMessage}
            </p>
          </div>
        {/if}

        {#if successMessage}
          <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3">
            <p class="text-sm text-green-600 dark:text-green-400">
              {successMessage}
            </p>
          </div>
        {/if}

        <div>
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            <span class="w-full text-center">
              {#if isLoading}
                処理中...
              {:else if isSignUp}
                登録
              {:else}
                ログイン
              {/if}
            </span>
          </Button>
        </div>
      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              または
            </span>
          </div>
        </div>

        <div class="mt-6">
          <button
            type="button"
            on:click={toggleMode}
            disabled={isLoading}
            class="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium disabled:opacity-50"
          >
            {isSignUp ? 'すでにアカウントをお持ちの方はこちら' : '新規登録はこちら'}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

