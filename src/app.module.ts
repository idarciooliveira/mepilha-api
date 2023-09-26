import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { AuthController } from './controllers/auth.controller';
import { AuthModule } from './services/auth/auth.module';
import { StorageModule } from './services/storage/storage.module';
import { CampaignController } from './controllers/campaign.controller';
import { PaymentController } from './controllers/payment.controller';
import { CategoryController } from './controllers/category.controller';

@Module({
  imports: [AuthModule, StorageModule],
  controllers: [AuthController, CampaignController, PaymentController, CategoryController],
  providers: [PrismaService],
})
export class AppModule { }
