import { Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';

@Resolver()
export class ServerResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    return 'hello world';
  }
}
