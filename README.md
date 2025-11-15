# Todoアプリ v0.1

Svelte + Tailwind CSS + Rabee UIスタイルで構築されたモダンなTodoアプリです。

## 🌐 デモ

GitHub Pagesで公開中:
- **URL**: `https://<username>.github.io/TryFirstApp/`

> **注**: デプロイ後、上記URLの`<username>`を実際のGitHubユーザー名に置き換えてください。

## 機能

### 基本機能
- ✅ Todoの追加
- ✅ Todoの編集
- ✅ Todoの削除
- ✅ 完了/未完了の切り替え

### タグ機能
- 🏷️ Todoにタグを追加（複数可）
- 🏷️ タグでフィルタリング
- 🏷️ 編集モードでタグの追加・削除

### 完了管理
- 📋 デフォルトで未完了Todoのみ表示
- 📋 完了済みTodoは画面右からスライドインするDrawerで表示
- 📋 完了済みもタグでフィルタリング可能

### UX
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

## 使い方

### インストール

```bash
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いてアプリを確認できます。

### ビルド

```bash
npm run build
```

## 技術スタック

- **Svelte 4** - リアクティブなUIフレームワーク
- **Vite** - 高速なビルドツール
- **TypeScript** - 型安全性
- **Tailwind CSS** - ユーティリティファーストCSS
- **Rabee UIスタイル** - 日本語に最適化されたUIコンポーネント

## プロジェクト構成

```
TryFirstApp/
├── src/
│   ├── components/
│   │   ├── Button.svelte      # ボタンコンポーネント
│   │   ├── Checkbox.svelte    # チェックボックスコンポーネント
│   │   ├── Drawer.svelte      # ドロワーコンポーネント
│   │   ├── Input.svelte       # 入力コンポーネント
│   │   └── Menu.svelte        # オプションメニューコンポーネント
│   ├── App.svelte             # メインアプリケーション
│   ├── main.ts                # エントリーポイント
│   └── app.css                # グローバルスタイル
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## ライセンス

MIT

