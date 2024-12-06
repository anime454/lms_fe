'use client'

import { FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useFormContext, Controller } from "react-hook-form";
import { CustomerData, titleName } from "../../models/customer";
import { useEffect, useState } from "react";
import { fetchCustomerTitles } from "@/app/_services/customer/customer";

export default function CustomerInformation() {
    const { control, formState: { errors } } = useFormContext<CustomerData>();
    const [titleNames, setTitleNames] = useState<titleName[]>();

    const fetch = async()=> {
        const resp = await fetchCustomerTitles()
        setTitleNames(resp)
    }
    
    useEffect(() => {
        fetch();
    }, []);

    return (
        <Grid container spacing={1} rowSpacing={0.5}>
            <Grid size={2} style={{ marginTop: '1.4%' }}>
                <FormControl fullWidth>
                    <InputLabel id="select-label">คำนำหน้า</InputLabel>
                    <Controller
                        name="information.title.tid"
                        control={control}
                        defaultValue={""}
                        render={({ field }) => (
                            <Select
                                label="คำนำหน้า"
                                {...field}
                                error={field.value == ""}
                            >
                                <MenuItem key={""} value={""}>
                                    -
                                </MenuItem>

                                {titleNames && titleNames.map((t) => (
                                    <MenuItem key={t.tid} value={t.tid}>
                                        {t.thName}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                </FormControl>
            </Grid>

            <Grid size={5}>
                <Controller
                    name="information.thName"
                    control={control}
                    rules={{ required: "require field", minLength: 2 }}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="ชื่อ (ภาษาไทย)"
                            {...field}
                            error={!!errors.information?.thName}
                            helperText={errors.information?.thName?.message}
                        />
                    )}
                />
            </Grid>

            <Grid size={5}>
                <Controller
                    name="information.thLastname"
                    control={control}
                    rules={{ required: "require field", minLength: 2 }}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="นามสกุล (ภาษาไทย)"
                            {...field}
                            error={!!errors.information?.thLastname}
                            helperText={errors.information?.thLastname?.message}
                        />
                    )}
                />
            </Grid>

            <Grid size={2} style={{ marginTop: '1.4%' }}>
                <FormControl fullWidth>
                    <InputLabel id="select-label">คำนำหน้า</InputLabel>
                    <Controller
                        name="information.title.tid"
                        control={control}
                        rules={{ min: 0 }}
                        defaultValue={""}
                        render={({ field }) => (
                            <Select
                                label="คำนำหน้า"
                                {...field}
                                error={field.value == ""}
                            >
                                <MenuItem key={""} value={""}>
                                    -
                                </MenuItem>

                                {titleNames && titleNames.map((t) => (
                                    <MenuItem key={t.tid} value={t.tid}>
                                        {t.enName}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                </FormControl>
            </Grid>

            <Grid size={5}>
                <Controller
                    name="information.enName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="ชื่อ (ภาษาอังกฤษ)"
                            {...field}
                            helperText={errors.information?.enName?.message}
                        />
                    )}
                />
            </Grid>

            <Grid size={5}>
                <Controller
                    name="information.enLastname"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="นามสกุล (ภาษาอังกฤษ)"
                            {...field}
                            helperText={errors.information?.enLastname?.message}
                        />
                    )}
                />
            </Grid>

            <Grid size={6}>
                <Controller
                    name="information.idcard"
                    control={control}
                    rules={{ required: "require field", minLength: 13, maxLength: 13 }}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="บัตรประชาชนเลขที่"
                            {...field}
                            error={!!errors.information?.idcard}
                            helperText={errors.information?.idcard?.message}
                        />
                    )}
                />
            </Grid>

            <Grid size={6}>
                <Controller
                    name="information.passportNo"
                    control={control}
                    rules={{ minLength: 0, maxLength: 13 }}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="หมายเลขพาสปอร์ต"
                            {...field}
                            error={!!errors.information?.passportNo}
                            helperText={errors.information?.passportNo?.message}
                        />
                    )}
                />
            </Grid>

        </Grid>
    );
}
