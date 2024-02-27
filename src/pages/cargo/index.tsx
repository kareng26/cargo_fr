import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    Step,
    StepLabel,
    Stepper,
    Table,
    TableHead,
    TableBody,
    Typography,
} from "@mui/material";

import { I18 } from "@/i18n.ts";
import { useGetCargoQuery } from "@/store/api";
import { dateConverter } from "@/utils";
import { LoadScreen } from "@/components/loadScreen";
import { AnimatedTitle } from "@/components/animatedTitle";
import { Statuses as StatusesEnum } from "../dashboard/types.ts";
import {
    TableCell,
    TableRow,
    Section,
    Title,
    Container,
    Statuses,
    Documents,
    DocItems,
    StepInfo,
    DocItemInfo,
} from "./components";

const Cargo: React.FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();

    const { data: cargo, isFetching } = useGetCargoQuery(Number(id));

    const activeStep = cargo?.status.findIndex(
        (s) => s.name === cargo?.current_status?.name,
    );

    return (
        <>
            <AnimatedTitle />
            {isFetching ? (
                <LoadScreen />
            ) : (
                <Container>
                    <Section>
                        <Statuses>
                            <Title>{t(I18.STATUSES)}</Title>
                            <Stepper
                                alternativeLabel
                                activeStep={
                                    activeStep !== undefined && activeStep > -1
                                        ? activeStep + 1
                                        : 1
                                }
                            >
                                {cargo?.status?.map((cargoStatus) => (
                                    <Step key={cargoStatus?.id}>
                                        <StepLabel>
                                            {t(
                                                StatusesEnum[
                                                    cargoStatus?.name as keyof typeof StatusesEnum
                                                ],
                                            )}
                                        </StepLabel>
                                        <StepInfo>
                                            {dateConverter(
                                                cargoStatus?.created_at,
                                            )}
                                        </StepInfo>
                                    </Step>
                                ))}
                            </Stepper>
                        </Statuses>
                        {cargo?.documents.length ? (
                            <Documents>
                                <Title>{t(I18.DOCUMENTS)}</Title>
                                <DocItems>
                                    {cargo?.documents.length &&
                                        cargo?.documents?.map((doc) => (
                                            <div key={doc.id}>
                                                <Typography>
                                                    {doc.type}
                                                </Typography>
                                                <DocItemInfo>
                                                    {t(I18.NOT_ACCESSED)}
                                                </DocItemInfo>
                                                {/*<img*/}
                                                {/*    alt={String(doc.id)}*/}
                                                {/*    src={doc.link}*/}
                                                {/*/>*/}
                                            </div>
                                        ))}
                                </DocItems>
                            </Documents>
                        ) : null}
                    </Section>

                    <Title>{t(I18.MAIN_INFO)}</Title>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{t(I18.TABLE_NAME)}</TableCell>
                                <TableCell>{t(I18.DESCRIPTION)}</TableCell>
                                <TableCell>{t(I18.TABLE_SN)}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{cargo?.name}</TableCell>
                                <TableCell>{cargo?.description}</TableCell>
                                <TableCell>{cargo?.serial_number}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{t(I18.SENDER_NAME)}</TableCell>
                                <TableCell>{t(I18.SENDER_PHONE)}</TableCell>
                                <TableCell>{t(I18.SENDER_ADDRESS)}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{cargo?.sender_info.name}</TableCell>
                                <TableCell>
                                    {cargo?.sender_info.phone}
                                </TableCell>
                                <TableCell>
                                    {cargo?.send_address.name}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{t(I18.RECEIVER_NAME)}</TableCell>
                                <TableCell>{t(I18.RECEIVER_PHONE)}</TableCell>
                                <TableCell>{t(I18.RECEIVER_ADDRESS)}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{cargo?.receiver_name}</TableCell>
                                <TableCell>{cargo?.receiver_contact}</TableCell>
                                <TableCell>
                                    {cargo?.receiver_address.name}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{t(I18.WEIGHT)}</TableCell>
                                <TableCell>{t(I18.VOLUME)}</TableCell>
                                <TableCell>{t(I18.CREATED)}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{cargo?.weight}</TableCell>
                                <TableCell>{cargo?.volume}</TableCell>
                                <TableCell>
                                    {dateConverter(cargo?.created_at)}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Container>
            )}
        </>
    );
};

export { Cargo };
