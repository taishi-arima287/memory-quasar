## ローカル開発環境の構築

1. 依存関係のインストール
```bash
# ルートディレクトリで実行
npm install

# 各アプリケーションの依存関係をインストール
cd apps/web && npm install
cd ../admin && npm install
cd ../api && npm install
cd ../..
```

2. 環境変数の設定 

.env.exampleをコピーして.envを作成
```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/admin/.env.example apps/admin/.env
```

必要に応じて.envの値を修正
特に以下の値は環境に合わせて変更してください：
- DATABASE_URL
- ポート番号（他のアプリケーションと競合する場合）

3. データベースの起動
```bash
docker-compose up -d
```

4. Prismaの初期設定
```bash
# APIディレクトリで実行
cd apps/api

# Prismaクライアントの生成
npx prisma generate

# データベースのマイグレーション
npx prisma migrate dev --name init

cd ../..
```

5. アプリケーションの起動
```bash
# ルートディレクトリで実行
npm run dev
```

## 開発用コマンド

```bash
# 全アプリケーションの起動
npm run dev

# 個別のアプリケーション起動
npm run dev:web    # Webアプリケーション
npm run dev:admin  # 管理画面
npm run dev:api    # APIサーバー

# データベース管理
cd apps/api
npx prisma studio  # データベース管理UI
```
