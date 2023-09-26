import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { AuthController } from './controllers/auth.controller';
import { AuthModule } from './services/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AuthController],
  providers: [PrismaService],
})
export class AppModule { }
