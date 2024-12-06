'use client'
import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { editLoanPageQueryParams, LoanData } from '@/app/models/loan';
import LoanForm from '../../_components/form';
import { useParams, useRouter } from 'next/navigation';
import { GetLoan, UpdateLoan } from '@/app/_services/loan/loan';

const EditLoanPage = () => {

    const router = useRouter();

    const params = useParams<editLoanPageQueryParams>()
    const [loan, setLoan] = useState<LoanData>()

    const fetch = async () =>{
        const resp = await GetLoan(params.lid)
        setLoan(resp)
    }

    useEffect(()=>{
        fetch()
    },[])
    
    const handleEditloanSubmit = async(data: LoanData) => {
        data.characteristics.maxValue = Number(data.characteristics.maxValue)
        const resp = await UpdateLoan(data)
        if (resp.data.lid) {
            router.push(`/loan/${resp.data.lid}`)
        }
    };
    
    if (!loan) {
        return (
            <>
                Loan Not Found
            </>
        )
    }


    return (
        <Paper sx={{ padding: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Edit Loan
            </Typography>
            <LoanForm defaultValues={loan} onSubmit={handleEditloanSubmit}></LoanForm>
        </Paper>
    );
};

export default EditLoanPage;
