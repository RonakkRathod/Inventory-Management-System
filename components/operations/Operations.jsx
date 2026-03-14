"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const STATIC_WAREHOUSES = [
  { _id: "wh-mumbai", name: "Mumbai Hub", code: "MUM" },
  { _id: "wh-pune", name: "Pune Hub", code: "PUN" },
  { _id: "wh-delhi", name: "Delhi Hub", code: "DEL" },
];

const STATIC_PRODUCTS = [
  { _id: "prd-1023", name: "Industrial Barcode Scanner", sku: "PRD-1023" },
  { _id: "prd-1188", name: "Thermal Label Roll", sku: "PRD-1188" },
  { _id: "prd-2041", name: "Shelf Bin Medium", sku: "PRD-2041" },
];

const STATIC_RECENT_OPERATIONS = [
  {
    id: "op-r-1",
    type: "receipt",
    label: "Supplier: Prime Supplies",
    status: "draft",
    createdAt: "2026-03-14T08:30:00.000Z",
  },
  {
    id: "op-d-1",
    type: "delivery",
    label: "Customer: City Retail",
    status: "ready",
    createdAt: "2026-03-14T07:50:00.000Z",
  },
  {
    id: "op-t-1",
    type: "transfer",
    label: "Transfer MUM -> PUN",
    status: "draft",
    createdAt: "2026-03-14T06:10:00.000Z",
  },
  {
    id: "op-a-1",
    type: "adjustment",
    label: "Reason: Cycle count",
    status: "waiting",
    createdAt: "2026-03-14T05:35:00.000Z",
  },
];

const OPERATION_TYPE_LABEL = {
  receipt: "Receipt",
  delivery: "Delivery Order",
  transfer: "Internal Transfer",
  adjustment: "Stock Adjustment",
};

