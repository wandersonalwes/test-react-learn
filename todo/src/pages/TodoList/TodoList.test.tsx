import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";

import { TodoList } from ".";

describe("TodoList", () => {
  test("should rendered list of todos", () => {
    render(<TodoList />);

    expect(screen.getByTestId("todo-list")).toBeInTheDocument();
  });

  test("should change the input value when typing", () => {
    render(<TodoList />);

    const input = screen.getByTestId("todo-input");

    fireEvent.change(input, {
      target: { value: "Todo" },
    });

    expect(input).toHaveValue("Todo");
  });

  test("should clear input on save", () => {
    render(<TodoList />);

    const input = screen.getByTestId("todo-input");

    fireEvent.change(input, {
      target: { value: "Todo" },
    });

    fireEvent.keyDown(input, {
      key: "Enter",
      code: 13,
    });

    expect(input).toHaveValue("");
  });

  test("should add todo press enter", () => {
    render(<TodoList />);

    const input = screen.getByTestId("todo-input");

    fireEvent.change(input, {
      target: { value: "Todo" },
    });

    fireEvent.keyDown(input, {
      key: "Enter",
      code: 13,
    });

    expect(screen.getByTestId("todo-list")).toHaveTextContent("Todo");
  });

  test("should add todo click button", () => {
    render(<TodoList />);

    const input = screen.getByTestId("todo-input");
    const button = screen.getByTestId("todo-button");

    fireEvent.change(input, {
      target: { value: "Todo" },
    });

    fireEvent.click(button);

    expect(screen.getByTestId("todo-list")).toHaveTextContent("Todo");
  });

  test("should not add empty todo", () => {
    render(<TodoList />);

    const button = screen.getByTestId("todo-button");
    const list = screen.getByTestId("todo-list");

    fireEvent.click(button);

    expect(list.children.length).toBe(0);
  });

  test("should not add duplicated todo", () => {
    render(<TodoList />);

    const input = screen.getByTestId("todo-input");
    const button = screen.getByTestId("todo-button");
    const list = screen.getByTestId("todo-list");

    fireEvent.change(input, {
      target: { value: "Todo" },
    });

    fireEvent.click(button);

    fireEvent.change(input, {
      target: { value: "Todo" },
    });

    fireEvent.click(button);
    expect(list.children.length).toBe(1);
  });

  test("should have a remove button on every task", () => {
    render(<TodoList />);
    const input = screen.getByTestId("todo-input");

    fireEvent.change(input, {
      target: { value: "Todo" },
    });

    fireEvent.keyDown(input, {
      key: "Enter",
      code: 13,
    });

    expect(screen.getAllByTestId("todo-remove-item").length).toBe(1);
  });

  test("should remove task by clicking delete", () => {
    render(<TodoList />);
    const input = screen.getByTestId("todo-input");

    fireEvent.change(input, {
      target: { value: "Todo" },
    });

    fireEvent.keyDown(input, {
      key: "Enter",
      code: 13,
    });

    const button = screen.getByTestId("todo-remove-item");

    fireEvent.click(button);

    const list = screen.getByTestId("todo-list");

    expect(list.children.length).toBe(0);
  });
});
