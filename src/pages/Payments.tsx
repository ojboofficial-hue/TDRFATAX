import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';

const Payments = () => {
  const payments = [
    { id: 1, date: '2026-03-20', amount: '₹50,000', status: 'Completed', ref: 'TXN001' },
    { id: 2, date: '2026-02-15', amount: '₹1,00,000', status: 'Completed', ref: 'TXN002' },
    { id: 3, date: '2026-04-15', amount: '₹75,000', status: 'Pending', ref: 'TXN003' },
  ];

  return (
    <Layout>
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Payments</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card title="Total Paid" className="border-l-4 border-green-500">
            <p className="text-2xl font-bold text-green-600">₹1,50,000</p>
          </Card>
          <Card title="Pending" className="border-l-4 border-yellow-500">
            <p className="text-2xl font-bold text-yellow-600">₹75,000</p>
          </Card>
          <Card title="Total Liability" className="border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-600">₹2,25,000</p>
          </Card>
        </div>

        <Card title="Payment History">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b-2 border-gray-300">
                <tr>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Reference</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="py-3">{payment.date}</td>
                    <td className="py-3 font-medium">{payment.amount}</td>
                    <td className="py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-3">{payment.ref}</td>
                    <td className="py-3">
                      <button className="text-blue-600 hover:underline text-sm">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button>Make Payment</Button>
            <Button variant="secondary">Download Invoice</Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Payments;
