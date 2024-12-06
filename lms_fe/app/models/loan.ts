import { RiskProfile, NatureOfAssets, AmortizationPeriodType, InterestRateType } from "./enum";


export type editLoanPageQueryParams = {
    lid: string;
};

export type viewLoanPageQueryParams = {
    lid: string;
};

// Top-level structure for Loan
export type LoanData = {
    id: string,
    name: string,
    description: string,
    criteria: Criteria[],
    characteristics: Characteristics
};

// Criteria type with properties as per the image
export type Criteria = {
    riskProfile: RiskProfile,
    natureOfAssets: NatureOfAssets,
    minimumValueOfAssets: number,
    creditScore: number
    // it can have more 
};

export type AmortizationPeriod = {
    duration: number,
    type: AmortizationPeriodType,
}

// Characteristics type with properties for each characteristic
export type Characteristics = {
    securedOrUnsecured: string; // "Secured" or "Unsecured"
    amortizationPeriod: AmortizationPeriod; // Could be a duration or description
    interestRate: InterestRate;
    maxValue: number
};

// Type for Interest Rate, as it has both fixed and variable options
export type InterestRate = {
    type: InterestRateType,
    value: number
};


// Default value for LoanData
export const LoanDataDefaultValue: LoanData = {
    id: "",
    name: "",
    description: "",
    criteria: [
        {
            riskProfile: RiskProfile.LOW, // Default value for risk profile
            natureOfAssets: NatureOfAssets.UNSECURED, // Default value for nature of assets
            minimumValueOfAssets: 0, // Default value for asset minimum value
            creditScore: 0, // Default credit score
        },
    ],
    characteristics: {
        securedOrUnsecured: "Unsecured", // Default value for secured or unsecured
        amortizationPeriod: {
            duration: 0, // Default duration
            type: AmortizationPeriodType.MONTH, // Default amortization type
        },
        interestRate: {
            type: InterestRateType.FIXED, // Default interest rate type
            value: 0, // Default interest rate value
        },
        maxValue: 0, // Default maximum value
    },
};
