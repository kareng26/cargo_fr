type ExMapBox = mapboxgl.Map & {
    language: string;
    setLanguage: (language: string) => void;
};

export type { ExMapBox };
