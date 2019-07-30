import React from "react";
import { shallow } from "enzyme";
import Login from "./index";

import { findByTestAttr } from "utils/test.js";

const setUp = (props = {}) => {
  return shallow(<Login {...props} />);
};

describe("Login Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("It should render without errors", () => {
    const wrapper = findByTestAttr(component, "container");
    expect(wrapper.length).toBe(1);
  });
});
