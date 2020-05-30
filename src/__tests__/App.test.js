import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import { Button } from "../App";
import { create } from "react-test-renderer";
import App from "../App";

// test("renders learn react link", () => {
//   //const { getByText } = render(<App />);
//   const button = create(<Button />);
//   expect(button.toJSON()).toMatchSnapshot();
// });

describe("Addition", () => {
  it("knows that 2 and 2 make 4", () => {
    expect(2 + 2).toBe(4);
  });
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});
