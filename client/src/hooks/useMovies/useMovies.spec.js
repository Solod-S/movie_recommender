import { render, act } from "@testing-library/react";
import React from "react"; // Убедитесь, что импортируете React
import { useMovies } from "./index";
import { SELECTED_MOVIES_LIMIT } from "../../config";

// Компонент-обертка для использования хука
const TestComponent = ({ callback }) => {
  const { selectedMovies, selectMovie, deleteMovie } = useMovies();

  React.useEffect(() => {
    callback({ selectedMovies, selectMovie, deleteMovie });
  }, [selectedMovies, selectMovie, deleteMovie, callback]);

  return null;
};

describe("useMovies hook", () => {
  const basicMovie = {
    id: 1,
    title: "The Movie Title",
  };

  it("should persist selected movie in localStorage", async () => {
    localStorage.clear();
    let hookValue;

    // Рендеринг компонента и получение значения хука
    render(
      <TestComponent
        callback={value => {
          hookValue = value;
        }}
      />
    );

    // Выполняем действие с использованием act
    await act(async () => {
      hookValue.selectMovie(basicMovie);
    });

    // Проверяем, что фильм добавлен
    expect(hookValue.selectedMovies).toEqual([basicMovie]);

    // Проверяем, что фильм сохранен в localStorage
    const storedMovies = localStorage.getItem("selectedMovies");
    expect(storedMovies).toBeTruthy();

    // Проверяем, что данные в localStorage соответствуют ожидаемым
    const parsedMovies = JSON.parse(storedMovies);
    expect(parsedMovies).toEqual([basicMovie]);

    // Эмулируем перезагрузку страницы или ререндер
    // В случае с тестами, мы можем просто перерендерить компонент
    // или смоделировать перезагрузку страницы следующим образом:

    // Очищаем старое состояние
    hookValue = null;

    // Рендеринг компонента снова для имитации перезагрузки
    render(
      <TestComponent
        callback={value => {
          hookValue = value;
        }}
      />
    );

    // Проверяем, что фильм восстановлен
    expect(hookValue.selectedMovies).toEqual([basicMovie]);
  });

  it("should select movie", () => {
    localStorage.clear();
    let hookValue;

    // Рендеринг компонента и получение значения хука
    render(
      <TestComponent
        callback={value => {
          hookValue = value;
        }}
      />
    );

    // Проверяем начальное значение
    expect(hookValue.selectedMovies).toEqual([]);

    // Выполняем действие с использованием act
    act(() => {
      hookValue.selectMovie(basicMovie);
    });

    // Проверяем обновленное значение
    expect(hookValue.selectedMovies).toEqual([basicMovie]);
  });

  it("should select movie only once", () => {
    localStorage.clear();
    let hookValue;

    // Рендеринг компонента и получение значения хука
    render(
      <TestComponent
        callback={value => {
          hookValue = value;
        }}
      />
    );

    // Проверяем начальное значение

    expect(hookValue.selectedMovies).toEqual([]);

    // Выполняем действие с использованием act
    act(() => {
      hookValue.selectMovie(basicMovie);
    });

    expect(hookValue.selectedMovies.length).toBe(1);

    act(() => {
      hookValue.selectMovie(basicMovie);
    });

    // Проверяем обновленное значение

    expect(hookValue.selectedMovies).toEqual([basicMovie]);
  });

  it(`should select movie with ${SELECTED_MOVIES_LIMIT} movies limit`, () => {
    localStorage.clear();
    let hookValue;

    // Рендеринг компонента и получение значения хука
    render(
      <TestComponent
        callback={value => {
          hookValue = value;
        }}
      />
    );

    // Проверяем начальное значение
    expect(hookValue.selectedMovies).toEqual([]);

    for (let i = 0; i <= SELECTED_MOVIES_LIMIT + 1; i += 1) {
      // eslint-disable-next-line no-loop-func
      act(() => {
        hookValue.selectMovie({
          id: i,
          title: `The Movie Title ${i}`,
        });
      });
    }

    // Проверяем обновленное значение
    expect(hookValue.selectedMovies.length).toBe(SELECTED_MOVIES_LIMIT);

    // Дополнительная проверка на правильные элементы в массиве
    expect(hookValue.selectedMovies).toEqual(
      expect.arrayContaining(
        Array.from({ length: SELECTED_MOVIES_LIMIT }, (_, i) => ({
          id: i,
          title: `The Movie Title ${i}`,
        }))
      )
    );
  });

  it("should delete movie", () => {
    let hookValue;
    localStorage.clear();

    // Рендеринг компонента и получение значения хука
    render(
      <TestComponent
        callback={value => {
          hookValue = value;
        }}
      />
    );

    // Добавляем фильм
    act(() => {
      hookValue.selectMovie(basicMovie);
    });

    // Проверяем, что фильм lдобавлен
    expect(hookValue.selectedMovies.length).toBe(1);

    // Удаляем фильм
    act(() => {
      hookValue.deleteMovie(basicMovie);
    });

    // Проверяем, что фильм удален
    expect(hookValue.selectedMovies).toEqual([]);
  });

  it("should delete movie from list with many movies", () => {
    localStorage.clear();
    let hookValue;

    // Рендеринг компонента и получение значения хука
    render(
      <TestComponent
        callback={value => {
          hookValue = value;
        }}
      />
    );

    for (let i = 0; i <= SELECTED_MOVIES_LIMIT + 1; i += 1) {
      // eslint-disable-next-line no-loop-func
      act(() => {
        hookValue.selectMovie({
          id: i,
          title: `The Movie Title ${i}`,
        });
      });
    }

    // Проверяем обновленное значение
    expect(hookValue.selectedMovies.length).toBe(SELECTED_MOVIES_LIMIT);

    // Дополнительная проверка на правильные элементы в массиве
    expect(hookValue.selectedMovies).toEqual(
      expect.arrayContaining(
        Array.from({ length: SELECTED_MOVIES_LIMIT }, (_, i) => ({
          id: i,
          title: `The Movie Title ${i}`,
        }))
      )
    );

    // Удаляем фильм
    act(() => {
      hookValue.deleteMovie({
        id: SELECTED_MOVIES_LIMIT - 1,
        title: "The Movie Title 1",
      });
    });

    // Дополнительная проверка на правильные элементы в массиве
    expect(hookValue.selectedMovies).toEqual(
      expect.arrayContaining(
        Array.from({ length: SELECTED_MOVIES_LIMIT - 1 }, (_, i) => ({
          id: i,
          title: `The Movie Title ${i}`,
        }))
      )
    );
  });

  it("shouldn't delete movie", () => {
    localStorage.clear();
    let hookValue;

    // Рендеринг компонента и получение значения хука
    render(
      <TestComponent
        callback={value => {
          hookValue = value;
        }}
      />
    );

    // Добавляем фильм
    act(() => {
      hookValue.selectMovie(basicMovie);
    });

    // Проверяем, что фильм lдобавлен
    expect(hookValue.selectedMovies.length).toBe(1);

    // Удаляем фильм которого нету в списке
    act(() => {
      hookValue.deleteMovie({
        id: 2,
        Title: "The Movie Title",
      });
    });

    // Проверяем, что фильм не удален
    expect(hookValue.selectedMovies).toEqual([basicMovie]);
  });
});

// Warning: `ReactDOMTestUtils.act` is deprecated in favor of `React.act`
// npm install --save-dev @testing-library/react
