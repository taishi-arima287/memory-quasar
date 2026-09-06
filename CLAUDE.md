# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリのコードを扱う際のガイドラインです。

@AGENTS.md

Next.js のドキュメントは `.next-docs/`（gitignore 済み）に配置され、`AGENTS.md` がその索引です。
`.next-docs/` が無い場合、または Next.js を更新した場合は再生成してください:

```bash
npx @next/codemod@canary agents-md --output AGENTS.md
```

## プロジェクト概要

memory-quasar は、日本語ドキュメントを扱うモノレポ構成のドキュメント管理アプリケーションです。3 つのアプリケーションと 1 つの共有ライブラリパッケージで構成されています。

## ビルド・開発コマンド

セットアップ手順の詳細は `README.md` を参照。

```bash
# 依存関係のインストール（npm workspaces のためルートで一度だけでよい）
npm install

# 全サービス（db / api / web / admin）を Docker で起動
docker compose up -d

# Docker を使わずローカルで動かす場合（DB だけ Docker）
docker compose up -d db
npm run dev

# 各アプリケーションを個別に起動
npm run dev:web    # Web フロントエンド（ポート 3000）
npm run dev:admin  # 管理画面（ポート 8000）
npm run dev:api    # API サーバー（ポート 8080）

# データベース操作（Prisma / ホストから実行。apps/api/.env の DATABASE_URL は localhost:5432 を指す）
npm run db:view           # Prisma Studio を開く
npm run db:migrate        # マイグレーションの作成と実行
npm run db:migrate:reset  # データベースのリセット
npm run db:seed           # シードデータ投入

# Prisma をコンテナ内で実行する場合（compose の DATABASE_URL が db:5432 を指す）
docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma migrate status
docker compose exec api npm run prisma:seed

# Lint とフォーマット
npm run lint              # 全ての Linter を実行
npm run format            # 全ファイルをフォーマット
npm run format:check      # フォーマットのチェック

# テスト（shared パッケージのみ）
cd shared && npm test     # Jest テストを実行

# Storybook（共有 UI コンポーネント）
npm run storybook         # ポート 6007
```

注意点:
- Node.js は 20 以上が必要（web / admin が使う `@tailwindcss/oxide` が `node >= 20` を要求）。
- `prisma generate` は `npm install` の postinstall で実行されるため、通常は明示的な実行は不要。
- `npm run storybook` は現在起動に失敗する（既知）。`shared/package.json` の `exports` が
  `./utils/repository` までしか公開しておらず、`DeleteModal.tsx` が参照する
  `./utils/repository/clientFetcher` を解決できないため。Tailwind 導入以前からの問題。
- `npm run lint` は既存の指摘（`DeleteModal.test.tsx` の `no-explicit-any` 等）で失敗する。

## アーキテクチャ

### モノレポ構成（npm workspaces）
- `apps/web` - 一般公開向けの Next.js 15 フロントエンド
- `apps/admin` - コンテンツ管理用の Next.js 15 管理ダッシュボード
- `apps/api` - Prisma ORM を使用した NestJS バックエンド API
- `shared` - 共有 React コンポーネントライブラリ（`@memory-quasar/shared`）

### API（NestJS）
- 標準的な NestJS のモジュール構成: `module.ts`、`controller.ts`、`service.ts`、`repository.ts`
- DTO は `dto/` ディレクトリ配下に配置
- Guard は `guards/` 配下に配置（例: `auth.guard.ts`）
- データベースアクセスは `PrismaService` 経由で Prisma を使用
- 主なモジュール: Auth、User、Document

### データベース（PostgreSQL + Prisma）
スキーマは `apps/api/prisma/schema.prisma`:
- `User` - ユーザーアカウント（スペースへの所属は任意）
- `Space` - ワークスペース / 組織
- `Document` - 公開範囲（PRIVATE、PUBLIC、SPACE）を持つコンテンツ
- `Tag` - ドキュメントのタグ付け（多対多）

### 共有パッケージ
- UI コンポーネントは Atomic Design に従う: `atoms/`、`molecules/`、`organisms/`、`templates/`
- `@memory-quasar/shared/ui` または `@memory-quasar/shared/utils/repository` からインポート
- コンポーネント: Button、Textbox、TextboxWithError、TextAreaWithError、MarkdownEditor、Modal、DeleteModal
- リポジトリユーティリティ: API 通信用のクライアント / サーバー fetcher

### スタイリング（Tailwind CSS v4）
- スタイルは Tailwind のユーティリティクラスで記述する（CSS Modules は廃止済み）
- エントリは `shared/ui/styles/base.css`。各アプリの `layout.tsx` から読み込む
- `@theme` には Tailwind に存在しないトークン（ブランドカラー、フォントファミリ）だけを定義する。
  spacing / radius / font-size / width / height / z-index は Tailwind の既定スケールを使う
- `shared` は npm workspaces のシンボリックリンク経由で解決されるため Tailwind の自動検出対象外。
  `base.css` の `@source "../components"` でスキャン対象に登録している（対象を増やす場合は `@source` を追加）
- PostCSS 設定は `apps/web`、`apps/admin`、`shared` にそれぞれ `postcss.config.mjs` を配置

### フロントエンドアプリ（Next.js 15）
- `src/app/` 配下の App Router 構成
- 認証には NextAuth を使用
- フォームには react-hook-form + zod を使用
- 共有コンポーネントは `@memory-quasar/shared` からインポート

## インフラストラクチャ

Docker Compose でローカル開発環境を提供:
- PostgreSQL 17（ポート 5432）
- API（ポート 8080）、Web（ポート 3000）、Admin（ポート 8000）

```bash
docker compose up -d        # 全サービスを起動
docker compose up -d db     # DB だけ起動（アプリは npm run dev で動かす場合）
```

注意点:
- API / Web / Admin の Dockerfile はモノレポのルートをビルドコンテキストとする。
  `@memory-quasar/shared` を `file:../../shared` で参照しているため、
  アプリのディレクトリだけをコンテキストにすると `npm install` に失敗する。
- ソースはバインドマウントされ、いずれのサービスも dev モード（ホットリロード）で動く。
- web / admin のイメージは `node:22-alpine`。Tailwind v4 のネイティブバイナリ
  `@tailwindcss/oxide` が `engines: node >= 20` のため、Node 18 では
  optional dependency として静かにスキップされ `Cannot find native binding` で落ちる。
- `node_modules` は anonymous volume で隠されているため、依存を追加したら
  イメージの再ビルドとボリュームの作り直しが必要:
  `docker compose rm -sfv web admin && docker compose build web admin && docker compose up -d`
  （`-v` は anonymous volume のみ対象。named volume の `postgres_data` は消えない）
- Docker で全サービスを動かす場合、ローカルの `npm run dev` とはポートが衝突する。併用しないこと。
