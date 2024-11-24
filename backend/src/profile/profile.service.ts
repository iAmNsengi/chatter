import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProfileDTO } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(createProfileDto: CreateProfileDTO) {
    const profile = await this.prisma.profile.findUnique({
      where: { email: createProfileDto.email },
    });
    if (profile) return profile;
    return this.prisma.profile.create({
      data: createProfileDto,
    });
  }

  async getProfileById(id: number) {
    return this.prisma.profile.findUnique({
      where: {
        id,
      },
      include: {
        servers: {
          include: { channels: true },
        },
      },
    });
  }

  async getProfileByEmail(email: string) {
    return this.prisma.profile.findUnique({
      where: { email },
      include: { servers: { include: { channels: true } } },
    });
  }
}
