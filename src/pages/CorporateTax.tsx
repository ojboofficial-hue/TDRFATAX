import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';

const CorporateTax = () => {
  return (
    <Layout>
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Corporate Tax</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card title="Total Income" className="border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-600">₹50,00,000</p>
          </Card>
          <Card title="Tax Liability" className="border-l-4 border-red-500">
            <p className="text-2xl font-bold text-red-600">₹5,00,000</p>
          </Card>
          <Card title="Tax Rate" className="border-l-4 border-green-500">
            <p className="text-2xl font-bold text-green-600">10%</p>
          </Card>
        </div>

        <Card title="Income Breakdown">
          <div className="space-y-4">
            {[
              { source: 'Business Income', amount: '₹30,00,000', pct: '60%' },
              { source: 'Investment Income', amount: '₹15,00,000', pct: '30%' },
              { source: 'Other Income', amount: '₹5,00,000', pct: '10%' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{item.source}</span>
                  <span className="text-gray-600">{item.amount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: item.pct }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button>Download Report</Button>
            <Button variant="secondary">File Tax Return</Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default CorporateTax;
