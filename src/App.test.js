
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

test('renders Revenue Aggregator title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Revenue Aggregator/i);
  expect(titleElement).toBeInTheDocument();
});

