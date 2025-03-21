import { SetMetadata } from "@nestjs/common";
import { roles as Role } from "@prisma/client";


export const ROLES_KEY = 'roles';
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);