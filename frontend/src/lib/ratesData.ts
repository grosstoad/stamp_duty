import { RatesAndFees } from './types';

export const ratesAndFees: RatesAndFees = {
  metadata: {
    version: "2024-10",
    lastUpdated: "2024-10-15",
    source: "Australian State Revenue Offices"
  },
  rates: {
    "NSW": {
      stampDuty: {
        standard: [
          {threshold: 0, maxValue: 17000, baseAmount: 0, marginalRate: 0.0125},
          {threshold: 17000, maxValue: 36000, baseAmount: 212, marginalRate: 0.015},
          {threshold: 36000, maxValue: 97000, baseAmount: 497, marginalRate: 0.0175},
          {threshold: 97000, maxValue: 364000, baseAmount: 1564, marginalRate: 0.035},
          {threshold: 364000, maxValue: 1212000, baseAmount: 10909, marginalRate: 0.045},
          {threshold: 1212000, maxValue: 3636000, baseAmount: 49069, marginalRate: 0.055},
          {threshold: 3636000, maxValue: null, baseAmount: 182389, marginalRate: 0.07}
        ],
        firstHomeBuyer: {
          exemptionThreshold: 800000,
          concessionMaxThreshold: 1000000,
          rates: []
        },
        principalResidence: null
      },
      fees: {
        transfer: 171.70,
        mortgageRegistration: 171.70
      }
    },
    "VIC": {
      stampDuty: {
        standard: [
          {threshold: 0, maxValue: 25000, baseAmount: 0, marginalRate: 0.014},
          {threshold: 25000, maxValue: 130000, baseAmount: 350, marginalRate: 0.024},
          {threshold: 130000, maxValue: 960000, baseAmount: 2870, marginalRate: 0.06},
          {threshold: 960000, maxValue: 2000000, baseAmount: 0, marginalRate: 0.055},
          {threshold: 2000000, maxValue: null, baseAmount: 110000, marginalRate: 0.065}
        ],
        firstHomeBuyer: {
          exemptionThreshold: 600000,
          concessionMaxThreshold: 750000,
          rates: []
        },
        principalResidence: [
          {threshold: 0, maxValue: 25000, baseAmount: 0, marginalRate: 0.014},
          {threshold: 25000, maxValue: 130000, baseAmount: 350, marginalRate: 0.024},
          {threshold: 130000, maxValue: 440000, baseAmount: 2870, marginalRate: 0.05},
          {threshold: 440000, maxValue: 550000, baseAmount: 18370, marginalRate: 0.06}
        ]
      },
      fees: {
        transfer: "CALCULATED",
        mortgageRegistration: 122.10
      }
    },
    "QLD": {
      stampDuty: {
        standard: [
          {threshold: 0, maxValue: 5000, baseAmount: 0, marginalRate: 0},
          {threshold: 5000, maxValue: 75000, baseAmount: 0, marginalRate: 0.015},
          {threshold: 75000, maxValue: 540000, baseAmount: 1050, marginalRate: 0.035},
          {threshold: 540000, maxValue: 1000000, baseAmount: 17325, marginalRate: 0.045},
          {threshold: 1000000, maxValue: null, baseAmount: 38025, marginalRate: 0.0575}
        ],
        firstHomeBuyer: {
          exemptionThreshold: 700000,
          concessionMaxThreshold: 800000,
          rates: []
        },
        principalResidence: "SPECIAL"
      },
      fees: {
        transfer: "CALCULATED",
        mortgageRegistration: 231.98
      }
    },
    "WA": {
      stampDuty: {
        standard: [
          {threshold: 0, maxValue: 120000, baseAmount: 0, marginalRate: 0.019},
          {threshold: 120001, maxValue: 150000, baseAmount: 2280, marginalRate: 0.0285},
          {threshold: 150001, maxValue: 360000, baseAmount: 3135, marginalRate: 0.038},
          {threshold: 360001, maxValue: 725000, baseAmount: 11115, marginalRate: 0.0475},
          {threshold: 725001, maxValue: null, baseAmount: 28453, marginalRate: 0.0515}
        ],
        firstHomeBuyer: {
          exemptionThreshold: 500000,
          concessionMaxThreshold: 750000,
          rates: []
        },
        principalResidence: [
          {threshold: 0, maxValue: 120000, baseAmount: 0, marginalRate: 0.015},
          {threshold: 120001, maxValue: 200000, baseAmount: 1800, marginalRate: 0.0404}
        ]
      },
      fees: {
        transfer: "TIERED",
        mortgageRegistration: 210.30
      }
    },
    "SA": {
      stampDuty: {
        standard: [
          {threshold: 0, maxValue: 12000, baseAmount: 0, marginalRate: 0.01},
          {threshold: 12001, maxValue: 30000, baseAmount: 120, marginalRate: 0.02},
          {threshold: 30001, maxValue: 50000, baseAmount: 480, marginalRate: 0.03},
          {threshold: 50001, maxValue: 100000, baseAmount: 1080, marginalRate: 0.035},
          {threshold: 100001, maxValue: 200000, baseAmount: 2830, marginalRate: 0.04},
          {threshold: 200001, maxValue: 250000, baseAmount: 6830, marginalRate: 0.0425},
          {threshold: 250001, maxValue: 300000, baseAmount: 8955, marginalRate: 0.0475},
          {threshold: 300001, maxValue: 500000, baseAmount: 11330, marginalRate: 0.05},
          {threshold: 500001, maxValue: null, baseAmount: 21330, marginalRate: 0.055}
        ],
        firstHomeBuyer: {
          exemptionThreshold: Infinity,
          concessionMaxThreshold: Infinity,
          rates: []
        },
        principalResidence: null
      },
      fees: {
        transfer: "TIERED",
        mortgageRegistration: 192.00
      }
    },
    "TAS": {
      stampDuty: {
        standard: [
          {threshold: 0, maxValue: 3000, baseAmount: 50, marginalRate: 0},
          {threshold: 3000, maxValue: 25000, baseAmount: 50, marginalRate: 0.0175},
          {threshold: 25001, maxValue: 75000, baseAmount: 435, marginalRate: 0.0225},
          {threshold: 75001, maxValue: 200000, baseAmount: 1560, marginalRate: 0.035},
          {threshold: 200001, maxValue: 375000, baseAmount: 5935, marginalRate: 0.04},
          {threshold: 375001, maxValue: 725000, baseAmount: 12935, marginalRate: 0.0425},
          {threshold: 725001, maxValue: null, baseAmount: 27810, marginalRate: 0.045}
        ],
        firstHomeBuyer: {
          exemptionThreshold: 750000,
          concessionMaxThreshold: 750000,
          rates: []
        },
        principalResidence: null
      },
      fees: {
        transfer: 159.88,
        mortgageRegistration: 244.97
      }
    },
    "ACT": {
      stampDuty: {
        standard: [
          {threshold: 0, maxValue: 200000, baseAmount: 0, marginalRate: 0.012},
          {threshold: 200001, maxValue: 300000, baseAmount: 2400, marginalRate: 0.022},
          {threshold: 300001, maxValue: 500000, baseAmount: 4600, marginalRate: 0.034},
          {threshold: 500001, maxValue: 750000, baseAmount: 11400, marginalRate: 0.0432},
          {threshold: 750001, maxValue: 1000000, baseAmount: 22200, marginalRate: 0.059},
          {threshold: 1000001, maxValue: 1455000, baseAmount: 36950, marginalRate: 0.064},
          {threshold: 1455001, maxValue: null, baseAmount: 0, marginalRate: 0.0454}
        ],
        firstHomeBuyer: {
          exemptionThreshold: 1000000,
          concessionMaxThreshold: 1455000,
          rates: []
        },
        principalResidence: [
          {threshold: 0, maxValue: 260000, baseAmount: 0, marginalRate: 0.004},
          {threshold: 260001, maxValue: 300000, baseAmount: 1040, marginalRate: 0.022},
          {threshold: 300001, maxValue: 500000, baseAmount: 1920, marginalRate: 0.034},
          {threshold: 500001, maxValue: 750000, baseAmount: 8720, marginalRate: 0.0432},
          {threshold: 750001, maxValue: 1000000, baseAmount: 19520, marginalRate: 0.059},
          {threshold: 1000001, maxValue: 1455000, baseAmount: 34270, marginalRate: 0.064},
          {threshold: 1455001, maxValue: null, baseAmount: 0, marginalRate: 0.0454}
        ]
      },
      fees: {
        transfer: 463.00,
        mortgageRegistration: 172.00
      }
    },
    "NT": {
      stampDuty: {
        standard: [
          {threshold: 0, maxValue: 525000, baseAmount: 0, marginalRate: "FORMULA"},
          {threshold: 525001, maxValue: 3000000, baseAmount: 0, marginalRate: 0.0495},
          {threshold: 3000001, maxValue: 5000000, baseAmount: 0, marginalRate: 0.0575},
          {threshold: 5000001, maxValue: null, baseAmount: 0, marginalRate: 0.0595}
        ],
        firstHomeBuyer: null,
        principalResidence: null
      },
      fees: {
        transfer: 172.00,
        mortgageRegistration: 172.00
      }
    }
  }
};
