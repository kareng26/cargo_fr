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

enum MaskValues {
    phone = "phone",
}

const ValidationErrors = Object.freeze<Record<Errors, string>>({
    [Errors.required]: "empty",
    [Errors.incorrectAddress]: "incorrect_address",
    [Errors.pattern]: "doesnt_match",
    [Errors.minLength]: "more_than_2",
    [Errors.maxLength]: "less_than_30",
});

const ValidationPatterns = Object.freeze<Record<Patterns, RegExp>>({
    [Patterns.string]: /^[a-zA-Zа-яА-Я0-9\s.,!?]+$/,
    [Patterns.phone]: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
    [Patterns.number]: /^[0-9]+$/,
});

const Masks = Object.freeze<Record<MaskValues, string>>({
    [MaskValues.phone]: "+7 (000) 000-00-00",
});

export { ValidationPatterns, ValidationErrors, Masks };
