import React from "react";
import { shallow } from "enzyme";
import SignUp from "./index";

describe("Test SignUp Component", () => {
  it("It should render without errors", () => {
    const wrapper = shallow(<SignUp />);
    expect(wrapper).toBeDefined();
  });
});
