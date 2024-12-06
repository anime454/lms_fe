'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Box, Typography, Paper, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2'; // Import Grid v2
import { LoanData, viewLoanPageQueryParams } from "@/app/models/loan";
import { InterestRateType, NatureOfAssets } from '@/app/models/enum';
import { GetLoan } from '@/app/_services/loan/loan';

const ViewLoanPage = () => {
    const params = useParams<viewLoanPageQueryParams>();
    const router = useRouter();

    const [loan, setLoan] = useState<LoanData>()

    const handleEdit = (id: string | undefined) => {
        router.push(`/loan/edit/${id}`);
    };

    const fetch = async () => {
        const resp = await GetLoan(params.lid)
        setLoan(resp)
    }

    useEffect(()=>{
        fetch()
    },[])

    if (!loan) {
        return (<></>)
    }

    return (
        <Box sx={{ width: '80%', margin: 'auto', paddingTop: 2 }}>
            <Paper sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Loan Details
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />

                <Grid container spacing={3}>
                    {/* Basic Loan Information */}
                    <Grid size={{xs:12, sm:6}}>
                        <Typography variant="h6">Loan ID</Typography>
                        <Typography variant="body1">{loan.id}</Typography>
                    </Grid>
                    <Grid size={{xs:12, sm:6}}>
                        <Typography variant="h6">Loan Name</Typography>
                        <Typography variant="body1">{loan.name}</Typography>
                    </Grid>
                    <Grid size={{xs:12}}>
                        <Typography variant="h6">Description</Typography>
                        <Typography variant="body1">{loan.description}</Typography>
                    </Grid>

                    {/* Criteria Section */}
                    <Grid size={{xs:12}}>
                        <Typography variant="h5" sx={{ marginTop: 2 }}>Criteria</Typography>
                    </Grid>
                    <Grid size={{xs:6}}>
                        <Typography variant="h6">Risk Profile</Typography>
                        <Typography variant="body1">{loan.criteria[0]?.riskProfile || ""}</Typography>
                    </Grid>
                    <Grid size={{xs:6}}>
                        <Typography variant="h6">Nature of Assets</Typography>
                        <Typography variant="body1">{NatureOfAssets[loan.criteria[0].natureOfAssets]}</Typography>
                    </Grid>
                    <Grid size={{xs:6}}>
                        <Typography variant="h6">Minimum Value of Asset</Typography>
                        <Typography variant="body1">{loan.criteria[0].minimumValueOfAssets}</Typography>
                    </Grid>
                    <Grid size={{xs:6}}>
                        <Typography variant="h6">Credit Score</Typography>
                        <Typography variant="body1">{loan.criteria[0].creditScore}</Typography>
                    </Grid>

                    {/* Characteristics Section */}
                    <Grid size={{xs:12}}>
                        <Typography variant="h5" sx={{ marginTop: 2 }}>Characteristics</Typography>
                    </Grid>
                    <Grid size={{xs:6}}>
                        <Typography variant="h6">Secured or Unsecured</Typography>
                        <Typography variant="body1">{loan.characteristics.securedOrUnsecured}</Typography>
                    </Grid>
                    <Grid size={{xs:6}}>
                        <Typography variant="h6">Amortization Duration</Typography>
                        <Typography variant="body1">{loan.characteristics.amortizationPeriod.duration} {loan.characteristics.amortizationPeriod.type}</Typography>
                    </Grid>
                    <Grid size={{xs:6}}>
                        <Typography variant="h6">Interest Rate Type</Typography>
                        <Typography variant="body1">{InterestRateType[loan.characteristics.interestRate.type]}</Typography>
                    </Grid>
                    <Grid size={{xs:6}}>
                        <Typography variant="h6">Interest Rate Value</Typography>
                        <Typography variant="body1">{loan.characteristics.interestRate.value}%</Typography>
                    </Grid>
                    <Grid size={{xs:6}}>
                        <Typography variant="h6">Maximum Loan Amount</Typography>
                        <Typography variant="body1">{loan.characteristics.maxValue}</Typography>
                    </Grid>
                </Grid>

                {/* Edit Button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(loan.id)}>
                        Edit Loan
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default ViewLoanPage;
