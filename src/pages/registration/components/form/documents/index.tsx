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
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { I18 } from "@/i18n.ts";

type Props = {
    currentStep: number;
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
};

const Documents: React.FC<Props> = ({ currentStep, register, errors }) => {
    const { t } = useTranslation();

    return (
        <Block stepindex={StepIndex.DOCUMENTS} currentstep={currentStep}>
            <BlockTitle>{t(I18.DOCUMENTS)}</BlockTitle>
            <Cell>
                <TextField
                    type={"file"}
                    label={t(I18.WAYBILLS)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...register(FormInputs.WAYBILLS)}
                />
                <ErrorText>{errors[FormInputs.WAYBILLS]?.message}</ErrorText>
            </Cell>
            <Cell>
                <TextField
                    type={"file"}
                    label={t(I18.OTHERS)}
                    inputProps={{ multiple: true }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...register(FormInputs.OTHERS)}
                />
                <ErrorText>{errors[FormInputs.OTHERS]?.message}</ErrorText>
            </Cell>
        </Block>
    );
};

export { Documents };
