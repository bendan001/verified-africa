import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#0f172a",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1 }}>
        <header
          style={{
            background: "#fff",
            height: "80px",
            boxShadow: "0 1px 3px rgba(15, 23, 42, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
          }}
        >
          <h2 style={{ fontWeight: 600 }}>Dashboard</h2>
          <div>Daniel</div>
        </header>

        <main style={{ padding: "20px" }}>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;