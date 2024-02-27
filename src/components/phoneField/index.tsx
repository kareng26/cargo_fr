import { TextField } from "@mui/material";
import { IMaskMixin } from "react-imask";
import { useController, UseControllerProps } from "react-hook-form";
import React, { ComponentProps } from "react";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import { Masks } from "@/consts";
import { FormValues } from "@/pages/registration/types.ts";

type MaskProps = ComponentProps<typeof MaskedInput>;

type Props = TextFieldProps &
    MaskProps & {
        rules: UseControllerProps<FormValues>["rules"];
        control: UseControllerProps<FormValues>["control"];
        name: keyof FormValues;
    };

const MaskedInput = IMaskMixin(({ inputRef, ...props }) => (
    <TextField {...(props as TextFieldProps)} inputRef={inputRef} />
));

export const PhoneField: React.FC<Props> = ({
    control,
    rules,
    name,
    ...props
}) => {
    const {
        field: { ...inputProps },
    } = useController({
        name,
        control,
        rules,
    });

    return <MaskedInput {...inputProps} {...props} mask={Masks.phone} />;
};
