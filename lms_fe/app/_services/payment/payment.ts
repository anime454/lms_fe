import axios from "@/app/_axios/axios";
import { PaymentData } from "@/app/models/payment";

interface paymentResp{
    code: number;
    message: string;
    data: {
        lid: string;
    };
}

interface paymentDashboardResp{
    code: number;
    message: string;
    data: {
        payment: [{
            pid: string
            cid: string
            lid: string
            due_date: string
            status: string
            amount: number
            interest_rate: number
        }];
        total: number
    };
}

interface getPaymentDashboardResp {
    data: PaymentData[];
    total: number
}

interface paymentDataResp {
    code: string; // Response code
    message: string; // Response message
    data: {
        pid: string
        cid: string
        lid: string
        due_date: string
        status: string
        amount: number
        interest_rate: number
    };
}


// interface paymentDashboardResp {
//     pid: string
//     cid: string
//     lid: string
//     due_date: string
//     status: string
//     amount: number
//     interest_rate: number
// }

export const NewPayment = async (data: PaymentData) => {
    const payload = {
        cid: data.cid,
        lid: data.lid,
        due_date: data.dueDate,
        status: data.status,
        amount: Number(data.amount),
        interest_rate: Number(data.interestRate)
    }

    try {
        const resp = await axios.post<paymentResp>("/payment/", payload );
        if (resp.status === 200) {
            return Promise.resolve(resp.data);
        } else {
            return Promise.reject({});
        }
    } catch (e) {
        console.error(e)
        return Promise.reject({});
    }
}

export const GetPaymentDashboard= async (limit: number, offset: number):Promise<getPaymentDashboardResp> => {
    try {
        const resp = await axios.get<paymentDashboardResp>(`/payment/dashboard?limit=${limit}&offset=${offset}`);
        if (resp.status === 200) {
            const payment:PaymentData[] = resp.data.data.payment.map((p)=>{
                return {
                    pid: p.pid,
                    cid: p.cid,
                    lid: p.lid,
                    dueDate: new Date(p.due_date),
                    status: p.status,
                    amount: p.amount,
                    interestRate: p.interest_rate,
                }
            })
            return Promise.resolve({
                data: payment,
                total: resp.data.data.total
            });
        } else {
            return Promise.reject({});
        }
    } catch (e) {
        console.error(e)
        return Promise.reject({});
    }
}

export const GetPayment = async(pid: string): Promise<PaymentData> => {
    try {

        const resp = await axios.get<paymentDataResp>(`/payment/${pid}`)
        if (resp.status === 200) {
            const p =  resp.data.data;
            const payment:PaymentData = {
                pid: p.pid,
                cid:p.cid,
                lid:p.lid,
                dueDate: new Date(Date.parse(p.due_date)),
                status:p.status, 
                amount:p.amount, 
                interestRate:p.interest_rate 
            }
            return Promise.resolve(payment)
        } else {
            return Promise.reject({})
        }

    } catch(e){
        console.error(e)
        return Promise.reject({})
    }

}

export const UpdatePayment = async (data: PaymentData):Promise<paymentResp> => {
    const payload = {
        pid: data.pid,
        cid: data.cid,
        lid: data.lid,
        due_date: data.dueDate,
        status: data.status,
        amount: Number(data.amount),
        interest_rate: Number(data.interestRate)
    }

    try {
        const resp = await axios.post<paymentResp>("/payment/", payload );
        if (resp.status === 200) {
            return Promise.resolve(resp.data);
        } else {
            return Promise.reject({});
        }
    } catch (e) {
        console.error(e)
        return Promise.reject({});
    }
}


export const DeletePayment = async (pid: string): Promise<string> => {
    try {
        const resp = await axios.delete(`/payment/${pid}`);
        if (resp.status === 200) {
            return Promise.resolve("success");
        } else {
            return Promise.reject("");
        }
    } catch (e) {
        console.error(e)
        return Promise.reject("");
    }
}