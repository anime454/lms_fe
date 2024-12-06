// LoanForm.tsx
import React, { useEffect } from 'react';
import {
    TextField,
    MenuItem,
    Typography,
    Button,
    Box,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { RiskProfile, NatureOfAssets, AmortizationPeriodType, InterestRateType, FormField } from '@/app/models/enum';
import { LoanData } from '@/app/models/loan';

interface LoanFormProps {
    defaultValues?: LoanData; 
    onSubmit: (data: LoanData) => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ defaultValues, onSubmit }) => {

    const methods = useForm<LoanData>({
        defaultValues,
        mode: "onBlur",
    });

    const { control, formState: { errors } } = methods;

    const { fields, append } = useFieldArray({
        control,
        name: 'criteria',
    });


    useEffect(() => {
        if (!defaultValues?.criteria || defaultValues.criteria.length === 0) {
            append({
                riskProfile: RiskProfile.LOW,
                natureOfAssets: NatureOfAssets.SECURED,
                minimumValueOfAssets: 1000000,
                creditScore: 1000,
            });
        }
    }, [defaultValues, append])

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: FormField.REQUIRE, minLength: 2 }}
                            defaultValue={defaultValues?.name || ''}
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    label="Name"
                                    {...field}
                                    required
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Controller
                            name="description"
                            control={control}
                            defaultValue={defaultValues?.description || ''}
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    label="Description"
                                    {...field}
                                    multiline
                                    rows={4}
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                {fields.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <Grid container spacing={2} style={{ paddingTop: 20 }}>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="h6">Criteria</Typography>
                            </Grid>
                            <Grid size={{ xs: 6 }}>
                                <Controller
                                    name={`criteria.${index}.riskProfile`}
                                    control={control}
                                    rules={{ required: FormField.REQUIRE }}
                                    defaultValue={defaultValues?.criteria[index].riskProfile || RiskProfile.LOW}
                                    render={({ field }) => (
                                        <TextField
                                            select
                                            fullWidth
                                            label="Risk Profile"
                                            {...field}
                                            error={!!errors.criteria?.[index]?.riskProfile}
                                            helperText={errors.criteria?.[index]?.riskProfile?.message}
                                        >
                                            {Object.values(RiskProfile).map((profile) => (
                                                <MenuItem key={profile} value={profile}>
                                                    {profile}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                            </Grid>

                            <Grid size={{ xs: 6 }}>
                                <Controller
                                    name={`criteria.${index}.natureOfAssets`}
                                    control={control}
                                    rules={{ required: FormField.REQUIRE }}
                                    defaultValue={item.natureOfAssets || NatureOfAssets.UNSECURED}
                                    render={({ field }) => (
                                        <TextField
                                            select
                                            fullWidth
                                            label="Nature of Assets"
                                            {...field}
                                            error={!!errors.criteria?.[index]?.natureOfAssets}
                                            helperText={errors.criteria?.[index]?.natureOfAssets?.message}
                                        >
                                            {Object.values(NatureOfAssets).map((asset) => (
                                                <MenuItem key={asset} value={asset}>
                                                    {asset}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                            </Grid>

                            <Grid size={{ xs: 6 }}>
                                <Controller
                                    name={`criteria.${index}.minimumValueOfAssets`}
                                    control={control}
                                    rules={{ required: true, min: 0 }}
                                    defaultValue={item.minimumValueOfAssets || 0}
                                    render={({ field }) => (
                                        <TextField
                                            type="number"
                                            fullWidth
                                            label="Minimum Value of Asset"
                                            {...field}
                                            required
                                            error={!!errors.criteria?.[index]?.minimumValueOfAssets}
                                            helperText={errors.criteria?.[index]?.minimumValueOfAssets?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid size={{ xs: 6 }}>
                                <Controller
                                    name={`criteria.${index}.creditScore`}
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={item.creditScore || 0}
                                    render={({ field }) => (
                                        <TextField
                                            type="number"
                                            fullWidth
                                            label="Credit Score"
                                            {...field}
                                            required
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </React.Fragment>
                ))}

                <Grid container spacing={2} style={{ paddingTop: 20 }}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h6">Characteristics</Typography>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Controller
                            name="characteristics.securedOrUnsecured"
                            control={control}
                            defaultValue={defaultValues?.characteristics.securedOrUnsecured || 'Mixed'}
                            render={({ field }) => (
                                <TextField
                                    select
                                    fullWidth
                                    label="Secured or Unsecured"
                                    {...field}
                                >
                                    <MenuItem value="Secured">Secured</MenuItem>
                                    <MenuItem value="Unsecured">Unsecured</MenuItem>
                                    <MenuItem value="Mixed">Mixed</MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Controller
                            name="characteristics.amortizationPeriod.type"
                            control={control}
                            defaultValue={defaultValues?.characteristics.amortizationPeriod.type || AmortizationPeriodType.YEAR}
                            render={({ field }) => (
                                <TextField
                                    select
                                    fullWidth
                                    label="Amortization Period Type"
                                    {...field}
                                >
                                    {Object.values(AmortizationPeriodType).map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Controller
                            name="characteristics.amortizationPeriod.duration"
                            control={control}
                            rules={{ required: true }}
                            defaultValue={defaultValues?.characteristics.amortizationPeriod.duration || 0}
                            render={({ field }) => (
                                <TextField
                                    type="number"
                                    fullWidth
                                    label="Amortization Duration"
                                    {...field}
                                    required
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Controller
                            name="characteristics.interestRate.type"
                            control={control}
                            defaultValue={defaultValues?.characteristics.interestRate.type || InterestRateType.VARIABLE}
                            render={({ field }) => (
                                <TextField
                                    select
                                    fullWidth
                                    label="Interest Rate Type"
                                    {...field}
                                >
                                    {Object.values(InterestRateType).map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Controller
                            name="characteristics.interestRate.value"
                            control={control}
                            rules={{ required: true }}
                            defaultValue={defaultValues?.characteristics.interestRate.value || 0}
                            render={({ field }) => (
                                <TextField
                                    type="number"
                                    fullWidth
                                    label="Interest Rate Value"
                                    {...field}
                                    required
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Controller
                            name="characteristics.maxValue"
                            control={control}
                            rules={{ required: true }}
                            defaultValue={defaultValues?.characteristics.maxValue || 0}
                            render={({ field }) => (
                                <TextField
                                    type="number"
                                    fullWidth
                                    label="Maximum Loan Amount"
                                    {...field}
                                    required
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <Box textAlign="right" paddingTop={4}>
                    <Button type="submit" variant="contained" color="primary">
                            Submit
                    </Button>
                </Box>
            </form>
        </FormProvider>
    );
};

export default LoanForm;
