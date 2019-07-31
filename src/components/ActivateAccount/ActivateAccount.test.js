import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import ActivateAccount from "./index";

describe("Test Activate Account Component", () => {
  it("Should render with no error", () => {
    const wrapper = shallow(<ActivateAccount />);
    const text = wrapper.find("h1").text();
    expect(text).toEqual("We are activating your account");
  });

  it("Should match the snapshot", () => {
    const tree = renderer.create(<ActivateAccount />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
