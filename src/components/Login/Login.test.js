import React from "react";
import { mount } from "enzyme";
import { BrowserRouter, Route } from "react-router-dom";
import { login } from "services";

import Login from "./";

jest.mock("services", () => ({
  login: jest.fn()
}));

describe("Test Login Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <Route render={props => <Login {...props} />} />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    login.mockReset();
    wrapper.unmount();
  });

  it("Should render without errors", () => {
    expect(wrapper).toBeDefined();
  });

  it("Should render errors message", () => {
    const username = wrapper.find(".input__field").at(0);
    username.simulate("change", { target: { value: "tranhieu" } });
    wrapper.find(".login__form").simulate("submit");
    expect(login).toHaveBeenCalledTimes(0);
  });

  it("Should call api with arguments", async done => {
    const username = wrapper.find(".input__field").at(0);
    const password = wrapper.find(".input__field").at(1);

    username.simulate("change", { target: { value: "username" } });
    password.simulate("change", { target: { value: "password" } });

    login.mockReturnValueOnce(
      new Promise(resolve => {
        resolve({
          code: "SUCCESS",
          result: {
            access_token: "token"
          }
        });
      })
    );

    wrapper.find(".login__form").simulate("submit");
    setTimeout(() => {
      expect(login).toBeCalledWith("username", "password");
      done();
    });
  });
});
