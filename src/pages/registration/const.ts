import { FormInputs } from "./types.ts";

const Steps: Array<Array<FormInputs>> = [
    [FormInputs.NAME, FormInputs.DESCRIPTION],
    [FormInputs.R_FULL_NAME, FormInputs.R_PHONE_NUMBER],
    [FormInputs.VOLUME, FormInputs.WEIGHT],
    [FormInputs.WAYBILLS, FormInputs.OTHERS],
    [FormInputs.SEND_POINT, FormInputs.DESTINATION_POINT],
];

export { Steps };
