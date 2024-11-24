import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class GraphlAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const gqCtx = context.getArgByIndex(2);
    const token = this.extractToken(request);
    if (!token) throw new UnauthorizedException('Not Authorized!');
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        publicKey: process.env.JWT_PUBLIC_KEY,
        algorithms: ['RS256'],
      });
      request['profile'] = payload;
    } catch (error) {}
  }
}
