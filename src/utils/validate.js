const isValidPassword = (password) => {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/g;
    return regex.test(password);
};

const isValidEmail = email => {
  let regex = /\w+@\w+\.\w+/g;
  return regex.test(email);
};

const isValidUsername = username => {
  let regex = /^(?=.*\w)(?=.*\d)[\w\d]{6,}$/g;
  return regex.test(username);
};

export default {
  isValidPassword,
  isValidEmail,
  isValidUsername
};
