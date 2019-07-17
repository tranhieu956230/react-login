const delay = milliseconds => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), milliseconds);
  });
};

let userInfo = {
  username: "test",
  password: "test",
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
  if (!email || !password || !name || !confirmPassword)
    return {
      success: false,
      message: "Field cannot be empty"
    };
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

export const resetPassword = async email => {
  await delay(200);
  if (email) {
    return {
      success: true,
      code: 200
    };
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  await delay(200);
  if (oldPassword !== newPassword) {
    userInfo.password = newPassword;
    return {
      success: true,
      code: 200
    };
  } else {
    return {
      success: false,
      message: "Your password must be different"
    };
  }
};
