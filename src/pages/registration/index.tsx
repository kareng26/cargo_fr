import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, TextField, Typography, InputAdornment } from "@mui/material";
import {
    Container,
    Content,
    Box,
    Fields,
    Cell,
    Section,
    Title,
    GroupTitle,
} from "./components";
import {
    validationErrors,
    validationPatterns,
} from "../../consts/validation.ts";
import { createCargo, getAllPoints } from "./api.ts";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../hooks/useAppDispatch.ts";
import { Wrapper } from "../../components/wrapper";

type Inputs = {
    name: string;
    description: string;
    sFullName: string;
    sPhoneNumber: string;
    volume: string;
    weight: string;
    sendingDate: string;
    others: string;
    waybills: string;
    delivery: string;
};

enum FormInputs {
    name = "name",
    description = "description",
    sFullName = "sFullName",
    sPhoneNumber = "sPhoneNumber",
    volume = "volume",
    weight = "weight",
    sendingDate = "sendingDate",
    others = "others",
    waybills = "waybills",
    delivery = "delivery",
}

export const CargoRegistration: React.FC = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<Inputs>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        shouldUseNativeValidation: false,
    });

    const getPoints = async () => {
        const x = await dispatch(getAllPoints({}));
        console.log("x", x);
    };

    useEffect(() => {
        getPoints();
    }, []);

    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const x = await dispatch(
            createCargo({
                name: data.name,
                description: data.description,
                receiver_name: data.sFullName,
                receiver_contact: data.sPhoneNumber,
                weight: Number(data.weight),
                volume: Number(data.volume),
            }),
        );
        console.info("heyy", x);
        // if (!x) {
        // toast.success("succeeded", {
        //     position: "top-right",
        // });
        // }
        // console.log(data, x);
    };

    return (
        <Wrapper>
            <Container>
                <Title>{"register your cargo"}</Title>
                <Content>
                    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                        <Fields>
                            <Section>
                                <div>
                                    <GroupTitle>
                                        {"main information"}
                                    </GroupTitle>
                                    <Cell>
                                        <TextField
                                            label={"name"}
                                            {...register(FormInputs.name, {
                                                required:
                                                    validationErrors.required,
                                                minLength: {
                                                    value: 3,
                                                    message:
                                                        validationErrors.minLength,
                                                },
                                                maxLength: {
                                                    value: 30,
                                                    message:
                                                        validationErrors.maxLength,
                                                },
                                            })}
                                        />
                                        <Typography
                                            variant={"caption"}
                                            color={"error"}
                                        >
                                            {errors[FormInputs.name]?.message}
                                        </Typography>
                                    </Cell>
                                    <Cell>
                                        <TextField
                                            label={"description"}
                                            {...register(
                                                FormInputs.description,
                                                {
                                                    required:
                                                        validationErrors.required,
                                                    minLength: {
                                                        value: 3,
                                                        message:
                                                            validationErrors.minLength,
                                                    },
                                                },
                                            )}
                                        />
                                        <Typography
                                            variant={"caption"}
                                            color={"error"}
                                        >
                                            {
                                                errors[FormInputs.description]
                                                    ?.message
                                            }
                                        </Typography>
                                    </Cell>
                                </div>
                                <div>
                                    <GroupTitle>
                                        {"receiver's information"}
                                    </GroupTitle>
                                    <Cell>
                                        <TextField
                                            label={"receiver's full name"}
                                            {...register(FormInputs.sFullName, {
                                                required:
                                                    validationErrors.required,
                                            })}
                                        />
                                        <Typography
                                            variant={"caption"}
                                            color={"error"}
                                        >
                                            {
                                                errors[FormInputs.sFullName]
                                                    ?.message
                                            }
                                        </Typography>
                                    </Cell>
                                    <Cell>
                                        <TextField
                                            type={"tel"}
                                            label={"receiver's phone number"}
                                            {...register(
                                                FormInputs.sPhoneNumber,
                                                {
                                                    required:
                                                        validationErrors.required,
                                                    pattern: {
                                                        value: validationPatterns.phoneNumber,
                                                        message:
                                                            validationErrors.pattern,
                                                    },
                                                },
                                            )}
                                        />
                                        <Typography
                                            variant={"caption"}
                                            color={"error"}
                                        >
                                            {
                                                errors[FormInputs.sPhoneNumber]
                                                    ?.message
                                            }
                                        </Typography>
                                    </Cell>
                                </div>
                            </Section>
                            <Section>
                                <div>
                                    <GroupTitle>{"specifications"}</GroupTitle>
                                    <Cell>
                                        <TextField
                                            type={"number"}
                                            label={"volume"}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment
                                                        position={"start"}
                                                    >
                                                        {"m3"}
                                                    </InputAdornment>
                                                ),
                                            }}
                                            {...register(FormInputs.volume, {
                                                required:
                                                    validationErrors.required,
                                            })}
                                        />
                                        <Typography
                                            variant={"caption"}
                                            color={"error"}
                                        >
                                            {errors[FormInputs.volume]?.message}
                                        </Typography>
                                    </Cell>
                                    <Cell>
                                        <TextField
                                            type={"number"}
                                            label={"weight"}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment
                                                        position={"start"}
                                                    >
                                                        {"kg"}
                                                    </InputAdornment>
                                                ),
                                            }}
                                            {...register(FormInputs.weight, {
                                                required:
                                                    validationErrors.required,
                                            })}
                                        />
                                        <Typography
                                            variant={"caption"}
                                            color={"error"}
                                        >
                                            {errors[FormInputs.weight]?.message}
                                        </Typography>
                                    </Cell>
                                </div>
                                <div>
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
                                        <Typography
                                            variant={"caption"}
                                            color={"error"}
                                        >
                                            {
                                                errors[FormInputs.waybills]
                                                    ?.message
                                            }
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
                                        <Typography
                                            variant={"caption"}
                                            color={"error"}
                                        >
                                            {errors[FormInputs.others]?.message}
                                        </Typography>
                                    </Cell>
                                </div>
                            </Section>
                        </Fields>
                        <Button type={"submit"}>{"create"}</Button>
                    </Box>
                </Content>
            </Container>
        </Wrapper>
    );
};
