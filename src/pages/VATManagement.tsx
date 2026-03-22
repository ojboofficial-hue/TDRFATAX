import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';

const VATManagement = () => {
  return (
    <Layout>
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-8">VAT Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card title="Tax Rate" className="border-l-4 border-blue-500">
            <p className="text-3xl font-bold text-blue-600 mb-2">22%</p>
            <p className="text-gray-600">Current VAT tax rate</p>
          </Card>
          <Card title="Current Period" className="border-l-4 border-green-500">
            <p className="text-xl font-bold text-green-600">Q1 2026</p>
            <p className="text-gray-600 mt-2">Filing deadline: April 15, 2026</p>
          </Card>
        </div>

        <Card title="VAT Returns">
          <table className="w-full text-left">
            <thead className="border-b-2 border-gray-300">
              <tr>
                <th className="pb-3">Period</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {['Q1 2026', 'Q4 2025', 'Q3 2025'].map((period, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-3">{period}</td>
                  <td className="py-3">₹{(idx + 1) * 50000}</td>
                  <td className="py-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${idx === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {idx === 0 ? 'Pending' : 'Filed'}
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="text-blue-600 hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6">
            <Button>File New VAT Return</Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default VATManagement;
