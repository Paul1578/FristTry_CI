import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CatalogosModule } from './catalogos/catalogos.module';
import { CatalogoValorModule } from './catalogo-valor/catalogo-valor.module';
import { CarreraModule } from './carrera/carrera.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { DataEmpresaModule } from './data-empresa/data-empresa.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as fs from 'fs';

let sslConfig = {};
const caPath = process.env.CA_PATH;
const existsCaPath = fs.existsSync(caPath);

if (existsCaPath) {
  console.log('Exists certificate');
  sslConfig = {
    ca: fs.readFileSync(caPath).toString(),
    rejectUnauthorized: true,
  };
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
    }),
   TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // necesario para Render
        autoLoadEntities: true,
        synchronize: true, // cuidado: solo en desarrollo
      }),
    }),
    CatalogosModule,
    EstudiantesModule,
    CatalogoValorModule,
    CarreraModule,
    DataEmpresaModule,
    ProyectoModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
