import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from 'src/database/entities/role.entity';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private readonly requiredRoles: string[]) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const userRoles = user.roles;

    if (!userRoles || userRoles.length === 0) {
      throw new UnauthorizedException('User has no roles');
    }

    const hasRequiredRole = userRoles.some((role: Role) =>
      this.requiredRoles.includes(role.role_name),
    );

    if (!hasRequiredRole) {
      throw new UnauthorizedException('Insufficient permissions');
    }

    return true;
  }
}
