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

```bash
# 依存関係のインストール（ルートで実行後、各アプリで実行）
npm install
cd apps/web && npm install && cd ../admin && npm install && cd ../api && npm install && cd ../..

# 全アプリケーションを並列で起動
npm run dev

# 各アプリケーションを個別に起動
npm run dev:web    # Web フロントエンド（ポート 3000）
npm run dev:admin  # 管理画面（ポート 8000）
npm run dev:api    # API サーバー（ポート 8080）

# データベース操作（Prisma）
npm run db:view           # Prisma Studio を開く
npm run db:migrate        # マイグレーション実行
npm run db:migrate:reset  # データベースのリセット
npm run db:seed           # シードデータ投入

# Prisma コマンドを直接実行する場合（apps/api で実行）
cd apps/api
npx prisma generate       # Prisma クライアントの生成
npx prisma migrate dev    # マイグレーションの作成と実行
npx prisma studio         # データベース GUI

# Lint とフォーマット
npm run lint              # 全ての Linter を実行
npm run format            # 全ファイルをフォーマット
npm run format:check      # フォーマットのチェック

# テスト（shared パッケージのみ）
cd shared && npm test     # Jest テストを実行

# Storybook（共有 UI コンポーネント）
npm run storybook         # Storybook を起動（ポート 6007）
```

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
