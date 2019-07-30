import React from "react";
import { shallow, render, mount } from "enzyme";
import ChangePassword from "./index";

import { findByTestAttr } from "utils/test.js";

const setUp = (props = {}) => {
  return shallow(<ChangePassword {...props} />);
};

describe("Login Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("It should render without errors", () => {
    const wrapper = shallow(<ChangePassword />);
    expect(wrapper).toBeDefined();
  });

  it("Should render header component", () => {
    const wrapper = findByTestAttr(component, "header");
    expect(wrapper.length).toBe(1);
  });

  it("Should render text component", () => {
    const wrapper = mount(<FormWrapper />);
    console.log(wrapper.debug());
  });
});
