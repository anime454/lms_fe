'use client'

import { fetchEmployments } from "@/app/_services/customer/customer";
import { CustomerEmployment } from "@/app/models/customer";
import { Checkbox, FormControlLabel, FormGroup, FormHelperText } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";


export default function CustomerEmploymentComponent() {
    const { control } = useFormContext<{ employment: CustomerEmployment | null }>();
    const [employmentTypes, setEmploymentTypes] = useState<CustomerEmployment[]>()


    const fetch = async () =>{
        const emps = await fetchEmployments();
        setEmploymentTypes(emps)
    }

    useEffect(() => {
        fetch()
    }, []);

    return (
        <Grid size={12}>
            <Controller
                name="employment"
                control={control}
                rules={{
                    required: "กรุณาเลือกอาชีพ (Please select an employment type)",
                }}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <FormGroup row>
                            {employmentTypes && employmentTypes.map((type) => (
                                <FormControlLabel
                                    key={type.emid}
                                    control={
                                        <Checkbox
                                            checked={field.value?.emid === type.emid}
                                            onChange={() => field.onChange(field.value?.emid === type.emid ? null : type)}
                                        />
                                    }
                                    label={type.thName} // or use type.enText for English
                                />
                            ))}
                        </FormGroup>
                        {error && (
                            <FormHelperText error>{error.message}</FormHelperText>
                        )}
                    </>
                )}
            />
        </Grid>
    );
}
