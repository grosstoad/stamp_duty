import { calculatePropertyPurchaseCosts } from '../propertyPurchaseCalculator';
import { PropertyPurchaseRequest } from '../types';

describe('Property Purchase Calculator', () => {
  describe('Standard stamp duty calculations', () => {
    test('NSW standard stamp duty calculation', () => {
      const request: PropertyPurchaseRequest = {
        propertyValue: 800000,
        state: 'NSW',
        loanPurpose: 'OWNER_OCCUPIER',
        firstHomeBuyer: false
      };
      
      const result = calculatePropertyPurchaseCosts(request);
      expect(result.stampDuty).toBe(30529);
      expect(result.finalStampDutyAmount).toBe(30529);
      expect(result.transferFee).toBe(171.7);
      expect(result.mortgageRegistrationFee).toBe(171.7);
      expect(result.totalGovernmentCosts).toBe(30872.4);
    });
    
    test('VIC standard stamp duty calculation', () => {
      const request: PropertyPurchaseRequest = {
        propertyValue: 800000,
        state: 'VIC',
        loanPurpose: 'OWNER_OCCUPIER',
        firstHomeBuyer: false
      };
      
      const result = calculatePropertyPurchaseCosts(request);
      expect(result.stampDuty).toBe(43070);
      expect(result.finalStampDutyAmount).toBe(43070);
      expect(result.transferFee).toBe(1971);
      expect(result.mortgageRegistrationFee).toBe(122.1);
      expect(result.totalGovernmentCosts).toBe(45163.1);
    });
    
    test('QLD standard stamp duty calculation', () => {
      const request: PropertyPurchaseRequest = {
        propertyValue: 800000,
        state: 'QLD',
        loanPurpose: 'OWNER_OCCUPIER',
        firstHomeBuyer: false
      };
      
      const result = calculatePropertyPurchaseCosts(request);
      expect(result.stampDuty).toBe(29025);
      expect(result.finalStampDutyAmount).toBe(29025);
      expect(result.transferFee).toBe(2933);
      expect(result.mortgageRegistrationFee).toBe(231.98);
      expect(result.totalGovernmentCosts).toBe(32189.98);
    });
    
    test('NT standard stamp duty calculation with formula', () => {
      const request: PropertyPurchaseRequest = {
        propertyValue: 500000,
        state: 'NT',
        loanPurpose: 'OWNER_OCCUPIER',
        firstHomeBuyer: false
      };
      
      const result = calculatePropertyPurchaseCosts(request);
      expect(result.stampDuty).toBe(24429);
      expect(result.finalStampDutyAmount).toBe(24429);
      expect(result.transferFee).toBe(172);
      expect(result.mortgageRegistrationFee).toBe(172);
      expect(result.totalGovernmentCosts).toBe(24773);
    });
    
    test('NT standard stamp duty calculation with fixed rate', () => {
      const request: PropertyPurchaseRequest = {
        propertyValue: 1000000,
        state: 'NT',
        loanPurpose: 'OWNER_OCCUPIER',
        firstHomeBuyer: false
      };
      
      const result = calculatePropertyPurchaseCosts(request);
      expect(result.stampDuty).toBe(49500);
      expect(result.finalStampDutyAmount).toBe(49500);
      expect(result.transferFee).toBe(172);
      expect(result.mortgageRegistrationFee).toBe(172);
      expect(result.totalGovernmentCosts).toBe(49844);
    });
  });
  
  describe('First home buyer concessions', () => {
    test('NSW first home buyer with full exemption', () => {
      const request: PropertyPurchaseRequest = {
        propertyValue: 650000,
        state: 'NSW',
        loanPurpose: 'OWNER_OCCUPIER',
        firstHomeBuyer: true
      };
      
      const result = calculatePropertyPurchaseCosts(request);
      expect(result.stampDuty).toBe(23779);
      expect(result.fhbConcessionAmount).toBe(23779);
      expect(result.finalStampDutyAmount).toBe(0);
      expect(result.totalGovernmentCosts).toBe(343.4);
    });
    
    test('NSW first home buyer with partial concession', () => {
      const request: PropertyPurchaseRequest = {
        propertyValue: 900000,
        state: 'NSW',
        loanPurpose: 'OWNER_OCCUPIER',
        firstHomeBuyer: true
      };
      
      const result = calculatePropertyPurchaseCosts(request);
      expect(result.stampDuty).toBe(35029);
      expect(result.fhbConcessionAmount).toBe(15265);
      expect(result.finalStampDutyAmount).toBe(19764);
      expect(result.totalGovernmentCosts).toBe(20107.4);
    });
    
    test('VIC first home buyer with full exemption', () => {
      const request: PropertyPurchaseRequest = {
        propertyValue: 600000,
        state: 'VIC',
        loanPurpose: 'OWNER_OCCUPIER',
        firstHomeBuyer: true
      };
      
      const result = calculatePropertyPurchaseCosts(request);
      expect(result.stampDuty).toBe(31070);
      expect(result.fhbConcessionAmount).toBe(31070);
      expect(result.finalStampDutyAmount).toBe(0);
      expect(result.totalGovernmentCosts).toBe(1625.1);
    });
    
    test('VIC first home buyer with partial concession', () => {
      const request: PropertyPurchaseRequest = {
        propertyValue: 700000,
        state: 'VIC',
        loanPurpose: 'OWNER_OCCUPIER',
        firstHomeBuyer: true
      };
      
      const result = calculatePropertyPurchaseCosts(request);
      expect(result.stampDuty).toBe(37070);
      expect(result.fhbConcessionAmount).toBe(12357);
      expect(result.finalStampDutyAmount).toBe(24713);
      expect(result.totalGovernmentCosts).toBe(26572.1);
    });
    
    test('SA first home buyer with full concession', () => {
      const request: PropertyPurchaseRequest = {
        propertyValue: 800000,
        state: 'SA',
        loanPurpose: 'OWNER_OCCUPIER',
        firstHomeBuyer: true
      };
      
      const result = calculatePropertyPurchaseCosts(request);
      expect(result.stampDuty).toBe(37830);
      expect(result.fhbConcessionAmount).toBe(37830);
      expect(result.finalStampDutyAmount).toBe(0);
      expect(result.totalGovernmentCosts).toBe(7949);
    });
  });
  
  describe('Transfer fee calculations', () => {
    test('VIC transfer fee calculation', () => {
      const request: PropertyPurchaseRequest = {
        propertyValue: 500000,
        state: 'VIC',
        loanPurpose: 'OWNER_OCCUPIER',
        firstHomeBuyer: false
      };
      
      const result = calculatePropertyPurchaseCosts(request);
      expect(result.transferFee).toBe(1269);
    });
    
    test('WA transfer fee calculation for low value', () => {
      const request: PropertyPurchaseRequest = {
        propertyValue: 80000,
        state: 'WA',
        loanPurpose: 'OWNER_OCCUPIER',
        firstHomeBuyer: false
      };
      
      const result = calculatePropertyPurchaseCosts(request);
      expect(result.transferFee).toBe(210.3);
    });
    
    test('WA transfer fee calculation for high value', () => {
      const request: PropertyPurchaseRequest = {
        propertyValue: 2500000,
        state: 'WA',
        loanPurpose: 'OWNER_OCCUPIER',
        firstHomeBuyer: false
      };
      
      const result = calculatePropertyPurchaseCosts(request);
      expect(result.transferFee).toBe(700);
    });
    
    test('SA transfer fee calculation', () => {
      const request: PropertyPurchaseRequest = {
        propertyValue: 600000,
        state: 'SA',
        loanPurpose: 'OWNER_OCCUPIER',
        firstHomeBuyer: false
      };
      
      const result = calculatePropertyPurchaseCosts(request);
      expect(result.transferFee).toBe(5777);
    });
  });
  
  describe('Loan purpose differences', () => {
    test('Loan purpose does not affect calculations in current implementation', () => {
      const ownerOccupierRequest: PropertyPurchaseRequest = {
        propertyValue: 500000,
        state: 'NSW',
        loanPurpose: 'OWNER_OCCUPIER',
        firstHomeBuyer: false
      };
      
      const investorRequest: PropertyPurchaseRequest = {
        propertyValue: 500000,
        state: 'NSW',
        loanPurpose: 'INVESTOR',
        firstHomeBuyer: false
      };
      
      const ownerResult = calculatePropertyPurchaseCosts(ownerOccupierRequest);
      const investorResult = calculatePropertyPurchaseCosts(investorRequest);
      
      expect(ownerResult.stampDuty).toEqual(investorResult.stampDuty);
      expect(ownerResult.finalStampDutyAmount).toEqual(investorResult.finalStampDutyAmount);
      expect(ownerResult.totalGovernmentCosts).toEqual(investorResult.totalGovernmentCosts);
    });
  });
});
