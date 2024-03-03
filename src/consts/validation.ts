import { I18 } from "@/i18n.ts";

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
    name = "name",
}

enum MaskValues {
    phone = "phone",
}

const ValidationErrors = Object.freeze<Record<Errors, string>>({
    [Errors.required]: I18.EMPTY,
    [Errors.incorrectAddress]: I18.INCORRECT_ADDRESS,
    [Errors.pattern]: I18.DOESNT_MATCH,
    [Errors.minLength]: I18.MORE_THAN_2,
    [Errors.maxLength]: I18.LESS_THAN_30,
});

const ValidationPatterns = Object.freeze<Record<Patterns, RegExp>>({
    [Patterns.string]:
        /[a-zA-Zа-яА-Я0-9\s.,!?]*[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я0-9\s.,!?]*/,
    [Patterns.phone]: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
    [Patterns.number]: /^[0-9]+$/,
    [Patterns.name]: /^[a-zA-Zа-яА-Я]+(?: [a-zA-Zа-яА-Я]+)*$/,
});

const Masks = Object.freeze<Record<MaskValues, string>>({
    [MaskValues.phone]: "+7 (000) 000-00-00",
});

export { ValidationPatterns, ValidationErrors, Masks };
