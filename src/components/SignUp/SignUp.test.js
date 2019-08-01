import React from "react";
import { mount } from "enzyme";
import { BrowserRouter, Route } from "react-router-dom";

import { signUp } from "services";
import SignUp from "./";

jest.mock("services", () => ({
  signUp: jest.fn()
}));

describe("Test SignUp Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <Route render={props => <SignUp {...props} />} />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    wrapper.unmount();
    signUp.mockReset();
  });

  it("Should render without errors", () => {
    expect(wrapper).toBeDefined();
  });

  it("Should not register", () => {
    const username = wrapper.find(".input__field").at(0);
    const password = wrapper.find(".input__field").at(2);

    username.simulate("change", { target: { value: "invalid_username" } });
    password.simulate("change", { target: { value: "invalid_password" } });

    wrapper.find(".sign-up__form").simulate("submit");
    expect(signUp).toHaveBeenCalledTimes(0);
  });

  it("Should call api with arguments", async done => {
    const username = wrapper.find(".input__field").at(0);
    const email = wrapper.find(".input__field").at(1);
    const password = wrapper.find(".input__field").at(2);
    const passwordConfirm = wrapper.find(".input__field").at(3);

    const usernameValue = "validUsername1";
    const passwordValue = "validPassword1";
    const emailValue = "valid@gmail.com";

    username.simulate("change", { target: { value: usernameValue } });
    email.simulate("change", { target: { value: emailValue } });
    password.simulate("change", { target: { value: passwordValue } });
    passwordConfirm.simulate("change", { target: { value: passwordValue } });

    signUp.mockReturnValueOnce(
      new Promise(resolve => {
        resolve({
          code: "SUCCESS"
        });
      })
    );

    wrapper.find(".sign-up__form").simulate("submit");
    setTimeout(() => {
      expect(signUp).toBeCalledWith(emailValue, passwordValue, usernameValue);
      done();
    });
  });
});
