enum Errors {
    required = "required",
    pattern = "pattern",
    minLength = "minLength",
    maxLength = "maxLength",
    incorrectAddress = "incorrectAddress",
}

enum Patterns {
    string = "string",
    number = "number",
    phone = "phone",
}

enum Masks {
    phone = "phone",
}

const validationErrors = Object.freeze<Record<Errors, string>>({
    [Errors.required]: "cannot be empty",
    [Errors.incorrectAddress]: "not correct address",
    [Errors.pattern]: "does not match",
    [Errors.minLength]: "must be more than 2",
    [Errors.maxLength]: "must be less than 30",
});

const validationPatterns = Object.freeze<Record<Patterns, RegExp>>({
    [Patterns.string]: /^[A-Za-z]+$/i,
    [Patterns.phone]: /^[\d\s\-()+]+$/i,
    [Patterns.number]: /^[0-9]+$/,
});

const masks = Object.freeze<Record<Masks, string>>({
    [Masks.phone]: "+7 (000) 000-00-00",
});

export { validationPatterns, validationErrors, masks };
