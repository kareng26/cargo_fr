import { TextField } from "@mui/material";
import { IMaskMixin } from "react-imask";
import { Control, useController } from "react-hook-form";
import React, { ComponentProps } from "react";
import { FieldValues } from "../../index.tsx";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import { masks } from "../../../../consts/validation.ts";

type MaskProps = ComponentProps<typeof MaskedInput>;

type Props = TextFieldProps &
    MaskProps & {
        control: Control<FieldValues>;
        name: keyof FieldValues;
    };

const MaskedInput = IMaskMixin(({ inputRef, ...props }) => (
    <TextField {...(props as TextFieldProps)} inputRef={inputRef} />
));

export const PhoneField: React.FC<Props> = ({ control, name, ...props }) => {
    const {
        field: { ...inputProps },
    } = useController({
        name,
        control,
    });

    return <MaskedInput {...inputProps} {...props} mask={masks.phone} />;
};
