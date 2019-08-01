import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import { BrowserRouter, Route } from "react-router-dom";
import { act } from "react-dom/test-utils";

import ActivateAccount from "./index";
import { activateAccount } from "services";

jest.mock("services", () => ({
  activateAccount: jest.fn()
}));

describe("Test ActivateAccount Shallow", () => {
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

describe("Test ActivateAccount Mount", () => {
  afterEach(() => {
    activateAccount.mockReset();
  });

  it("Should render activated", async done => {
    const code = {
      match: {
        params: {
          code: 1000
        }
      }
    };

    activateAccount.mockImplementationOnce(code => {
      return new Promise(resolve => {
        resolve({ code: "SUCCESS" });
      });
    });

    let wrapper;
    act(() => {
      wrapper = mount(
        <BrowserRouter>
          <Route render={props => <ActivateAccount {...props} {...code} />} />
        </BrowserRouter>
      );
    });
    setTimeout(() => {
      const text = wrapper.find("h1").text();
      expect(text).toEqual("Your account is activated. Please log in");
      expect(activateAccount).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("Should render activating.", async done => {
    const code = {
      match: {
        params: {
          code: 1000
        }
      }
    };

    activateAccount.mockImplementationOnce(code => {
      return new Promise(resolve => {
        resolve({ code: "UNAUTHORIZED" });
      });
    });

    let wrapper;
    act(() => {
      wrapper = mount(
        <BrowserRouter>
          <Route render={props => <ActivateAccount {...props} {...code} />} />
        </BrowserRouter>
      );
    });

    setTimeout(() => {
      const text = wrapper.find("h1").text();
      expect(text).toEqual("We are activating your account");
      expect(activateAccount).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
