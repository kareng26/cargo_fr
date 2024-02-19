import React, { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Container, Box, Title, Buttons } from "./components";
import { Wrapper } from "@/components/wrapper";
import { FormInputs, FormValues, StepIndex } from "./types.ts";
import { Steps } from "./const.ts";
import { ValidationErrors } from "@/consts/validation.ts";
import {
    MainInformation,
    ReceiverInformation,
    Addresses,
    Documents,
    Specifications,
} from "@/pages/registration/components/form";
import { useTranslation } from "react-i18next";
import { I18 } from "@/i18n.ts";
import { Address, FiasLevels } from "@/types.ts";
import { useCreateCargoMutation } from "@/store/api/cargo.ts";
import { useCreateDocumentMutation } from "@/store/api";

export const Registration: React.FC = () => {
    const [createCargo, { isError: isCargoError }] = useCreateCargoMutation();
    const [createDocument, { isError: isDocumentError }] =
        useCreateDocumentMutation();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [currentStep, setCurrentStep] = useState<number>(
        StepIndex.MAIN_INFORMATION,
    );

    const {
        register,
        formState: { errors },
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

    const handleCreateDocument = async (id: string, data: FormValues) => {
        await createDocument({
            id,
            waybills: data.waybills,
            others: data.others,
        });

        if (!isDocumentError) {
            navigate("/tracking");
            toast.success(t(I18.SUCCESSED));
        } else {
            toast.error(t(I18.ERROR_OCCURRED));
        }
    };

    const onSubmit = async (data: FormValues) => {
        const resp = await createCargo({
            name: data.name,
            description: data.description,
            receiver_name: data.rFullName,
            receiver_contact: data.rPhoneNumber,
            weight: Number(data.weight),
            volume: Number(data.volume),
            send_address: JSON.parse(data.sendPoint),
            receiver_address: JSON.parse(data.destinationPoint),
        });

        if (isCargoError) {
            toast.error(t(I18.ERROR_OCCURRED));
            return;
        }

        if (!data.waybills.length && !data.others.length) {
            navigate("/tracking");
            toast.success(t(I18.SUCCESSED));
            return;
        }

        "data" in resp &&
            (await handleCreateDocument(String(resp.data.id), data));
    };

    const handleNext = async () => {
        const isValid = await trigger(Steps[currentStep]);

        if (isValid) setCurrentStep((prevStep) => prevStep + 1);
    };

    const handlePrev = () => setCurrentStep((prevStep) => prevStep - 1);

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            handleNext();
        }
    };

    const addressListener = (
        data: Address,
        value: string,
        field: keyof typeof FormInputs,
    ) => {
        if (
            ![FiasLevels.APARTMENT, FiasLevels.HOUSE].includes(data.fias_level)
        ) {
            setError(FormInputs[field], {
                message: ValidationErrors.incorrectAddress,
            });
        } else {
            setValue(
                FormInputs[field],
                JSON.stringify({
                    name: value,
                    latitude: data.geo_lat,
                    longitude: data.geo_lon,
                }),
            );
            clearErrors(FormInputs[field]);
        }
    };

    return (
        <Wrapper>
            <Container>
                <Title>{t(I18.REGISTER_CARGO)}</Title>
                <Box
                    component={"form"}
                    onSubmit={handleSubmit(onSubmit)}
                    onKeyUp={handleKeyPress}
                >
                    <MainInformation
                        register={register}
                        currentStep={currentStep}
                        errors={errors}
                    />
                    <ReceiverInformation
                        register={register}
                        currentStep={currentStep}
                        errors={errors}
                        control={control}
                    />
                    <Specifications
                        register={register}
                        currentStep={currentStep}
                        errors={errors}
                    />
                    <Documents
                        register={register}
                        currentStep={currentStep}
                        errors={errors}
                    />
                    <Addresses
                        register={register}
                        currentStep={currentStep}
                        errors={errors}
                        sendListener={(...rst) =>
                            addressListener(...rst, "SEND_POINT")
                        }
                        destinationListener={(...rst) =>
                            addressListener(...rst, "DESTINATION_POINT")
                        }
                    />
                    <Buttons>
                        {currentStep > 0 && (
                            <Button type={"button"} onClick={handlePrev}>
                                {t(I18.PREVIOUS)}
                            </Button>
                        )}
                        {currentStep < Steps.length - 1 && (
                            <Button type={"button"} onClick={handleNext}>
                                {t(I18.NEXT)}
                            </Button>
                        )}
                        {currentStep === Steps.length - 1 && (
                            <Button type={"submit"}>{t(I18.CREATE)}</Button>
                        )}
                    </Buttons>
                </Box>
            </Container>
        </Wrapper>
    );
};
