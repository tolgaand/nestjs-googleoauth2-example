import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URI,
      authSource: 'admin',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
