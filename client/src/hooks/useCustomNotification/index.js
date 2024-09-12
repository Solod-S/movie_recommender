import { useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

// Функция для отображения уведомлений
export const useCustomNotification = () => {
  const [notification, setNotification] = useState(null);

  // Функция для показа уведомления
  const showNotification = useCallback(
    (
      message,
      type = "info",
      duration = 1000,
      position = { vertical: "bottom", horizontal: "right" }
    ) => {
      setNotification({ message, type, duration, position });
    },
    []
  );

  // Функция для скрытия уведомления
  const handleClose = () => {
    setNotification(null);
  };

  const NotificationComponent = notification ? (
    <Snackbar
      open={true}
      autoHideDuration={notification.duration}
      onClose={handleClose}
      anchorOrigin={notification.position}
      sx={{ zIndex: 1300 }} // Setting z-index to ensure it's on top
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={notification.type}
        sx={{ zIndex: 1301 }} // Setting z-index slightly higher for the Alert component
      >
        {notification.message}
      </Alert>
    </Snackbar>
  ) : null;

  return {
    showNotification,
    NotificationComponent,
  };
};

//* Примеры вызова уведомлений

//* Используйте хук для управления уведомлениями
// const { showNotification, NotificationComponent } = useCustomNotification();

//* Вставьте компонент в разметку
// {
//   NotificationComponent;
// }

// const handleClick = () => {
//   showNotification("This is an info message!", "info", 5000, { vertical: 'top', horizontal: 'center' });
// };

// const handleError = () => {
//   showNotification("An error occurred!", "error", 7000, { vertical: 'bottom', horizontal: 'right' });
// };

// const handleSuccess = () => {
//   showNotification("Operation successful!", "success", 3000, { vertical: 'top', horizontal: 'left' });
// };
