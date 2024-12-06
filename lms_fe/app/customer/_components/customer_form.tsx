
import { Box, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { FormProvider, useForm } from "react-hook-form";
import { CustomerData } from "../../models/customer";
import CustomerInformation from "../_components/customer_information";
import CustomerAddress from "../_components/customer_address";
import CustomerEducation from "../_components/customer_education";
import CustomerIncomeComponent from "./customer_income";
import CustomerEmploymentComponent from "./customer_employment";

type CustomerFormProps = {
    defaultValues?: CustomerData;
    onSubmit: (data: CustomerData) => void;
};

const CustomerForm: React.FC<CustomerFormProps> = ({ defaultValues, onSubmit }) => {
    const methods = useForm<CustomerData>({
        defaultValues,
        mode: "onBlur",
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Box sx={{ width: '80%', margin: 'auto' }}>

                    <Grid container columnSpacing={{ xs: 1, sm: 3 }}>

                        <Grid size={12} style={{ paddingTop: '2%' }}>
                            <h3>ข้อมูลส่วนตัว</h3>
                            <hr />
                        </Grid>
                        <Grid size={12}>
                            <CustomerInformation />
                        </Grid>

                        <Grid size={12} style={{ paddingTop: '2%' }}>
                            <h3>ที่อยู่ปัจจุบัน</h3>
                            <hr />
                        </Grid>
                        <Grid size={12}>
                            <CustomerAddress />
                        </Grid>

                        <Grid size={12} style={{ paddingTop: '2%' }}>
                            <h3>การศึกษาสูงสุด</h3>
                            <hr />
                        </Grid>
                        <Grid size={12}>
                            <CustomerEducation />
                        </Grid>

                        <Grid size={12} style={{ paddingTop: '2%' }}>
                            <h3>อาชีพ</h3>
                            <hr />
                        </Grid>
                        <Grid size={12}>
                            <CustomerEmploymentComponent />
                        </Grid>


                        <Grid size={12} style={{ paddingTop: '2%' }}>
                            <h3>รายได้</h3>
                            <hr />
                        </Grid>
                        <Grid size={12}>
                            <CustomerIncomeComponent />
                        </Grid>

                        <Grid size={12} style={{ paddingTop: '2%', paddingBottom: '2%' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </FormProvider>
    );
};

export default CustomerForm;
