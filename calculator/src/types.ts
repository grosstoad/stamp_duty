export type State = 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'ACT' | 'NT';
export type LoanPurposeType = 'OWNER_OCCUPIER' | 'INVESTOR';

export interface PropertyPurchaseRequest {
  propertyValue: number;              // Total property value in AUD
  state: State;                       // Australian state/territory code
  loanPurpose: LoanPurposeType;       // 'OWNER_OCCUPIER' or 'INVESTOR'
  firstHomeBuyer: boolean;            // Whether the buyer is a first home buyer
}

export interface PropertyPurchaseResponse {
  stampDuty: number;                  // Calculated stamp duty amount
  fhbConcessionAmount: number;        // First home buyer concession amount
  pporConcessionAmount: number;       // Principal place of residence concession amount
  finalStampDutyAmount: number;       // This will be stampDuty - fhbConcessionAmount - pporConcessionAmount
  transferFee: number;                // Property transfer registration fee
  mortgageRegistrationFee: number;    // Mortgage registration fee
  totalGovernmentCosts: number;       // Total of all government costs (finalStampDutyAmount + transferFee + mortgageRegistrationFee)
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
  rates: any[]; // This will vary by state
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
