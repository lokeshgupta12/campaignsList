import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchComponent from '../index';
const renderComponent = props => render(<SearchComponent {...props} />);

const searchProps = {
    onChange: jest.fn(),
    onStartDateChange: jest.fn(),
    onEndDateChange: jest.fn(),
}

test('Should render component ', () => {
    const {container} = renderComponent(searchProps);
    expect(container).toBeTruthy();
});

test('When Enter Test value In search box', () => {
    const {queryByPlaceholderText} = renderComponent(searchProps);
  
      const searchInput = queryByPlaceholderText('Search By Name')
  
      fireEvent.change(searchInput, { target: { value: 'test' } })
  
      expect(searchInput.value).toBe('test')
});

test('Check Placeholder for Start DatePicker', () => {
    renderComponent(searchProps);
  
    const startDateNode = screen.getByPlaceholderText(/Start Date/i);
    expect(startDateNode).toBeInTheDocument()
});

test('Check Placeholder for End DatePicker', () => {
    renderComponent(searchProps);
  
    const endDateNode = screen.getByPlaceholderText(/End Date/i);
    expect(endDateNode).toBeInTheDocument()
});