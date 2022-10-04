import { UserNamePassword } from "../resolvers/UserNamePassword";

export const validateRegister = (options: UserNamePassword) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }

  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "length of username must be more than 2 characters",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "username cannot contain an @",
      },
    ];
  }

  if (options.password.length <= 2) {
    return [
      {
        field: "password",
        message: "length of password must be more than 2 characters",
      },
    ];
  }
  return null;
};
