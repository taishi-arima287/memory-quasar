# ベースイメージ
FROM node:18-alpine

# 作業ディレクトリの設定
WORKDIR /app

# パッケージファイルのコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# ソースコードのコピー
COPY . .

# Prismaの生成
RUN npx prisma generate

# ビルド
RUN npm run build

# ポートの公開
EXPOSE 8080

# アプリケーションの起動
CMD ["npm", "run", "start"] 