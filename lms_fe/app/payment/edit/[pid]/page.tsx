'use client'
import { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { editPaymentPageQueryParams, PaymentData } from '@/app/models/payment';
import { GetPayment, UpdatePayment } from '@/app/_services/payment/payment';
import PaymentFormComponent from '../../_components/form';

const EditPaymentPage = () => {

    const router = useRouter();

    const params = useParams<editPaymentPageQueryParams>()
    const [payment, setPayment] = useState<PaymentData>()

    const fetch = async () =>{
        const resp = await GetPayment(params.pid)
        setPayment(resp)
    }

    useEffect(()=>{
        fetch()
    },[])
    
    const handleEditSubmit = async(data: PaymentData) => {
        const resp = await UpdatePayment(data)
        if (resp.data.pid) {
            router.push(`/payment/${resp.data.pid}`)
        }
    };
    
    if (!payment) {
        return (
            <>
                Payment Not Found
            </>
        )
    }


    return (
        <Paper sx={{ padding: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Edit Loan
            </Typography>
            <PaymentFormComponent defaultValues={payment} onSubmit={handleEditSubmit}></PaymentFormComponent>
        </Paper>
    );
};

export default EditPaymentPage;
