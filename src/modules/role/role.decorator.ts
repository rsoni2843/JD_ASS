// roles.decorator.ts

import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/database/entities/role.entity';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
