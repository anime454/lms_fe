'use client'

import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Fab, TableFooter, TablePagination, Box } from "@mui/material";
import { PaymentData } from "../models/payment";
import { useEffect, useState } from "react";
import { DeletePayment, GetPaymentDashboard } from "../_services/payment/payment";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useRouter } from "next/navigation";


export default function Payment() {
    const router = useRouter();

    const [payments, setPayments] = useState<PaymentData[]>()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalRows, setTotalRows] = useState(0);

    const fetch = async () => {
        const resp = await GetPaymentDashboard(rowsPerPage, rowsPerPage * page)
        setPayments(resp.data)
        setTotalRows(resp.total);
    }

    const handlePageChange = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const removePayment = async (pid: string) => {
        const resp = await DeletePayment(pid)
        if (resp === "success") {
            fetch()
        }
    }


    useEffect(() => {
        fetch()
    }, [page, rowsPerPage])

    if (!payments) {
        return
        <>
            Payment Not Found
        </>
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="contract table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Contract ID</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">User ID</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">Loan ID</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">Amount</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">Interest Rate (%)</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">Due Date</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">Menu</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payments.map((p) => (
                            <TableRow
                                key={p.pid}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{p.pid}</TableCell>
                                <TableCell align="right">{p.cid}</TableCell>
                                <TableCell align="right">{p.lid}</TableCell>
                                <TableCell align="right">${p.amount.toLocaleString()}</TableCell>
                                <TableCell align="right">{p.interestRate}%</TableCell>
                                <TableCell align="right">{p.dueDate.toLocaleDateString()}</TableCell>
                                <TableCell align="right">
                                    <Box display="flex" justifyContent="flex-end" gap={1}>

                                        <Fab size="small" color="primary" aria-label="view" onClick={() => {
                                            router.push(`/payment/${p.pid}`)
                                        }}>
                                            <VisibilityIcon />
                                        </Fab>

                                        <Fab size="small" color="primary" aria-label="edit" onClick={() => {
                                            router.push(`/payment/edit/${p.pid}`)
                                        }}>
                                            <ModeEditIcon />
                                        </Fab>

                                        <Fab size="small" color="error" aria-label="remove" onClick={() => {
                                            removePayment(p.pid)
                                        }}>
                                            <ClearIcon />
                                        </Fab>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={9} align="center" onClick={() => {
                                window.location.href = "/payment/new";
                            }}>
                                <Fab variant="extended" size="medium" color="primary">
                                    {/* <NavigationIcon sx={{ mr: 1 }} /> */}
                                    New Payment
                                </Fab>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 50]}
                                count={totalRows}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleRowsPerPageChange}
                                labelRowsPerPage="Rows per page"
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}