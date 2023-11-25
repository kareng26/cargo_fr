import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    InputAdornment,
} from "@mui/material";
import styles from "./styles.module.scss";
import { DateField } from "@mui/x-date-pickers/DateField";

type Inputs = {
    example: string;
    exampleRequired: string;
};

export const CargoRegistration: React.FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (
        <Container className={styles.container} maxWidth={"xs"}>
            <Typography component={"h1"} variant={"h5"}>
                {"register your cargo"}
            </Typography>
            <Box
                className={styles.form}
                component={"form"}
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField placeholder={"name"} id={"name"} name={"name"} />
                <TextField
                    id={"description"}
                    placeholder={"description"}
                    name={"description"}
                />
                <TextField
                    id={"sfullName"}
                    placeholder={"receiver's full name"}
                    name={"sfullName"}
                />
                <TextField
                    // type={"number"}
                    id={"sPhoneNumber"}
                    placeholder={"receiver's phone number"}
                    name={"sPhoneNumber"}
                    // inputProps={{
                    //     inputMode: "numeric",
                    //     pattern: "[0-9]*",
                    // }}
                    // InputProps={{
                    //     startAdornment: (
                    //         <InputAdornment position={"start"}>
                    //             {"8"}
                    //         </InputAdornment>
                    //     ),
                    // }}
                />
                <TextField
                    id={"volume"}
                    type={"number"}
                    placeholder={"volume"}
                    name={"volume"}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position={"start"}>
                                {"m3"}
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    type={"number"}
                    id={"weight"}
                    name={"weight"}
                    placeholder={"weight(in kg)"}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position={"start"}>
                                {"kg"}
                            </InputAdornment>
                        ),
                    }}
                />
                <DateField
                    type={"date"}
                    id={"date"}
                    placeholder={"sent date"}
                    name={"date"}
                />
                <DateField
                    id={"delivery"}
                    placeholder={"expected delivery time"}
                    name={"delivery"}
                />
                <Button size={"medium"} type={"submit"} variant={"contained"}>
                    {"create"}
                </Button>
            </Box>
        </Container>
    );
};
