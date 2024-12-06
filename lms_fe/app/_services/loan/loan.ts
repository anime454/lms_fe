import axios from "@/app/_axios/axios";
import { AmortizationPeriodType, InterestRateType, NatureOfAssets, RiskProfile } from "@/app/models/enum";
import { Criteria, LoanData, LoanDataDefaultValue } from "@/app/models/loan";

interface newLoanReq {
    name: string;
    description: string;
    criteria: loanCriteria[];
    characteristics: loanCharacteristics;
}

interface updateLoanReq {
    lid: string,
    name: string;
    description: string;
    criteria: loanCriteria[];
    characteristics: loanCharacteristics;
}


interface loanCriteria {
    risk_profile: string;
    nature_ofAssets: string;
    minimum_value_of_assets: number; // Allows decimals like 50000.75
    credit_score: number;
}

interface loanCharacteristics {
    type: string;
    amortization_period: amortizationPeriod;
    interest_rate: interestRate;
    max_value: number;
}

interface amortizationPeriod {
    duration: number;
    type: string;
}

interface interestRate {
    type: string;
    value: number;
}

interface newLoanResp{
    code: number;
    message: string;
    data: {
        lid: string;
    };
}

interface getLoanDashboardDetailResp {
    code: string,
    message: string,
    data: {
        loans:[
            {
                lid: string,
                name: string
                risk_profile: string
                interest_rate_type: string
                interest_rate_value: number 
                maximum_loan_amount: number 
            },
        ],
        total: number,
    }
}

    interface GetLoanDashboardDetailResp {
        total: number
        data: LoanData[]
    }

    // Top-level response interface
    interface loanDataResp {
        code: string; // Response code
        message: string; // Response message
        data: loanData; // Array of loan data
    }

    // Loan data interface
    interface loanData {
        lid: string; // Loan ID
        name: string; // Loan name
        description: string; // Loan description
        criteria: criteria[]; // Array of criteria
        characteristics: characteristics; // Loan characteristics
    }

    // Criteria interface
    interface criteria {
        risk_profile: string; // Risk profile (e.g., "High", "Medium")
        nature_ofAssets: string; // Nature of assets (e.g., "Secured", "Unsecured")
        minimum_value_of_assets: number; // Minimum value of assets
        credit_score: number; // Credit score
    }

    // Characteristics interface
    interface characteristics {
        type: string; // Type of loan (e.g., "Secured", "Unsecured")
        amortization_period: amortizationPeriod; // Amortization period details
        interest_rate: interestRate; // Interest rate details
        max_value: number; // Maximum loan value
    }

    // Amortization period interface
    interface amortizationPeriod {
        duration: number; // Duration of the amortization period
        type: string; // Type of amortization period (e.g., "Years", "Months")
    }

    // Interest rate interface
    interface interestRate {
        type: string; // Interest rate type (e.g., "Fixed", "Variable")
        value: number; // Interest rate value
    }


