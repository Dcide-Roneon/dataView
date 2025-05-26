import React from "react";
import { render, screen } from "@testing-library/react";
import ResultsList from '../components/resultList';
// Mock the ResultCard component so we don’t depend on its internals
jest.mock("../components/ResultsCard", () => ({ row }) => (
  <div data-testid="result-card">{row.company}</div>
));

describe("ResultsList", () => {
  it("shows 'No results found' when results is empty", () => {
    render(<ResultsList results={[]} />);
    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });

  it("renders a list of ResultCard components", () => {
    const mockResults = [
      { company: "AlphaTech", latitude: 12, longitude: 34 },
      { company: "BetaCorp", latitude: 56, longitude: 78 },
    ];

    render(<ResultsList results={mockResults} />);

    const cards = screen.getAllByTestId("result-card");
    expect(cards).toHaveLength(2);
    expect(screen.getByText("AlphaTech")).toBeInTheDocument();
    expect(screen.getByText("BetaCorp")).toBeInTheDocument();
  });
});
