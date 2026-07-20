import Card from "../components/Card";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
        <p className="text-grey-500">Here's your financial overview.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card title="Monthly Income" value="₦350,000" />
        <Card title="Savings" value="₦150,000" />
        <Card title="Expenses" value="₦95,000" />
        <Card title="Business Funds" value="₦60,000" />
      </div>
    </div>
  );
};

export default Dashboard;