"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const propertyPurchaseCalculator_1 = require("./propertyPurchaseCalculator");
const example1 = {
    propertyValue: 800000,
    state: 'NSW',
    loanPurpose: 'OWNER_OCCUPIER',
    firstHomeBuyer: false
};
const result1 = (0, propertyPurchaseCalculator_1.calculatePropertyPurchaseCosts)(example1);
console.log('Example 1: Standard property purchase in NSW');
console.log(JSON.stringify(result1, null, 2));
console.log('\n');
const example2 = {
    propertyValue: 600000,
    state: 'VIC',
    loanPurpose: 'OWNER_OCCUPIER',
    firstHomeBuyer: true
};
const result2 = (0, propertyPurchaseCalculator_1.calculatePropertyPurchaseCosts)(example2);
console.log('Example 2: First home buyer in VIC with full exemption');
console.log(JSON.stringify(result2, null, 2));
console.log('\n');
const example3 = {
    propertyValue: 1000000,
    state: 'NT',
    loanPurpose: 'INVESTOR',
    firstHomeBuyer: false
};
const result3 = (0, propertyPurchaseCalculator_1.calculatePropertyPurchaseCosts)(example3);
console.log('Example 3: High-value property in NT');
console.log(JSON.stringify(result3, null, 2));
