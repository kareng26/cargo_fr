import React from "react";
import {
    UseFormRegister,
    FieldErrors,
    UseControllerProps,
} from "react-hook-form";
import {
    FormInputs,
    FormValues,
    StepIndex,
} from "@/pages/registration/types.ts";
import {
    Block,
    BlockTitle,
    Cell,
    ErrorText,
} from "@/pages/registration/components";
import { ValidationErrors, ValidationPatterns } from "@/consts";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { I18 } from "@/i18n.ts";
import { PhoneField } from "@/components/phoneField";

type Props = {
    currentStep: number;
    control: UseControllerProps<FormValues>["control"];
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
};

const ReceiverInformation: React.FC<Props> = ({
    currentStep,
    register,
    errors,
    control,
}) => {
    const { t } = useTranslation();

    return (
        <Block
            stepindex={StepIndex.RECEIVER_INFORMATION}
            currentstep={currentStep}
        >
            <BlockTitle>{t(I18.RECEIVER_INFO)}</BlockTitle>
            <Cell>
                <TextField
                    label={t(I18.RECEIVER_FN)}
                    {...register(FormInputs.R_FULL_NAME, {
                        required: t(ValidationErrors.required),
                        pattern: {
                            value: ValidationPatterns.name,
                            message: t(ValidationErrors.pattern),
                        },
                    })}
                />
                <ErrorText>{errors[FormInputs.R_FULL_NAME]?.message}</ErrorText>
            </Cell>
            <Cell>
                <PhoneField
                    rules={{
                        required: t(ValidationErrors.required),
                        pattern: {
                            value: ValidationPatterns.phone,
                            message: t(ValidationErrors.pattern),
                        },
                    }}
                    label={t(I18.PHONE_NUMBER)}
                    control={control}
                    name={FormInputs.R_PHONE_NUMBER}
                />
                <ErrorText>
                    {errors[FormInputs.R_PHONE_NUMBER]?.message}
                </ErrorText>
            </Cell>
        </Block>
    );
};

export { ReceiverInformation };
