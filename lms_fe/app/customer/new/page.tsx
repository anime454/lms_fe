
"use client"
import { CustomerData } from "@/app/models/customer";
import CustomerForm from "../_components/customer_form";
import { convertCustomerDataToRequestBody, newCustomer } from "@/app/_services/customer/customer";
import { MyModal } from "@/app/_components/modal/modal";
import { useState } from "react";
import { useRouter } from "next/navigation";


const NewCustomerPage = () => {
    const router = useRouter();

    const [isModalOpen, setModalOpen] = useState(false);
    const handleClose = () => setModalOpen(false);

    const newCust = (data: CustomerData) => {
        const requestBody = convertCustomerDataToRequestBody(data);
        requestBody.salary = Number(requestBody.salary)
        requestBody.other_income = Number(requestBody.other_income)
        newCustomer(requestBody).then(resp => {
            // handleOpen()
            router.push(`/customer/${resp.data.cid}`)
        }).catch(e => {
            console.error(e)
            // TODO: 
        }).finally(() => {
            // TODO: 
        })
    }

    return (
        <div>
            <MyModal open={isModalOpen} onClose={handleClose} />
            <CustomerForm onSubmit={newCust} />;
        </div>
    )
};


export default NewCustomerPage;


