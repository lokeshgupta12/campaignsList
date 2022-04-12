import React from "react";
import { render } from "@testing-library/react";
import ReportPage from "../index";
import data from "../../../store/sagas/mockList";
const renderComponent = (props) => render(<ReportPage {...props} />);

const tableProps = {
  list: data,
};

test("Should render component ", () => {
  const { container } = renderComponent(tableProps);
  expect(container).toBeTruthy();
});
