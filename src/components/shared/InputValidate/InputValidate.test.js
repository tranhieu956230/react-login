import React from "react";
import { mount } from "enzyme";

import InputValidate from "./";

describe("Test ValidateInput mount", () => {
  it("Should change value", () => {
    let mockOnChange = jest.fn();
    const wrapper = mount(<InputValidate onChange={mockOnChange} />);
    const input = wrapper.find("input").at(0);
    input.simulate("change", { target: { value: "new value" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });
});
