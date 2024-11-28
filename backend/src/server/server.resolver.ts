import { Args, Context, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { Server } from './types';
import { UseGuards } from '@nestjs/common';
import { GraphlAuthGuard } from 'src/auth/auth.guard';
import { ApolloError } from 'apollo-server-express';

@Resolver()
export class ServerResolver {
  @UseGuards(GraphlAuthGuard)
  @Query(() => [Server])
  async getServers(
    @Args('profileId') profileId: number,
    @Context() ctx: { req: Request },
  ) {
    if (!ctx.req.profile.email)
      return new ApolloError('Profile not found', 'PROFILE_NOT_FOUND');
  }
}
