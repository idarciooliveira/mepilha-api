
import { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StorageProvider } from '../storage-provider';

@Injectable()
export class S3Service implements StorageProvider {
    private readonly s3: S3;

    constructor(private readonly configService: ConfigService) {
        this.s3 = new S3({
            accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
            region: this.configService.get<string>('AWS_REGION'),
        });
    }

    async upload(file: any, folder: string): Promise<string> {

        console.log(file)
        const filename = `${randomUUID()}-${file.originalname}`
        const params = {
            Bucket: this.configService.get<string>('AWS_BUCKET'),
            Key: `${folder}/${filename}`,
            ContentType: 'image/png',
            Body: file.buffer,
            ACL: 'public-read',
        };


        await this.s3.upload(params).promise();

        return `https://${this.configService.get<string>('AWS_BUCKET')}.s3.amazonaws.com/${folder}/${filename}`;
    }

    async delete(file: string): Promise<void> {
        const params = {
            Bucket: this.configService.get<string>('AWS_BUCKET'),
            Key: file,
        };

        await this.s3.deleteObject(params).promise();
    }
}
