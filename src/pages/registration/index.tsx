import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Typography, InputAdornment, Button } from "@mui/material";
import {
    Container,
    Box,
    Cell,
    Title,
    BlockTitle,
    Buttons,
    DestinationField,
    SendField,
    Block,
    PhoneField,
} from "./components";
import {
    ValidationPatterns,
    ValidationErrors,
} from "../../consts/validation.ts";
import { useAppDispatch } from "../../hooks/useAppDispatch.ts";
import { Wrapper } from "../../components/wrapper";
import { Address, createCargo, createDocument, FiasLevels } from "./api.ts";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FormInputs, FormValues, StepIndex } from "./types.ts";
import { Steps } from "./const.ts";

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
    } = useForm<FormValues>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        shouldUseNativeValidation: false,
    });

    const onSubmit = async (data: FormValues) => {
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
        const isValid = await trigger(Steps[currentStep]);

        if (isValid) setCurrentStep((prevStep) => prevStep + 1);
    };

    const handlePrev = () => setCurrentStep((prevStep) => prevStep - 1);

    const sendListener = ({ id }: { id: string }) => {
        if (id) {
            clearErrors(FormInputs.SEND_POINT);
            setValue(FormInputs.SEND_POINT, id);
        }
        getValues(FormInputs.SEND_POINT);
    };

    const destinationListener = ({ data }: { data: Address }) => {
        if (
            ![FiasLevels.APARTMENT, FiasLevels.HOUSE].includes(data.fias_level)
        ) {
            setError(FormInputs.DESTINATION_POINT, {
                message: ValidationErrors.incorrectAddress,
            });
        } else {
            setValue(
                FormInputs.DESTINATION_POINT,
                JSON.stringify({
                    latitude: data.geo_lat,
                    longitude: data.geo_lon,
                }),
            );
            clearErrors(FormInputs.DESTINATION_POINT);
        }
    };

    return (
        <Wrapper>
            <Container>
                <Title>{"register your cargo"}</Title>
                <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                    <Block
                        stepindex={StepIndex.MAIN_INFORMATION}
                        currentstep={currentStep}
                    >
                        <BlockTitle>{"main information"}</BlockTitle>
                        <Cell>
                            <TextField
                                label={"name"}
                                {...register(FormInputs.NAME, {
                                    required: ValidationErrors.required,
                                    pattern: {
                                        value: ValidationPatterns.string,
                                        message: ValidationErrors.pattern,
                                    },
                                    minLength: {
                                        value: 3,
                                        message: ValidationErrors.minLength,
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: ValidationErrors.maxLength,
                                    },
                                })}
                            />
                            <Typography variant={"caption"} color={"error"}>
                                {errors[FormInputs.NAME]?.message}
                            </Typography>
                        </Cell>
                        <Cell>
                            <TextField
                                label={"description"}
                                {...register(FormInputs.DESCRIPTION, {
                                    required: ValidationErrors.required,
                                    minLength: {
                                        value: 3,
                                        message: ValidationErrors.minLength,
                                    },
                                })}
                            />
                            <Typography variant={"caption"} color={"error"}>
                                {errors[FormInputs.DESCRIPTION]?.message}
                            </Typography>
                        </Cell>
                    </Block>
                    <Block
                        stepindex={StepIndex.RECEIVER_INFORMATION}
                        currentstep={currentStep}
                    >
                        <BlockTitle>{"receiver's information"}</BlockTitle>
                        <Cell>
                            <TextField
                                label={"receiver's full name"}
                                {...register(FormInputs.R_FULL_NAME, {
                                    required: ValidationErrors.required,
                                    pattern: {
                                        value: ValidationPatterns.string,
                                        message: ValidationErrors.pattern,
                                    },
                                })}
                            />
                            <Typography variant={"caption"} color={"error"}>
                                {errors[FormInputs.R_FULL_NAME]?.message}
                            </Typography>
                        </Cell>
                        <Cell>
                            <PhoneField
                                label={"phone number"}
                                control={control}
                                name={FormInputs.R_PHONE_NUMBER}
                            />
                            <Typography variant={"caption"} color={"error"}>
                                {errors[FormInputs.R_PHONE_NUMBER]?.message}
                            </Typography>
                        </Cell>
                    </Block>
                    <Block
                        stepindex={StepIndex.SPECIFICATIONS}
                        currentstep={currentStep}
                    >
                        <BlockTitle>{"specifications"}</BlockTitle>
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
                                {...register(FormInputs.VOLUME, {
                                    required: ValidationErrors.required,
                                    pattern: {
                                        value: ValidationPatterns.number,
                                        message: ValidationErrors.pattern,
                                    },
                                })}
                            />
                            <Typography variant={"caption"} color={"error"}>
                                {errors[FormInputs.VOLUME]?.message}
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
                                {...register(FormInputs.WEIGHT, {
                                    required: ValidationErrors.required,
                                    pattern: {
                                        value: ValidationPatterns.number,
                                        message: ValidationErrors.pattern,
                                    },
                                })}
                            />
                            <Typography variant={"caption"} color={"error"}>
                                {errors[FormInputs.WEIGHT]?.message}
                            </Typography>
                        </Cell>
                    </Block>
                    <Block
                        stepindex={StepIndex.DOCUMENTS}
                        currentstep={currentStep}
                    >
                        <BlockTitle>{"documents"}</BlockTitle>
                        <Cell>
                            <TextField
                                type={"file"}
                                label={"waybills"}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...register(FormInputs.WAYBILLS)}
                            />
                            <Typography variant={"caption"} color={"error"}>
                                {errors[FormInputs.WAYBILLS]?.message}
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
                                {...register(FormInputs.OTHERS)}
                            />
                            <Typography variant={"caption"} color={"error"}>
                                {errors[FormInputs.OTHERS]?.message}
                            </Typography>
                        </Cell>
                    </Block>
                    <Block
                        stepindex={StepIndex.ADDRESSES}
                        currentstep={currentStep}
                    >
                        <BlockTitle>{"addresses"}</BlockTitle>
                        <Cell>
                            <SendField
                                handleItemListener={sendListener}
                                {...register(FormInputs.SEND_POINT, {
                                    required: ValidationErrors.required,
                                })}
                            />
                            <Typography variant={"caption"} color={"error"}>
                                {errors[FormInputs.SEND_POINT]?.message}
                            </Typography>
                        </Cell>
                        <Cell>
                            <DestinationField
                                handleItemListener={destinationListener}
                                {...register(FormInputs.DESTINATION_POINT, {
                                    required: ValidationErrors.required,
                                })}
                            />
                            <Typography variant={"caption"} color={"error"}>
                                {errors[FormInputs.DESTINATION_POINT]?.message}
                            </Typography>
                        </Cell>
                    </Block>
                    <Buttons>
                        {currentStep > 0 && (
                            <Button type={"button"} onClick={handlePrev}>
                                {"Previous"}
                            </Button>
                        )}
                        {currentStep < Steps.length - 1 && (
                            <Button type={"button"} onClick={handleNext}>
                                {"Next"}
                            </Button>
                        )}
                        {currentStep === Steps.length - 1 && (
                            <Button type={"submit"}>{"Create"}</Button>
                        )}
                    </Buttons>
                </Box>
            </Container>
        </Wrapper>
    );
};
