'use client'

import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Fab, Box, TableFooter, TablePagination } from "@mui/material";
import { LoanData } from "../models/loan";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { DeleteLoan, GetLoanDashboardDetail } from "../_services/loan/loan";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';

const LoanPage = () => {
    const router = useRouter();

    const [loans, setLoans] = useState<LoanData[]>([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalRows, setTotalRows] = useState(0); 

    const fetch = async() => {
        const resp = await GetLoanDashboardDetail(rowsPerPage, rowsPerPage * page)
        setLoans(resp.data)
        setTotalRows(resp.total);
    }

    const handlePageChange = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to page 0 when rows per page changes
    };

    useEffect(() => {
        fetch()
    }, [page, rowsPerPage])


    const removeLoan = async (lid: string) => {
        const resp = await DeleteLoan(lid)
        if (resp === "success"){
            fetch()
        }
    }

    if (!loans) {
        return (<>Loading...</>)
    }

    return (
        <>
            <TableContainer
                component={Paper}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">Name</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">RiskProfile</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">InterestRate Type</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">InterestRate Value</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">Maximum Loan Amount</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">Menu</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loans.map((l) => (
                            <TableRow
                                key={l.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" onClick={() => {
                                    window.location.href = "loan/edit/" + l.id
                                }}>
                                    {l.id}
                                </TableCell>
                                <TableCell component="th" scope="row" > {l.name} </TableCell>
                                <TableCell align="right">{l.criteria[0].riskProfile}</TableCell>
                                <TableCell align="right">{l.characteristics.interestRate.type}</TableCell>
                                <TableCell align="right">{l.characteristics.interestRate.value}</TableCell>
                                <TableCell align="right">{l.characteristics.maxValue}</TableCell>
                                <TableCell align="right">
                                    <Box display="flex" justifyContent="flex-end" gap={1}>

                                        <Fab size="small" color="primary" aria-label="view" onClick={() => {
                                            router.push(`/loan/${l.id}`)
                                        }}>
                                            <VisibilityIcon />
                                        </Fab>

                                        <Fab size="small" color="primary" aria-label="edit" onClick={() => {
                                            router.push(`/loan/edit/${l.id}`)
                                        }}>
                                            <ModeEditIcon />
                                        </Fab>

                                        <Fab size="small" color="error" aria-label="remove" onClick={() => {
                                            removeLoan(l.id)
                                        }}>
                                            <ClearIcon />
                                        </Fab>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={7} align="center">
                                <Fab
                                    variant="extended"
                                    size="large"
                                    color="primary"
                                    onClick={() => router.push('/loan/new')}
                                >
                                    <AddCircleOutlineIcon sx={{ mr: 1 }} />
                                    New Loan
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

export default LoanPage;