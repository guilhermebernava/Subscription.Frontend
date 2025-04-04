export interface IAuth {
  email: string;
  password?: string;
  newPassword?: string;
  oldPassword?: string;
  confirmationCode?: string;
}
