export type User = {
  id: number;
  userName: string;
  lastName: string;
  firstName: string;
  email: string;
  passwordHash: string;
  authorities: string;
  enabled: boolean;
}
