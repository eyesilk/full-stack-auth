export type User = {
  id: string;
  email: string;
  password: string;
  displayName: string;
  role: string;
  isVerified: boolean;
  isTwoFactorEnabled: boolean;
  method: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
};
