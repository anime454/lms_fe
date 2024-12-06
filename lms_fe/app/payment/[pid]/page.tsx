'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Box, Typography, Paper, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2'; // Import Grid v2
import { GetPayment } from '@/app/_services/payment/payment';
import { PaymentData } from '@/app/models/payment';

const ViewPaymentPage = () => {
    const params = useParams<{ pid: string }>();
    const router = useRouter();

    const [payment, setPayment] = useState<PaymentData>();

    const handleEdit = (id: string | undefined) => {
        router.push(`/payment/edit/${id}`);
    };

    const fetch = async () => {
        const resp = await GetPayment(params.pid);
        setPayment(resp);
    };

    useEffect(() => {
        fetch();
    }, []);

    if (!payment) {
        return (<></>);
    }

    return (
        <Box sx={{ width: '80%', margin: 'auto', paddingTop: 2 }}>
            <Paper sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Payment Details
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />

                <Grid container spacing={3}>
                    {/* Basic Payment Information */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">Payment ID</Typography>
                        <Typography variant="body1">{payment.pid}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">Customer ID</Typography>
                        <Typography variant="body1">{payment.cid}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">Loan ID</Typography>
                        <Typography variant="body1">{payment.lid}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">Status</Typography>
                        <Typography variant="body1">{payment.status}</Typography>
                    </Grid>

                    {/* Payment Details */}
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5" sx={{ marginTop: 2 }}>Payment Details</Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <Typography variant="h6">Due Date</Typography>
                        <Typography variant="body1">
                            {new Date(payment.dueDate).toLocaleDateString()}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <Typography variant="h6">Amount</Typography>
                        <Typography variant="body1">{`$${payment.amount.toFixed(2)}`}</Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <Typography variant="h6">Interest Rate</Typography>
                        <Typography variant="body1">{`${payment.interestRate}%`}</Typography>
                    </Grid>
                </Grid>

                {/* Edit Button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(payment.pid)}>
                        Edit Payment
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default ViewPaymentPage;
