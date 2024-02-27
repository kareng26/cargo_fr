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
import { TextField, InputAdornment } from "@mui/material";
import { useTranslation } from "react-i18next";
import { I18 } from "@/i18n.ts";

type Props = {
    currentStep: number;
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
};

const Specifications: React.FC<Props> = ({ currentStep, register, errors }) => {
    const { t } = useTranslation();

    return (
        <Block stepindex={StepIndex.SPECIFICATIONS} currentstep={currentStep}>
            <BlockTitle>{t(I18.SPECIFICATIONS)}</BlockTitle>
            <Cell>
                <TextField
                    type={"number"}
                    label={t(I18.VOLUME)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position={"start"}>
                                {t("m3")}
                            </InputAdornment>
                        ),
                    }}
                    {...register(FormInputs.VOLUME, {
                        required: t(ValidationErrors.required),
                        pattern: {
                            value: ValidationPatterns.number,
                            message: t(ValidationErrors.pattern),
                        },
                    })}
                />
                <ErrorText>{errors[FormInputs.VOLUME]?.message}</ErrorText>
            </Cell>
            <Cell>
                <TextField
                    type={"number"}
                    label={t(I18.WEIGHT)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position={"start"}>
                                {t("kg")}
                            </InputAdornment>
                        ),
                    }}
                    {...register(FormInputs.WEIGHT, {
                        required: t(ValidationErrors.required),
                        pattern: {
                            value: ValidationPatterns.number,
                            message: t(ValidationErrors.pattern),
                        },
                    })}
                />
                <ErrorText>{errors[FormInputs.WEIGHT]?.message}</ErrorText>
            </Cell>
        </Block>
    );
};

export { Specifications };