export const NewLoan = async (req: LoanData):Promise<newLoanResp> => {

    const cris = req.criteria.map((c)=>{
        return {
            risk_profile: c.riskProfile,
            nature_ofAssets: c.natureOfAssets,
            minimum_value_of_assets: c.minimumValueOfAssets,
            credit_score: c.creditScore
        }
    })

    const payload:newLoanReq = {
        name: req.name,
        description: req.description,
        criteria: cris,
        characteristics: {
            type: req.characteristics.securedOrUnsecured,
            amortization_period: {
                duration: req.characteristics.amortizationPeriod.duration,
                type: req.characteristics.amortizationPeriod.type
            },
            interest_rate: {
                type: req.characteristics.interestRate.type,
                value: Number(req.characteristics.interestRate.value)
            },
            max_value: Number(req.characteristics.maxValue)
        }
    }

    try {
        const resp = await axios.post<newLoanResp>("/loan/", payload );
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

export const UpdateLoan = async (req: LoanData):Promise<newLoanResp> => {

    const cris = req.criteria.map((c)=>{
        return {
            risk_profile: c.riskProfile,
            nature_ofAssets: c.natureOfAssets,
            minimum_value_of_assets: c.minimumValueOfAssets,
            credit_score: c.creditScore
        }
    })

    const payload:updateLoanReq = {
        lid: req.id,
        name: req.name,
        description: req.description,
        criteria: cris,
        characteristics: {
            type: req.characteristics.securedOrUnsecured,
            amortization_period: {
                duration: req.characteristics.amortizationPeriod.duration,
                type: req.characteristics.amortizationPeriod.type
            },
            interest_rate: {
                type: req.characteristics.interestRate.type,
                value: Number(req.characteristics.interestRate.value)
            },
            max_value: req.characteristics.maxValue
        }
    }

    try {
        const resp = await axios.put<newLoanResp>("/loan/", payload );
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

export const GetLoan = async(cid: string): Promise<LoanData> => {
    try {

        const resp = await axios.get<loanDataResp>(`/loan/${cid}`)
        if (resp.status === 200) {
            const l =  resp.data.data;
            console.log(l)

            const cris:Criteria[] = l.criteria.map((cri)=>{
                return {
                    riskProfile: RiskProfile[cri.risk_profile as keyof typeof RiskProfile],
                    natureOfAssets: NatureOfAssets[cri.nature_ofAssets as keyof typeof NatureOfAssets],
                    minimumValueOfAssets: cri.minimum_value_of_assets,
                    creditScore: cri.credit_score
                }
            })

            const loan:LoanData = {
                id: l.lid,
                name: l.name,
                description: l.description,
                criteria: cris,
                characteristics: {
                    securedOrUnsecured: l.characteristics.type,
                    amortizationPeriod: {
                        duration: l.characteristics.amortization_period.duration,
                        type: AmortizationPeriodType[l.characteristics.amortization_period.type as keyof typeof AmortizationPeriodType]
                    },
                    interestRate: {
                        type: InterestRateType[l.characteristics.interest_rate.type as keyof typeof InterestRateType],
                        value: l.characteristics.interest_rate.value
                    },
                    maxValue: l.characteristics.max_value
                }
            }

            return Promise.resolve(loan)
        } else {
            return Promise.reject({})
        }

    } catch(e){
        console.error(e)
        return Promise.reject({})
    }

}

export const GetLoanDashboardDetail = async (limit: number, offset: number): Promise<GetLoanDashboardDetailResp> => {
    try {
        
        const resp = await axios.post<getLoanDashboardDetailResp>("/loan/dashboard", {
            limit: limit, offset: offset
        });

        if (resp.status === 200) {
            const loans:LoanData[] = resp.data.data.loans.map((l)=>{
                console.log(l)
                return {
                    ...LoanDataDefaultValue,
                    id: l.lid,
                    name: l.name,
                    description: "",
                    characteristics: {
                        ...LoanDataDefaultValue.characteristics,
                        interestRate: {
                            type: InterestRateType[l.interest_rate_type as keyof typeof InterestRateType],
                            value: l.interest_rate_value
                        },
                        maxValue: l.maximum_loan_amount
                    },
                    criteria: [
                        {
                            riskProfile: RiskProfile[l.risk_profile as keyof typeof RiskProfile],
                            natureOfAssets: NatureOfAssets.UNSECURED,
                            minimumValueOfAssets: 0,
                            creditScore: 0, 
                        },
                    ],
                }
            })

            return Promise.resolve({
                total: resp.data.data.total,
                data: loans,
            })

        } else {
            return Promise.reject({})
        }

    } catch (e) {
        console.error(e)
        return Promise.reject({});
    }
}

export const DeleteLoan = async (lid: string): Promise<string> => {
    try {
        const resp = await axios.delete(`/loan/${lid}`);
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