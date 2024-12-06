'use client'

import { CustomerData, defaultCustomerData, editCustomerPageQueryParams } from "@/app/models/customer";
import CustomerForm from "../../_components/customer_form";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { convertCustomerDataToRequestBody, fetchCustomer, newCustomer } from "@/app/_services/customer/customer";


const EditCustomerPage = () => {
    const router = useRouter()

    const params = useParams<editCustomerPageQueryParams>()
    const [customer, setCustomer] = useState<CustomerData>(defaultCustomerData)

    const editCust = async (data: CustomerData) => {
        const requestBody = convertCustomerDataToRequestBody(data, params.cid);
        requestBody.salary = Number(requestBody.salary)
        requestBody.other_income = Number(requestBody.other_income)
        newCustomer(requestBody).then(resp => {
            router.push(`/customer/${resp.data.cid}`)
        }).catch(e=> {
            console.error(e)
            // TODO: 
        }).finally(() => {
            // TODO: 
        })
    };
    
    useEffect(() => {
        fetchCustomer(params.cid).then((customer)=>{
            setCustomer(customer)
        }).catch(()=>{
           // TODO:
        });
    },[])

    if (customer.id != "") {
        return <CustomerForm defaultValues={customer} onSubmit={editCust} />;
    } else {
        return (
            <>No User Found</>
        )
    }

};

export default EditCustomerPage;

