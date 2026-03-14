const authPages = {
  login: {
    path: '/login',
    heroTitle: 'Access warehouse, sales, and stock intelligence from one secure gate.',
    heroText:
      'A polished sign-in experience for your inventory teams, built for fast shifts, delegated roles, and secure handoffs across procurement and fulfillment.',
    quote:
      '“Our supervisors needed a login flow that felt enterprise-ready without slowing down shift changes. This layout gives us clarity and speed.”',
    quoteAuthor: 'Aarav Shah, Operations Lead',
    panelEyebrow: 'Welcome back',
    title: 'Sign in to your workspace',
    description: 'Use your work email or SSO provider to continue into CoreInventory.',
    showSocial: false,
    showForm: true,
    fields: [
      { name: 'email', label: 'Work email', type: 'email', placeholder: 'alex@coreinventory.com', icon: 'email' },
      { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', icon: 'password' },
    ],
    showRemember: true,
    primaryAction: 'Sign in securely',
    secondaryAction: { href: '/verify-code', label: 'Use verification code instead' },
    footerText: 'New to the platform?',
    footerLink: { href: '/signup', label: 'Create an account' },
  },
  signup: {
    path: '/signup',
    heroTitle: 'Launch a new inventory workspace with role-ready access from day one.',
    heroText:
      'Bring procurement, warehouse, and reporting teams into a single login flow with guided onboarding and clean security cues.',
    quote:
      '“The signup view feels premium and structured, which helps when onboarding distributors and internal teams at the same time.”',
    quoteAuthor: 'Mira Patel, Product Manager',
    panelEyebrow: 'Create account',
    title: 'Set up your access profile',
    description: 'Create a company account and invite the rest of your inventory team later.',
    showSocial: false,
    showForm: true,
    fields: [
      { name: 'firstName', label: 'First name', type: 'text', placeholder: 'Aarav', icon: 'user' },
      { name: 'lastName', label: 'Last name', type: 'text', placeholder: 'Shah', icon: 'user' },
      { name: 'email', label: 'Company email', type: 'email', placeholder: 'ops@coreinventory.com', icon: 'email' },
      { name: 'password', label: 'Create password', type: 'password', placeholder: 'Choose a strong password', icon: 'password' },
    ],
    showTerms: true,
    primaryAction: 'Create account',
    footerText: 'Already have access?',
    footerLink: { href: '/login', label: 'Sign in instead' },
  },
  forgotPassword: {
    path: '/forgot-password',
    heroTitle: 'Recover account access without sending your team through support tickets.',
    heroText:
      'Use a concise recovery experience that gets operators back into stock counts and order reviews quickly.',
    quote:
      '“Password recovery now feels like part of the product instead of a dead-end utility page.”',
    quoteAuthor: 'Riya Nair, UX Researcher',
    panelEyebrow: 'Password recovery',
    title: 'Forgot your password?',
    description: 'Enter the email linked to your account and we will send a secure reset link.',
    showForm: true,
    fields: [
      { name: 'email', label: 'Registered email', type: 'email', placeholder: 'warehouse@coreinventory.com', icon: 'email' },
    ],
    status: {
      title: 'Recovery link expires in 15 minutes',
      text: 'This keeps shared warehouse devices and temporary sessions protected.',
    },
    primaryAction: 'Send reset instructions',
    secondaryAction: { href: '/login', label: 'Back to sign in' },
    footerText: 'Need a different route?',
    footerLink: { href: '/verify-code', label: 'Verify with a one-time code' },
  },
  verifyCode: {
    path: '/verify-code',
    heroTitle: 'Confirm identity with a lightweight verification step designed for shared devices.',
    heroText:
      'A code-first checkpoint is useful for warehouse kiosks, temporary handovers, and supervisor approval flows.',
    quote:
      '“The verification screen reads clearly on tablets and shared terminals, which matters on busy floors.”',
    quoteAuthor: 'Neil Fernandes, Warehouse Systems Admin',
    panelEyebrow: 'Two-step access',
    title: 'Enter verification code',
    description: 'We sent a 6-digit code to alex@coreinventory.com. Enter it below to continue.',
    showForm: true,
    showOtp: true,
    status: {
      title: 'Code delivered successfully',
      text: 'If you do not see it, check spam or request a fresh code below.',
    },
    primaryAction: 'Verify and continue',
    secondaryAction: { href: '/reset-password', label: 'Open password reset flow' },
    footerText: 'Code not received?',
    footerLink: { href: '/verify-code', label: 'Resend code', accent: true },
  },
  resetPassword: {
    path: '/reset-password',
    heroTitle: 'Reset credentials with clear guidance and stronger password hygiene built in.',
    heroText:
      'Keep security standards high while making the reset step easy enough for non-technical teams to finish without friction.',
    quote:
      '“This screen balances trust and clarity. Users know what to do, and security still feels deliberate.”',
    quoteAuthor: 'Devika Rao, Security Analyst',
    panelEyebrow: 'Set new password',
    title: 'Choose a new password',
    description: 'Use a unique password for your CoreInventory workspace and confirm it once.',
    showForm: true,
    fields: [
      { name: 'newPassword', label: 'New password', type: 'password', placeholder: 'At least 12 characters', icon: 'password' },
      { name: 'confirmPassword', label: 'Confirm password', type: 'password', placeholder: 'Re-enter password', icon: 'password' },
    ],
    securityTips: [
      { title: 'Use a passphrase', text: 'Longer memorable phrases are easier to recall and harder to guess.' },
      { title: 'Avoid reused credentials', text: 'Do not reuse passwords from supplier portals or internal tools.' },
      { title: 'Store it safely', text: 'Use your approved company password manager for recovery-safe access.' },
    ],
    primaryAction: 'Update password',
    secondaryAction: { href: '/reset-success', label: 'Preview success state' },
    footerText: 'Want to cancel?',
    footerLink: { href: '/login', label: 'Return to sign in' },
  },
  resetSuccess: {
    path: '/reset-success',
    heroTitle: 'Bring users back into the product with a confident success state and direct next step.',
    heroText:
      'The final page closes the recovery loop and moves users back to work without ambiguity.',
    quote:
      '“Success screens are usually forgettable. This one feels considered and gives the user a clear handoff.”',
    quoteAuthor: 'Ishaan Mehta, Frontend Lead',
    panelEyebrow: 'All set',
    title: 'Password updated successfully',
    description: 'Your credentials were changed and all inactive sessions have been signed out.',
    showForm: false,
    success: {
      title: 'Security refresh complete',
      text: 'Use your new password the next time you access the dashboard, mobile scanner, or supervisor console.',
    },
    status: {
      title: 'Recommended next step',
      text: 'Review your last login activity after you sign back in if this reset was unexpected.',
    },
    primaryAction: 'Go to dashboard',
    primaryActionHref: '/dashboard',
    secondaryAction: { href: '/login', label: 'Back to login screen' },
    footerText: 'Need another recovery attempt?',
    footerLink: { href: '/forgot-password', label: 'Start over' },
    accentAction: true,
  },
}

const dashboardPage = {
  overviewCards: [
    { title: 'Active SKUs', value: '14,280', delta: '+4.3% this week', tone: 'teal' },
    { title: 'Open Delivery Orders', value: '86', delta: '12 high priority', tone: 'orange' },
    { title: 'Pending Receipts', value: '42', delta: '8 arriving today', tone: 'slate' },
    { title: 'Cycle Count Accuracy', value: '99.1%', delta: 'Across 5 warehouses', tone: 'green' },
  ],
  operationFlows: [
    { title: 'Receipts', color: 'pink', steps: ['Receipts List', 'Create Receipt', 'Receipt Details'] },
    { title: 'Internal Transfers', color: 'violet', steps: ['Transfer List', 'Create Transfer', 'Transfer Details'] },
    { title: 'Move History', color: 'blue', steps: ['Move History'] },
    { title: 'Inventory Adjustments', color: 'mint', steps: ['Adjustments List', 'Create Adjustment', 'Adjustment Details'] },
    { title: 'Delivery Orders', color: 'amber', steps: ['Delivery List', 'Create Delivery Order', 'Delivery Details'] },
  ],
  recentEvents: [
    'Receipt RC-9821 posted by Rahul (Mumbai WH).',
    'Internal transfer IT-443 moved 120 units to Pune hub.',
    'Stock adjustment ADJ-1501 approved by supervisor.',
    'Delivery order DO-7742 packed and ready to dispatch.',
  ],
  authRoutes: [
    { href: '/products', label: 'Products list' },
    { href: '/products/create', label: 'Create product' },
    { href: '/products/details', label: 'Product details' },
    { href: '/profile', label: 'Profile overview' },
    { href: '/profile/security', label: 'Profile security' },
    { href: '/profile/preferences', label: 'Profile preferences' },
    { href: '/login', label: 'Login' },
    { href: '/signup', label: 'Sign up' },
    { href: '/forgot-password', label: 'Forgot password' },
    { href: '/verify-code', label: 'Verify code' },
    { href: '/reset-password', label: 'Reset password' },
    { href: '/reset-success', label: 'Reset success' },
  ],
}

const productPages = {
  list: {
    path: '/products',
    title: 'Products section',
    description:
      'Manage all products in one place with consistent theme, status visibility, and fast links into create and details flows.',
    sectionTitle: 'Products list',
    sectionText: 'Current tracked products across connected warehouses.',
    rows: [
      { product: 'Industrial Barcode Scanner', sku: 'PRD-1023', warehouse: 'Mumbai Hub', stock: '124', status: 'Active', statusTone: 'success' },
      { product: 'Thermal Label Roll', sku: 'PRD-1188', warehouse: 'Pune Hub', stock: '36', status: 'Low stock', statusTone: 'warning' },
      { product: 'Shelf Bin Medium', sku: 'PRD-2041', warehouse: 'Delhi Hub', stock: '410', status: 'Active', statusTone: 'success' },
      { product: 'Pallet Wrap Film', sku: 'PRD-3105', warehouse: 'Bangalore Hub', stock: '0', status: 'Out of stock', statusTone: 'danger' },
    ],
    note: 'This list is currently UI-only and ready for backend API integration.',
    tips: [
      'Use SKU as the primary key for list/detail routes.',
      'Surface low-stock and out-of-stock states prominently.',
      'Route successful create actions to details with new SKU context.',
    ],
  },
  create: {
    path: '/products/create',
    title: 'Create product',
    description:
      'Product onboarding page aligned with the same design language as dashboard, profile, and auth sections.',
    sectionTitle: 'Create form preview',
    sectionText: 'A backend-ready UI skeleton for creating inventory products.',
    rows: [
      { product: 'Field: Product name', sku: 'Text input', warehouse: 'Required', stock: 'Default 0', status: 'Draft', statusTone: 'warning' },
      { product: 'Field: SKU', sku: 'Unique code', warehouse: 'Validation', stock: 'N/A', status: 'Required', statusTone: 'success' },
      { product: 'Field: Category', sku: 'Dropdown', warehouse: 'Linked', stock: 'N/A', status: 'Optional', statusTone: 'success' },
      { product: 'Field: Reorder level', sku: 'Number', warehouse: 'Per WH', stock: 'Threshold', status: 'Recommended', statusTone: 'warning' },
    ],
    note: 'Use this page to wire create-product API and server validation responses.',
    tips: [
      'Validate SKU uniqueness before final submit.',
      'Allow warehouse-specific opening stock entries.',
      'Redirect to product details after successful creation.',
    ],
  },
  details: {
    path: '/products/details',
    title: 'Product details',
    description:
      'Detailed product view with stock posture and warehouse-level status in the same themed section.',
    sectionTitle: 'Details preview',
    sectionText: 'Representative details layout for a selected product record.',
    rows: [
      { product: 'Industrial Barcode Scanner', sku: 'PRD-1023', warehouse: 'Mumbai Hub', stock: '124', status: 'In stock', statusTone: 'success' },
      { product: 'Last updated', sku: '2026-03-14 09:42', warehouse: 'By Aarav', stock: '-', status: 'Audited', statusTone: 'success' },
      { product: 'Reserved qty', sku: '18', warehouse: 'Open orders', stock: '106 free', status: 'Healthy', statusTone: 'success' },
      { product: 'Reorder point', sku: '40', warehouse: 'Policy CI-PRD-01', stock: '-', status: 'Tracked', statusTone: 'warning' },
    ],
    note: 'Ideal place for stock movement timeline, price bands, and supplier mapping.',
    tips: [
      'Show latest movement history under the details summary.',
      'Highlight stock pressure risks before reorder point is crossed.',
      'Expose edit and deactivate actions with role-based control.',
    ],
  },
}

const profilePages = {
  overview: {
    path: '/profile',
    title: 'Profile overview',
    description:
      'Manage personal details, role identity, and workspace account visibility in a single themed profile area.',
    sectionTitle: 'Personal information',
    sectionText: 'These fields reflect the user identity currently linked to warehouse and operations access.',
    fields: [
      { label: 'Full name', value: 'Aarav Shah' },
      { label: 'Role', value: 'Operations Lead' },
      { label: 'Work email', value: 'aarav@coreinventory.com' },
      { label: 'Primary warehouse', value: 'Mumbai Central Hub' },
      { label: 'Employee ID', value: 'CI-OPS-2411' },
      { label: 'Timezone', value: 'Asia/Kolkata (IST)' },
    ],
    tips: [
      'Keep your work email current to avoid password recovery delays.',
      'Update warehouse assignment when moving across regions.',
      'Review profile details before requesting additional role permissions.',
    ],
    cards: [
      { label: 'Profile completion', value: '92%', hint: '1 optional field remaining', icon: 'user' },
      { label: 'Last sign in', value: '2h ago', hint: 'from Mumbai, IN', icon: 'shield' },
      { label: 'Unread alerts', value: '3', hint: 'security and operations notices', icon: 'bell' },
    ],
  },
  security: {
    path: '/profile/security',
    title: 'Security settings',
    description:
      'Control authentication methods, trusted devices, and session security with the same CoreInventory visual style.',
    sectionTitle: 'Authentication controls',
    sectionText: 'Configure sign-in options used across login, verification, and reset pages.',
    fields: [
      { label: 'Password status', value: 'Updated 6 days ago' },
      { label: 'Multi-factor auth', value: 'Enabled (Email + OTP)' },
      { label: 'Trusted devices', value: '5 active devices' },
      { label: 'Recovery contact', value: 'security@coreinventory.com' },
      { label: 'Session timeout', value: '30 minutes' },
      { label: 'Login alerts', value: 'Enabled for new locations' },
    ],
    tips: [
      'Rotate passwords on shared supervisor terminals every 30 days.',
      'Disable inactive devices after shift handovers.',
      'Always verify unusual login alerts from unknown locations.',
    ],
    cards: [
      { label: '2FA strength', value: 'Strong', hint: 'OTP required on unknown devices', icon: 'shield' },
      { label: 'Reset policy', value: 'Compliant', hint: 'Policy CI-SEC-02', icon: 'key' },
      { label: 'Mobile authenticator', value: 'Connected', hint: 'Last synced today', icon: 'device' },
    ],
  },
  preferences: {
    path: '/profile/preferences',
    title: 'Workspace preferences',
    description:
      'Adjust notifications, display behavior, and operational defaults while preserving the same design language.',
    sectionTitle: 'Experience preferences',
    sectionText: 'Personalize how dashboard and operations pages behave for your role.',
    fields: [
      { label: 'Default landing page', value: 'Dashboard' },
      { label: 'Digest emails', value: 'Every weekday at 8:30 AM' },
      { label: 'Critical alerts', value: 'Push + Email' },
      { label: 'Chart density', value: 'Comfortable' },
      { label: 'Rows per table', value: '25 rows' },
      { label: 'Language', value: 'English (India)' },
    ],
    tips: [
      'Keep critical alert channels enabled for dispatch incidents.',
      'Use dashboard as landing page for shift-based operations teams.',
      'Adjust table density based on your screen size and role workflow.',
    ],
    cards: [
      { label: 'Theme profile', value: 'Core light', hint: 'Matches system theme tokens', icon: 'palette' },
      { label: 'Locale', value: 'en-IN', hint: 'IST time + INR formatting', icon: 'globe' },
      { label: 'Automation rules', value: '4 active', hint: 'For receipts and delivery alerts', icon: 'sliders' },
    ],
  },
}

module.exports = {
  authPages,
  dashboardPage,
  productPages,
  profilePages,
}