'use client'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";

export default function Dashboard() {

    function createData(
        id: number,
        name: string,
        mobile: string,
        contractID: string,
        loanAmount: number,
        paymentPercentage: number,
        status: string,
    ) {
        return { id, name, mobile, contractID, loanAmount, paymentPercentage, status };
    }

    const rows = [
        createData(1, 'thiraphong sianchatturat', "0856047129", "X1234THIR", 1000000, 10, "normal"),
        createData(2, 'demo admin', "0637045227", "X999DEMO", 6000000, 100, "complete"),
    ];

    return (
        <Box>
            <TableContainer
                component={Paper}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Customer Name</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">Mobile</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">Contract ID</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">Loan Amount</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">Payment Percentage</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" onClick={() => {
                                    window.location.href = "customer/edit/" + row.id
                                }}>
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.mobile}</TableCell>
                                <TableCell align="right">{row.contractID}</TableCell>
                                <TableCell align="right">{row.loanAmount}</TableCell>
                                <TableCell align="right">{row.paymentPercentage}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={6} align="center" onClick={() => {
                                window.location.href = "/customer/new/1234"
                            }}>+</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}