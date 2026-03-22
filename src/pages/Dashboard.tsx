const Dashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <p>Welcome to the Tax Filing Application Dashboard</p>
      <div style={{ marginTop: '20px' }}>
        <h2>Quick Links</h2>
        <ul>
          <li><a href="/vat-management">VAT Management</a></li>
          <li><a href="/corporate-tax">Corporate Tax</a></li>
          <li><a href="/payments">Payments</a></li>
          <li><a href="/profile">Profile</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
