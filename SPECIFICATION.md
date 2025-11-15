# Todoアプリ 詳細仕様書

## 目次
1. [プロジェクト概要](#プロジェクト概要)
2. [技術スタック](#技術スタック)
3. [システムアーキテクチャ](#システムアーキテクチャ)
4. [データ構造](#データ構造)
5. [機能仕様](#機能仕様)
6. [UIコンポーネント仕様](#uiコンポーネント仕様)
7. [レイアウト仕様](#レイアウト仕様)
8. [インタラクション仕様](#インタラクション仕様)
9. [スタイリング仕様](#スタイリング仕様)
10. [ビルドとデプロイ](#ビルドとデプロイ)

---

## プロジェクト概要

### プロジェクト名
**Todoアプリ v1.0**

### 概要
Svelte + Tailwind CSS + Supabaseで構築されたモダンなTodo管理アプリケーション。タグベースのフィルタリング、完了済みTodoの分離表示、キーボードショートカット対応など、高度なUX機能を備える。Supabaseによるユーザー認証とクラウドストレージ、リアルタイム同期機能により、複数デバイスでのTodo管理が可能。

### 主な特徴
- **ユーザー認証**: メールアドレス・パスワードによる認証
- **クラウドストレージ**: Supabase PostgreSQLによるデータ永続化
- **リアルタイム同期**: 複数デバイス間でのリアルタイムTodo同期
- **セキュリティ**: Row Level Security (RLS)による安全なデータアクセス
- タグ機能による柔軟な分類とフィルタリング
- 完了済みTodoはDrawerで分離表示
- 直感的なキーボードショートカット
- ダークモード対応
- レスポンシブデザイン
- 2カラムレイアウト（デスクトップ）

---

## 技術スタック

### フロントエンドフレームワーク
- **Svelte 4.2.7**
  - リアクティブなUIフレームワーク
  - コンパイル時最適化により高速な実行
  - ボイラープレートコードの削減

### バックエンド / BaaS
- **Supabase**
  - **@supabase/supabase-js 2.39.0**
  - PostgreSQLベースのデータベース
  - ユーザー認証 (Supabase Auth)
  - Row Level Security (RLS) によるデータ保護
  - リアルタイム同期機能

### ビルドツール
- **Vite 5.0.8**
  - 高速な開発サーバー
  - ES Modulesベースのビルド
  - ホットモジュール置換（HMR）対応
  - 環境変数サポート

### 言語
- **TypeScript 5.2.2**
  - 型安全性
  - インテリセンスサポート
  - コンパイル時エラー検出

### スタイリング
- **Tailwind CSS 3.4.0**
  - ユーティリティファーストCSS
  - カスタマイズ可能なデザインシステム
  - ダークモード対応（クラスベース）
- **PostCSS 8.4.32**
  - CSS変換処理
- **Autoprefixer 10.4.16**
  - ベンダープレフィックス自動付与

### 開発ツール
- **svelte-check 3.6.0**
  - 型チェックとリンティング
- **@tsconfig/svelte 5.0.0**
  - Svelte用TypeScript設定

---

## システムアーキテクチャ

### プロジェクト構造
```
TryFirstApp/
├── src/
│   ├── components/          # 再利用可能なUIコンポーネント
│   │   ├── Button.svelte    # ボタンコンポーネント
│   │   ├── Checkbox.svelte  # チェックボックスコンポーネント
│   │   ├── Drawer.svelte    # サイドドロワーコンポーネント
│   │   ├── Input.svelte     # テキスト入力コンポーネント
│   │   ├── Login.svelte     # ログイン/登録コンポーネント
│   │   └── Menu.svelte      # ドロップダウンメニューコンポーネント
│   ├── lib/                 # ライブラリ/ユーティリティ
│   │   ├── supabase.ts      # Supabase初期化と型定義
│   │   └── todoService.ts   # Todo CRUD操作関数
│   ├── stores/              # Svelte stores
│   │   └── auth.ts          # 認証ストア
│   ├── App.svelte           # メインアプリケーションコンポーネント
│   ├── main.ts              # アプリケーションエントリーポイント
│   ├── app.css              # グローバルスタイル（Tailwind インポート）
│   └── vite-env.d.ts        # Vite型定義
├── supabase/
│   └── migrations/          # データベースマイグレーション
│       └── 001_create_todos_table.sql  # todosテーブル作成SQL
├── dist/                    # ビルド出力ディレクトリ
├── .env                     # 環境変数（gitignore対象）
├── .env.example             # 環境変数テンプレート
├── index.html               # HTMLエントリーポイント
├── package.json             # プロジェクト設定と依存関係
├── vite.config.ts           # Viteビルド設定
├── tailwind.config.js       # Tailwind CSS設定
├── postcss.config.js        # PostCSS設定
├── tsconfig.json            # TypeScript設定
├── svelte.config.js         # Svelte設定
├── README.md                # プロジェクト概要
├── DEPLOY.md                # デプロイ手順
└── SPECIFICATION.md         # 本仕様書
```

### アーキテクチャパターン
- **コンポーネントベースアーキテクチャ**: 再利用可能なUIコンポーネントの分離
- **単一ページアプリケーション（SPA）**: クライアントサイドレンダリング
- **リアクティブステート管理**: Svelteのリアクティブ変数とstoresを使用
- **プレゼンテーションとロジックの分離**: コンポーネントはUIのみを担当
- **BaaS統合**: Supabaseによるバックエンド機能の統合
- **認証ファースト**: ログイン状態に応じたUI切り替え
- **リアルタイム同期**: PostgreSQLのリアルタイムリスナーによる自動同期

---

## データ構造

### データベーススキーマ

#### todosテーブル
```sql
CREATE TABLE public.todos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

**インデックス:**
- `todos_user_id_idx`: user_idによる高速検索
- `todos_created_at_idx`: created_atによるソート最適化

**Row Level Security (RLS) ポリシー:**
- SELECT: ユーザーは自分のTodoのみ閲覧可能
- INSERT: ユーザーは自分のTodoのみ作成可能
- UPDATE: ユーザーは自分のTodoのみ更新可能
- DELETE: ユーザーは自分のTodoのみ削除可能

### TypeScript型定義

```typescript
interface Todo {
  id: string;           // UUID
  user_id: string;      // ユーザーID (UUID)
  text: string;         // Todoテキスト
  completed: boolean;   // 完了フラグ
  tags: string[];       // タグ配列
  created_at: string;   // 作成日時 (ISO 8601)
  updated_at: string;   // 更新日時 (ISO 8601)
}
```

### ステート管理

#### 認証ステート (stores/auth.ts)
```typescript
interface AuthState {
  user: User | null;      // 現在のユーザー (Supabase Auth User)
  loading: boolean;       // 認証処理中フラグ
  error: string | null;   // エラーメッセージ
}
```

#### メインステート
```typescript
let todos: Todo[] = [];                        // Todo項目のリスト（Supabaseから取得）
let isLoadingTodos: boolean = false;           // Todo読み込み中フラグ
let errorMessage: string = '';                 // エラーメッセージ
let realtimeChannel: RealtimeChannel | null;   // リアルタイム購読チャンネル
```

#### 新規Todo作成用ステート
```typescript
let newTodoText: string = '';                  // 新規Todoテキスト
let newTodoTags: string = '';                  // 新規Todoタグ（カンマ区切り）
let newTagInput: string = '';                  // タグ入力フィールドの値
```

#### 編集モード用ステート
```typescript
let editingId: string | null = null;           // 編集中のTodo ID (UUID)
let editingText: string = '';                  // 編集中のテキスト
let editingTags: string[] = [];                // 編集中のタグ配列
let editingTagInput: string = '';              // 編集中タグ入力値
```

#### UIステート
```typescript
let selectedTag: string | null = null;         // 未完了Todo用フィルタータグ
let isDrawerOpen: boolean = false;             // Drawer開閉状態
let completedSelectedTag: string | null = null;// 完了済みTodo用フィルタータグ
let openMenuId: string | null = null;          // 開いているメニューのTodo ID (UUID)
```

#### DOM参照
```typescript
let tagInputElement: HTMLInputElement;         // タグ入力要素への参照
```

### 算出プロパティ（リアクティブステートメント）

```typescript
// 認証ストアから現在のユーザーを取得
$: user = $authStore.user;
$: authLoading = $authStore.loading;

// すべてのタグ（重複なし）
$: allTags = [...new Set(todos.flatMap(todo => todo.tags))];

// 完了済みTodoのタグ
$: completedTags = [...new Set(todos.filter(t => t.completed).flatMap(todo => todo.tags))];

// フィルタリングされた未完了Todo
$: activeTodos = todos.filter(todo => {
  if (todo.completed) return false;
  if (selectedTag && !todo.tags.includes(selectedTag)) return false;
  return true;
});

// フィルタリングされた完了済みTodo
$: completedTodos = todos.filter(todo => {
  if (!todo.completed) return false;
  if (completedSelectedTag && !todo.tags.includes(completedSelectedTag)) return false;
  return true;
});

// ユーザーログイン時の副作用
$: if (user && !authLoading) {
  loadTodos();           // Todoを読み込み
  setupRealtimeSubscription();  // リアルタイム購読開始
}
```

---

## 機能仕様

### 0. 認証機能

#### 0.1 ユーザー登録
- **機能**: 新規ユーザーアカウントを作成
- **入力**: メールアドレス、パスワード（6文字以上）
- **処理**:
  1. メールアドレスとパスワードをバリデーション
  2. Supabase Authで新規ユーザー作成
  3. 確認メールを送信（Supabase設定による）
  4. 成功メッセージを表示
- **エラー処理**: 日本語エラーメッセージを表示
- **バリデーション**: 
  - メールアドレス形式チェック
  - パスワード6文字以上

#### 0.2 ログイン
- **機能**: 既存ユーザーでログイン
- **入力**: メールアドレス、パスワード
- **処理**:
  1. 認証情報をバリデーション
  2. Supabase Authでログイン
  3. セッション確立
  4. メインアプリ画面に遷移
- **エラー処理**: 認証失敗時に日本語エラーメッセージ
- **キーボードショートカット**: `Enter`でログイン実行

#### 0.3 ログアウト
- **機能**: 現在のセッションを終了
- **トリガー**: ヘッダーのログアウトボタン
- **処理**:
  1. Supabase Authからサインアウト
  2. ローカルステートをクリア
  3. ログイン画面に遷移
  4. リアルタイム購読を解除

#### 0.4 セッション管理
- **自動セッション復元**: ページリロード時にSupabaseセッションを自動復元
- **認証状態監視**: `onAuthStateChange`でリアルタイム監視
- **トークンリフレッシュ**: Supabaseが自動処理

### 1. Todo管理機能

#### 1.1 Todo追加
- **機能**: 新しいTodoを作成
- **入力**: Todoテキスト、タグ（オプション）
- **処理**:
  1. Todoテキストが空でないことを検証
  2. タグ入力中の場合、自動的にタグリストに追加
  3. タグ文字列をパース（カンマ区切り）
  4. Supabaseに非同期でTodoを追加 (`addTodo`関数)
  5. UUIDが自動生成され、user_idと共に保存
  6. 成功時にローカルステートを更新
  7. 入力フィールドをクリア
- **バリデーション**: Todoテキストが空の場合は追加ボタンが無効化
- **同期**: 他のデバイスにリアルタイム通知

#### 1.2 Todo編集
- **機能**: 既存のTodoのテキストとタグを編集
- **トリガー**: オプションメニューの「編集」ボタン
- **処理**:
  1. 編集モードに切り替え
  2. 既存のテキストとタグを編集用ステートにコピー
  3. インライン編集UIを表示
  4. 保存時にSupabaseでTodoを更新 (`updateTodo`関数)
  5. 成功時にローカルステートを更新
- **キーボードショートカット**:
  - `Enter`: 変更を保存
  - `Esc`: 編集をキャンセル
- **同期**: 他のデバイスにリアルタイム通知

#### 1.3 Todo削除
- **機能**: Todoを完全に削除
- **トリガー**: オプションメニューの「削除」ボタン、または完了済みDrawer内の削除ボタン
- **処理**: 
  1. SupabaseからTodoを削除 (`deleteTodo`関数)
  2. 成功時にローカルステートから除外
- **同期**: 他のデバイスにリアルタイム通知

#### 1.4 完了/未完了切り替え
- **機能**: Todoの完了状態をトグル
- **トリガー**: チェックボックスをクリック
- **処理**:
  1. Todo項目の`completed`フラグを反転
  2. Supabaseで更新 (`updateTodo`関数)
  3. 完了時: メインリストから消え、完了済みDrawerに表示
  4. 未完了に戻す: Drawerから消え、メインリストに表示
- **同期**: 他のデバイスにリアルタイム通知

#### 1.5 Todo読み込み
- **機能**: ログイン時にユーザーのTodoを全て読み込み
- **トリガー**: ログイン成功後の自動実行
- **処理**:
  1. Supabaseから現在のユーザーのTodoを取得 (`fetchTodos`関数)
  2. created_at順にソートして取得
  3. ローカルステートに格納
  4. ローディング状態を管理
- **RLSによる保護**: ユーザーは自分のTodoのみ取得可能

#### 1.6 リアルタイム同期
- **機能**: 他のデバイスでの変更をリアルタイムに反映
- **トリガー**: ログイン時にチャンネル購読開始
- **処理**:
  1. PostgreSQLのリアルタイムリスナーを設定
  2. INSERT: 新しいTodoが追加されたらローカルに反映
  3. UPDATE: Todoが更新されたらローカルを更新
  4. DELETE: Todoが削除されたらローカルから除外
- **クリーンアップ**: コンポーネント破棄時にチャンネルをunsubscribe

### 2. タグ機能

#### 2.1 タグ追加（新規Todo）
- **入力方法**: タグ入力フィールドに入力後`Enter`
- **処理**:
  1. タグをトリムして空白を除去
  2. 重複チェック
  3. 重複していなければタグリストに追加
  4. 入力フィールドをクリア
- **表示**: タグは青色のバッジとして表示、×ボタンで削除可能

#### 2.2 タグ追加（編集モード）
- **動作**: 新規Todo追加と同様
- **保存時**: 編集されたタグ配列がTodoに保存される

#### 2.3 タグ削除
- **新規Todo**: バッジの×ボタンをクリック
- **編集モード**: バッジの×ボタンをクリック

#### 2.4 タグパース
- **形式**: カンマ区切り文字列
- **処理**:
  1. 文字列をカンマで分割
  2. 各タグをトリム
  3. 空文字列を除外
  4. 配列として返す

### 3. フィルタリング機能

#### 3.1 未完了Todoフィルター
- **位置**: メインエリアのフィルターセクション
- **動作**:
  - デフォルト: 「すべて」が選択され、すべての未完了Todoを表示
  - タグ選択時: そのタグを持つ未完了Todoのみ表示
  - タグ再クリック: 「すべて」に戻る
- **表示**: 選択中のタグは青色背景、その他はグレー背景

#### 3.2 完了済みTodoフィルター
- **位置**: Drawer内のフィルターセクション
- **動作**: 未完了フィルターと同様
- **独立性**: 未完了とは別のフィルター状態を保持

### 4. Drawer機能

#### 4.1 Drawer表示
- **トリガー**: 「完了済みを表示」ボタンをクリック
- **アニメーション**:
  - オーバーレイ: フェードイン（200ms）
  - パネル: 右から左へスライドイン（300ms、400px移動）
- **レイアウト**: 画面右側、幅は画面サイズに応じて可変
  - モバイル: 全幅
  - タブレット（md）: 画面の50%
  - デスクトップ（lg）: 画面の40%

#### 4.2 Drawer閉じる
- **トリガー**:
  - ヘッダーの×ボタンをクリック
  - オーバーレイをクリック
  - `Esc`キーを押す
- **アニメーション**: 表示時の逆再生

#### 4.3 Drawer内コンテンツ
- タグフィルター
- 完了済みTodoリスト
- 各Todoに削除ボタン

### 5. オプションメニュー

#### 5.1 メニュー表示
- **トリガー**: Todo項目の⋮ボタンをクリック
- **位置**: ボタンの右下に絶対配置
- **スタイル**: 白背景、シャドウ付き、丸みのある角

#### 5.2 メニュー閉じる
- **トリガー**:
  - メニュー外をクリック
  - メニュー項目を選択

#### 5.3 メニュー項目
- **編集**: 編集モードを開始
- **削除**: Todoを削除（赤色テキスト）

---

## UIコンポーネント仕様

### 1. Button.svelte

#### Props
```typescript
export let onClick: (() => void) | undefined = undefined;
export let variant: 'primary' | 'secondary' | 'danger' = 'primary';
export let disabled: boolean = false;
export let type: 'button' | 'submit' | 'reset' = 'button';
```

#### バリアント
- **primary**: 青色背景、白色テキスト（メインアクション用）
- **secondary**: グレー背景、黒/白テキスト（補助アクション用）
- **danger**: 赤色背景、白色テキスト（削除などの危険なアクション用）

#### スタイル
- パディング: `px-4 py-2`
- 角丸: `rounded-lg`
- フォント: 中太（`font-medium`）、小サイズ（`text-sm`）
- トランジション: `transition-colors`
- 無効時: 透明度50%、カーソル変更

#### 使用箇所
- Todo追加ボタン（primary）
- 編集保存・キャンセルボタン（primary/secondary）
- 削除ボタン（danger）

### 2. Checkbox.svelte

#### Props
```typescript
export let checked: boolean = false;
export let onChange: ((checked: boolean) => void) | undefined = undefined;
```

#### スタイル
- サイズ: `w-4 h-4`
- チェック時色: 青色（`text-blue-600`）
- 背景: グレー（`bg-gray-100` / ダーク: `bg-gray-700`）
- ボーダー: グレー（`border-gray-300` / ダーク: `border-gray-600`）
- フォーカスリング: 青色、2pxリング
- カーソル: ポインター

#### 使用箇所
- 各Todo項目の完了/未完了切り替え

### 3. Drawer.svelte

#### Props
```typescript
export let isOpen: boolean = false;
export let onClose: () => void;
```

#### 構造
- **オーバーレイ**:
  - 全画面固定配置（`fixed inset-0`）
  - 黒色、透明度50%（`bg-black bg-opacity-50`）
  - z-index: 40
  - トランジション: フェード（200ms）

- **パネル**:
  - 右側固定配置（`fixed top-0 right-0`）
  - 高さ: 全画面（`h-full`）
  - 幅: レスポンシブ
    - デフォルト: 全幅
    - md以上: 50%
    - lg以上: 40%
  - 背景: 白/ダークグレー
  - シャドウ: 2xl
  - z-index: 50
  - スクロール: 縦スクロール可能
  - トランジション: フライイン（x: 400px, 300ms）

#### ヘッダー
- タイトル: 「完了済みTodo」（`text-2xl font-bold`）
- 閉じるボタン: ×アイコン

#### キーボードサポート
- `Esc`キーでDrawerを閉じる（グローバルキーボードリスナー）

#### 使用箇所
- 完了済みTodo表示

### 4. Input.svelte

#### Props
```typescript
export let value: string = '';
export let placeholder: string = '';
export let id: string = '';
export let inputElement: HTMLInputElement | undefined = undefined;
```

#### イベント転送
- `keydown`, `keyup`, `keypress`, `input`, `focus`, `blur`

#### スタイル
- 幅: 全幅（`w-full`）
- 角丸: `rounded-lg`
- ボーダー: グレー（通常）、青色（フォーカス時）
- パディング: `px-3 py-2`
- フォントサイズ: 小（`text-sm`）
- フォーカスリング: 青色、透明度20%
- トランジション: `transition-colors`

#### 使用箇所
- Todoテキスト入力
- タグ入力
- 編集モードのテキスト入力

### 5. Menu.svelte

#### Props
```typescript
export let isOpen: boolean = false;
export let onClose: () => void;
```

#### スロット
- **trigger**: メニューを開くボタン
- **items**: メニュー項目リスト

#### 構造
- 相対配置のコンテナ
- 絶対配置のメニューパネル
  - 位置: トリガーの右下
  - マージン: `mt-2`
  - 幅: 固定（`w-48`）
  - 角丸: `rounded-md`
  - シャドウ: `shadow-lg`
  - リング: 黒色、透明度5%
  - z-index: 10

#### クリックアウトサイド検出
- メニュー外のクリックを検出してメニューを閉じる
- `onMount`と`onDestroy`でイベントリスナーを管理

#### 使用箇所
- Todo項目のオプションメニュー（編集・削除）

---

## レイアウト仕様

### 全体レイアウト

#### ページコンテナ
- 最小高さ: 画面全体（`min-h-screen`）
- 背景色: ライトグレー/ダークグレー
- パディング: 縦8（`py-8`）、横4（`px-4`）

#### メインコンテナ
- 最大幅: 7xl（`max-w-7xl`）
- 中央揃え（`mx-auto`）

#### タイトル
- フォントサイズ: 3xl（`text-3xl`）
- フォントウェイト: 太字（`font-bold`）
- マージン下: 8（`mb-8`）
- テキスト揃え: 中央（`text-center`）

### 2カラムレイアウト

#### グリッド設定
```css
grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6
```

- **モバイル**: 1カラム（縦積み）
- **デスクトップ（lg以上）**: 2カラム
  - 左カラム: 固定幅400px
  - 右カラム: 残りのスペース
- **ギャップ**: 6（`gap-6`）

### 左カラム（Todo入力エリア）

#### カード構成
1. **Todo追加フォーム**
   - 背景: 白/ダークグレー
   - 角丸: `rounded-lg`
   - シャドウ: `shadow-md`
   - パディング: 6（`p-6`）

2. **完了済み表示ボタン**
   - 全幅ボタン
   - グレー背景
   - アイコン付き

### 右カラム（フィルター・一覧エリア）

#### カード構成
1. **タグフィルター**
   - 背景: 白/ダークグレー
   - パディング: 4（`p-4`）

2. **Todoリスト**
   - 背景: 白/ダークグレー
   - 角丸: `rounded-lg`
   - シャドウ: `shadow-md`

---

## インタラクション仕様

### キーボードショートカット

#### Todo入力フィールド
- **Enter**:
  - 単体: タグ入力フィールドにフォーカス移動
  - Ctrl+Enter / Cmd+Enter: Todoを即座に追加
- **処理**:
  ```typescript
  function handleTodoInputKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (event.ctrlKey || event.metaKey) {
        addTodo(); // 直接追加
      } else {
        event.preventDefault();
        tagInputElement?.focus(); // タグ入力へフォーカス
      }
    }
  }
  ```

#### タグ入力フィールド
- **Enter**: タグをタグリストに追加

#### 編集モード
- **Enter**: 変更を保存して編集モードを終了
- **Esc**: 変更を破棄して編集モードを終了

#### Drawer
- **Esc**: Drawerを閉じる（グローバルリスナー）

### マウスインタラクション

#### ホバーエフェクト
- **ボタン**: 背景色の変化（`hover:bg-*`）
- **Todoリスト項目**: 背景色の淡い変化（`hover:bg-gray-50`）
- **タグフィルターボタン**: 背景色の変化
- **オプションメニューボタン**: 背景色の変化

#### クリックアクション
- **チェックボックス**: 完了状態をトグル
- **タグフィルターボタン**: フィルターを適用/解除
- **オプションメニュー**: メニューを開く/閉じる
- **編集ボタン**: 編集モードに切り替え
- **削除ボタン**: Todo削除（確認なし）
- **Drawerオーバーレイ**: Drawerを閉じる
- **タグバッジの×**: タグを削除

### フォーカス管理

#### タブオーダー
1. Todoテキスト入力
2. タグ入力
3. 追加ボタン
4. 完了済み表示ボタン
5. タグフィルターボタン群
6. Todo項目のチェックボックス
7. オプションメニューボタン

#### プログラマティックフォーカス
- Todo入力でEnter押下時 → タグ入力にフォーカス
- Todoテキストがバインドされた入力要素への参照を保持

---

## スタイリング仕様

### カラーパレット

#### プライマリカラー（青）
- ライトモード: `bg-blue-600`, `hover:bg-blue-700`
- ダークモード: `bg-blue-500`, `hover:bg-blue-600`
- 用途: メインアクションボタン、選択中のタグフィルター

#### セカンダリカラー（グレー）
- ライトモード: `bg-gray-200`, `hover:bg-gray-300`
- ダークモード: `bg-gray-700`, `hover:bg-gray-600`
- 用途: 補助ボタン、未選択のフィルターボタン

#### ダンジャーカラー（赤）
- ライトモード: `bg-red-600`, `hover:bg-red-700`
- ダークモード: `bg-red-500`, `hover:bg-red-600`
- 用途: 削除ボタン

#### 背景色
- **ページ背景**:
  - ライト: `bg-gray-50`
  - ダーク: `bg-gray-900`
- **カード背景**:
  - ライト: `bg-white`
  - ダーク: `bg-gray-800`
- **完了済みTodo背景**:
  - ライト: `bg-gray-50`
  - ダーク: `bg-gray-700`

#### テキストカラー
- **メインテキスト**:
  - ライト: `text-gray-900`
  - ダーク: `text-gray-100`
- **ラベル・説明**:
  - ライト: `text-gray-700`
  - ダーク: `text-gray-300`
- **プレースホルダー・無効状態**:
  - ライト: `text-gray-500`
  - ダーク: `text-gray-400`
- **完了済みTodo**:
  - ライト: `text-gray-500` + `line-through`
  - ダーク: `text-gray-400` + `line-through`

#### タグバッジ
- 背景:
  - ライト: `bg-blue-100`
  - ダーク: `bg-blue-900`
- テキスト:
  - ライト: `text-blue-800`
  - ダーク: `text-blue-200`

### タイポグラフィ

#### フォントサイズ
- **ページタイトル**: `text-3xl`（1.875rem）
- **Drawerタイトル**: `text-2xl`（1.5rem）
- **ラベル**: `text-sm`（0.875rem）
- **ボタン**: `text-sm`（0.875rem）
- **入力フィールド**: `text-sm`（0.875rem）
- **タグバッジ**: `text-sm`（0.875rem）

#### フォントウェイト
- **タイトル**: `font-bold`（700）
- **ラベル**: `font-medium`（500）
- **ボタン**: `font-medium`（500）

### スペーシング

#### マージン
- ページタイトル下: `mb-8`
- カード間: `gap-6`（グリッド）
- コンポーネント内: `space-y-3` または `space-y-6`

#### パディング
- ページ全体: `py-8 px-4`
- カード: `p-6`（大）または `p-4`（小）
- Todo項目: `p-4`
- ボタン: `px-4 py-2`

### 角丸

- **カード**: `rounded-lg`（0.5rem）
- **ボタン**: `rounded-lg`（0.5rem）
- **入力フィールド**: `rounded-lg`（0.5rem）
- **タグバッジ**: `rounded-md`（0.375rem）
- **メニュー**: `rounded-md`（0.375rem）

### シャドウ

- **カード**: `shadow-md`
- **Drawer**: `shadow-2xl`
- **メニュー**: `shadow-lg`

### トランジション

- **ボタン**: `transition-colors`
- **入力フィールド**: `transition-colors`
- **Todoホバー**: `transition-colors`
- **Drawer**:
  - オーバーレイ: `fade`（200ms）
  - パネル: `fly`（x: 400px, 300ms）

### ダークモード

#### 設定
- Tailwind設定: `darkMode: 'class'`
- ダークモードクラスを手動で適用する方式
- システム設定との連携はなし（将来的な拡張可能）

#### ダークモード対応コンポーネント
- すべてのUIコンポーネント
- 背景、テキスト、ボーダー、シャドウすべてにダーク対応色を定義

---

## ビルドとデプロイ

### ビルド設定（vite.config.ts）

```typescript
{
  plugins: [svelte()],
  base: '/TryFirstApp/',  // GitHub Pages用ベースパス
  build: {
    outDir: 'dist',       // 出力ディレクトリ
  },
}
```

### Tailwind設定（tailwind.config.js）

```javascript
{
  content: ['./src/**/*.{html,js,svelte,ts}'], // パージ対象
  darkMode: 'class',                           // クラスベースダークモード
  theme: { extend: {} },
  plugins: [],
}
```

### NPMスクリプト

```json
{
  "dev": "vite dev",                          // 開発サーバー起動
  "build": "vite build",                      // 本番ビルド
  "preview": "vite preview",                  // ビルド結果プレビュー
  "check": "svelte-kit sync && svelte-check",  // 型チェック
  "check:watch": "... --watch"                // 型チェック（監視モード）
}
```

### デプロイ手順

#### 1. ローカルビルド
```bash
npm run build
```
- 出力: `dist/` ディレクトリ
- 最適化: コード圧縮、ハッシュ付きファイル名、CSS抽出

#### 2. GitHub Pagesデプロイ
- **リポジトリ**: GitHubリポジトリ作成（Public）
- **設定**: Settings → Pages → Source: GitHub Actions
- **自動デプロイ**: mainブランチへのpush時に自動実行
- **URL**: `https://<username>.github.io/TryFirstApp/`

#### 3. リポジトリ名変更時の対応
`vite.config.ts`の`base`設定を変更:
```typescript
base: '/new-repo-name/',
```

### ビルド出力

#### dist/構造
```
dist/
├── assets/
│   ├── index-[hash].css    # バンドルされたCSS
│   └── index-[hash].js     # バンドルされたJS
└── index.html              # エントリーHTML
```

#### 最適化
- **コード分割**: Viteの自動チャンク分割
- **Tree Shaking**: 未使用コードの除去
- **ミニファイ**: HTML/CSS/JSの圧縮
- **アセットハッシング**: キャッシュバスティング用ハッシュ

---

## 状態遷移図

### Todo項目の状態

```
[新規作成] → [未完了] ⇄ [完了済み] → [削除]
                ↓
            [編集中]
                ↓
            [未完了]
```

#### 状態説明
- **新規作成**: 入力フォームで作成中
- **未完了**: メインリストに表示、編集・削除・完了化可能
- **編集中**: インライン編集モード、保存またはキャンセル
- **完了済み**: Drawerに表示、未完了化・削除可能
- **削除**: リストから完全除去

### Drawer状態

```
[閉じている] ⇄ [開いている]
```

#### トリガー
- 開く: 「完了済みを表示」ボタンクリック
- 閉じる: ×ボタン、オーバーレイクリック、Escキー

### メニュー状態

```
[閉じている] ⇄ [開いている]
```

#### トリガー
- 開く: ⋮ボタンクリック
- 閉じる: メニュー外クリック、メニュー項目選択

---

## エラーハンドリング

### バリデーション

#### Todo追加
- **空文字チェック**: `newTodoText.trim() === ''`の場合、追加ボタンを無効化
- **結果**: ボタンが押せないため、空Todoは作成されない

#### Todo編集
- **空文字チェック**: `editingText.trim() === ''`の場合、保存処理をスキップ
- **結果**: 空白にはできない

### 存在しないTodoへのアクセス
- **IDベースの操作**: `filter`や`map`を使用するため、存在しないIDは無視される
- **エッジケース**: 削除済みTodoへのアクセスは自動的にスキップ

### 同時編集
- **制御**: `editingId`が`string | null`型で1つのTodoのみ編集可能
- **結果**: 複数同時編集は構造上不可能

### 認証エラー
- **Supabase接続エラー**: 環境変数が未設定または不正な場合、エラーメッセージを表示
- **ログイン失敗**: 日本語のエラーメッセージを表示
- **ネットワークエラー**: try-catchでキャッチし、ユーザーにエラー通知

### データベースエラー
- **CRUD操作失敗**: エラーをキャッチしてコンソールログとユーザー通知
- **RLSポリシー違反**: 自動的に拒否され、該当操作が実行されない
- **リアルタイム購読エラー**: 自動再接続試行

---

## パフォーマンス考慮事項

### リアクティブ更新の最適化
- **リアクティブステートメント**: 依存関係の変更時のみ再計算
- **フィルタリング**: 配列操作は効率的（小規模データセット想定）

### レンダリング最適化
- **キー付きループ**: `{#each todos as todo (todo.id)}`でDOM再利用
- **条件付きレンダリング**: `{#if}`ブロックで不要なDOMを生成しない

### イベントリスナー管理
- **メニュー**: `onMount`/`onDestroy`で適切にクリーンアップ
- **Drawer**: `svelte:window`イベントリスナーは自動管理
- **リアルタイム購読**: コンポーネント破棄時にチャンネルをunsubscribe

### CSSパフォーマンス
- **Tailwind CSS**: 未使用クラスをパージして最小化
- **トランジション**: GPU加速（`transform`, `opacity`）

---

## 制約事項

### データ永続化
- **現状**: Supabase PostgreSQLによるクラウドストレージで永続化済み
- **制約**: インターネット接続が必要
- **将来的な拡張**: オフライン対応、LocalStorageキャッシュ

### 認証・マルチユーザー
- **現状**: Supabase Authによるユーザー認証実装済み
- **対応機能**: 
  - メールアドレス・パスワード認証
  - ユーザーごとのデータ分離
  - RLSによるセキュリティ保護
- **将来的な拡張**: 
  - ソーシャルログイン (Google, GitHub等)
  - Magic Link認証
  - Todoの共有機能

### オフライン対応
- **現状**: オンライン接続必須
- **将来的な拡張**: 
  - Service Worker実装
  - オフライン時のローカル編集
  - 再接続時の自動同期
  - PWA化

### アクセシビリティ
- **現状**: 基本的なセマンティックHTML、aria-label使用
- **改善余地**:
  - スクリーンリーダー最適化
  - キーボードナビゲーション強化
  - フォーカストラップ（Drawer内）
  - ARIA属性の追加

### ブラウザ対応
- **ターゲット**: モダンブラウザ（Chrome, Firefox, Safari, Edge最新版）
- **ES Modules**: ネイティブサポート必須
- **CSS Grid/Flexbox**: 必須

---

## セキュリティ考慮事項

### XSS対策
- **Svelte**: デフォルトでエスケープ処理
- **ユーザー入力**: テキスト入力のみ、HTMLは注入不可

### データバリデーション
- **クライアントサイド**: トリム、空文字チェック
- **サーバーサイド**: N/A（バックエンドなし）

---

## 将来的な拡張案

### 機能拡張
1. **データ永続化**: LocalStorage、IndexedDBサポート
2. **並び替え**: ドラッグ&ドロップでTodo順序変更
3. **期限設定**: Todoに期限を追加、期限切れ通知
4. **優先度**: 高/中/低の優先度設定
5. **サブタスク**: Todo内にチェックリスト作成
6. **検索機能**: テキスト検索
7. **タグ管理**: タグの色分け、タグ編集・削除
8. **統計表示**: 完了率、タグ別集計
9. **インポート/エクスポート**: JSON、CSV形式
10. **マルチリスト**: 複数のTodoリストを管理

### UX改善
1. **アニメーション強化**: Todo追加・削除時のアニメーション
2. **ドラッグ&ドロップ**: Todoの並び替え、タグ割り当て
3. **一括操作**: 複数選択、一括削除・完了化
4. **Undo/Redo**: 操作の取り消し・やり直し
5. **カスタムテーマ**: ユーザー独自のカラースキーム
6. **ショートカットヘルプ**: ヘルプモーダル表示

### 技術的改善
1. **ステート管理**: Svelte Storesの導入（大規模化時）
2. **ルーティング**: SvelteKit移行（複数ページ）
3. **バックエンド連携**: REST API、GraphQL
4. **PWA化**: Service Worker、オフライン対応
5. **テスト**: ユニットテスト、E2Eテスト導入
6. **CI/CD**: 自動テスト、自動デプロイパイプライン
7. **国際化（i18n）**: 多言語対応
8. **アクセシビリティ**: WCAG 2.1 AA準拠

---

## バージョン履歴

### v0.1.0（現行版）
- 初回リリース
- 基本Todo管理機能
- タグ機能
- フィルタリング機能
- Drawer UI
- ダークモード対応
- レスポンシブデザイン
- キーボードショートカット

---

## ライセンス
MIT License

---

## 作成者
TryFirstAppプロジェクトチーム

---

## 更新日
2025年11月15日

