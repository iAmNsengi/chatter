import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProfileService {
    constructor(private readonly prisma: PrismaService) { }
    
    async createProfile(createProfileDto: CreateProfileDTO) {
        
    }
}
