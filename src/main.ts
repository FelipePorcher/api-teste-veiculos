import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import 'module-alias/register'
import { AppModule } from './app.module'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule)
  const configSwagger = new DocumentBuilder()
    .setTitle('Teste Veiculos API')
    .setVersion('0.0.1')
    .build()

  const document = SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup('doc', app, document)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}
void bootstrap()
