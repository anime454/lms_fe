'use client'

import React from 'react';
import {
    Paper,
    Typography,
} from '@mui/material';
import { PaymentData } from '@/app/models/payment';
import PaymentFormComponent from '../_components/form';
import { NewPayment } from '@/app/_services/payment/payment';

const PaymentPage: React.FC = () => {

    const onSubmit = async (data: PaymentData) => {
        console.log('New Payment Data:', data);
        await NewPayment(data)
    };

    return (
        <Paper sx={{ padding: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                New Payment
            </Typography>
            <PaymentFormComponent onSubmit={onSubmit}/>
        </Paper>
    );
    };

export default PaymentPage;
