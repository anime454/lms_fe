'use client'

import { TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useFormContext, Controller } from "react-hook-form";
import { CustomerData } from "../../models/customer";

export default function CustomerAddressComponent() {

    const { control, formState: { errors } } = useFormContext<CustomerData>();

    return (
        <Grid container spacing={1}>
            <Grid size={3}>
                <Controller
                    name="address.contactName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="ชื่อสถานที่ติดต่อ"
                            {...field}
                        />
                    )}
                />
            </Grid>

            <Grid size={3}>
                <Controller
                    name="address.houseNumber"
                    control={control}
                    rules={{ required: "require field", min: 2 }}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="เลขที่"
                            {...field}
                            error={!!errors.address?.houseNumber}
                            helperText={errors.address?.houseNumber?.message}
                        />
                    )}
                />
            </Grid>

            <Grid size={3}>
                <Controller
                    name="address.building"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="อาคาร"
                            {...field}
                        />
                    )}
                />
            </Grid>

            <Grid size={3}>
                <Controller
                    name="address.floor"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="ชั้น"
                            {...field}
                        />
                    )}
                />
            </Grid>

            <Grid size={3}>
                <Controller
                    name="address.roomNumber"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="ห้องเลขที่"
                            {...field}
                        />
                    )}
                />
            </Grid>

            <Grid size={3}>
                <Controller
                    name="address.village"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="หมู่ที่"
                            {...field}
                        />
                    )}
                />
            </Grid>

            <Grid size={3}>
                <Controller
                    name="address.alley"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="ตรอก/ซอย"
                            {...field}
                        />
                    )}
                />
            </Grid>

            <Grid size={3}>
                <Controller
                    name="address.street"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="ถนน"
                            {...field}
                        />
                    )}
                />
            </Grid>

            <Grid size={3}>
                <Controller
                    name="address.subDistrict"
                    control={control}
                    rules={{ required: "require field", min: 2 }}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="แขวง/ตำบล"
                            {...field}
                            error={!!errors.address?.subDistrict}
                            helperText={errors.address?.subDistrict?.message}
                        />
                    )}
                />
            </Grid>

            <Grid size={3}>
                <Controller
                    name="address.district"
                    control={control}
                    rules={{ required: "require field", min: 2 }}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="เขต/อำเภอ"
                            {...field}
                            error={!!errors.address?.district}
                            helperText={errors.address?.district?.message}
                        />
                    )}
                />
            </Grid>

            <Grid size={3}>
                <Controller
                    name="address.province"
                    control={control}
                    rules={{ required: "require field", min: 2 }}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="จังหวัด"
                            {...field}
                            error={!!errors.address?.province}
                            helperText={errors.address?.province?.message}
                        />
                    )}
                />
            </Grid>

            <Grid size={3}>
                <Controller
                    name="address.postalCode"
                    control={control}
                    rules={{ required: "require field", min: 2 }}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="รหัสไปรษณีย์"
                            {...field}
                            error={!!errors.address?.postalCode}
                            helperText={errors.address?.postalCode?.message}
                        />
                    )}
                />
            </Grid>

            <Grid size={4}>
                <Controller
                    name="address.homePhone"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="โทรศัพท์บ้าน"
                            {...field}
                        />
                    )}
                />
            </Grid>

            <Grid size={4}>
                <Controller
                    name="address.mobilePhone"
                    control={control}
                    rules={{ required: "require field", min: 2 }}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="โทรศัพท์มือถือ"
                            {...field}
                            error={!!errors.address?.mobilePhone}
                            helperText={errors.address?.mobilePhone?.message}
                        />
                    )}
                />
            </Grid>

            <Grid size={4}>
                <Controller
                    name="address.email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            type="email"
                            fullWidth
                            margin="normal"
                            label="อีเมล์"
                            {...field}
                            helperText={errors.address?.email?.message}
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
}
