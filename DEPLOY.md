# デプロイ手順

## GitHub Pagesへのデプロイ

### 前提条件
- GitHubアカウント
- Gitがインストール済み

### 手順

#### 1. GitHubでリポジトリを作成

1. [GitHub](https://github.com)にログイン
2. 右上の「+」→「New repository」をクリック
3. リポジトリ名: `TryFirstApp` (または任意の名前)
4. 「Public」を選択
5. 「Create repository」をクリック

#### 2. ローカルリポジトリの初期化とpush

```bash
# プロジェクトディレクトリに移動
cd /Users/aoyamakouhei/SEREAL/AISoftware/TryFirstApp

# Gitリポジトリを初期化
git init

# すべてのファイルをステージング
git add .

# 最初のコミット
git commit -m "v0.1: Initial release"

# リモートリポジトリを追加（<username>を実際のGitHubユーザー名に置き換え）
git remote add origin https://github.com/<username>/TryFirstApp.git

# mainブランチにpush
git branch -M main
git push -u origin main
```

#### 3. GitHub Pagesの設定

1. GitHubのリポジトリページで「Settings」タブをクリック
2. 左サイドバーの「Pages」をクリック
3. 「Source」で「GitHub Actions」を選択
4. 自動的にデプロイが開始されます

#### 4. デプロイの確認

1. リポジトリの「Actions」タブで進捗を確認
2. デプロイが完了したら（緑のチェックマーク）、以下のURLでアクセス:
   ```
   https://<username>.github.io/TryFirstApp/
   ```

### リポジトリ名を変更した場合

もし`TryFirstApp`以外のリポジトリ名を使った場合は、以下のファイルを修正してください:

**vite.config.ts**
```typescript
base: '/TryFirstApp/', // → '/your-repo-name/'に変更
```

修正後、再度pushすれば自動的に再デプロイされます。

### 更新の反映

コードを更新した後:
```bash
git add .
git commit -m "説明"
git push
```

自動的にGitHub Actionsが起動し、数分後に変更が反映されます。

## トラブルシューティング

### デプロイが失敗する場合

1. **Actionsタブを確認**: エラーログを確認
2. **Pagesの設定を確認**: 「GitHub Actions」が選択されているか
3. **リポジトリがPublic**: GitHub Pagesは無料版ではPublicリポジトリのみ

### ページが表示されない場合

1. URLが正しいか確認（リポジトリ名も含めて）
2. デプロイが完了しているか確認（Actionsタブ）
3. ブラウザのキャッシュをクリア

## ローカルでのビルド確認

デプロイ前にローカルで確認:
```bash
npm run build
npm run preview
```

