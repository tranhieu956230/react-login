import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import { BrowserRouter, Route } from "react-router-dom";

import ActivateAccount from "./index";

jest.mock("../../services/index.js");

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

  it("Should render activated", async done => {
    const code = {
      match: {
        params: {
          code: 1000
        }
      }
    };

    const wrapper = mount(
      <BrowserRouter>
        <Route render={props => <ActivateAccount {...props} {...code} />} />
      </BrowserRouter>
    );
    setTimeout(() => {
      const text = wrapper.find("h1").text();
      expect(text).toEqual("Your account is activated. Please log in");
      done();
    });
  });
});
