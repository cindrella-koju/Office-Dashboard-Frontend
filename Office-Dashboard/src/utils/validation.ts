export const emailValidate = (email: string) =>
  /^[a-zA-Z0-9._%+-]+\.teslatech@gmail\.com$/.test(email);

export const validatePassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/.test(password);
