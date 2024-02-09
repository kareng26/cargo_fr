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

type FormValues = {
    [FormInputs.NAME]: string;
    [FormInputs.DESCRIPTION]: string;
    [FormInputs.R_FULL_NAME]: string;
    [FormInputs.R_PHONE_NUMBER]: string;
    [FormInputs.VOLUME]: string;
    [FormInputs.WEIGHT]: string;
    [FormInputs.OTHERS]: FileList;
    [FormInputs.WAYBILLS]: FileList;
    [FormInputs.SEND_POINT]: string;
    [FormInputs.DESTINATION_POINT]: string;
};

export { StepIndex, FormInputs };

export type { FormValues };
