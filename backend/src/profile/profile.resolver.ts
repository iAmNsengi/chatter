import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Profile } from './profile.type';
import { CreateProfileDTO } from './dto/profile.dto';
import { ProfileService } from './profile.service';
import { UseGuards } from '@nestjs/common';
import { GraphlAuthGuard } from 'src/auth/auth.guard';

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(GraphlAuthGuard)
  @Mutation(() => Profile)
  async createProfile(@Args('input') input: CreateProfileDTO) {
    return this.profileService.createProfile(input);
  }

  @Query(() => Profile)
  async getProfileById(@Args('profileId') profileId: number) {
    return this.profileService.getProfileById(profileId);
  }
}
