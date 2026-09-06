## 必要な環境

- Node.js 20 以上（推奨: 22）
  - web / admin が使う Tailwind v4 のネイティブバイナリ `@tailwindcss/oxide` が `node >= 20` を要求します
- Docker / Docker Compose v2

## ローカル開発環境の構築

1. 依存関係のインストール

```bash
# ルートディレクトリで実行するだけでよい（npm workspaces のため各アプリでの実行は不要）
npm install
```

2. 環境変数の設定

.env.example をコピーして .env を作成

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/admin/.env.example apps/admin/.env
```

必要に応じて .env の値を修正
特に以下の値は環境に合わせて変更してください：

- DATABASE_URL
- ポート番号（他のアプリケーションと競合する場合）

各アプリの .env はコンテナにバインドマウントされて読み込まれるため、
Docker で起動する場合もこの手順は必要です。

3. アプリケーションの起動

```bash
# 全サービス（db / api / web / admin）を起動
docker compose up -d

# ログの確認
docker compose logs -f admin

# 停止
docker compose down
```

| サービス | URL                   |
| -------- | --------------------- |
| web      | http://localhost:3000 |
| admin    | http://localhost:8000 |
| api      | http://localhost:8080 |
| db       | localhost:5432        |

4. データベースの初期化

```bash
# マイグレーションの適用
docker compose exec api npx prisma migrate deploy

# シードデータの投入
docker compose exec api npm run prisma:seed

# 適用状況の確認
docker compose exec api npx prisma migrate status
```

`prisma generate` はイメージビルド時の `npm install`（postinstall）で実行済みのため不要です。

## 開発用コマンド

ソースはバインドマウントされ、いずれのサービスも dev モード（ホットリロード）で動くため、
コードを編集しただけならコンテナの再起動は不要です。

```bash
# 個別のサービスだけ再起動
docker compose restart admin

# データベース管理UI（ホストから実行。apps/api/.env の DATABASE_URL が localhost:5432 を指している必要がある）
npm run db:view

# マイグレーションの作成（スキーマ変更時）
docker compose exec api npx prisma migrate dev --name <migration_name>

# Lint / フォーマット
npm run lint
npm run format

# テスト（shared パッケージ）
cd shared && npm test

# Storybook（共有 UI コンポーネント）
npm run storybook   # http://localhost:6007
```

> **既知の問題**: `npm run storybook` は現在起動に失敗します。
> `shared/package.json` の `exports` が `./utils/repository` までしか公開しておらず、
> `DeleteModal.tsx` が参照する `./utils/repository/clientFetcher` を解決できないためです。
> Tailwind 導入以前から発生しています。

## 依存パッケージを追加したとき

web / admin コンテナは `node_modules` を anonymous volume で隠しているため、
`npm install` しただけではコンテナに反映されません。イメージの再ビルドが必要です。

```bash
npm install <package>                  # ホスト側（package.json / package-lock.json を更新）
docker compose rm -sfv web admin       # コンテナと anonymous volume を破棄
docker compose build web admin         # 新しい依存を含めて再ビルド
docker compose up -d
```

`-v` は anonymous volume のみが対象で、DB データ（named volume の `postgres_data`）は消えません。

## Docker を使わずにローカルで動かす場合

```bash
docker compose up -d db   # DB だけ起動
npm run dev               # web / admin / api をまとめて起動

# 個別に起動する場合
npm run dev:web    # Webアプリケーション（3000）
npm run dev:admin  # 管理画面（8000）
npm run dev:api    # APIサーバー（8080）
```

Docker で api / web / admin を起動したままこれを実行するとポートが競合します。
併用せず、どちらか一方に揃えてください。

## トラブルシューティング

**`EADDRINUSE: address already in use :::8080`**

Docker の api コンテナと `npm run dev` が同じポートを取り合っています。
`docker compose ps` で起動中のサービスを確認し、どちらか一方に揃えてください。

**`Error: Cannot find native binding`（web / admin）**

Tailwind v4 のネイティブバイナリが入っていません。Node 20 未満で `npm install` すると、
optional dependency がエラーを出さずスキップされるため発生します。
Node のバージョンを確認したうえで、上記「依存パッケージを追加したとき」の手順で再ビルドしてください。
