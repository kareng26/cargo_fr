enum StepIndex {
    MAIN_INFORMATION,
    RECEIVER_INFORMATION,
    SPECIFICATIONS,
    DOCUMENTS,
    ADDRESSES,
}

enum FormInputs {
    NAME = "name",
    DESCRIPTION = "description",
    R_FULL_NAME = "rFullName",
    R_PHONE_NUMBER = "rPhoneNumber",
    VOLUME = "volume",
    WEIGHT = "weight",
    OTHERS = "others",
    WAYBILLS = "waybills",
    SEND_POINT = "sendPoint",
    DESTINATION_POINT = "destinationPoint",
}

type FormValues = Record<FormInputs, string>;

export { StepIndex, FormInputs };

export type { FormValues };
