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
    longitude: 40.173463,
    latitude: 44.507371,
};

export { variants, defaultCoords };
