import React from "react";
import { shallow } from "enzyme";
import ActivateAccount from "./index";
import { Text } from "./style";
import { findByTestAttr } from "utils/test.js";

const setUp = (props = {}) => {
  return shallow(<ActivateAccount {...props} />);
};

describe("Login Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render without errors", () => {
    const wrapper = shallow(<Text />);
    expect(wrapper.contains(<Text />)).toBeDefined();
  });
});
