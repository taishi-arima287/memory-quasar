## ローカル開発環境の構築

1. 環境変数の設定 

.env.exampleをコピーして.envを作成
```
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/admin/.env.example apps/admin/.env
```

必要に応じて.envの値を修正
特に以下の値は環境に合わせて変更してください：
- DATABASE_URL
- ポート番号（他のアプリケーションと競合する場合）

2. データベースの起動
```
docker-compose up -d
```
4. アプリケーションの起動
```
npm run dev
```
