import { I18 } from "@/i18n.ts";
import { Colors } from "@/assets/colors";

enum Statuses {
    "Передано в доставку" = I18.TO_DELIVERY,
    "В пути" = I18.ON_WAY,
    "Создано" = I18.CREATED,
    "Получено" = I18.DELIVERED,
}

enum StatusColores {
    to_delivery = Colors.ROUGE_CARDINAL,
    on_way = Colors.VERT_GOLF,
    created = Colors.BLEU_MARMARA,
    delivered = Colors.RUBAN_A_CHEVEUX,
}

type OptionArgs = {
    value: number;
    name: Statuses;
    itemStyle: { color: string };
};

export { Statuses, StatusColores };

export type { OptionArgs };
