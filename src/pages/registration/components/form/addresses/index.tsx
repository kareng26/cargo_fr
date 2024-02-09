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
import { ValidationErrors } from "@/consts/validation.ts";
import { Search } from "@/components/search";
import { useTranslation } from "react-i18next";
import { I18 } from "@/i18n.ts";
import { Address } from "@/types.ts";

type Props = {
    currentStep: number;
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
    sendListener: (data: Address, value: string) => void;
    destinationListener: (data: Address, value: string) => void;
};

const Addresses: React.FC<Props> = ({
    currentStep,
    register,
    errors,
    destinationListener,
    sendListener,
}) => {
    const { t } = useTranslation();

    return (
        <Block stepindex={StepIndex.ADDRESSES} currentstep={currentStep}>
            <BlockTitle>{t(I18.ADDRESSES)}</BlockTitle>
            <Cell>
                <Search
                    label={t(I18.SEND_POINT)}
                    handleItemListener={sendListener}
                    {...register(FormInputs.SEND_POINT, {
                        required: t(ValidationErrors.required),
                    })}
                />
                <ErrorText>
                    {errors[FormInputs.SEND_POINT]?.message &&
                        t(errors[FormInputs.SEND_POINT]?.message)}
                </ErrorText>
            </Cell>
            <Cell>
                <Search
                    label={t(I18.DESTINATION_POINT)}
                    handleItemListener={destinationListener}
                    {...register(FormInputs.DESTINATION_POINT, {
                        required: t(ValidationErrors.required),
                    })}
                />
                <ErrorText>
                    {errors[FormInputs.DESTINATION_POINT]?.message &&
                        errors[FormInputs.DESTINATION_POINT]?.message}
                </ErrorText>
            </Cell>
        </Block>
    );
};

export { Addresses };
