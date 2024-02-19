const findArrayMiddle = <T extends number>(arr: Array<T>) => {
    const length = arr.length;
    if (length % 2 === 0) {
        const middle1 = arr[length / 2 - 1];
        const middle2 = arr[length / 2];
        return [(middle1 + middle2) / 2];
    } else {
        return [arr[Math.floor(length / 2)]];
    }
};

export { findArrayMiddle };
