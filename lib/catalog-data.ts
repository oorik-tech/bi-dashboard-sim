// Complete catalog of selectable KPIs, Visuals, and Features

export const BASE_KPIS = [
  // Finance
  "Revenue vs Expense",
  "Gross Profit Margin %",
  "Expense Breakdown",
  "Accounts Receivable Aging",
  // Sales
  "Sales by Product/Service",
  "Monthly Sales Growth %",
  "Conversion Rate",
  // Operations
  "Inventory Turnover",
  "Order Fulfilment Rate",
  "Average Order Processing Time",
  // HR
  "Attendance Rate",
  "Headcount & Attrition",
  "Overtime vs Standard Hours",
  // Projects
  "Project Progress %",
  "Budget Utilization %",
  "Task Delay Ratio",
  // Customer
  "Customer Satisfaction Score",
  "New vs Repeat Customers",
  // General
  "Overall KPI Scorecard",
  "Department Performance Ranking",
]

export const BASE_VISUALS = [
  {
    id: "revenue-trend",
    title: "Revenue Trend – Line/Area Charts",
    desc: "view time-based sales/revenue progression",
  },
  {
    id: "department-performance",
    title: "Department Performance – Bar/Column Charts",
    desc: "compare KPIs across teams",
  },
  {
    id: "expense-share",
    title: "Expense Share – Pie/Donut Charts",
    desc: "proportional spend by category",
  },
  {
    id: "kpi-status",
    title: "KPI Status – KPI Cards",
    desc: "highlight critical stats and deltas",
  },
  {
    id: "cost-revenue-mix",
    title: "Cost vs Revenue Mix – Stacked Bar Charts",
    desc: "see composition change over time",
  },
  {
    id: "transaction-explorer",
    title: "Transaction Explorer – Data Tables + Filters",
    desc: "sortable, exportable records",
  },
  {
    id: "branch-performance-heat",
    title: "Branch Performance Heat – Heatmap",
    desc: "intensity by location or unit",
  },
  {
    id: "target-attainment",
    title: "Target Attainment – Gauge/Speedometer",
    desc: "progress against targets",
  },
  {
    id: "sales-profit-overlay",
    title: "Sales vs Profit Overlay – Dual-Axis Combo",
    desc: "compare correlated metrics",
  },
  {
    id: "peak-trough-highlights",
    title: "Peak & Trough Highlights – Trendline Highlights",
    desc: "auto-annotated extrema",
  },
]

export const PREMIUM_KPIS = {
  "Finance Intelligence": ["Operating Margin %", "Cash Flow Projection", "Budget vs Actual", "Working Capital Ratio"],
  "Sales Performance": [
    "Customer Lifetime Value (CLV)",
    "Sales Funnel Leakage",
    "Win Rate %",
    "Upsell/Cross-Sell Rate",
  ],
  "Operations Insight": ["Procurement Cycle Time", "Production Yield %", "Downtime Root Cause"],
  "Customer & Marketing": [
    "Retention/Churn Rate",
    "Campaign ROI & Attribution",
    "Net Promoter Score",
    "Complaint Resolution Time",
  ],
  "HR Analytics": ["Productivity per Employee", "Absence Impact Index"],
  "Project Analytics": ["Earned Value (EV)", "Resource Allocation vs Timeline", "Cost Variance %"],
  "Executive/Board": [
    "EBITDA Margin",
    "Forecast Accuracy Score",
    "Year-over-Year Growth",
    "Revenue per Employee",
    "Return on Assets (ROA)",
  ],
}

