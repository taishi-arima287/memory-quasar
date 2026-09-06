# ビルドコンテキストはモノレポのルート（docker-compose.yml を参照）
# web は @memory-quasar/shared を file:../../shared で参照するため、
# ルートをコンテキストにしないと shared/ が見えず npm install に失敗する。
# Tailwind v4 のネイティブバイナリ (@tailwindcss/oxide) が engines: node >= 20 のため 22 を使う
FROM node:22-alpine

WORKDIR /repo

# ワークスペースの解決に必要な package.json 群を先にコピー
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY apps/admin/package.json apps/admin/
COPY shared/package.json shared/

# 依存関係のインストール（web と shared のみ）
RUN npm install --workspace=web --workspace=@memory-quasar/shared

# ソースコードのコピー
COPY shared shared
COPY apps/web apps/web

WORKDIR /repo/apps/web

EXPOSE 3000

CMD ["npm", "run", "dev"]
