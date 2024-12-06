'use client'

import { ContractStatus } from "@/app/models/enum";
import { Box, TextField, MenuItem, Button, Autocomplete } from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Grid from '@mui/material/Grid2';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from "dayjs";
import { PaymentData } from "@/app/models/payment";
import { useEffect, useState } from "react";
import { CustomerData, defaultCustomerData } from "@/app/models/customer";
import { LoanData, LoanDataDefaultValue } from "@/app/models/loan";
import { GetLoanDashboardDetail } from "@/app/_services/loan/loan";
import { fetchCustomers } from "@/app/_services/customer/customer";


interface ContractFormProps {
    defaultValues?: PaymentData;
    onSubmit: (data: PaymentData) => void;
}

const PaymentFormComponent: React.FC<ContractFormProps> = ({ defaultValues, onSubmit }) => {

    const methods = useForm<PaymentData>({
        defaultValues,
        mode: "onBlur",
    });


    const { control, setValue, watch } = methods;
    const lid = watch('lid');

    const [customers, setCustomers] = useState<CustomerData[]>([defaultCustomerData])
    const [loans, setLoans] = useState<LoanData[]>([LoanDataDefaultValue])

    const fetch = async () => {
        const l = await GetLoanDashboardDetail(1000, 0)
        setLoans(l.data)

        const c = await fetchCustomers(1000, 0)
        setCustomers(c.data)
    }

    useEffect(() => {
        fetch()
    }, [lid])

    const handlerChangeDate = (key: keyof PaymentData, d: Dayjs | null) => {
        if (!d) return
        setValue(key, d.toDate())
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="cid"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Box sx={{ position: 'relative' }}>
                                    <Autocomplete
                                        {...field}  // Spread the field props (value, onChange, etc.)
                                        disablePortal
                                        options={customers}
                                        getOptionLabel={(option) => `${option.information.thName} (${option.id})`}
                                        onChange={(e, value) => {
                                            field.onChange(value?.id || value)
                                        }} // Ensure correct onChange
                                        value={customers.find(c => c.id === field.value) || null} // Ensure correct value mapping
                                        renderInput={(params) => <TextField {...params} label="User ID or Name of User" />}
                                    />
                                </Box>
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="lid"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Box sx={{ position: 'relative' }}>
                                    <Autocomplete
                                        {...field} // Spread the field props (value, onChange, etc.)
                                        disablePortal
                                        options={loans}
                                        getOptionLabel={(option) => `${option.name} (${option.id})`}
                                        onChange={(e, value) => {
                                            if (!value) return;

                                            // Update the lid field value
                                            field.onChange(value.id || value);

                                            // Find the selected loan and update related fields
                                            const selectedLoan = loans.find((loan) => loan.id === value.id);
                                            if (selectedLoan) {
                                                setValue('interestRate', selectedLoan.characteristics?.interestRate.value || 0);
                                            }
                                        }}
                                        value={loans.find(loan => loan.id === field.value) || null} // Ensure correct value mapping
                                        renderInput={(params) => <TextField {...params} label="Loan ID or Name of Loan" />}
                                    />
                                </Box>
                            )}
                        />
                    </Grid>

                    <Grid size={12}></Grid>

                    <Grid size={6}>
                        <Controller
                            name="dueDate"
                            control={control}
                            render={({ field }) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Due Date"
                                        slotProps={{ textField: { fullWidth: true } }}
                                        onChange={(d) => handlerChangeDate(field.name, d)}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    </Grid>

                    <Grid size={12}></Grid>

                    <Grid size={6}>
                        <Controller
                            name="amount"
                            control={control}
                            rules={{ required: true }}
                            // defaultValue={defaultValues?.loanAmount}
                            render={({ field }) => (
                                <TextField
                                    type="number"
                                    fullWidth
                                    label="Loan Amount"
                                    {...field}
                                    defaultValue={defaultValues?.amount || 0}
                                    required
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={6}>
                        <Controller
                            name="interestRate"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <TextField
                                    type="number"
                                    fullWidth
                                    label="Interest Rate"
                                    {...field}
                                    required
                                    value={ field.value || 0}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={6}>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    select
                                    fullWidth
                                    label="Contract Status"
                                    {...field}
                                    value={field.value || ""}  // Ensure it defaults to an empty string if field.value is undefined
                                >
                                    {Object.values(ContractStatus).map((status) => (
                                        <MenuItem key={status} value={status}>
                                            {status}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>

                </Grid>

                <Box textAlign="right" paddingTop={4}>
                    <Button type="submit" variant="contained" color="primary" >
                        Create Payment
                    </Button>
                </Box>
            </form>
        </FormProvider>
    )
}

export default PaymentFormComponent;