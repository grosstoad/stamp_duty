# Australian Stamp Duty Calculator

A comprehensive TypeScript library for calculating stamp duty and other government fees for property purchases across all Australian states and territories.

## Features

- Calculate stamp duty for all Australian states and territories
- Support for first home buyer concessions
- Calculate transfer fees and mortgage registration fees
- Handle different property types (owner-occupier vs investor)
- Comprehensive test suite

## Installation

```bash
npm install australian-stamp-duty-calculator
```

## Usage

```typescript
import { calculatePropertyPurchaseCosts } from 'australian-stamp-duty-calculator';
import { PropertyPurchaseRequest } from 'australian-stamp-duty-calculator';

// Example: Standard property purchase in NSW
const request: PropertyPurchaseRequest = {
  propertyValue: 800000,
  state: 'NSW',
  loanPurpose: 'OWNER_OCCUPIER',
  firstHomeBuyer: false
};

const result = calculatePropertyPurchaseCosts(request);
console.log(result);
```

### Response Structure

```typescript
{
  stampDuty: 30529,                // Base stamp duty amount
  fhbConcessionAmount: 0,          // First home buyer concession (if applicable)
  finalStampDutyAmount: 30529,     // Final stamp duty after concessions
  transferFee: 171.7,              // Property transfer registration fee
  mortgageRegistrationFee: 171.7,  // Mortgage registration fee
  totalGovernmentCosts: 30872.4    // Total of all government costs
}
```

## Supported States

- New South Wales (NSW)
- Victoria (VIC)
- Queensland (QLD)
- Western Australia (WA)
- South Australia (SA)
- Tasmania (TAS)
- Australian Capital Territory (ACT)
- Northern Territory (NT)

## Special Calculations

- Northern Territory uses a special formula for properties under $525,000
- First home buyer concessions vary by state
- Transfer fees have state-specific calculation methods

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build
```

## License

ISC
