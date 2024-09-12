import { render, screen, act, waitFor } from "@testing-library/react";
import React from "react";
import { useCustomNotification } from "./index";

jest.useFakeTimers();

const TestComponent = ({ callback }) => {
  const { showNotification, NotificationComponent } = useCustomNotification();

  React.useEffect(() => {
    callback({ showNotification });
  }, [showNotification, callback]);

  return <>{NotificationComponent}</>;
};

describe("useCustomNotification hook", () => {
  it("should show and hide notification", async () => {
    let hookValue;

    render(
      <TestComponent
        callback={value => {
          hookValue = value;
        }}
      />
    );

    // 1.1 Показываем уведомление success
    act(() => {
      hookValue.showNotification("Operation successful!", "success", 1000, {
        vertical: "top",
        horizontal: "center",
      });
    });

    // Успешное уведомление должно быть в документе
    expect(
      await screen.findByText("Operation successful!")
    ).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("MuiAlert-filledSuccess");

    // Перематывает все таймеры, чтобы убедиться, что все действия, зависящие от таймеров, завершены.
    act(() => {
      jest.runAllTimers();
    });

    // Проверяем, что уведомление исчезло
    await waitFor(() =>
      expect(
        screen.queryByText("Operation successful!")
      ).not.toBeInTheDocument()
    );

    // 1.2 Показываем уведомление info
    act(() => {
      hookValue.showNotification("This is an info message!", "info", 1000, {
        vertical: "top",
        horizontal: "center",
      });
    });

    // Уведомление info должно быть в документе
    expect(
      await screen.findByText("This is an info message!")
    ).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("MuiAlert-filledInfo");

    // Перематывает все таймеры, чтобы убедиться, что все действия, зависящие от таймеров, завершены.
    act(() => {
      jest.runAllTimers();
    });

    // Проверяем, что уведомление исчезло
    await waitFor(() =>
      expect(
        screen.queryByText("This is an info message!")
      ).not.toBeInTheDocument()
    );

    // 1.3 Показываем уведомление error
    act(() => {
      hookValue.showNotification("An error occurred!", "error", 1000, {
        vertical: "top",
        horizontal: "center",
      });
    });

    // Уведомление error должно быть в документе
    expect(await screen.findByText("An error occurred!")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("MuiAlert-filledError");

    // Перематывает все таймеры, чтобы убедиться, что все действия, зависящие от таймеров, завершены.
    act(() => {
      jest.runAllTimers();
    });

    // Проверяем, что уведомление исчезло
    await waitFor(() =>
      expect(screen.queryByText("An error occurred!")).not.toBeInTheDocument()
    );
  });

  it("should show different types of notifications", async () => {
    let hookValue;

    render(
      <TestComponent
        callback={value => {
          hookValue = value;
        }}
      />
    );

    // 2.1 Показываем уведомление success
    act(() => {
      hookValue.showNotification("Operation successful!", "success", 1000, {
        vertical: "top",
        horizontal: "left",
      });
    });

    // Уведомление success должно быть в документе
    expect(
      await screen.findByText("Operation successful!")
    ).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("MuiAlert-filledSuccess");

    // Перематывает все таймеры, чтобы убедиться, что все действия, зависящие от таймеров, завершены.
    act(() => {
      jest.runAllTimers();
    });

    // Проверяем, что уведомление исчезло
    await waitFor(() =>
      expect(
        screen.queryByText("Operation successful!")
      ).not.toBeInTheDocument()
    );

    // 2.2 Показываем уведомление info
    act(() => {
      hookValue.showNotification("This is an info message!", "info", 1000, {
        vertical: "top",
        horizontal: "left",
      });
    });

    // Уведомление info должно быть в документе
    expect(
      await screen.findByText("This is an info message!")
    ).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("MuiAlert-filledInfo");

    // Перематывает все таймеры, чтобы убедиться, что все действия, зависящие от таймеров, завершены.
    act(() => {
      jest.runAllTimers();
    });

    // Проверяем, что уведомление исчезло
    await waitFor(() =>
      expect(
        screen.queryByText("This is an info message!")
      ).not.toBeInTheDocument()
    );

    // 2.3 Показываем уведомление error
    act(() => {
      hookValue.showNotification("An error occurred!", "error", 1000, {
        vertical: "bottom",
        horizontal: "right",
      });
    });

    // Уведомление error должно быть в документе
    expect(await screen.findByText("An error occurred!")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("MuiAlert-filledError");
  });
});
