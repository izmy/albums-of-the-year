import * as React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders loading circle", () => {
  const { container } = render(<App />);
  const loading = container.querySelector(".MuiCircularProgress-svg");
  expect(loading).toBeInTheDocument();
});
