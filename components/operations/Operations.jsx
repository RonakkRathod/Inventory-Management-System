export default function OperationsPage() {
  const sections = [
    {
      title: "Receipts",
      list: "Receipts List",
      create: "Create Receipt",
      details: "Receipt Details",
      color: "#f9a8d4",
    },
    {
      title: "Internal Transfers",
      list: "Internal Transfers List",
      create: "Create Internal Transfer",
      details: "Transfer Details",
      color: "#c4b5fd",
    },
    {
      title: "Move History",
      single: true,
      list: "Move History",
      color: "#93c5fd",
    },
    {
      title: "Inventory Adjustments",
      list: "Inventory Adjustments List",
      create: "Create Adjustment",
      details: "Adjustment Details",
      color: "#86efac",
    },
    {
      title: "Delivery Orders",
      list: "Delivery Orders List",
      create: "Create Delivery Order",
      details: "Delivery Order Details",
      color: "#fcd34d",
    },
  ];

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.heading}>Operations Section</h1>
          <p style={styles.subText}>
            Manage receipts, transfers, history, adjustments and delivery orders
          </p>
        </div>
        <button style={styles.primaryBtn}>+ New Operation</button>
      </div>

      {/* Dashboard Link Card */}
      <div style={styles.dashboardBox}>
        <div style={styles.dashboardIcon}>📊</div>
        <div>
          <h3 style={styles.dashboardTitle}>Dashboard</h3>
          <p style={styles.dashboardText}>
            Central entry point for all inventory operations
          </p>
        </div>
      </div>

      {/* Operation Flow Cards */}
      <div style={styles.grid}>
        {sections.map((item, index) => (
          <div key={index} style={styles.card}>
            <div style={{ ...styles.badge, background: item.color }}>{item.title}</div>

            {item.single ? (
              <div style={styles.singleBox}>{item.list}</div>
            ) : (
              <div style={styles.flowContainer}>
                <div style={styles.flowBox}>{item.list}</div>
                <div style={styles.arrow}>→</div>
                <div style={styles.flowBox}>{item.create}</div>
                <div style={styles.arrow}>→</div>
                <div style={styles.flowBox}>{item.details}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "30px",
  },
  heading: {
    margin: 0,
    fontSize: "34px",
  },
  subText: {
    marginTop: "8px",
    color: "#94a3b8",
  },
  primaryBtn: {
    background: "#22d3ee",
    color: "#0f172a",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  dashboardBox: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background: "#1e293b",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "30px",
  },
  dashboardIcon: {
    fontSize: "28px",
    width: "56px",
    height: "56px",
    borderRadius: "14px",
    background: "#334155",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dashboardTitle: {
    margin: 0,
    fontSize: "22px",
  },
  dashboardText: {
    marginTop: "6px",
    marginBottom: 0,
    color: "#94a3b8",
  },
  grid: {
    display: "grid",
    gap: "20px",
  },
  card: {
    background: "#1e293b",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "18px",
    padding: "20px",
  },
  badge: {
    display: "inline-block",
    color: "#0f172a",
    fontWeight: "bold",
    padding: "8px 14px",
    borderRadius: "999px",
    marginBottom: "18px",
    fontSize: "14px",
  },
  flowContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  flowBox: {
    flex: "1 1 220px",
    minHeight: "72px",
    background: "#334155",
    borderRadius: "14px",
    padding: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "600",
  },
  singleBox: {
    minHeight: "72px",
    background: "#334155",
    borderRadius: "14px",
    padding: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "600",
  },
  arrow: {
    fontSize: "24px",
    color: "#22d3ee",
    fontWeight: "bold",
  },
};