import React from "react";
import { shallow } from "enzyme";
import Home from "./index";

describe("Test Home Component", () => {
  it("It should render without errors", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toBeDefined();
  });
});
