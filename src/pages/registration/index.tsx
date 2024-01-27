import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Typography, InputAdornment, Button } from "@mui/material";
import {
    Container,
    Content,
    Box,
    Cell,
    Title,
    GroupTitle,
    ButtonWrap,
    Block,
} from "./sc";
import {
    validationErrors,
    validationPatterns,
} from "../../consts/validation.ts";
import { useAppDispatch } from "../../hooks/useAppDispatch.ts";
import { Wrapper } from "../../components/wrapper";
import { DestinationField } from "./components/destinationField";
import { SendField } from "./components/sendField";
import { Address, createCargo, createDocument, FiasLevels } from "./api.ts";
import { PhoneField } from "./components/phoneField";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

enum StepIndex {
    MAIN_INFORMATION,
    RECEIVER_INFORMATION,
    SPECIFICATIONS,
    DOCUMENTS,
    ADDRESSES,
}

enum FormInputs {
    name = "name",
    description = "description",
    rFullName = "rFullName",
    rPhoneNumber = "rPhoneNumber",
    volume = "volume",
    weight = "weight",
    sendingDate = "sendingDate",
    others = "others",
    waybills = "waybills",
    delivery = "delivery",
    sendPoint = "sendPoint",
    destinationPoint = "destinationPoint",
}

const steps: Array<Array<keyof typeof FormInputs>> = [
    [FormInputs.name, FormInputs.description],
    [FormInputs.rFullName, FormInputs.rPhoneNumber],
    [FormInputs.volume, FormInputs.weight],
    [FormInputs.waybills, FormInputs.others],
    [FormInputs.sendPoint, FormInputs.destinationPoint],
];

export type FieldValues = Record<FormInputs, string>;

