export type State = 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'ACT' | 'NT';
export type LoanPurposeType = 'OWNER_OCCUPIER' | 'INVESTOR';
export interface PropertyPurchaseRequest {
    propertyValue: number;
    state: State;
    loanPurpose: LoanPurposeType;
    firstHomeBuyer: boolean;
}
export interface PropertyPurchaseResponse {
    stampDuty: number;
    fhbConcessionAmount: number;
    pporConcessionAmount: number;
    finalStampDutyAmount: number;
    transferFee: number;
    mortgageRegistrationFee: number;
    totalGovernmentCosts: number;
}
export interface RateThreshold {
    threshold: number;
    maxValue: number | null;
    baseAmount: number;
    marginalRate: number | string;
}
export interface FirstHomeBuyerConcession {
    exemptionThreshold: number;
    concessionMaxThreshold: number;
    rates: any[];
}
export interface StateRates {
    stampDuty: {
        standard: RateThreshold[];
        firstHomeBuyer: FirstHomeBuyerConcession | null;
        principalResidence: any | null;
    };
    fees: {
        transfer: number | string | any;
        mortgageRegistration: number;
    };
}
export interface RatesAndFees {
    metadata: {
        version: string;
        lastUpdated: string;
        source: string;
    };
    rates: {
        [key in State]: StateRates;
    };
}