export const PREMIUM_VISUALS = [
  {
    id: "cash-flow-bridge",
    title: "Cash Flow Bridge – Waterfall Chart",
    description: "month-to-month cash drivers",
  },
  {
    id: "lead-revenue-paths",
    title: "Lead-to-Revenue Paths – Sankey Diagram",
    description: "funnel conversion and drop-offs",
  },
  {
    id: "geo-revenue-density",
    title: "Geo Revenue Density – Choropleth Map",
    description: "revenue per region/store",
  },
  {
    id: "sku-mix-efficiency",
    title: "SKU Mix Efficiency – Tree Map",
    description: "category contribution to margin",
  },
  {
    id: "price-volume-elasticity",
    title: "Price vs Volume Elasticity – Scatter/Bubble",
    description: "demand sensitivity clusters",
  },
  {
    id: "retention-cohort",
    title: "Retention by Cohort Month – Cohort Grid",
    description: "repeat-rate decay by cohort",
  },
  {
    id: "project-timeline",
    title: "Project Timeline vs Critical Path – Gantt Chart",
    description: "planned vs actual phases",
  },
  {
    id: "pareto-loss",
    title: "Pareto Loss Contributors – Pareto Chart",
    description: "top factors behind 80% losses",
  },
  {
    id: "funnel-conversion",
    title: "Funnel Conversion Health – Funnel Chart",
    description: "stage-wise conversion health",
  },
  {
    id: "channel-product-profitability",
    title: "Channel × Product Profitability – Matrix Grid",
    description: "margin heat by channel",
  },
  {
    id: "process-variability",
    title: "Process Variability – Box & Whisker",
    description: "cycle time/defect distribution",
  },
  {
    id: "yoy-mom-trend",
    title: "YoY vs MoM Trend Overlay – Comparative Lines",
    description: "long vs short trends",
  },
  {
    id: "segment-slicing",
    title: "Segment Slicing Panel – Dynamic Filters/Slicers",
    description: "instant segmentation",
  },
  {
    id: "utilization-calendar",
    title: "Utilization Calendar – Calendar Heatmap",
    description: "daily operational intensity",
  },
  {
    id: "drillable-kpi",
    title: "Drillable KPI Ledger – KPI Drill-Down Table",
    description: "transaction-level view",
  },
  {
    id: "ops-sla-compliance",
    title: "Ops SLA Compliance Cluster – Gauge Cluster",
    description: "SLA success by region/team",
  },
  {
    id: "dual-kpi-insight",
    title: "Dual KPI Insight – Dual-Metric Cards",
    description: "paired KPIs with delta & sparkline",
  },
  {
    id: "target-gap-analysis",
    title: "Target Gap Analysis – Target Variance Bars",
    description: "deviation from goals",
  },
  {
    id: "rolling-forecast",
    title: "Rolling Actual + Forecast – Rolling Forecast Line",
    description: "historical + projected",
  },
  {
    id: "correlation-heatmap",
    title: "Correlation Heatmap – Correlation Matrix",
    description: "relationships among KPIs",
  },
  {
    id: "profit-growth-quadrants",
    title: "Profit vs Growth Quadrants – Profitability Quadrant",
    description: "growth vs margin",
  },
  {
    id: "ops-progress-loops",
    title: "Ops Progress Loops – Animated Progress",
    description: "real-time operations display",
  },
  {
    id: "benchmark-peer-band",
    title: "Benchmark vs Peer Band – Benchmark Band Chart",
    description: "industry comparison",
  },
  {
    id: "revenue-composition",
    title: "Revenue Composition Ratio – 100% Stacked Bars",
    description: "mix shift over time",
  },
  {
    id: "geo-drill",
    title: "Geo → City → Store Drill – Drillable Geo Heatmap",
    description: "hierarchical drill",
  },
]

export const BASIC_FORECASTING = [
  "Linear Regression Projections (3–6 months)",
  "Moving Average Forecast",
  "Seasonal Decomposition",
  "Goal-Seek Planner",
  "Correlation Insights (basic)",
  "Early-Warning Thresholds",
  "Simple Scenario Simulator (1–2 inputs)",
  "Rolling 12-Month Forecast View",
  "Auto-Forecast Graphs",
]

export const ADVANCED_FORECASTING_FEATURES = [
  "Seasonality-Aware Forecasts (ARIMA/Holt-Winters) — anticipate peaks/valleys",
  "Driver-Based Forecasting (Multivariate Regression) — quantify KPI drivers",
  "Non-Linear Uplift Models (Gradient Boost/XGBoost) — capture complex effects",
  "Deep Sequence Forecasts (LSTM) — handle irregular/high-frequency data",
  "Forecast Accuracy Tracker (MAE/MAPE) — monitor error & drift",
  "Scenario Simulator v2 (Multi-Input) — test price/ads/staff/inventory",
  "Monte Carlo Risk Ranges — probabilistic outcomes",
  "Auto-Model Selection — auto-picks best model per KPI",
]

export const INTELLIGENCE_PREDICTIVE_FEATURES = [
  "Anomaly Detection — auto-flags spikes/drops with hints",
  "Performance Driver Analysis — factors most influencing KPIs",
  "Churn/Retention Prediction — who is likely to leave and why",
  "Forecast Confidence Advisor — confidence bands & warnings",
  "Actionable Recommendation Engine — prescriptive steps to hit targets",
  "Smart Goal Alerts — early warnings when trends miss plan",
  "Dynamic Benchmarking — compare vs industry/peers",
  "Prescriptive What-If Advisor — suggests inputs to reach a goal",
]

export const INDUSTRY_PACKS = {
  "Technology/SaaS": [
    "ARR & MRR Tracking",
    "Churn Analysis",
    "Active Users Dashboard",
    "Uptime %",
    "Feature Adoption Heatmap",
    "NPS Tracking",
  ],
  "Real Estate/Construction": [
    "Occupancy Rate",
    "Cost per Sq Ft",
    "Timeline Variance",
    "Payment Tracking",
    "Project Map Visuals",
  ],
  "E-Commerce": [
    "Cart Abandonment Rate",
    "Return %",
    "Average Order Value",
    "Channel Attribution",
    "Delivery SLA",
    "Conversion Funnel + Heatmap",
  ],
  "Retail/Commerce": [
    "Store Performance Comparison",
    "Footfall vs Conversion",
    "SKU Turnover",
    "Inventory Aging",
    "Promotion ROI",
  ],
  Manufacturing: [
    "Yield %",
    "Downtime Root Cause",
    "Overall Equipment Effectiveness (OEE)",
    "Scrap Rate",
    "Process Lead Time",
  ],
  "Finance/Banking": ["Loan Recovery %", "NPA Ratio", "Portfolio Growth", "Risk Band Analysis"],
  Healthcare: ["Patient Throughput", "Average Treatment Cost", "Doctor Utilization %", "No-Show Rate"],
  "Logistics/Supply Chain": [
    "Route Performance",
    "Delivery SLA %",
    "Cost per km",
    "Load Utilization",
    "Vehicle Downtime",
  ],
  "Education/Training": ["Student Retention Rate", "Course Completion %", "Engagement Heatmap", "Revenue per Batch"],
}
