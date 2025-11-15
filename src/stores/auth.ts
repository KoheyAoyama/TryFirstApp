import { writable } from 'svelte/store';
import { supabase } from '../lib/supabase';
import type { User, AuthError } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

function createAuthStore() {
  const { subscribe, set, update } = writable<AuthState>(initialState);

  // セッション状態を監視
  supabase.auth.onAuthStateChange((event, session) => {
    update((state) => ({
      ...state,
      user: session?.user ?? null,
      loading: false,
    }));
  });

  // 初期化時にセッションをチェック
  supabase.auth.getSession().then(({ data: { session } }) => {
    update((state) => ({
      ...state,
      user: session?.user ?? null,
      loading: false,
    }));
  });

  return {
    subscribe,

    // ユーザー登録
    signUp: async (email: string, password: string) => {
      update((state) => ({ ...state, loading: true, error: null }));

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        const errorMessage = getErrorMessage(error);
        update((state) => ({ ...state, loading: false, error: errorMessage }));
        return { success: false, error: errorMessage };
      }

      update((state) => ({
        ...state,
        user: data.user,
        loading: false,
        error: null,
      }));

      return { success: true, error: null };
    },

    // ログイン
    signIn: async (email: string, password: string) => {
      update((state) => ({ ...state, loading: true, error: null }));

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const errorMessage = getErrorMessage(error);
        update((state) => ({ ...state, loading: false, error: errorMessage }));
        return { success: false, error: errorMessage };
      }

      update((state) => ({
        ...state,
        user: data.user,
        loading: false,
        error: null,
      }));

      return { success: true, error: null };
    },

    // ログアウト
    signOut: async () => {
      update((state) => ({ ...state, loading: true, error: null }));

      const { error } = await supabase.auth.signOut();

      if (error) {
        const errorMessage = getErrorMessage(error);
        update((state) => ({ ...state, loading: false, error: errorMessage }));
        return { success: false, error: errorMessage };
      }

      update((state) => ({
        ...state,
        user: null,
        loading: false,
        error: null,
      }));

      return { success: true, error: null };
    },

    // エラーをクリア
    clearError: () => {
      update((state) => ({ ...state, error: null }));
    },
  };
}

// エラーメッセージを日本語に変換
function getErrorMessage(error: AuthError): string {
  switch (error.message) {
    case 'Invalid login credentials':
      return 'メールアドレスまたはパスワードが正しくありません';
    case 'Email not confirmed':
      return 'メールアドレスが確認されていません';
    case 'User already registered':
      return 'このメールアドレスは既に登録されています';
    case 'Password should be at least 6 characters':
      return 'パスワードは6文字以上である必要があります';
    case 'Unable to validate email address: invalid format':
      return '無効なメールアドレス形式です';
    default:
      return error.message || '認証エラーが発生しました';
  }
}

export const authStore = createAuthStore();

