'use client';

import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Fab, TableFooter, TablePagination } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/navigation';
import { CustomerData} from '../models/customer';
import { fetchCustomers, removeCustomer } from '../_services/customer/customer';

const CustomerPage = () => {
    const [customers, setCustomers] = useState<CustomerData[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalRows, setTotalRows] = useState(0); // Total customers for pagination

    const router = useRouter();

    const fetch = async()=>{
        const c = await fetchCustomers(rowsPerPage, page);
        setCustomers(c.data);
        setTotalRows(c.total);
    }
            
    useEffect(() => {
        fetch()
    }, [page, rowsPerPage]); // Fetch customers on page/rowsPerPage change

    const handlePageChange = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to page 0 when rows per page changes
    };

    return (
        <main>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="customer table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Customer ID</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Customer Name</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">
                                ID Card
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">
                                Passport Number
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">
                                Mobile Number
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">
                                Status
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">
                                Menu
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {customers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    No customers available.
                                </TableCell>
                            </TableRow>
                        ) : (
                            customers.map((customer) => (
                                <TableRow
                                    key={customer.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                    }}
                                >
                                    <TableCell>{customer.id.slice(-4) || 'N/A'}</TableCell>
                                    <TableCell
                                        onClick={() => router.push(`/customer/${customer.id}`)}
                                    >
                                        {customer.information.thName || 'N/A'}{' '}
                                        {customer.information.thLastname}
                                    </TableCell>
                                    <TableCell align="right">
                                        {customer.information.idcard || 'N/A'}
                                    </TableCell>
                                    <TableCell align="right">
                                        {customer.information.passportNo || 'N/A'}
                                    </TableCell>
                                    <TableCell align="right">
                                        {customer.address.mobilePhone || 'N/A'}
                                    </TableCell>
                                    <TableCell align="right">{customer.status || 'N/A'}</TableCell>
                                    <TableCell align="right">
                                        <Box display="flex" justifyContent="flex-end" gap={1}>
                                            <Fab
                                                size="small"
                                                color="primary"
                                                aria-label="view"
                                                onClick={() =>
                                                    router.push(`/customer/${customer.id}`)
                                                }
                                            >
                                                <VisibilityIcon />
                                            </Fab>
                                            <Fab
                                                size="small"
                                                color="primary"
                                                aria-label="edit"
                                                onClick={() =>
                                                    router.push(`/customer/edit/${customer.id}`)
                                                }
                                            >
                                                <ModeEditIcon />
                                            </Fab>
                                            <Fab
                                                size="small"
                                                color="error"
                                                aria-label="remove"
                                                onClick={() => removeCustomer(customer.id)}
                                            >
                                                <ClearIcon />
                                            </Fab>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                        <TableRow>
                            <TableCell colSpan={7} align="center">
                                <Fab
                                    variant="extended"
                                    size="large"
                                    color="primary"
                                    onClick={() => router.push('/customer/new')}
                                >
                                    <AddCircleOutlineIcon sx={{ mr: 1 }} />
                                    New Customer
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
        </main>
    );
};

export default CustomerPage;
