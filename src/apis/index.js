const delay = milliseconds => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), milliseconds);
  });
};

let userInfo = {
  username: "",
  password: "",
  name: ""
};

export const login = async (username, password) => {
  await delay(200);
  if (username === userInfo.username && password === userInfo.password) {
    return {
      success: true,
      access_token: "ACCESS_TOKEN",
      code: 200
    };
  }
  return {
    success: false,
    message: "Invalid username or password.",
    code: 400
  };
};

export const signUp = async (email, password, confirmPassword, name) => {
  await delay(200);
  if (password === confirmPassword) {
    userInfo.username = email;
    userInfo.password = password;
    return {
      success: true,
      code: 200
    };
  }
  return {
    success: false,
    message: "Password does not match."
  };
};
