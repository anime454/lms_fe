
import { CustomerData } from "@/app/models/customer";
import { ReactNode, useContext, createContext } from "react";
import { useForm, FormProvider } from "react-hook-form";


type CustomerContextType = {
    customerData: CustomerData;
};

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
    const methods = useForm<CustomerData>({
        defaultValues: {},
    });

    return (
        <CustomerContext.Provider value={{ customerData: methods.getValues() }}>
            <FormProvider {...methods}>{children}</FormProvider>
        </CustomerContext.Provider>
    );
};

// Create a custom hook for easier context access
export const useCustomerContext = () => {
    const context = useContext(CustomerContext);
    if (!context) {
        throw new Error("useCustomerContext must be used within a CustomerProvider");
    }
    return context;
};