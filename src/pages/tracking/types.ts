type ExMapBox = mapboxgl.Map & {
    language: string;
    setLanguage: (language: string) => void;
};

type TruckPlaces = {
    Создано: number;
    Получено: number;
    "Передано в доставку": number;
};

export type { ExMapBox, TruckPlaces };
