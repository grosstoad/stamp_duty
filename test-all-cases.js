/**
 * Test file for Australian Stamp Duty Calculator
 * This file tests all cases from the provided test case PDF
 */

const { calculatePropertyPurchaseCosts } = require('./calculator/dist/propertyPurchaseCalculator');

function formatCurrency(amount) {
  return amount !== undefined ? `$${amount.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'N/A';
}

const testCases = [
  { id: 1, state: 'NSW', propertyValue: 17000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 2, state: 'NSW', propertyValue: 17001, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 3, state: 'NSW', propertyValue: 35000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 4, state: 'NSW', propertyValue: 95011, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 5, state: 'NSW', propertyValue: 325111, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 6, state: 'NSW', propertyValue: 800000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 7, state: 'NSW', propertyValue: 824353, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 8, state: 'NSW', propertyValue: 900000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 9, state: 'NSW', propertyValue: 1000000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 10, state: 'NSW', propertyValue: 1500000, firstHomeBuyer: false, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 11, state: 'NSW', propertyValue: 3700000, firstHomeBuyer: false, loanPurpose: 'OWNER_OCCUPIER' },
  
  { id: 12, state: 'VIC', propertyValue: 25000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 13, state: 'VIC', propertyValue: 25001, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 14, state: 'VIC', propertyValue: 750011, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 15, state: 'VIC', propertyValue: 1500111, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 16, state: 'VIC', propertyValue: 2500000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 17, state: 'VIC', propertyValue: 25000, firstHomeBuyer: false, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 18, state: 'VIC', propertyValue: 25001, firstHomeBuyer: false, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 19, state: 'VIC', propertyValue: 400011, firstHomeBuyer: false, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 20, state: 'VIC', propertyValue: 501111, firstHomeBuyer: false, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 21, state: 'VIC', propertyValue: 1500111, firstHomeBuyer: false, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 22, state: 'VIC', propertyValue: 120000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 23, state: 'VIC', propertyValue: 600000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 24, state: 'VIC', propertyValue: 600001, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 25, state: 'VIC', propertyValue: 650011, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 26, state: 'VIC', propertyValue: 700111, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 27, state: 'VIC', propertyValue: 750000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 28, state: 'VIC', propertyValue: 750001, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  
  { id: 29, state: 'QLD', propertyValue: 5000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 30, state: 'QLD', propertyValue: 5001, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 31, state: 'QLD', propertyValue: 300011, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 32, state: 'QLD', propertyValue: 800111, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 33, state: 'QLD', propertyValue: 1001111, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 34, state: 'QLD', propertyValue: 350000, firstHomeBuyer: false, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 35, state: 'QLD', propertyValue: 550000, firstHomeBuyer: false, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 36, state: 'QLD', propertyValue: 1550000, firstHomeBuyer: false, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 37, state: 'QLD', propertyValue: 700000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 38, state: 'QLD', propertyValue: 709999, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 39, state: 'QLD', propertyValue: 710000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 40, state: 'QLD', propertyValue: 735111, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 41, state: 'QLD', propertyValue: 780000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 42, state: 'QLD', propertyValue: 800000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  
  { id: 43, state: 'WA', propertyValue: 120000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 44, state: 'WA', propertyValue: 120001, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 45, state: 'WA', propertyValue: 200011, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 46, state: 'WA', propertyValue: 600111, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 47, state: 'WA', propertyValue: 2490000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 48, state: 'WA', propertyValue: 120000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 49, state: 'WA', propertyValue: 120001, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 50, state: 'WA', propertyValue: 200000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 51, state: 'WA', propertyValue: 700000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 52, state: 'WA', propertyValue: 500000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 53, state: 'WA', propertyValue: 700000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 54, state: 'WA', propertyValue: 700001, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 55, state: 'WA', propertyValue: 750000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 56, state: 'WA', propertyValue: 750001, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  
  { id: 57, state: 'SA', propertyValue: 12000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 58, state: 'SA', propertyValue: 12001, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 59, state: 'SA', propertyValue: 40011, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 60, state: 'SA', propertyValue: 75111, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 61, state: 'SA', propertyValue: 150000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 62, state: 'SA', propertyValue: 300000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 63, state: 'SA', propertyValue: 500000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 64, state: 'SA', propertyValue: 3000000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 65, state: 'SA', propertyValue: 150000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 66, state: 'SA', propertyValue: 300000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 67, state: 'SA', propertyValue: 500000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 68, state: 'SA', propertyValue: 3000000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  
  { id: 69, state: 'TAS', propertyValue: 3000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 70, state: 'TAS', propertyValue: 3001, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 71, state: 'TAS', propertyValue: 50011, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 72, state: 'TAS', propertyValue: 150111, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 73, state: 'TAS', propertyValue: 375000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 74, state: 'TAS', propertyValue: 725000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 75, state: 'TAS', propertyValue: 1000000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 76, state: 'TAS', propertyValue: 750000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 77, state: 'TAS', propertyValue: 750001, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  
  { id: 78, state: 'ACT', propertyValue: 200000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 79, state: 'ACT', propertyValue: 200001, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 80, state: 'ACT', propertyValue: 400011, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 81, state: 'ACT', propertyValue: 600111, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 82, state: 'ACT', propertyValue: 1000000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 83, state: 'ACT', propertyValue: 1455000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 84, state: 'ACT', propertyValue: 3000000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 85, state: 'ACT', propertyValue: 260000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 86, state: 'ACT', propertyValue: 400011, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 87, state: 'ACT', propertyValue: 600111, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 88, state: 'ACT', propertyValue: 1000000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 89, state: 'ACT', propertyValue: 1455000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  { id: 90, state: 'ACT', propertyValue: 3000000, firstHomeBuyer: true, loanPurpose: 'OWNER_OCCUPIER' },
  
  { id: 91, state: 'NT', propertyValue: 525000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 92, state: 'NT', propertyValue: 525001, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 93, state: 'NT', propertyValue: 3000000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 94, state: 'NT', propertyValue: 5000000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' },
  { id: 95, state: 'NT', propertyValue: 6000000, firstHomeBuyer: false, loanPurpose: 'INVESTOR' }
];

console.log('Australian Stamp Duty Calculator - Test Results');
console.log('=================================================');
console.log('| ID | State | Property Value | FHB | PPOR | Stamp Duty | FHB Concession | PPOR Concession | Final Duty | Transfer Fee | Mortgage Reg Fee | Total Costs |');
console.log('|----+-------+----------------+-----+------+------------+----------------+-----------------+------------+--------------+------------------+-------------|');

testCases.forEach(testCase => {
  const { id, state, propertyValue, firstHomeBuyer, loanPurpose } = testCase;
  const isPPOR = loanPurpose === 'OWNER_OCCUPIER';
  
  try {
    const result = calculatePropertyPurchaseCosts({
      propertyValue,
      state,
      loanPurpose,
      firstHomeBuyer
    });
    
    console.log(
      `| ${id.toString().padEnd(2)} | ${state.padEnd(5)} | $${propertyValue.toLocaleString().padEnd(14)} | ${firstHomeBuyer ? 'Yes' : 'No '} | ${isPPOR ? 'Yes' : 'No '} | ${formatCurrency(result.stampDuty).padEnd(10)} | ${formatCurrency(result.fhbConcessionAmount).padEnd(14)} | ${formatCurrency(result.pporConcessionAmount).padEnd(15)} | ${formatCurrency(result.finalStampDutyAmount).padEnd(10)} | ${formatCurrency(result.transferFee).padEnd(12)} | ${formatCurrency(result.mortgageRegistrationFee).padEnd(16)} | ${formatCurrency(result.totalGovernmentCosts).padEnd(11)} |`
    );
  } catch (error) {
    console.log(`| ${id.toString().padEnd(2)} | ${state.padEnd(5)} | $${propertyValue.toLocaleString().padEnd(14)} | ${firstHomeBuyer ? 'Yes' : 'No '} | ${isPPOR ? 'Yes' : 'No '} | ERROR: ${error.message} |`);
  }
});

console.log('=================================================');
console.log('Test completed successfully.');
