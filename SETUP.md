# セットアップガイド

このドキュメントでは、Todoアプリをローカル環境で実行するための手順を説明します。

## 前提条件

- Node.js 18以上
- npm または yarn
- Supabaseアカウント（無料）

## 1. Supabaseプロジェクトの作成

### 1.1 Supabaseアカウント作成

1. [Supabase](https://supabase.com)にアクセス
2. 「Start your project」をクリック
3. GitHubアカウントでサインアップ

### 1.2 新規プロジェクト作成

1. ダッシュボードで「New Project」をクリック
2. プロジェクト情報を入力:
   - **Name**: 任意のプロジェクト名（例: `todo-app`）
   - **Database Password**: 強力なパスワードを生成（保存しておく）
   - **Region**: `Northeast Asia (Tokyo)` を選択（日本の場合）
3. 「Create new project」をクリック
4. プロジェクト作成完了まで数分待つ

### 1.3 データベーステーブル作成

1. 左サイドバーから「SQL Editor」を選択
2. 「New query」をクリック
3. `supabase/migrations/001_create_todos_table.sql`の内容をコピーペースト
4. 「Run」をクリックして実行
5. 成功メッセージが表示されればOK

### 1.4 認証設定

1. 左サイドバーから「Authentication」→「Providers」を選択
2. 「Email」プロバイダーが有効になっていることを確認
3. オプション: 「Confirm email」をオフにすると、開発時にメール確認不要

### 1.5 API情報の取得

1. 左サイドバーから「Settings」→「API」を選択
2. 以下の情報をコピー:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGci...` (長い文字列)

## 2. ローカル環境のセットアップ

### 2.1 リポジトリのクローン（または作成）

```bash
# 既存のリポジトリをクローンする場合
git clone <repository-url>
cd TryFirstApp

# または、このディレクトリで作業を開始
```

### 2.2 依存関係のインストール

```bash
npm install
```

### 2.3 環境変数の設定

1. プロジェクトルートに`.env`ファイルを作成:

```bash
touch .env
```

2. `.env`ファイルを編集し、Supabaseの情報を記入:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

**注意**: 
- `xxxxx.supabase.co`は実際のプロジェクトURLに置き換える
- anon keyは実際の値に置き換える
- `.env`ファイルは`.gitignore`に含まれているため、Gitにコミットされません

### 2.4 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いてアプリケーションにアクセスします。

## 3. 初回ログイン

### 3.1 アカウント作成

1. 「新規登録はこちら」をクリック
2. メールアドレスとパスワード（6文字以上）を入力
3. 「登録」をクリック
4. （メール確認が有効な場合）確認メールのリンクをクリック

### 3.2 ログイン

1. 登録したメールアドレスとパスワードでログイン
2. Todoアプリのメイン画面が表示される

## 4. 動作確認

### 4.1 基本機能の確認

1. **Todo追加**: 新しいTodoを追加してみる
2. **タグ追加**: タグを追加してみる
3. **Todo完了**: チェックボックスをクリックして完了にする
4. **完了済み表示**: 「完了済みを表示」ボタンで完了したTodoを確認
5. **Todo編集**: オプションメニューから編集してみる
6. **Todo削除**: Todoを削除してみる

### 4.2 リアルタイム同期の確認

1. ブラウザで2つのタブを開く
2. 両方のタブで同じアカウントにログイン
3. 一方のタブでTodoを追加
4. もう一方のタブに自動的に反映されることを確認

### 4.3 データ永続化の確認

1. Todoを追加
2. ブラウザをリフレッシュ（F5）
3. Todoが保持されていることを確認

## 5. トラブルシューティング

### エラー: "Supabase URL and Anon Key are required"

**原因**: `.env`ファイルが正しく設定されていない

**解決策**:
1. `.env`ファイルが存在するか確認
2. `VITE_SUPABASE_URL`と`VITE_SUPABASE_ANON_KEY`が正しく設定されているか確認
3. 開発サーバーを再起動 (`Ctrl+C` → `npm run dev`)

### エラー: "Invalid login credentials"

**原因**: メールアドレスまたはパスワードが間違っている

**解決策**:
1. 入力した情報が正しいか確認
2. アカウントを作成していない場合は新規登録する
3. パスワードが6文字以上か確認

### Todoが追加できない

**原因**: データベースやRLSポリシーの設定に問題がある

**解決策**:
1. Supabaseダッシュボードで「Table Editor」を開く
2. `todos`テーブルが存在するか確認
3. 「Authentication」→「Policies」で`todos`テーブルのポリシーが設定されているか確認
4. ブラウザのコンソール（F12）でエラーメッセージを確認

### リアルタイム同期が動作しない

**原因**: Supabaseのリアルタイム機能が有効になっていない

**解決策**:
1. Supabaseダッシュボードで「Database」→「Replication」を開く
2. `todos`テーブルのリアルタイムが有効になっているか確認
3. 有効になっていない場合はオンに切り替える

## 6. 本番環境へのデプロイ

本番環境へのデプロイ手順は`DEPLOY.md`を参照してください。

## 7. 開発に役立つコマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# ビルド結果のプレビュー
npm run preview

# TypeScriptの型チェック
npm run check

# 型チェック（監視モード）
npm run check:watch
```

## 8. さらなる情報

- [Supabaseドキュメント](https://supabase.com/docs)
- [Svelteドキュメント](https://svelte.dev/docs)
- [Tailwind CSSドキュメント](https://tailwindcss.com/docs)
- [プロジェクト仕様書](SPECIFICATION.md)

