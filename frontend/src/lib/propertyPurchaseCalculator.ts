import { PropertyPurchaseRequest, PropertyPurchaseResponse, State } from './types';
import { ratesAndFees } from './ratesData';

/**
 * Calculate Northern Territory stamp duty for properties under $525,000
 * @param value Property value in AUD
 * @returns Calculated stamp duty amount
 */
function calculateNTStampDuty(value: number): number {
  return 0.06571441 * Math.pow(value / 1000, 2) + 15 * (value / 1000) + 500;
}

/**
 * Calculate standard stamp duty based on property value and state rates
 * @param propertyValue Property value in AUD
 * @param state Australian state/territory code
 * @returns Calculated standard stamp duty amount
 */
function calculateStandardStampDuty(propertyValue: number, state: State): number {
  const stateRates = ratesAndFees.rates[state];
  const standardRates = stateRates.stampDuty.standard;
  
  if (state === 'NT') {
    if (propertyValue <= 525000) {
      return Math.round(calculateNTStampDuty(propertyValue));
    } else if (propertyValue <= 3000000) {
      return Math.round(propertyValue * 0.0495);
    } else if (propertyValue <= 5000000) {
      return Math.round(propertyValue * 0.0575);
    } else {
      return Math.round(propertyValue * 0.0595);
    }
  }
  
  let result = 0;
  let found = false;
  
  for (const rate of standardRates) {
    if (found) break;
    
    const min = rate.threshold;
    const max = rate.maxValue === null ? Infinity : rate.maxValue;
    
    if (propertyValue >= min && propertyValue <= max) {
      if (typeof rate.marginalRate === 'string') {
        if (rate.marginalRate === 'FORMULA') {
          result = calculateNTStampDuty(propertyValue);
        }
      }else if (rate.baseAmount === 0 && min === 0) {
        result = propertyValue * rate.marginalRate;
      } else {
        result = rate.baseAmount + (propertyValue - min) * rate.marginalRate;
      }
      found = true;
    }
  }
  
  if (state === 'ACT' && propertyValue >= 1455001) {
    result = propertyValue * 0.0454;
  }
  
  return Math.round(result);
}

/**
 * Calculate first home buyer concession amount
 * @param stampDuty Standard stamp duty amount
 * @param propertyValue Property value in AUD
 * @param state Australian state/territory code
 * @returns Concession amount
 */
function calculateFirstHomeBuyerConcession(stampDuty: number, propertyValue: number, state: State): number {
  const stateRates = ratesAndFees.rates[state];
  const fhbConcession = stateRates.stampDuty.firstHomeBuyer;
  
  if (!fhbConcession) return 0;
  
  const { exemptionThreshold, concessionMaxThreshold } = fhbConcession;
  
  if (propertyValue <= exemptionThreshold) {
    return stampDuty;
  }
  
  if (propertyValue <= concessionMaxThreshold) {
    switch (state) {
      case 'NSW':
        return Math.round(30529 * (1000000 - propertyValue) / 200000);
      case 'VIC':
        return Math.round(stampDuty * (1 - (propertyValue - 600000) / 150000));
      case 'QLD':
        if (propertyValue >= 700000 && propertyValue <= 800000) {
          const step = Math.floor((propertyValue - 700000) / 10000);
          return Math.round(17350 - (step * 1735));
        }
        return 0;
      case 'WA':
        return 0;
      case 'SA':
        return stampDuty;
      case 'TAS':
        return propertyValue <= 750000 ? stampDuty : 0;
      case 'ACT':
        if (propertyValue > 1000000 && propertyValue < 1455000) {
          return Math.round(stampDuty - (propertyValue - 1000000) * 0.064);
        }
        return 0;
      default:
        return 0;
    }
  }
  
  return 0;
}

/**
 * Calculate transfer fee based on property value and state
 * @param propertyValue Property value in AUD
 * @param state Australian state/territory code
 * @returns Transfer fee amount
 */
function calculateTransferFee(propertyValue: number, state: State): number {
  const stateRates = ratesAndFees.rates[state];
  const transferFee = stateRates.fees.transfer;
  
  if (typeof transferFee === 'number') {
    return transferFee;
  }
  
  switch (state) {
    case 'VIC':
      const vicFee = (propertyValue / 1000) * 2.34 + 98.60;
      return Math.round(Math.min(vicFee, 3609));
    case 'QLD':
      if (propertyValue <= 180000) {
        return 231.98;
      }
      return Math.round(231.98 + (Math.ceil((propertyValue - 180000) / 10000) * 43.56));
    case 'WA':
      if (propertyValue <= 85000) return 210.30;
      if (propertyValue <= 120000) return 220.30;
      if (propertyValue <= 200000) return 240.30;
      if (propertyValue <= 300000) return 260.30;
      if (propertyValue <= 400000) return 280.30;
      if (propertyValue <= 500000) return 300.30;
      if (propertyValue <= 600000) return 320.30;
      if (propertyValue <= 700000) return 340.30;
      if (propertyValue <= 800000) return 360.30;
      if (propertyValue <= 900000) return 380.30;
      if (propertyValue <= 1000000) return 400.30;
      if (propertyValue <= 1100000) return 420.30;
      if (propertyValue <= 1200000) return 440.30;
      if (propertyValue <= 1300000) return 460.30;
      if (propertyValue <= 1400000) return 480.30;
      if (propertyValue <= 1500000) return 500.30;
      if (propertyValue <= 1600000) return 520.30;
      if (propertyValue <= 1700000) return 540.30;
      if (propertyValue <= 1800000) return 560.30;
      if (propertyValue <= 1900000) return 580.30;
      if (propertyValue <= 2000000) return 600.30;
      return Math.round(600.30 + (Math.ceil((propertyValue - 2000000) / 100000) * 20));
    case 'SA':
      if (propertyValue <= 5000) return 192.00;
      if (propertyValue <= 20000) return 215.00;
      if (propertyValue <= 40000) return 236.00;
      if (propertyValue <= 50000) return 332.00;
      return Math.round(332 + (Math.ceil((propertyValue - 50000) / 10000) * 99));
    default:
      return 0;
  }
}

/**
 * Calculate mortgage registration fee
 * @param state Australian state/territory code
 * @returns Mortgage registration fee
 */
function calculateMortgageRegistrationFee(state: State): number {
  return ratesAndFees.rates[state].fees.mortgageRegistration;
}

/**
 * Calculate all property purchase costs based on the request
 * @param request Property purchase request with details
 * @returns Complete property purchase response with all calculated costs
 */
export function calculatePropertyPurchaseCosts(request: PropertyPurchaseRequest): PropertyPurchaseResponse {
  const { propertyValue, state, firstHomeBuyer } = request;
  
  const stampDuty = calculateStandardStampDuty(propertyValue, state);
  
  const fhbConcessionAmount = firstHomeBuyer ? 
    calculateFirstHomeBuyerConcession(stampDuty, propertyValue, state) : 0;
  
  const finalStampDutyAmount = stampDuty - fhbConcessionAmount;
  
  const transferFee = calculateTransferFee(propertyValue, state);
  
  const mortgageRegistrationFee = calculateMortgageRegistrationFee(state);
  
  const totalGovernmentCosts = finalStampDutyAmount + transferFee + mortgageRegistrationFee;
  
  return {
    stampDuty,
    fhbConcessionAmount,
    finalStampDutyAmount,
    transferFee,
    mortgageRegistrationFee,
    totalGovernmentCosts
  };
}
