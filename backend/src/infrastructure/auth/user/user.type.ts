import { Prisma } from 'prisma/__generated__';

export type User = Prisma.UserGetPayload<{ include: { accounts: true } }>;
