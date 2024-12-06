'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Box, Typography, Paper, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { CustomerData, CustomerEducation, CustomerEmployment, CustomerAddressData, CustomerIncome, viewCustomerPageQueryParams, defaultCustomerData } from "@/app/models/customer";
import { fetchCustomer } from '@/app/_services/customer/customer';

const ViewCustomerPage = () => {

    const params = useParams<viewCustomerPageQueryParams>()

    const router = useRouter();
    const [customer, setCustomer] = useState<CustomerData>(defaultCustomerData)

    const handleEdit = (id: string | undefined) => {
        router.push(`/customer/edit/${id}`);
    };

    useEffect(()=>{
        fetchCustomer(params.cid).then((customer)=>{
            setCustomer(customer)
        }).catch(()=>{
            //TODO:
        });
    },[params.cid])

    const renderEducation = (education: CustomerEducation | undefined) => (
        <Typography variant="body2">
            {education?.thName} ({education?.enName})
        </Typography>
    );

    const renderEmployment = (employment: CustomerEmployment | undefined) => (
        <Typography variant="body2">
            {employment?.thName} ({employment?.enName})
        </Typography>
    );

    const renderAddress = (address: CustomerAddressData | undefined) => (
        <Box>
            <Typography variant="body2">ที่อยู่: {address?.houseNumber} {address?.street}</Typography>
            <Typography variant="body2">อำเภอ: {address?.district}, จังหวัด: {address?.province}</Typography>
            <Typography variant="body2">รหัสไปรษณีย์: {address?.postalCode}</Typography>
            <Typography variant="body2">โทรศัพท์: {address?.mobilePhone}</Typography>
            <Typography variant="body2">อีเมล์: {address?.email}</Typography>
        </Box>
    );

    const renderIncome = (income: CustomerIncome | undefined) => (
        <Box>
            <Typography variant="body2">เงินเดือน: {income?.salary} บาท</Typography>
            <Typography variant="body2">รายได้อื่นๆ: {income?.other} บาท</Typography>
        </Box>
    );

    return (
        <Box sx={{ width: '80%', margin: 'auto', paddingTop: 2 }}>
            <Paper sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom>
                    ข้อมูลลูกค้า
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />

                <Grid container spacing={3}>
                    {/* Personal Information */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">ข้อมูลส่วนตัว</Typography>
                        <Typography variant="body1">ชื่อ (TH): {customer?.information.thName} {customer?.information.thLastname}</Typography>
                        <Typography variant="body1">ชื่อ (EN): {customer?.information.enName} {customer?.information.enLastname}</Typography>
                        <Typography variant="body1">เลขบัตรประชาชน: {customer?.information.idcard}</Typography>
                        <Typography variant="body1">เลขที่พาสปอร์ต: {customer?.information.passportNo}</Typography>
                    </Grid>

                    {/* Address */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">ที่อยู่</Typography>
                        {renderAddress(customer?.address)}
                    </Grid>

                    {/* Education */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">การศึกษา</Typography>
                        {renderEducation(customer?.education)}
                    </Grid>

                    {/* Employment */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">อาชีพ</Typography>
                        {renderEmployment(customer?.employment)}
                    </Grid>

                    {/* Income */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6">รายได้</Typography>
                        {renderIncome(customer?.income)}
                    </Grid>

                    {/* Status */}
                    <Grid size={12}>
                        <Typography variant="h6">สถานะ</Typography>
                        <Typography variant="body1">{customer?.status}</Typography>
                    </Grid>
                </Grid>

                {/* Edit Button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(customer?.id)}>
                        แก้ไขข้อมูล
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default ViewCustomerPage;
