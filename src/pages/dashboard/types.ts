import { I18 } from "@/i18n.ts";

enum Statuses {
    "Передано в доставку" = I18.TO_DELIVERY,
    "В пути" = I18.ON_WAY,
    "Создано" = I18.CREATED,
    "Получено" = I18.DELIVERED,
}

enum StatusColores {
    to_delivery = "#c01a1a",
    on_way = "#128118",
    created = "#2385a9",
    delivered = "#eabc4e",
}

type OptionArgs = {
    value: number;
    name: Statuses;
    itemStyle: { color: string };
};

export { Statuses, StatusColores };

export type { OptionArgs };
