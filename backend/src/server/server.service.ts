import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateServerDTO } from './dto';
import { v4 as uuidv4 } from 'uuid';
import { MemberRole } from 'src/member/member.types';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class ServerService {
  constructor(private readonly prisma: PrismaService) {}

  async createServer(input: CreateServerDTO, imageUrl: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { id: input.profileId },
    });

    if (!profile) throw new BadRequestException('Profile not found!');
    return this.prisma.server.create({
      data: {
        ...input,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: 'general', profileId: profile.id, type: 'TEXT' }],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
      include: {
        members: true,
      },
    });
  }

  async getServer(id: number, email: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { email },
    });
    if (!profile)
      return new ApolloError('Profile not found', 'PROFILE_NOT_FOUND');

    const server = await this.prisma.server.findFirst({
      where: {
        id,
        members: {
          some: { profileId: profile.id },
        },
      },
    });
    if (!server) return new ApolloError('Server not found', 'SERVER_NOT_FOUND');
    return server;
  }

  async getServerByProfileEmailOfMember(email: string) {
    return this.prisma.server.findMany({
      where: {
        members: {
          some: {
            profile: { email },
          },
        },
      },
    });
  }
}
