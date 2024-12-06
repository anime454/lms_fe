'use client'

import { fetchEducations } from "@/app/_services/customer/customer";
import { CustomerEducation } from "@/app/models/customer";
import { Checkbox, FormControlLabel, FormGroup, FormHelperText } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function CustomerEducationComponent() {
    const { control } = useFormContext<{ education: CustomerEducation | null }>();
    const [educationLevels, setEducationLevels] = useState<CustomerEducation[]>([]); // Initialize with an empty array

    const fetch = async () => {
        const edus = await fetchEducations();
        setEducationLevels(edus)
    }

    useEffect(() => {
        fetch()
    }, []);

    return (
        <Grid size={12}>
            <Controller
                name="education"
                control={control}
                rules={{
                    required: "กรุณาเลือกการศึกษาสูงสุด (Please select an education level)",
                }}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <FormGroup row>
                            {educationLevels && educationLevels.map((level) => (
                                <FormControlLabel
                                    key={level.eid}
                                    control={
                                        <Checkbox
                                            checked={field.value?.eid === level.eid}
                                            onChange={() => field.onChange(field.value?.eid === level.eid ? null : level)} // Handle the selection toggle
                                        />
                                    }
                                    label={level.thName} // or use level.en_name for English
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