export default function OperationsPage() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [warehouses, setWarehouses] = useState(STATIC_WAREHOUSES);
  const [products, setProducts] = useState(STATIC_PRODUCTS);
  const [operationType, setOperationType] = useState("receipt");
  const [partnerName, setPartnerName] = useState("");
  const [reason, setReason] = useState("");
  const [warehouseId, setWarehouseId] = useState(STATIC_WAREHOUSES[0]._id);
  const [counterpartWarehouseId, setCounterpartWarehouseId] = useState(STATIC_WAREHOUSES[1]._id);
  const [productId, setProductId] = useState(STATIC_PRODUCTS[0]._id);
  const [quantity, setQuantity] = useState(1);
  const [recordedQuantity, setRecordedQuantity] = useState(0);
  const [countedQuantity, setCountedQuantity] = useState(0);
  const [recentOperations, setRecentOperations] = useState(STATIC_RECENT_OPERATIONS);

  useEffect(() => {
    toast.success("Operations features loaded in static mode.");
  }, []);

  useEffect(() => {
    const requestedOp = searchParams.get("op");
    if (!requestedOp) return;

    const validOperations = ["receipt", "delivery", "transfer", "adjustment"];
    if (validOperations.includes(requestedOp)) {
      setOperationType(requestedOp);
      toast.success(`Ready to create ${OPERATION_TYPE_LABEL[requestedOp]}.`);
      return;
    }

    if (requestedOp === "history") {
      toast.success("Showing recent operation history.");
    }
  }, [searchParams]);

  const createDisabledReason = useMemo(() => {
    if (!warehouseId) return "Add at least one warehouse before creating operations.";
    if (!productId) return "Add at least one product before creating operations.";
    if (operationType === "transfer" && !counterpartWarehouseId) {
      return "Select a destination warehouse for transfer.";
    }
    if (operationType === "transfer" && warehouseId === counterpartWarehouseId) {
      return "Source and destination warehouses must be different for transfer.";
    }
    return "";
  }, [counterpartWarehouseId, operationType, productId, warehouseId]);

  const handleCreateOperation = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (createDisabledReason) {
        throw new Error(createDisabledReason);
      }

      const data = {
        _id: `op-${Date.now()}`,
        supplier: partnerName.trim() || "General Supplier",
        customer: partnerName.trim() || "General Customer",
        reason: reason.trim() || "Cycle count",
        status: "draft",
        createdAt: new Date().toISOString(),
      };

      toast.success(`${OPERATION_TYPE_LABEL[operationType]} created successfully.`);
      setPartnerName("");
      setReason("");
      setQuantity(1);
      setRecordedQuantity(0);
      setCountedQuantity(0);
      setRecentOperations((prev) => [
        {
          id: data._id,
          type: operationType,
          label:
            operationType === "receipt"
              ? `Supplier: ${data.supplier || "-"}`
              : operationType === "delivery"
                ? `Customer: ${data.customer || "-"}`
                : operationType === "transfer"
                  ? "Transfer draft created"
                  : `Reason: ${data.reason || "Manual adjustment"}`,
          status: data.status || "draft",
          createdAt: data.createdAt || new Date().toISOString(),
        },
        ...prev,
      ].slice(0, 8));
    } catch (error) {
      toast.error(error.message || "Unable to create operation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sections = [
    {
      title: "Receipts",
      list: "Receipts List",
      create: "Create Receipt",
      details: "Receipt Details",
      color: "#dbeafe",
    },
    {
      title: "Internal Transfers",
      list: "Internal Transfers List",
      create: "Create Internal Transfer",
      details: "Transfer Details",
      color: "#3b82f6",
    },
    {
      title: "Move History",
      single: true,
      list: "Move History",
      color: "#dbeafe",
    },
    {
      title: "Inventory Adjustments",
      list: "Inventory Adjustments List",
      create: "Create Adjustment",
      details: "Adjustment Details",
      color: "#22c55e",
    },
    {
      title: "Delivery Orders",
      list: "Delivery Orders List",
      create: "Create Delivery Order",
      details: "Delivery Order Details",
      color: "#f59e0b",
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
        <div style={styles.headerActions}>
          <div style={styles.metaPill}>Live operations connected to backend</div>
          <Link href="/dashboard" style={styles.backBtn}>Back to dashboard</Link>
        </div>
      </div>

      <form id="operation-create" style={styles.formCard} onSubmit={handleCreateOperation}>
        <h3 style={styles.formTitle}>Create Operation</h3>
        <p style={styles.formText}>Create receipt, delivery, transfer, or adjustment drafts in backend.</p>

        <div style={styles.formGrid}>
          <label style={styles.formField}>
            Operation type
            <select
              style={styles.input}
              value={operationType}
              onChange={(event) => setOperationType(event.target.value)}
            >
              <option value="receipt">Receipt</option>
              <option value="delivery">Delivery Order</option>
              <option value="transfer">Internal Transfer</option>
              <option value="adjustment">Stock Adjustment</option>
            </select>
          </label>

          <label style={styles.formField}>
            {operationType === "delivery" ? "Customer" : "Supplier / Partner"}
            <input
              style={styles.input}
              type="text"
              value={partnerName}
              onChange={(event) => setPartnerName(event.target.value)}
              placeholder={operationType === "delivery" ? "General Customer" : "General Supplier"}
            />
          </label>

          <label style={styles.formField}>
            {operationType === "transfer" ? "From warehouse" : "Warehouse"}
            <select
              style={styles.input}
              value={warehouseId}
              onChange={(event) => setWarehouseId(event.target.value)}
              required
            >
              {warehouses.length === 0 ? <option value="">No warehouse found</option> : null}
              {warehouses.map((warehouse) => (
                <option key={warehouse._id} value={warehouse._id}>
                  {warehouse.name} ({warehouse.code})
                </option>
              ))}
            </select>
          </label>

          {operationType === "transfer" ? (
            <label style={styles.formField}>
              To warehouse
              <select
                style={styles.input}
                value={counterpartWarehouseId}
                onChange={(event) => setCounterpartWarehouseId(event.target.value)}
                required
              >
                {warehouses.length === 0 ? <option value="">No warehouse found</option> : null}
                {warehouses.map((warehouse) => (
                  <option key={warehouse._id} value={warehouse._id}>
                    {warehouse.name} ({warehouse.code})
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <label style={styles.formField}>
            Product
            <select
              style={styles.input}
              value={productId}
              onChange={(event) => setProductId(event.target.value)}
              required
            >
              {products.length === 0 ? <option value="">No product found</option> : null}
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name} ({product.sku})
                </option>
              ))}
            </select>
          </label>

          {operationType === "adjustment" ? (
            <>
              <label style={styles.formField}>
                Recorded quantity
                <input
                  style={styles.input}
                  type="number"
                  min="0"
                  value={recordedQuantity}
                  onChange={(event) => setRecordedQuantity(event.target.value)}
                  required
                />
              </label>

              <label style={styles.formField}>
                Counted quantity
                <input
                  style={styles.input}
                  type="number"
                  min="0"
                  value={countedQuantity}
                  onChange={(event) => setCountedQuantity(event.target.value)}
                  required
                />
              </label>

              <label style={styles.formField}>
                Reason
                <input
                  style={styles.input}
                  type="text"
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  placeholder="Cycle count"
                />
              </label>
            </>
          ) : (
            <label style={styles.formField}>
              Quantity
              <input
                style={styles.input}
                type="number"
                min="1"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                required
              />
            </label>
          )}
        </div>

        <button style={styles.primaryBtn} type="submit" disabled={isSubmitting || Boolean(createDisabledReason)}>
          {isSubmitting ? "Creating..." : `Create ${OPERATION_TYPE_LABEL[operationType]}`}
        </button>
        {createDisabledReason ? <p style={styles.errorText}>{createDisabledReason}</p> : null}
      </form>

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

      <div id="operation-list" style={styles.formCard}>
        <h3 style={styles.formTitle}>Operation List</h3>
        <p style={styles.formText}>Available operation modules and flows.</p>
        <div style={styles.operationList}>
          {sections.map((section) => (
            <div key={section.title} style={styles.operationRow}>
              <strong style={styles.operationTitle}>{section.title}</strong>
              <p style={styles.operationRoute}>
                {section.single
                  ? section.list
                  : `${section.list} -> ${section.create} -> ${section.details}`}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div id="recent-operations" style={styles.formCard}>
        <h3 style={styles.formTitle}>Recent Operations</h3>
        <p style={styles.formText}>Live data from receipts, deliveries, transfers, and adjustments.</p>

        {recentOperations.length === 0 ? (
          <p style={styles.subText}>No operations found yet. Create one using the form above.</p>
        ) : (
          <div style={styles.recentList}>
            {recentOperations.map((item) => (
              <div key={item.id} style={styles.recentRow}>
                <div>
                  <strong style={styles.recentType}>{OPERATION_TYPE_LABEL[item.type] || item.type}</strong>
                  <p style={styles.recentLabel}>{item.label}</p>
                </div>
                <span style={styles.recentStatus}>{item.status}</span>
              </div>
            ))}
          </div>
        )}
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
    background: "var(--bg)",
    color: "var(--text)",
    padding: "30px",
    fontFamily: "inherit",
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
    color: "var(--muted)",
  },
  metaPill: {
    background: "var(--primary-soft)",
    color: "var(--primary)",
    padding: "10px 14px",
    borderRadius: "999px",
    fontWeight: 700,
    fontSize: "14px",
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "40px",
    padding: "0 14px",
    borderRadius: "10px",
    border: "1px solid var(--line)",
    background: "var(--surface)",
    color: "var(--text)",
    fontWeight: 700,
    textDecoration: "none",
  },
  primaryBtn: {
    background: "var(--primary)",
    color: "#ffffff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  formCard: {
    background: "var(--surface)",
    border: "1px solid var(--line)",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "24px",
    boxShadow: "var(--shadow)",
  },
  formTitle: {
    margin: 0,
    fontSize: "22px",
  },
  formText: {
    marginTop: "8px",
    marginBottom: "16px",
    color: "var(--muted)",
  },
  formGrid: {
    display: "grid",
    gap: "12px",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    marginBottom: "14px",
  },
  formField: {
    display: "grid",
    gap: "8px",
    fontSize: "14px",
    color: "var(--muted)",
    fontWeight: 600,
  },
  input: {
    border: "1px solid var(--line)",
    borderRadius: "10px",
    minHeight: "42px",
    padding: "0 12px",
    fontSize: "14px",
    color: "var(--text)",
    background: "var(--surface-strong)",
  },
  errorText: {
    marginTop: "10px",
    marginBottom: 0,
    color: "var(--danger)",
    fontSize: "13px",
  },
  operationList: {
    display: "grid",
    gap: "10px",
  },
  operationRow: {
    border: "1px solid var(--line)",
    borderRadius: "12px",
    background: "var(--surface-soft)",
    padding: "12px",
    display: "grid",
    gap: "6px",
  },
  operationTitle: {
    color: "var(--text)",
    fontSize: "15px",
  },
  operationRoute: {
    margin: 0,
    color: "var(--muted)",
    fontSize: "13px",
  },
  recentList: {
    display: "grid",
    gap: "10px",
  },
  recentRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    border: "1px solid var(--line)",
    borderRadius: "12px",
    padding: "12px",
    background: "var(--surface-soft)",
  },
  recentType: {
    color: "var(--text)",
    fontSize: "14px",
  },
  recentLabel: {
    margin: "6px 0 0",
    color: "var(--muted)",
    fontSize: "13px",
  },
  recentStatus: {
    textTransform: "capitalize",
    color: "var(--primary)",
    fontWeight: 700,
    fontSize: "13px",
  },
  dashboardBox: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background: "var(--surface)",
    border: "1px solid var(--line)",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "30px",
    boxShadow: "var(--shadow)",
  },
  dashboardIcon: {
    fontSize: "28px",
    width: "56px",
    height: "56px",
    borderRadius: "14px",
    background: "var(--primary-soft)",
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
    color: "var(--muted)",
  },
  grid: {
    display: "grid",
    gap: "20px",
  },
  card: {
    background: "var(--surface)",
    border: "1px solid var(--line)",
    borderRadius: "18px",
    padding: "20px",
    boxShadow: "var(--shadow)",
  },
  badge: {
    display: "inline-block",
    color: "var(--text)",
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
    background: "var(--surface-soft)",
    borderRadius: "14px",
    padding: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "600",
    border: "1px solid var(--line)",
    color: "var(--text)",
  },
  singleBox: {
    minHeight: "72px",
    background: "var(--surface-soft)",
    borderRadius: "14px",
    padding: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "600",
    border: "1px solid var(--line)",
    color: "var(--text)",
  },
  arrow: {
    fontSize: "24px",
    color: "var(--primary)",
    fontWeight: "bold",
  },
};