'use client'

import { CustomerData } from '@/app/models/customer';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Controller, useFormContext } from 'react-hook-form';

const CustomerIncomeComponent = () => {

    const { control, formState: { errors } } = useFormContext<CustomerData>();

    return (
        <Grid container spacing={2} rowSpacing={0.5}>
            <Grid size={6}>
                <Controller
                    name="income.salary"
                    control={control}
                    rules={{min: 0}}
                    defaultValue={0}
                    render={({ field }) => (
                        <TextField
                            type='number'
                            fullWidth
                            margin="normal"
                            label="เงินเดือน"
                            {...field}
                            error={!!errors.income?.salary}
                        />
                    )}
                />
            </Grid>
            <Grid size={6}>
                <Controller
                    name="income.other"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                        <TextField
                            type='number'
                            fullWidth
                            margin="normal"
                            label="อื่น ๆ"
                            {...field}
                        />
                    )}
                />
            </Grid>

        </Grid>
    )
}
export default CustomerIncomeComponent