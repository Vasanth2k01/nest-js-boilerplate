import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { Post } from './posts/entities/post.entity';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: '../db',
  entities: [Post],
  synchronize: true, // Indicates if database schema should be auto created on every application launch
};
@Module({
  imports: [PostsModule, TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
