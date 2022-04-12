import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { getStore } from "./store";
import App from "./App";

const store = getStore();
test("renders App And check App Class Exist", () => {
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(container.firstChild.classList.contains("App")).toBe(true);
});
