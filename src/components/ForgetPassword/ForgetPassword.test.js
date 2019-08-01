import React from "react";
import { mount } from "enzyme";
import { BrowserRouter, Route } from "react-router-dom";

import ForgetPassword from "./ForgetPassword";
import { resetPassword } from "services";

jest.mock("services", () => ({
  resetPassword: jest.fn()
}));

describe("Test ForgetPassword Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <Route render={props => <ForgetPassword {...props} />} />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("Should render without errors", () => {
    expect(wrapper).toBeDefined();
  });

  it("Should display errors", async done => {
    wrapper.find(".forget-password__form").simulate("click");
    setTimeout(() => {
      expect(resetPassword).toHaveBeenCalledTimes(0);
      done();
    });
  });

  it("Should call api with arguments", async done => {
    const input = wrapper.find(".input__field");
    input.simulate("change", { target: { value: "valid@gmail.com" } });

    resetPassword.mockImplementationOnce(account => {
      return new Promise(resolve => ({
        code: "SUCCESS"
      }));
    });

    wrapper.find(".forget-password__form").simulate("submit");
    setTimeout(() => {
      expect(resetPassword).toBeCalledWith("valid@gmail.com");
      done();
    });
  });
});
