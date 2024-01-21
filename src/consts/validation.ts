enum Errors {
    required = "required",
    pattern = "pattern",
    minLength = "minLength",
    maxLength = "maxLength",
}

enum Patterns {
    phoneNumber = "phoneNumber",
}

export const validationErrors = Object.freeze<Record<Errors, string>>({
    required: "cannot be empty",
    pattern: "does not match",
    minLength: "must be more than 2",
    maxLength: "must be less than 30",
});

export const validationPatterns = Object.freeze<Record<Patterns, RegExp>>({
    phoneNumber: /^[\d\s\-()+]+$/i,
});
