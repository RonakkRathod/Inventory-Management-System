export default function SettingsPage() {
  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.heading}>Settings Section</h1>
          <p style={styles.subText}>
            Manage warehouse settings, updates and creation flow
          </p>
        </div>
        <button style={styles.primaryBtn}>⚙ Open Settings</button>
      </div>

      {/* Main Flow */}
      <div style={styles.wrapper}>
        {/* Settings Page */}
        <div style={styles.startBox}>Settings Page</div>

        <div style={styles.mainArrow}>→</div>

        {/* Warehouse Management */}
        <div style={styles.centerSection}>
          <div style={styles.mainBox}>Warehouse Management</div>

          <div style={styles.actionsRow}>
            {/* Edit Flow */}
            <div style={styles.flowBlock}>
              <div style={styles.label}>Edit</div>
              <div style={styles.arrow}>→</div>
              <div style={styles.sideBox}>Edit Warehouse</div>
            </div>

            {/* Add Flow */}
            <div style={styles.flowBlock}>
              <div style={styles.label}>Add</div>
              <div style={styles.arrow}>→</div>
              <div style={styles.sideBox}>Add Warehouse</div>
            </div>
          </div>
        </div>
      </div>

      {/* Extra Info Cards */}
      <div style={styles.infoGrid}>
        <div style={styles.infoCard}>
          <h3 style={styles.cardTitle}>Warehouse Management</h3>
          <p style={styles.cardText}>
            Central place to view and manage all warehouse-related configurations.
          </p>
        </div>

        <div style={styles.infoCard}>
          <h3 style={styles.cardTitle}>Edit Warehouse</h3>
          <p style={styles.cardText}>
            Update warehouse details such as name, address, storage capacity and status.
          </p>
        </div>

        <div style={styles.infoCard}>
          <h3 style={styles.cardTitle}>Add Warehouse</h3>
          <p style={styles.cardText}>
            Create a new warehouse entry and connect it to the inventory system.
          </p>
        </div>
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
    background: "#a78bfa",
    color: "#0f172a",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    background: "#1e293b",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "25px",
    marginBottom: "30px",
  },
  startBox: {
    minWidth: "220px",
    minHeight: "90px",
    background: "#4338ca",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "20px",
    fontWeight: "700",
    fontSize: "18px",
  },
  mainArrow: {
    fontSize: "30px",
    color: "#a78bfa",
    fontWeight: "bold",
  },
  centerSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  mainBox: {
    minHeight: "100px",
    background: "#6366f1",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "20px",
    fontWeight: "700",
    fontSize: "20px",
  },
  actionsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },
  flowBlock: {
    background: "#334155",
    borderRadius: "16px",
    padding: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    flexWrap: "wrap",
  },
  label: {
    background: "#a78bfa",
    color: "#0f172a",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "14px",
  },
  arrow: {
    fontSize: "24px",
    color: "#c4b5fd",
    fontWeight: "bold",
  },
  sideBox: {
    flex: 1,
    minHeight: "70px",
    background: "#4f46e5",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "16px",
    fontWeight: "700",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  infoCard: {
    background: "#1e293b",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "20px",
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: "10px",
    color: "#c4b5fd",
  },
  cardText: {
    margin: 0,
    color: "#cbd5e1",
    lineHeight: "1.6",
  },
};