import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // バリデーションパイプを追加
  app.useGlobalPipes(new ValidationPipe());

  // CORSを有効化
  app.enableCors();

  // Swagger設定
  const config = new DocumentBuilder()
    .setTitle("Memory Quasar API")
    .setDescription("The Memory Quasar API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  // 環境変数からポート番号を取得（デフォルト: 8080）
  const port = process.env.PORT || 8080;

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/docs`);
}
bootstrap();
