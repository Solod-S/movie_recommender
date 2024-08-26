import { render, screen, act, waitFor } from "@testing-library/react";
import React from "react";
import { useCustomNotification } from "./index";

// Компонент-обертка для использования хука
const TestComponent = ({ callback }) => {
  const { showNotification, NotificationComponent } = useCustomNotification();

  React.useEffect(() => {
    callback({ showNotification });
  }, [showNotification, callback]);

  return <>{NotificationComponent}</>;
};

describe("useCustomNotification hook", () => {
  describe("useCustomNotification hook", () => {
    it("should show and hide notification", async () => {
      let hookValue;

      // Рендерим компонент и получаем значения хука
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

      // Проверяем, что уведомление success отображается
      expect(screen.getByText("Operation successful!")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveClass("MuiAlert-filledSuccess");

      // Используем waitFor с увеличенным тайм-аутом для проверки что success пропало
      await waitFor(
        () =>
          expect(
            screen.queryByText("Operation successful!")
          ).not.toBeInTheDocument(),
        { timeout: 1500 }
      );

      // 1.2 Показываем уведомление info
      act(() => {
        hookValue.showNotification("This is an info message!", "info", 1000, {
          vertical: "top",
          horizontal: "center",
        });
      });

      // Проверяем, что уведомление info отображается
      expect(screen.getByText("This is an info message!")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveClass("MuiAlert-filledInfo");

      // Используем waitFor с увеличенным тайм-аутом для проверки что info пропало
      await waitFor(
        () =>
          expect(
            screen.queryByText("This is an info message!")
          ).not.toBeInTheDocument(),
        { timeout: 1500 }
      );

      // 1.3 Показываем уведомление error
      act(() => {
        hookValue.showNotification("An error occurred!", "error", 1000, {
          vertical: "top",
          horizontal: "center",
        });
      });

      // Проверяем, что уведомление error отображается
      expect(screen.getByText("An error occurred!")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveClass("MuiAlert-filledError");

      // Используем waitFor с увеличенным тайм-аутом для проверки что error пропало
      await waitFor(
        () =>
          expect(
            screen.queryByText("An error occurred!")
          ).not.toBeInTheDocument(),
        { timeout: 1500 }
      );
    });

    it("should show different types of notifications", async () => {
      let hookValue;

      // Рендерим компонент и получаем значения хука
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

      // Проверяем, что уведомление success отображается
      expect(screen.getByText("Operation successful!")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveClass("MuiAlert-filledSuccess");

      // 2.2 Показываем уведомление info
      act(() => {
        hookValue.showNotification("This is an info message!", "info", 1000, {
          vertical: "top",
          horizontal: "left",
        });
      });

      // Проверяем, что уведомление info отображается
      expect(screen.getByText("This is an info message!")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveClass("MuiAlert-filledInfo");

      // 2.3 Показываем уведомление error
      act(() => {
        hookValue.showNotification("An error occurred!", "error", 1000, {
          vertical: "bottom",
          horizontal: "right",
        });
      });

      // Проверяем, что уведомление error отображается
      expect(screen.getByText("An error occurred!")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveClass("MuiAlert-filledError");
    });
  });
});
