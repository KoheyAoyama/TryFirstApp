import { supabase } from './supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface Todo {
  id: string;
  user_id: string;
  text: string;
  completed: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface TodoInsert {
  text: string;
  completed?: boolean;
  tags?: string[];
}

export interface TodoUpdate {
  text?: string;
  completed?: boolean;
  tags?: string[];
}

/**
 * ユーザーのTodoを全て取得
 */
export async function fetchTodos(userId: string): Promise<Todo[]> {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching todos:', error);
    throw new Error('Todoの取得に失敗しました');
  }

  return data || [];
}

/**
 * Todoを追加
 */
export async function addTodo(userId: string, todo: TodoInsert): Promise<Todo> {
  const { data, error } = await supabase
    .from('todos')
    .insert({
      user_id: userId,
      text: todo.text,
      completed: todo.completed ?? false,
      tags: todo.tags ?? [],
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding todo:', error);
    throw new Error('Todoの追加に失敗しました');
  }

  return data;
}

/**
 * Todoを更新
 */
export async function updateTodo(
  todoId: string,
  updates: TodoUpdate
): Promise<Todo> {
  const { data, error } = await supabase
    .from('todos')
    .update(updates)
    .eq('id', todoId)
    .select()
    .single();

  if (error) {
    console.error('Error updating todo:', error);
    throw new Error('Todoの更新に失敗しました');
  }

  return data;
}

/**
 * Todoを削除
 */
export async function deleteTodo(todoId: string): Promise<void> {
  const { error } = await supabase.from('todos').delete().eq('id', todoId);

  if (error) {
    console.error('Error deleting todo:', error);
    throw new Error('Todoの削除に失敗しました');
  }
}

/**
 * リアルタイム同期のチャンネルを作成
 */
export function subscribeTodoChanges(
  userId: string,
  onInsert: (todo: Todo) => void,
  onUpdate: (todo: Todo) => void,
  onDelete: (todoId: string) => void
): RealtimeChannel {
  const channel = supabase
    .channel('todos-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'todos',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        onInsert(payload.new as Todo);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'todos',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        onUpdate(payload.new as Todo);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'todos',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        onDelete((payload.old as Todo).id);
      }
    )
    .subscribe();

  return channel;
}

