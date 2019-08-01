import React from "react";
import { mount } from "enzyme";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./";
import { getUserInfo } from "services";

jest.mock("services", () => ({
  getUserInfo: jest.fn()
}));

describe("Test Home Component", () => {
  it("Should get user info and render username", async done => {
    getUserInfo.mockImplementationOnce(() => {
      return new Promise(resolve => {
        resolve({
          code: "SUCCESS",
          result: {
            username: "Hieu"
          }
        });
      });
    });

    const wrapper = mount(
      <BrowserRouter>
        <Route render={props => <Home {...props} />} />
      </BrowserRouter>
    );

    setTimeout(() => {
      const title = wrapper.find("h1").text();
      expect(title).toEqual("Welcome Hieu");
      done();
    });
  });
});
