const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
};

const defaultCoords = {
    longitude: 43.84215,
    latitude: 40.78519,
};

export { variants, defaultCoords };
