const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">BudgetFlow</h1>

      <nav className="space-y-5">
        <p className="cursor-pointer rounded-lg p-3 hover:bg-slate-800">Dashboard</p>
        <p className="cursor-pointer rounded-lg p-3 hover:bg-slate-800">Budgets</p>
        <p className="cursor-pointer rounded-lg p-3 hover:bg-slate-800">Expenses</p>
        <p className="cursor-pointer rounded-lg p-3 hover:bg-slate-800">Goals</p>
        <p className="cursor-pointer rounded-lg p-3 hover:bg-slate-800">Reports</p>
        <p className="cursor-pointer rounded-lg p-3 hover:bg-slate-800">Settings</p>
      </nav>
    </aside>
  );
};

export default Sidebar;