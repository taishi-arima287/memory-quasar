# ビルドコンテキストはモノレポのルート（docker-compose.yml を参照）
# admin は @memory-quasar/shared を file:../../shared で参照するため、
# ルートをコンテキストにしないと shared/ が見えず npm install に失敗する。
FROM node:18-alpine

WORKDIR /repo

# ワークスペースの解決に必要な package.json 群を先にコピー
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY apps/admin/package.json apps/admin/
COPY shared/package.json shared/

# 依存関係のインストール（admin と shared のみ）
RUN npm install --workspace=admin --workspace=@memory-quasar/shared

# ソースコードのコピー
COPY shared shared
COPY apps/admin apps/admin

WORKDIR /repo/apps/admin

EXPOSE 8000

CMD ["npm", "run", "dev"]
