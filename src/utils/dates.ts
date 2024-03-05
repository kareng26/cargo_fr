import dayjs from "dayjs";

const dateConverter = (date?: string, withSeconds: boolean = false) => {
    if (!date) return "";

    const parsedDate = dayjs(date);
    return parsedDate.isValid()
        ? parsedDate.format(`DD.MM.YYYY HH:mm${withSeconds ? ":ss" : ""}`)
        : date;
};

const addTime = (originalTime: Date, hours: number, minutes: number) => {
    return new Date(
        originalTime.getTime() + hours * 60 * 60 * 1000 + minutes * 60 * 1000,
    );
};

export { dateConverter, addTime };
