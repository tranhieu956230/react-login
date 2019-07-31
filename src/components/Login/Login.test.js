import React from "react";
import { shallow } from "enzyme";
import Login from "./index";

describe("Test Login Component", () => {
  it("It should render without errors", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toBeDefined();
  });
});
