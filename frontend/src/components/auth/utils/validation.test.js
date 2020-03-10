import { checkUsername, checkEmail, checkPassword } from "./validation";

describe("checkUsername", () => {
  it("invalid sync validation for username", () => {
    const expectedInput = "Jane-Doe";
    const expectedOutput = {
      username: "Username must be 2-20 alphanumeric characters"
    };
    expect(checkUsername(expectedInput)).toEqual(expectedOutput);
  });

  it("invalid sync validation for username", () => {
    const expectedInput = "";
    const expectedOutput = {
      username: "You must enter a username"
    };
    expect(checkUsername(expectedInput)).toEqual(expectedOutput);
  });

  it("valid sync validation for username", () => {
    const expectedInput = "JaneDoe";
    const expectedOutput = {};
    expect(checkUsername(expectedInput)).toEqual(expectedOutput);
  });
});

describe("checkEmail", () => {
  it("invalid sync validation for email", () => {
    const expectedInput = "";
    const expectedOutput = { email: "You must enter your email address" };
    expect(checkEmail(expectedInput)).toEqual(expectedOutput);
  });

  it("invalid sync validation for email", () => {
    const expectedInput = "janedoe.gcom";
    const expectedOutput = { email: "Invalid email address" };
    expect(checkEmail(expectedInput)).toEqual(expectedOutput);
  });
  it("valid sync validation for email", () => {
    const expectedInput = "janedoe@email.com";
    const expectedOutput = {};
    expect(checkEmail(expectedInput)).toEqual(expectedOutput);
  });
});

describe("checkPassword", () => {
  it("invalid sync validation for password", () => {
    const expectedInput = "";
    const expectedOutput = { password: "Enter password" };
    expect(checkPassword(expectedInput, "login")).toEqual(expectedOutput);
  });

  it("invalid sync validation for password", () => {
    const expectedInput = "inval passowrd!";
    const expectedOutput = {
      password: "Password must be 8 - 30 characters, no whitespaces allowed"
    };
    expect(checkPassword(expectedInput)).toEqual(expectedOutput);
  });
  it("valid sync validation for password", () => {
    const expectedInput = "validPASSWORD01";
    const expectedOutput = {};
    expect(checkPassword(expectedInput)).toEqual(expectedOutput);
  });
});
