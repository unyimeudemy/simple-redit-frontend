import { FieldError } from "../generated/graphql";

export const toErrorMap = (error: FieldError[]) => {
  const errorMap: Record<string, string> = {};

  error.forEach(({ field, message }) => {
    if (field.includes("username")) {
      errorMap["username"] = message;
    } else if (field.includes("email")) {
      errorMap["email"] = message;
    } else if (field.includes("password")) {
      errorMap["password"] = message;
    } else if (field.includes("UOP")) {
      errorMap["usernameOrEmail"] = message;
    } else if (field.includes("newPassword")) {
      errorMap["newPassword"] = message;
    } else {
      errorMap["createPost"] = message;
    }
    console.log("💥 inside errormap");
  });

  //   error.forEach(({ field, message }) => {
  //     console.log(field);
  //     console.log("usernameOrEmail", field.includes("usernameOrEmail"));
  //     console.log("usernameOnly", field.includes("usernameOnly"));
  //     console.log("emailOnly", field.includes("emailOnly"));
  //     console.log("password", field.includes("password"));
  //   });
  //   error.forEach(({ field, message }) => {
  //     errorMap[field] = message;
  //   });
  return errorMap;
};
