import { useState } from 'react';
import { calculatePropertyPurchaseCosts } from './lib/propertyPurchaseCalculator';
import { PropertyPurchaseRequest, PropertyPurchaseResponse, State, LoanPurposeType } from './lib/types';
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Switch } from "./components/ui/switch";

function App() {
  const [propertyValue, setPropertyValue] = useState<number>(500000);
  const [state, setState] = useState<State>('NSW');
  const [loanPurpose, setLoanPurpose] = useState<LoanPurposeType>('OWNER_OCCUPIER');
  const [firstHomeBuyer, setFirstHomeBuyer] = useState<boolean>(false);
  const [result, setResult] = useState<PropertyPurchaseResponse | null>(null);
  const [error, setError] = useState<string>('');

  const handlePropertyValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value >= 0) {
      setPropertyValue(value);
      setError('');
    } else {
      setError('Please enter a valid property value');
    }
  };

  const handleCalculate = () => {
    if (propertyValue <= 0) {
      setError('Property value must be greater than 0');
      return;
    }

    const request: PropertyPurchaseRequest = {
      propertyValue,
      state,
      loanPurpose,
      firstHomeBuyer
    };

    try {
      const calculationResult = calculatePropertyPurchaseCosts(request);
      setResult(calculationResult);
      setError('');
    } catch (err) {
      setError('Error calculating stamp duty: ' + (err instanceof Error ? err.message : String(err)));
      setResult(null);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AU', { 
      style: 'currency', 
      currency: 'AUD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Australian Stamp Duty Calculator
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyValue">Property Value (AUD)</Label>
                  <Input
                    id="propertyValue"
                    type="number"
                    value={propertyValue}
                    onChange={handlePropertyValueChange}
                    min={0}
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State/Territory</Label>
                  <Select value={state} onValueChange={(value) => setState(value as State)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NSW">New South Wales</SelectItem>
                      <SelectItem value="VIC">Victoria</SelectItem>
                      <SelectItem value="QLD">Queensland</SelectItem>
                      <SelectItem value="WA">Western Australia</SelectItem>
                      <SelectItem value="SA">South Australia</SelectItem>
                      <SelectItem value="TAS">Tasmania</SelectItem>
                      <SelectItem value="ACT">Australian Capital Territory</SelectItem>
                      <SelectItem value="NT">Northern Territory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="loanPurpose">Loan Purpose</Label>
                  <Select 
                    value={loanPurpose} 
                    onValueChange={(value) => setLoanPurpose(value as LoanPurposeType)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OWNER_OCCUPIER">Owner Occupier</SelectItem>
                      <SelectItem value="INVESTOR">Investor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Switch 
                    id="firstHomeBuyer" 
                    checked={firstHomeBuyer}
                    onCheckedChange={setFirstHomeBuyer}
                  />
                  <Label htmlFor="firstHomeBuyer">First Home Buyer</Label>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  onClick={handleCalculate}
                >
                  Calculate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-7">
          {result ? (
            <div className="space-y-4">
              <Card>
                <CardHeader className="bg-blue-100">
                  <CardTitle>Stamp Duty Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Base Stamp Duty:</span>
                      <span>{formatCurrency(result.stampDuty)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>First Home Buyer Concession:</span>
                      <span className="text-green-600">-{formatCurrency(result.fhbConcessionAmount)}</span>
                    </div>
                    
                    <div className="flex justify-between font-bold">
                      <span>Final Stamp Duty:</span>
                      <span>{formatCurrency(result.finalStampDutyAmount)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-purple-100">
                  <CardTitle>Additional Fees</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Transfer Fee:</span>
                      <span>{formatCurrency(result.transferFee)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Mortgage Registration Fee:</span>
                      <span>{formatCurrency(result.mortgageRegistrationFee)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-red-100">
                  <CardTitle>Total Costs</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Government Costs:</span>
                    <span>{formatCurrency(result.totalGovernmentCosts)}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Full Response JSON</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-48">
                    <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center p-8">
                <p className="text-gray-500 text-lg">
                  Enter property details and click Calculate to see results
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