export const Registration: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [currentStep, setCurrentStep] = useState<number>(0);

    const {
        register,
        formState: { errors },
        getValues,
        handleSubmit,
        control,
        setError,
        setValue,
        clearErrors,
        trigger,
    } = useForm<FieldValues>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        shouldUseNativeValidation: false,
    });

    const onSubmit = async (data: FieldValues) => {
        const { latitude, longitude } = JSON.parse(data.destinationPoint);

        await dispatch(
            createCargo({
                name: data.name,
                description: data.description,
                receiver_name: data.rFullName,
                receiver_contact: data.rPhoneNumber,
                weight: Number(data.weight),
                volume: Number(data.volume),
                latitude,
                longitude,
                send_point: Number(data.sendPoint),
            }),
        )
            .unwrap()
            .then((res) => {
                if (res?.id) {
                    dispatch(
                        createDocument({
                            id: res.id,
                            waybills: data.waybills,
                            others: data.others,
                        }),
                    )
                        .unwrap()
                        .then((result) => {
                            if (result?.code === 201) {
                                navigate("/tracking");
                            } else {
                                toast.error("error occurred");
                            }
                        });
                }
            });
    };

    const handleNext = async () => {
        const isValid = await trigger(steps[currentStep]);

        if (isValid) setCurrentStep((prevStep) => prevStep + 1);
    };

    const handlePrev = () => setCurrentStep((prevStep) => prevStep - 1);

    const sendListener = ({ id }: { id: string }) => {
        if (id) {
            clearErrors(FormInputs.sendPoint);
            setValue(FormInputs.sendPoint, id);
        }
        getValues(FormInputs.sendPoint);
    };

    const destinationListener = ({ data }: { data: Address }) => {
        if (
            ![FiasLevels.APARTMENT, FiasLevels.HOUSE].includes(data.fias_level)
        ) {
            setError(FormInputs.destinationPoint, {
                message: validationErrors.incorrectAddress,
            });
        } else {
            setValue(
                FormInputs.destinationPoint,
                JSON.stringify({
                    latitude: data.geo_lat,
                    longitude: data.geo_lon,
                }),
            );
            clearErrors(FormInputs.destinationPoint);
        }
    };

    return (
        <Wrapper>
            <Container>
                <Title>{"register your cargo"}</Title>
                <Content>
                    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                        <Block
                            stepindex={StepIndex.MAIN_INFORMATION}
                            currentstep={currentStep}
                        >
                            <GroupTitle>{"main information"}</GroupTitle>
                            <Cell>
                                <TextField
                                    label={"name"}
                                    {...register(FormInputs.name, {
                                        required: validationErrors.required,
                                        pattern: {
                                            value: validationPatterns.string,
                                            message: validationErrors.pattern,
                                        },
                                        minLength: {
                                            value: 3,
                                            message: validationErrors.minLength,
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: validationErrors.maxLength,
                                        },
                                    })}
                                />
                                <Typography variant={"caption"} color={"error"}>
                                    {errors[FormInputs.name]?.message}
                                </Typography>
                            </Cell>
                            <Cell>
                                <TextField
                                    label={"description"}
                                    {...register(FormInputs.description, {
                                        required: validationErrors.required,
                                        minLength: {
                                            value: 3,
                                            message: validationErrors.minLength,
                                        },
                                    })}
                                />
                                <Typography variant={"caption"} color={"error"}>
                                    {errors[FormInputs.description]?.message}
                                </Typography>
                            </Cell>
                        </Block>
                        <Block
                            stepindex={StepIndex.RECEIVER_INFORMATION}
                            currentstep={currentStep}
                        >
                            <GroupTitle>{"receiver's information"}</GroupTitle>
                            <Cell>
                                <TextField
                                    label={"receiver's full name"}
                                    {...register(FormInputs.rFullName, {
                                        required: validationErrors.required,
                                        pattern: {
                                            value: validationPatterns.string,
                                            message: validationErrors.pattern,
                                        },
                                    })}
                                />
                                <Typography variant={"caption"} color={"error"}>
                                    {errors[FormInputs.rFullName]?.message}
                                </Typography>
                            </Cell>
                            <Cell>
                                <PhoneField
                                    label={"phone number"}
                                    control={control}
                                    name={FormInputs.rPhoneNumber}
                                />
                                <Typography variant={"caption"} color={"error"}>
                                    {errors[FormInputs.rPhoneNumber]?.message}
                                </Typography>
                            </Cell>
                        </Block>
                        <Block
                            stepindex={StepIndex.SPECIFICATIONS}
                            currentstep={currentStep}
                        >
                            <GroupTitle>{"specifications"}</GroupTitle>
                            <Cell>
                                <TextField
                                    type={"number"}
                                    label={"volume"}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position={"start"}>
                                                {"m3"}
                                            </InputAdornment>
                                        ),
                                    }}
                                    {...register(FormInputs.volume, {
                                        required: validationErrors.required,
                                        pattern: {
                                            value: validationPatterns.number,
                                            message: validationErrors.pattern,
                                        },
                                    })}
                                />
                                <Typography variant={"caption"} color={"error"}>
                                    {errors[FormInputs.volume]?.message}
                                </Typography>
                            </Cell>
                            <Cell>
                                <TextField
                                    type={"number"}
                                    label={"weight"}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position={"start"}>
                                                {"kg"}
                                            </InputAdornment>
                                        ),
                                    }}
                                    {...register(FormInputs.weight, {
                                        required: validationErrors.required,
                                        pattern: {
                                            value: validationPatterns.number,
                                            message: validationErrors.pattern,
                                        },
                                    })}
                                />
                                <Typography variant={"caption"} color={"error"}>
                                    {errors[FormInputs.weight]?.message}
                                </Typography>
                            </Cell>
                        </Block>
                        <Block
                            stepindex={StepIndex.DOCUMENTS}
                            currentstep={currentStep}
                        >
                            <GroupTitle>{"documents"}</GroupTitle>
                            <Cell>
                                <TextField
                                    type={"file"}
                                    label={"waybills"}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...register(FormInputs.waybills)}
                                />
                                <Typography variant={"caption"} color={"error"}>
                                    {errors[FormInputs.waybills]?.message}
                                </Typography>
                            </Cell>
                            <Cell>
                                <TextField
                                    type={"file"}
                                    label={"others"}
                                    inputProps={{ multiple: true }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...register(FormInputs.others)}
                                />
                                <Typography variant={"caption"} color={"error"}>
                                    {errors[FormInputs.others]?.message}
                                </Typography>
                            </Cell>
                        </Block>
                        <Block
                            stepindex={StepIndex.ADDRESSES}
                            currentstep={currentStep}
                        >
                            <GroupTitle>{"addresses"}</GroupTitle>
                            <Cell>
                                <SendField
                                    handleItemListener={sendListener}
                                    {...register(FormInputs.sendPoint, {
                                        required: validationErrors.required,
                                    })}
                                />
                                <Typography variant={"caption"} color={"error"}>
                                    {errors[FormInputs.sendPoint]?.message}
                                </Typography>
                            </Cell>
                            <Cell>
                                <DestinationField
                                    handleItemListener={destinationListener}
                                    {...register(FormInputs.destinationPoint, {
                                        required: validationErrors.required,
                                    })}
                                />
                                <Typography variant={"caption"} color={"error"}>
                                    {
                                        errors[FormInputs.destinationPoint]
                                            ?.message
                                    }
                                </Typography>
                            </Cell>
                        </Block>
                        <ButtonWrap>
                            {currentStep > 0 && (
                                <Button type={"button"} onClick={handlePrev}>
                                    {"Previous"}
                                </Button>
                            )}
                            {currentStep < steps.length - 1 && (
                                <Button type={"button"} onClick={handleNext}>
                                    {"Next"}
                                </Button>
                            )}
                            {currentStep === steps.length - 1 && (
                                <Button type={"submit"}>{"Create"}</Button>
                            )}
                        </ButtonWrap>
                    </Box>
                </Content>
            </Container>
        </Wrapper>
    );
};
