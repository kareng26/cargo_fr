export const debounce = <F extends (...args: any[]) => void>(
    func: F,
    wait: number,
) => {
    let timeout: NodeJS.Timeout;

    return function (this: any, ...args: Parameters<F>) {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
};
