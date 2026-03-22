import Layout from '../components/Layout';
import Card from '../components/Card';

const Dashboard = () => {
  const stats = [
    { title: 'Filings', value: '5', color: 'bg-blue-500' },
    { title: 'Payments Due', value: '$2,450', color: 'bg-yellow-500' },
    { title: 'Status', value: 'Compliance', color: 'bg-green-500' },
  ];

  return (
    <Layout>
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.color} rounded-lg px-6 py-8 text-white shadow-lg`}>
              <h3 className="text-lg font-medium">{stat.title}</h3>
              <p className="text-4xl font-bold mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Recent Filings">
            <ul className="space-y-2">
              <li className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>VAT Return - Q1 2026</span>
                <span className="text-green-600 font-medium">Submitted</span>
              </li>
              <li className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Corporate Tax - 2025</span>
                <span className="text-blue-600 font-medium">In Progress</span>
              </li>
            </ul>
          </Card>

          <Card title="Quick Actions">
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                File New Return
              </button>
              <button className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition">
                View History
              </button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
