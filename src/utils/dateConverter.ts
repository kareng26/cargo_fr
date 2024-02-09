import dayjs from "dayjs";

export const dateConverter = (date?: string, withSeconds: boolean = false) => {
    if (!date) return "";

    const parsedDate = dayjs(date);
    return parsedDate.isValid()
        ? parsedDate.format(`DD.MM.YYYY HH:mm${withSeconds ? ":ss" : ""}`)
        : date;
};
