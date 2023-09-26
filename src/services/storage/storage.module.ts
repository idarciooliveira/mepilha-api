
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { S3Service } from './aws/S3Service.service';
import { StorageProvider } from './storage-provider';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MulterModule.register(),
    ],
    controllers: [],
    providers: [S3Service, {
        provide: StorageProvider,
        useClass: S3Service
    }],
    exports: [StorageProvider]
})
export class StorageModule { }
