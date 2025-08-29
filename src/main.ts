import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import axios from 'axios';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3003);
}

async function logServerIP() {
  try {
    const res = await axios.get('https://api.ipify.org?format=json');
    console.log('IP pública del servidor Railway:', res.data.ip);
  } catch (error) {
    console.error('No se pudo obtener la IP pública:', error);
  }
}

logServerIP();
bootstrap();
