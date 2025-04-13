export const comparePasswords = (password: string, confirmPassword: string) => {
  return password == confirmPassword;
};

export const validatePasswordLength = (password: string) => {
  return password.length < 8 || password.length > 36;
};

export const isPasswordFormatInvalid = (password: string) => {
  return !/[A-Z]/.test(password) || !/\d/.test(password);
};
