import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import { BrowserRouter, Route } from "react-router-dom";

import ChangePassword from "./";
import { changePassword } from "services";

jest.mock("services", () => ({
  changePassword: jest.fn()
}));

describe("Test ChangePassword Shallow", () => {
  it("Should render with no error", () => {
    const wrapper = shallow(<ChangePassword />);
    expect(wrapper).toBeDefined();
  });

  it("Should match snapshot", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Route render={props => <ChangePassword {...props} />} />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Test ChangePassword Mount", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <Route render={props => <ChangePassword {...props} />} />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    changePassword.mockReset();
    wrapper.unmount();
  });

  it("Should not call api", async done => {
    wrapper.find("PrimaryButton").simulate("click");
    setTimeout(() => {
      expect(changePassword).toHaveBeenCalledTimes(0);
      done();
    });
  });

  it("Should call api with arguments", async done => {
    const oldPassword = wrapper.find(".input__field").at(0);
    const newPassword = wrapper.find(".input__field").at(1);
    const passwordConfirm = wrapper.find(".input__field").at(2);

    const oldPasswordValue = "oldPassword11235";
    const newPasswordValue = "newPassword11235";
    const passwordConfirmValue = "newPassword11235";

    oldPassword.simulate("change", { target: { value: oldPasswordValue } });
    newPassword.simulate("change", { target: { value: newPasswordValue } });
    passwordConfirm.simulate("change", { target: { value: passwordConfirmValue } });

    changePassword.mockImplementationOnce((a, b, c) => {
      return new Promise(resolve => {
        resolve({
          code: "SUCCESS"
        });
      });
    });

    wrapper.find(".change-password__form").simulate("submit");
    setTimeout(() => {
      expect(changePassword).toBeCalledWith(oldPasswordValue, newPasswordValue, undefined);
      done();
    });
  });
});
