import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

const successNotification = (message: string) => {
    notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: "Success",
        message: message,
        color: 'teal',
        icon: <IconCheck size={18} />,
        withBorder: true,
        className: "!border-green-500",
    });
};

const errorNotification = (message: string) => {
    notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: "Error",
        message: message,
        color: 'red',
        icon: <IconX />,
        withBorder: true,
        className: "!border-red-500",
    });
};

export { successNotification, errorNotification };