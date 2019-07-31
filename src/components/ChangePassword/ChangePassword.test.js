import React from "react";
import { shallow } from "enzyme";
import ChangePassword from "./index";

describe("Test ChangePassword Component", () => {
  it("It should render without errors", () => {
    const wrapper = shallow(<ChangePassword />);
    expect(wrapper).toBeDefined();
  });
});
