'use client'
import React from 'react';
import { Paper, Typography} from '@mui/material';
import { LoanData } from '@/app/models/loan';
import LoanForm from '../_components/form';
import { NewLoan } from '@/app/_services/loan/loan';
import { useRouter } from 'next/navigation';

const NewLoanPage: React.FC = () => {

    const router = useRouter();

    const onSubmit = async (data: LoanData) => {
        data.characteristics.maxValue = Number(data.characteristics.maxValue)
        const resp = await NewLoan(data)
        if (resp.data.lid) {
            router.push(`/loan/${resp.data.lid}`)
        }
    };

    return (
        <Paper sx={{ padding: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                New Loan
            </Typography>
            <LoanForm onSubmit={onSubmit}></LoanForm>
        </Paper>
    );
};

export default NewLoanPage;
