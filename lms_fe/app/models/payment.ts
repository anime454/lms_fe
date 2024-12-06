export type editPaymentPageQueryParams = {
    pid: string;
};

export type PaymentData = {
    pid: string;
    cid: string;
    lid: string;
    dueDate: Date;
    status: string;
    amount: number;
    interestRate: number;
}
