import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
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

type Props = {
    currentStep: number;
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
};

const MainInformation: React.FC<Props> = ({
    currentStep,
    register,
    errors,
}) => {
    const { t } = useTranslation();

    return (
        <Block stepindex={StepIndex.MAIN_INFORMATION} currentstep={currentStep}>
            <BlockTitle>{t(I18.MAIN_INFO)}</BlockTitle>
            <Cell>
                <TextField
                    label={t(I18.NAME)}
                    {...register(FormInputs.NAME, {
                        required: t(ValidationErrors.required),
                        pattern: {
                            value: ValidationPatterns.string,
                            message: t(ValidationErrors.pattern),
                        },
                        minLength: {
                            value: 3,
                            message: t(ValidationErrors.minLength),
                        },
                        maxLength: {
                            value: 30,
                            message: t(ValidationErrors.maxLength),
                        },
                    })}
                />
                <ErrorText>{errors[FormInputs.NAME]?.message}</ErrorText>
            </Cell>
            <Cell>
                <TextField
                    label={t(I18.DESCRIPTION)}
                    {...register(FormInputs.DESCRIPTION, {
                        required: t(ValidationErrors.required),
                        pattern: {
                            value: ValidationPatterns.string,
                            message: t(ValidationErrors.pattern),
                        },
                        minLength: {
                            value: 3,
                            message: t(ValidationErrors.minLength),
                        },
                    })}
                />
                <ErrorText>{errors[FormInputs.DESCRIPTION]?.message}</ErrorText>
            </Cell>
        </Block>
    );
};

export { MainInformation };
