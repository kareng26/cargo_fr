import dayjs from "dayjs";

const dateConverter = (date?: string, withSeconds: boolean = false) => {
    if (!date) return "";

    const parsedDate = dayjs(date);
    return parsedDate.isValid()
        ? parsedDate.format(`DD.MM.YYYY HH:mm${withSeconds ? ":ss" : ""}`)
        : date;
};

export { dateConverter };
