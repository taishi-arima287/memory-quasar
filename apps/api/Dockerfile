# ビルドコンテキストはモノレポのルート（docker-compose.yml を参照）

# ベースイメージ
FROM node:18-alpine

# Prisma が必要とする OpenSSL
RUN apk add --no-cache openssl

# 作業ディレクトリの設定
WORKDIR /repo

# ワークスペースの解決に必要な package.json 群を先にコピー
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY apps/admin/package.json apps/admin/
COPY shared/package.json shared/

# npm install の postinstall で prisma generate が走るため、スキーマを先に配置する
COPY apps/api/prisma apps/api/prisma

# 依存関係のインストール（api ワークスペースのみ）
RUN npm install --workspace=api

# ソースコードのコピー
COPY apps/api apps/api

WORKDIR /repo/apps/api

# 型エラーの検出を兼ねてビルドしておく
RUN npm run build

# ポートの公開
EXPOSE 8080

# アプリケーションの起動
CMD ["npm", "run", "dev"]
