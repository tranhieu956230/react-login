import React from "react";
import { shallow } from "enzyme";
import ForgetPassword from "./index";

describe("Test ForgetPassword Component", () => {
  it("It should render without errors", () => {
    const wrapper = shallow(<ForgetPassword />);
    expect(wrapper).toBeDefined();
  });
});
