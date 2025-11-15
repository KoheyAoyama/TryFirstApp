# Todoアプリ v0.2

Svelte + Tailwind CSS + Supabaseで構築されたモダンなTodoアプリです。

## 🌐 デモ

GitHub Pagesで公開中:
- **URL**: https://KoheyAoyama.github.io/TryFirstApp/

## ✨ 主な特徴

### 🔐 認証機能
- ✅ ユーザー登録・ログイン（Supabase Auth）
- ✅ メールアドレス・パスワード認証
- ✅ セッション自動復元
- ✅ セキュアなデータ保護（Row Level Security）

### ☁️ クラウドストレージ
- ✅ PostgreSQL（Supabase）によるデータ永続化
- ✅ ユーザーごとのデータ分離
- ✅ リアルタイム同期
- ✅ 複数デバイス対応

### 📝 Todo管理
- ✅ Todoの追加・編集・削除
- ✅ 完了/未完了の切り替え
- ✅ リアルタイムで他デバイスに同期

### 🏷️ タグ機能
- ✅ Todoにタグを追加（複数可）
- ✅ タグでフィルタリング
- ✅ 編集モードでタグの追加・削除

### 📋 完了管理
- ✅ デフォルトで未完了Todoのみ表示
- ✅ 完了済みTodoは画面右からスライドインするDrawerで表示
- ✅ 完了済みもタグでフィルタリング可能

### 🎯 UX
- ⌨️ キーボードショートカット対応
  - `Enter`: Todo入力後にタグ入力へ移動
  - `Ctrl+Enter` / `Cmd+Enter`: タグなしで即座にTodo追加
  - `Esc`: Drawerを閉じる
- 🎯 タグ入力の自動確定
  - Todoを追加ボタンクリック時、入力中のタグを自動的に追加
- 📐 2カラムレイアウト
  - 左: Todo入力エリア（固定幅400px）
  - 右: フィルターとTodo一覧
  - モバイルでは1カラムに自動調整
- 📱 オプションメニュー
  - 編集・削除ボタンは⋮メニューに集約
  - クリーンで整理されたUI
- 🌙 ダークモード対応
- 📱 レスポンシブデザイン

## 🚀 セットアップ

### 前提条件

- Node.js 18以上
- npm または yarn
- Supabaseアカウント（無料）

### 1. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com)でアカウント作成
2. 新規プロジェクト作成
3. SQL Editorで`supabase/migrations/001_create_todos_table.sql`を実行
4. Authentication設定でメール/パスワード認証を有効化
5. Project Settings → API からURLとanon keyをコピー

詳細な手順は[SETUP.md](SETUP.md)を参照してください。

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

プロジェクトルートに`.env`ファイルを作成:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

### 4. 開発サーバー起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いてアプリを確認できます。

### 5. ビルド

```bash
npm run build
```

## 📖 使い方

1. **アカウント作成**: 初回起動時に「新規登録はこちら」からアカウントを作成
2. **ログイン**: メールアドレスとパスワードでログイン
3. **Todoを追加**: Todoテキストとタグ（オプション）を入力して追加
4. **タグでフィルター**: タグボタンをクリックして特定のタグのTodoのみ表示
5. **完了管理**: チェックボックスで完了/未完了を切り替え
6. **完了済み表示**: 「完了済みを表示」ボタンで完了したTodoを確認
7. **編集・削除**: ⋮メニューから編集または削除
8. **リアルタイム同期**: 他のデバイスでログインすると自動的に同期

## 🛠️ 技術スタック

### フロントエンド
- **Svelte 4** - リアクティブなUIフレームワーク
- **Vite** - 高速なビルドツール
- **TypeScript** - 型安全性
- **Tailwind CSS** - ユーティリティファーストCSS

### バックエンド / BaaS
- **Supabase** - PostgreSQLベースのバックエンドサービス
  - Authentication（認証）
  - Database（データベース）
  - Realtime（リアルタイム同期）
  - Row Level Security（セキュリティ）

## 📁 プロジェクト構成

```
TryFirstApp/
├── src/
│   ├── components/
│   │   ├── Button.svelte      # ボタンコンポーネント
│   │   ├── Checkbox.svelte    # チェックボックスコンポーネント
│   │   ├── Drawer.svelte      # ドロワーコンポーネント
│   │   ├── Input.svelte       # 入力コンポーネント
│   │   ├── Login.svelte       # ログイン/登録コンポーネント
│   │   └── Menu.svelte        # オプションメニューコンポーネント
│   ├── lib/
│   │   ├── supabase.ts        # Supabase初期化
│   │   └── todoService.ts     # Todo CRUD操作
│   ├── stores/
│   │   └── auth.ts            # 認証ストア
│   ├── App.svelte             # メインアプリケーション
│   ├── main.ts                # エントリーポイント
│   └── app.css                # グローバルスタイル
├── supabase/
│   └── migrations/
│       └── 001_create_todos_table.sql  # データベーススキーマ
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── SETUP.md                   # セットアップ手順
├── SPECIFICATION.md           # 詳細仕様書
└── DEPLOY.md                  # デプロイ手順
```

## 📚 ドキュメント

- [SETUP.md](SETUP.md) - 詳細なセットアップ手順
- [SPECIFICATION.md](SPECIFICATION.md) - 完全な技術仕様書
- [DEPLOY.md](DEPLOY.md) - デプロイ手順

## 🔒 セキュリティ

- Row Level Security (RLS)により、ユーザーは自分のTodoのみアクセス可能
- パスワードはSupabaseで安全にハッシュ化
- anon keyは公開可能（RLSで保護）
- 環境変数は`.gitignore`で管理

## 🤝 コントリビューション

プルリクエストを歓迎します！

## 📝 ライセンス

MIT

## 🙏 謝辞

- [Supabase](https://supabase.com) - BaaSプラットフォーム
- [Svelte](https://svelte.dev) - UIフレームワーク
- [Tailwind CSS](https://tailwindcss.com) - CSSフレームワーク
