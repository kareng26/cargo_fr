import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
    CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { I18 } from "@/i18n.ts";
import {
    CargoTitle,
    Information,
    Pointer,
    Loader,
    TableContainer,
} from "@/pages/tracking/components";
import { useGetUserCargoesQuery } from "@/store/api/cargo.ts";
import { GetUserCargoArgType, GetUserCargoDataType } from "@/types.ts";

type Props = {
    onRowClick: (item: GetUserCargoDataType) => void;
};

const Cargoes: React.FC<Props> = ({ onRowClick }) => {
    const [params, setParams] = useState<GetUserCargoArgType>({ pageSize: 5 });
    const { data: cargoes, isFetching, error } = useGetUserCargoesQuery(params);
    const [page, setPage] = useState(1);
    const { t } = useTranslation();

    const { data, meta } = { ...cargoes };

    const handleChangePage = async (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setParams({ pageSize: 5, page: newPage + 1 });
        setPage(newPage);
    };

    return !error ? (
        <Information>
            <CargoTitle>{t(I18.USER_CARGOES)}</CargoTitle>
            {isFetching ? (
                <Loader>
                    <CircularProgress />
                </Loader>
            ) : (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{t(I18.TABLE_NAME)}</TableCell>
                                <TableCell>{t(I18.TABLE_STATUS)}</TableCell>
                                <TableCell>{""}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>
                                        {
                                            row?.status[row.status.length - 1]
                                                .name
                                        }
                                    </TableCell>
                                    <Pointer onClick={() => onRowClick(row)}>
                                        {t(I18.CLICK_TO_MOVE)}
                                    </Pointer>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        page={page}
                        rowsPerPage={5}
                        component={"div"}
                        rowsPerPageOptions={[]}
                        count={meta?.total ?? 10}
                        onPageChange={handleChangePage}
                    />
                </TableContainer>
            )}
        </Information>
    ) : null;
};

export { Cargoes };
