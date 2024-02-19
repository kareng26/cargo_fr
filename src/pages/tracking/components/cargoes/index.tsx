import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
    CircularProgress,
    Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { I18 } from "@/i18n.ts";
import {
    Pointer,
    Loader,
    TableContainer,
    CargoesHeader,
    CargoesTitle,
    CargoesContainer,
    SearchBar,
} from "@/pages/tracking/components";
import { useGetUserCargoesQuery, useGetCargoQuery } from "@/store/api/cargo.ts";
import { GetUserCargoArgType, GetUserCargoDataType } from "@/types.ts";
import toast from "react-hot-toast";
import { Info } from "@/components/info";
import { useNavigate } from "react-router-dom";

type Props = {
    onRowClick: (item: GetUserCargoDataType) => void;
};

const Cargoes: React.FC<Props> = ({ onRowClick }) => {
    const [page, setPage] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>();
    const [cargoBySNId, setCargoBySNId] = useState<number>();
    const [params, setParams] = useState<GetUserCargoArgType>({ pageSize: 5 });

    const navigate = useNavigate();

    const {
        data: cargoes,
        isFetching: isGetUserCargoesFetching,
        error,
    } = useGetUserCargoesQuery(params);

    const [isSearch, setSearch] = useState<boolean>(false);

    const { t } = useTranslation();

    const { data, meta } = { ...cargoes };

    const {
        data: cargoBySN,
        refetch,
        isFetching: isGetUserFetching,
    } = useGetCargoQuery(cargoBySNId ?? 0, {
        skip: !(searchValue && isSearch && cargoBySNId),
    });

    const handleChangePage = async (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setParams({ pageSize: 5, page: newPage + 1 });
        setPage(newPage);
    };

    const onSearch = async () => {
        if (searchValue) {
            const cargoIndex = data?.findIndex(
                (cargo) => cargo.serial_number === searchValue,
            );

            if (data?.length && cargoIndex! > -1) {
                setCargoBySNId(data[cargoIndex!]?.id);
                await setSearch(true);
                refetch();
                if (error) {
                    toast.error(t(I18.ERROR_OCCURRED));
                }
            }
        }
    };

    return !error ? (
        <CargoesContainer>
            <CargoesHeader>
                <CargoesTitle>{t(I18.USER_CARGOES)}</CargoesTitle>
                <SearchBar onSearch={onSearch} onFieldChange={setSearchValue} />
            </CargoesHeader>
            {isGetUserCargoesFetching || isGetUserFetching ? (
                <Loader>
                    <CircularProgress />
                </Loader>
            ) : (
                <>
                    <Info onClick={() => navigate("/dashboard")}>
                        {"show dashboard"}
                    </Info>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t(I18.TABLE_NAME)}</TableCell>
                                    <TableCell>{t(I18.TABLE_SN)}</TableCell>
                                    <TableCell>{t(I18.TABLE_STATUS)}</TableCell>
                                    <TableCell>{""}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cargoBySNId && cargoBySN?.id ? (
                                    <TableRow key={cargoBySN.id}>
                                        <TableCell>{cargoBySN.name}</TableCell>
                                        <TableCell>
                                            {cargoBySN.serial_number}
                                        </TableCell>
                                        <TableCell>
                                            {
                                                cargoBySN?.status[
                                                    cargoBySN.status.length - 1
                                                ].name
                                            }
                                        </TableCell>
                                        <Pointer
                                            onClick={() =>
                                                onRowClick(cargoBySN)
                                            }
                                        >
                                            {t(I18.CLICK_TO_MOVE)}
                                        </Pointer>
                                    </TableRow>
                                ) : (
                                    data?.map((cargo) => (
                                        <TableRow key={cargo.id}>
                                            <TableCell>{cargo.name}</TableCell>
                                            <TableCell>
                                                {cargo.serial_number}
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    cargo?.status[
                                                        cargo.status.length - 1
                                                    ].name
                                                }
                                            </TableCell>
                                            <Pointer
                                                onClick={() =>
                                                    onRowClick(cargo)
                                                }
                                            >
                                                {t(I18.CLICK_TO_MOVE)}
                                            </Pointer>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                        {cargoBySNId ? (
                            <Button
                                variant={"text"}
                                onClick={() => setCargoBySNId(0)}
                            >
                                {"Clear"}
                            </Button>
                        ) : (
                            <TablePagination
                                page={page}
                                rowsPerPage={5}
                                component={"div"}
                                rowsPerPageOptions={[]}
                                count={meta?.total ?? 10}
                                onPageChange={handleChangePage}
                            />
                        )}
                    </TableContainer>
                </>
            )}
        </CargoesContainer>
    ) : null;
};

export { Cargoes };
