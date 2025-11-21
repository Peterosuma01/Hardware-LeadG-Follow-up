// Steelwool Africa CRM - Progressive Web App
// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('ServiceWorker registered:', registration.scope);
      })
      .catch((err) => {
        console.log('ServiceWorker registration failed:', err);
      });
  });
}

// PWA Install Prompt
let deferredPrompt;
const installPrompt = document.getElementById('installPrompt');
const installBtn = document.getElementById('installBtn');
const dismissBtn = document.getElementById('dismissBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  if (!localStorage.getItem('installDismissed')) {
    installPrompt.classList.add('show');
  }
});

installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  
  console.log(`User response: ${outcome}`);
  deferredPrompt = null;
  installPrompt.classList.remove('show');
});

dismissBtn.addEventListener('click', () => {
  installPrompt.classList.remove('show');
  localStorage.setItem('installDismissed', 'true');
});

// Online/Offline Detection
const offlineIndicator = document.getElementById('offlineIndicator');

window.addEventListener('online', () => {
  offlineIndicator.classList.remove('show');
  showMessage('Back online!', 'success');
});

window.addEventListener('offline', () => {
  offlineIndicator.classList.add('show');
});

if (!navigator.onLine) {
  offlineIndicator.classList.add('show');
}

// API Configuration
const API_ENDPOINT_KEY = 'steelwool_api_endpoint';
let API_ENDPOINT = localStorage.getItem(API_ENDPOINT_KEY) || '';

const configSection = document.getElementById('configSection');
const apiEndpointInput = document.getElementById('apiEndpoint');
const saveEndpointBtn = document.getElementById('saveEndpointBtn');
const configMessage = document.getElementById('configMessage');
const leadForm = document.getElementById('leadForm');

if (API_ENDPOINT) {
  apiEndpointInput.value = API_ENDPOINT;
  configSection.classList.add('hidden');
  leadForm.classList.remove('hidden');
}

saveEndpointBtn.addEventListener('click', async () => {
  const endpoint = apiEndpointInput.value.trim();
  
  if (!endpoint) {
    showConfigMessage('Please enter a valid API endpoint URL', 'error');
    return;
  }
  
  if (!endpoint.includes('script.google.com') && !endpoint.includes('script.googleusercontent.com')) {
    showConfigMessage('Please enter a valid Google Apps Script URL', 'error');
    return;
  }

  // Test the connection
  showConfigMessage('Testing connection...', 'info');
  saveEndpointBtn.disabled = true;

  try {
    const testUrl = `${endpoint}?test=true`;
    const response = await fetch(testUrl, {
      method: 'GET',
      redirect: 'follow'
    });

    // Google Apps Script returns HTML by default for GET requests
    // If we get any response without error, connection works
    if (response.ok || response.status === 200) {
      API_ENDPOINT = endpoint;
      localStorage.setItem(API_ENDPOINT_KEY, endpoint);
      
      configSection.classList.add('hidden');
      leadForm.classList.remove('hidden');
      showMessage('API endpoint saved successfully!', 'success');
    } else {
      showConfigMessage('Could not connect to endpoint. Status: ' + response.status, 'error');
    }
  } catch (error) {
    showConfigMessage('Connection test failed: ' + error.message + '. The URL might still work - try saving anyway.', 'error');
    // Allow saving even if test fails - might be CORS issue
    setTimeout(() => {
      if (confirm('Connection test failed, but this might be a CORS issue. Save endpoint anyway?')) {
        API_ENDPOINT = endpoint;
        localStorage.setItem(API_ENDPOINT_KEY, endpoint);
        configSection.classList.add('hidden');
        leadForm.classList.remove('hidden');
        showMessage('API endpoint saved. Try using the app.', 'info');
      }
    }, 100);
  } finally {
    saveEndpointBtn.disabled = false;
  }
});

function showConfigMessage(text, type) {
  configMessage.className = 'message ' + (type === 'error' ? 'error' : type === 'info' ? 'info' : 'success') + ' show';
  configMessage.textContent = text;
  setTimeout(() => configMessage.classList.remove('show'), 6000);
}

// Elements
const roleSelect = document.getElementById('roleSelect');
const loadBtn = document.getElementById('loadBtn');
const customerCodeInput = document.getElementById('customerCode');
const qualificationSelect = document.getElementById('qualification');
const presentationSelect = document.getElementById('presentation');
const approveBtn = document.getElementById('approveBtn');
const declineBtn = document.getElementById('declineBtn');
const submitBtn = document.getElementById('submitBtn');
const loading = document.getElementById('loading');
const message = document.getElementById('message');

const detailsSection = document.getElementById('detailsSection');
const d_region = document.getElementById('d_region');
const d_area = document.getElementById('d_area');
const d_location = document.getElementById('d_location');
const d_storeName = document.getElementById('d_storeName');
const d_contactPerson = document.getElementById('d_contactPerson');
const d_mobileNumber = document.getElementById('d_mobileNumber');
const d_outletCategory = document.getElementById('d_outletCategory');
const d_brandsStocked = document.getElementById('d_brandsStocked');
const d_purchaseFrequency = document.getElementById('d_purchaseFrequency');
const d_mainSupplier = document.getElementById('d_mainSupplier');
const d_distributorType = document.getElementById('d_distributorType');
const d_weldplusAwareness = document.getElementById('d_weldplusAwareness');
const d_additionalFeedback = document.getElementById('d_additionalFeedback');
const d_customerCode = document.getElementById('d_customerCode');

const salesRepEmailContainer = document.getElementById('salesRepEmailContainer');
const salesRepEmailInput = document.getElementById('salesRepEmail');
const salesRepAuthSection = document.getElementById('salesRepAuthSection');
const salesRepEmailAuth = document.getElementById('salesRepEmailAuth');
const salesRepPasswordAuth = document.getElementById('salesRepPasswordAuth');

const passwordModal = document.getElementById('passwordModal');
const supervisorPasswordInput = document.getElementById('supervisorPasswordInput');
const submitPasswordBtn = document.getElementById('submitPasswordBtn');
const cancelPasswordBtn = document.getElementById('cancelPasswordBtn');
const passwordHint = document.getElementById('passwordHint');

const viewLeadsButtons = document.getElementById('viewLeadsButtons');
const viewGeneratedLeadsBtn = document.getElementById('viewGeneratedLeadsBtn');
const viewOrdersPlacedBtn = document.getElementById('viewOrdersPlacedBtn');
const viewQualifiedLeadsBtn = document.getElementById('viewQualifiedLeadsBtn');
const ordersPlacedBtn = document.getElementById('ordersPlacedBtn');
const leadsListSection = document.getElementById('leadsListSection');
const leadsListTitle = document.getElementById('leadsListTitle');
const leadsTableBody = document.getElementById('leadsTableBody');
const closeLeadsListBtn = document.getElementById('closeLeadsListBtn');

const ordersSection = document.getElementById('ordersSection');
const orderCustomerCode = document.getElementById('orderCustomerCode');
const orderNumber = document.getElementById('orderNumber');
const orderQuantity = document.getElementById('orderQuantity');
const submitOrderBtn = document.getElementById('submitOrderBtn');
const closeOrdersBtn = document.getElementById('closeOrdersBtn');
const loadOrderStatusBtn = document.getElementById('loadOrderStatusBtn');
const orderStatusDisplay = document.getElementById('orderStatusDisplay');
const orderStatusText = document.getElementById('orderStatusText');

let currentLoadedLead = null;
let isSupervisorAuthenticated = false;
let supervisorPasswordCached = '';
let currentOrderStatus = null;

// API Call Helper - Works with Google Apps Script doGet/doPost
async function apiCall(functionName, ...params) {
  if (!API_ENDPOINT) {
    throw new Error('API endpoint not configured');
  }
  
  if (!navigator.onLine) {
    throw new Error('No internet connection');
  }
  
  try {
    // Build URL with function name and parameters
    const url = new URL(API_ENDPOINT);
    url.searchParams.append('action', functionName);
    
    // For GET-compatible functions, append params as query strings
    // For complex data, use POST
    let response;
    
    if (params.length === 0) {
      // Simple GET request
      response = await fetch(url.toString(), {
        method: 'GET',
        redirect: 'follow',
        mode: 'cors'
      });
    } else {
      // POST request with data
      const formData = new URLSearchParams();
      formData.append('action', functionName);
      formData.append('params', JSON.stringify(params));
      
      response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
        redirect: 'follow',
        mode: 'cors'
      });
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
}

function showMessage(text, type = 'success') {
  message.className = 'message ' + (type === 'error' ? 'error' : type === 'info' ? 'info' : 'success') + ' show';
  message.textContent = text;
  setTimeout(() => message.classList.remove('show'), 6000);
}

// Load order status
loadOrderStatusBtn.addEventListener('click', async () => {
  const custCode = orderCustomerCode.value.trim();
  const salesRepEmail = salesRepEmailAuth.value.trim();
  const salesRepPassword = salesRepPasswordAuth.value.trim();

  if (!custCode) {
    showMessage('Please enter customer code.', 'error');
    return;
  }

  if (!salesRepEmail || !salesRepPassword) {
    showMessage('Sales Rep email and password are required.', 'error');
    return;
  }

  loading.classList.add('show');
  loadOrderStatusBtn.disabled = true;

  try {
    const res = await apiCall('getAvailableOrders', custCode, salesRepEmail, salesRepPassword);
    
    loading.classList.remove('show');
    loadOrderStatusBtn.disabled = false;

    if (!res || !res.success) {
      showMessage(res && res.message ? res.message : 'Error loading order status', 'error');
      orderStatusDisplay.classList.add('hidden');
      currentOrderStatus = null;
      updateOrderDropdown();
      return;
    }

    currentOrderStatus = res;
    updateOrderDropdown();
    
    let statusHTML = '';
    if (res.submittedOrders.length === 0) {
      statusHTML = 'No orders submitted yet. You can submit Order 1.';
    } else if (res.nextAvailableOrder === -1) {
      statusHTML = 'All orders (1-10) have been submitted for this customer.';
    } else {
      statusHTML = 'Submitted: Order ' + res.submittedOrders.join(', Order ') + '<br>';
      statusHTML += '<strong>Next available:</strong> Order ' + res.nextAvailableOrder;
    }
    
    orderStatusText.innerHTML = statusHTML;
    orderStatusDisplay.classList.remove('hidden');
  } catch (err) {
    loading.classList.remove('show');
    loadOrderStatusBtn.disabled = false;
    showMessage('Error: ' + err.message, 'error');
    orderStatusDisplay.classList.add('hidden');
    currentOrderStatus = null;
    updateOrderDropdown();
  }
});

function updateOrderDropdown() {
  const options = orderNumber.querySelectorAll('option');
  
  for (let i = 1; i < options.length; i++) {
    options[i].disabled = false;
    options[i].textContent = 'Order ' + i;
    options[i].style.color = '';
  }

  if (!currentOrderStatus || !currentOrderStatus.success) {
    for (let i = 1; i < options.length; i++) {
      options[i].disabled = true;
    }
    return;
  }

  const submittedOrders = currentOrderStatus.submittedOrders || [];
  const nextAvailable = currentOrderStatus.nextAvailableOrder;

  for (let i = 1; i <= 10; i++) {
    const option = options[i];
    const orderNum = i;
    
    if (submittedOrders.includes(orderNum)) {
      option.disabled = true;
      option.textContent = 'Order ' + orderNum + ' (Submitted ✓)';
      option.style.color = '#999';
    } else if (nextAvailable !== -1 && orderNum === nextAvailable) {
      option.disabled = false;
      option.textContent = 'Order ' + orderNum + ' (Available)';
      option.style.color = '#10b981';
    } else {
      option.disabled = true;
      option.textContent = 'Order ' + orderNum + ' (Locked)';
      option.style.color = '#999';
    }
  }

  if (nextAvailable === -1) {
    for (let i = 1; i < options.length; i++) {
      options[i].disabled = true;
    }
  }
}

ordersPlacedBtn.addEventListener('click', () => {
  ordersSection.classList.remove('hidden');
  detailsSection.classList.add('hidden');
  leadsListSection.classList.add('hidden');
  orderCustomerCode.value = '';
  orderNumber.value = '';
  orderQuantity.value = '';
  orderStatusDisplay.classList.add('hidden');
  currentOrderStatus = null;
  updateOrderDropdown();
});

closeOrdersBtn.addEventListener('click', () => {
  ordersSection.classList.add('hidden');
  currentOrderStatus = null;
  updateOrderDropdown();
});

submitOrderBtn.addEventListener('click', async () => {
  const custCode = orderCustomerCode.value.trim();
  const orderNum = orderNumber.value;
  const quantity = orderQuantity.value.trim();
  const salesRepEmail = salesRepEmailAuth.value.trim();
  const salesRepPassword = salesRepPasswordAuth.value.trim();

  if (!custCode || !orderNum || !quantity || !salesRepEmail || !salesRepPassword) {
    showMessage('Please fill all required fields.', 'error');
    return;
  }

  if (parseFloat(quantity) <= 0) {
    showMessage('Please enter a valid quantity.', 'error');
    return;
  }

  if (!currentOrderStatus) {
    showMessage('Please check order status first.', 'error');
    return;
  }

  loading.classList.add('show');
  submitOrderBtn.disabled = true;

  try {
    const res = await apiCall('submitOrder', custCode, orderNum, parseFloat(quantity), salesRepEmail, salesRepPassword);
    
    loading.classList.remove('show');
    submitOrderBtn.disabled = false;

    if (res && res.success) {
      showMessage('Order submitted successfully!', 'success');
      orderNumber.value = '';
      orderQuantity.value = '';
      loadOrderStatusBtn.click();
    } else {
      showMessage(res && res.message ? res.message : 'Error submitting order', 'error');
    }
  } catch (err) {
    loading.classList.remove('show');
    submitOrderBtn.disabled = false;
    showMessage('Error: ' + err.message, 'error');
  }
});

viewGeneratedLeadsBtn.addEventListener('click', async () => {
  loading.classList.add('show');
  
  try {
    const res = await apiCall('getAllGeneratedLeads');
    loading.classList.remove('show');
    
    if (!res || !res.success) {
      showMessage(res && res.message ? res.message : 'Unable to load leads', 'error');
      return;
    }
    
    displayLeadsList(res.data, 'Generated Leads');
  } catch (err) {
    loading.classList.remove('show');
    showMessage('Error loading leads: ' + err.message, 'error');
  }
});

viewOrdersPlacedBtn.addEventListener('click', async () => {
  loading.classList.add('show');
  
  try {
    const res = await apiCall('getOrdersSummary');
    loading.classList.remove('show');
    
    if (!res || !res.success) {
      showMessage(res && res.message ? res.message : 'Unable to load orders', 'error');
      return;
    }
    
    if (res.data.length === 0) {
      showMessage('No orders have been placed yet.', 'info');
      return;
    }
    
    displayOrdersSummary(res.data, 'Orders Placed Summary');
  } catch (err) {
    loading.classList.remove('show');
    showMessage('Error loading orders: ' + err.message, 'error');
  }
});

viewQualifiedLeadsBtn.addEventListener('click', async () => {
  const salesRepEmail = salesRepEmailAuth.value.trim();
  const salesRepPassword = salesRepPasswordAuth.value.trim();
  
  if (!salesRepEmail || !salesRepPassword) {
    showMessage('Please enter your email and password first.', 'error');
    return;
  }
  
  loading.classList.add('show');
  
  try {
    const res = await apiCall('getQualifiedLeadsBySalesRep', salesRepEmail, salesRepPassword);
    loading.classList.remove('show');
    
    if (!res || !res.success) {
      showMessage(res && res.message ? res.message : 'Unable to load leads', 'error');
      return;
    }
    
    if (res.data.length === 0) {
      showMessage('No qualified leads found for your account.', 'info');
      return;
    }
    
    displayLeadsList(res.data, 'Qualified Leads (Approved)');
  } catch (err) {
    loading.classList.remove('show');
    showMessage('Error loading leads: ' + err.message, 'error');
  }
});

function displayLeadsList(leads, title) {
  leadsListTitle.textContent = title;
  leadsTableBody.innerHTML = '';
  
  const leadsTableHead = document.querySelector('#leadsTable thead tr');
  leadsTableHead.innerHTML = `
    <th>Customer Code</th>
    <th>Store Name</th>
    <th>Contact Person</th>
    <th>Mobile Number</th>
    <th>Region</th>
    <th>Area</th>
  `;
  
  leads.forEach(function(lead) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${lead.customerCode || ''}</td>
      <td>${lead.storeName || ''}</td>
      <td>${lead.contactPerson || ''}</td>
      <td>${lead.mobileNumber || ''}</td>
      <td>${lead.region || ''}</td>
      <td>${lead.area || ''}</td>
    `;
    leadsTableBody.appendChild(row);
  });
  
  leadsListSection.classList.remove('hidden');
  detailsSection.classList.add('hidden');
  ordersSection.classList.add('hidden');
}

function displayOrdersSummary(orders, title) {
  leadsListTitle.textContent = title;
  leadsTableBody.innerHTML = '';
  
  const leadsTableHead = document.querySelector('#leadsTable thead tr');
  leadsTableHead.innerHTML = `
    <th>Customer Code</th>
    <th>No. of Orders</th>
    <th>Total Quantity (Kgs)</th>
    <th>Average Quantity (Kgs)</th>
  `;
  
  orders.forEach(function(order) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${order.customerCode || ''}</td>
      <td>${order.numberOfOrders || 0}</td>
      <td>${order.totalQuantity ? order.totalQuantity.toFixed(2) : '0.00'}</td>
      <td>${order.averageQuantity ? order.averageQuantity.toFixed(2) : '0.00'}</td>
    `;
    leadsTableBody.appendChild(row);
  });
  
  leadsListSection.classList.remove('hidden');
  detailsSection.classList.add('hidden');
  ordersSection.classList.add('hidden');
}

closeLeadsListBtn.addEventListener('click', () => {
  leadsListSection.classList.add('hidden');
});

loadBtn.addEventListener('click', async () => {
  const code = customerCodeInput.value.trim();
  const role = roleSelect.value;

  if (!role) {
    showMessage('Please select a role first.', 'error');
    return;
  }

  if (!code) {
    showMessage('Enter customer code to load.', 'error');
    return;
  }

  let salesRepEmail = '';
  let salesRepPassword = '';
  
  if (role === 'SalesRep') {
    salesRepEmail = salesRepEmailAuth.value.trim();
    salesRepPassword = salesRepPasswordAuth.value.trim();
    
    if (!salesRepEmail || !salesRepPassword) {
      showMessage('Please enter your Sales Rep credentials.', 'error');
      return;
    }
  }

  loading.classList.add('show');
  
  try {
    const res = await apiCall('getLeadStatus', code, role, salesRepEmail, salesRepPassword);
    loading.classList.remove('show');
    
    if (!res || !res.success) {
      showMessage(res && res.message ? res.message : 'Unable to load lead', 'error');
      return;
    }
    
    currentLoadedLead = res.data;
    qualificationSelect.value = currentLoadedLead.qualification || '';
    presentationSelect.value = currentLoadedLead.presentation || '';
    salesRepEmailInput.value = currentLoadedLead.salesRepEmail || '';

    d_region.textContent = currentLoadedLead.region || '';
    d_area.textContent = currentLoadedLead.area || '';
    d_location.textContent = currentLoadedLead.location || '';
    d_storeName.textContent = currentLoadedLead.storeName || '';
    d_contactPerson.textContent = currentLoadedLead.contactPerson || '';
    d_mobileNumber.textContent = currentLoadedLead.mobileNumber || '';
    d_outletCategory.textContent = currentLoadedLead.outletCategory || '';
    d_brandsStocked.textContent = currentLoadedLead.brandsStocked || '';
    d_purchaseFrequency.textContent = currentLoadedLead.purchaseFrequency || '';
    d_mainSupplier.textContent = currentLoadedLead.mainSupplier || '';
    d_distributorType.textContent = currentLoadedLead.distributorType || '';
    d_weldplusAwareness.textContent = currentLoadedLead.weldplusAwareness || '';
    d_additionalFeedback.textContent = currentLoadedLead.additionalFeedback || '';
    d_customerCode.textContent = currentLoadedLead.customerCode || '';

    detailsSection.classList.remove('hidden');
    leadsListSection.classList.add('hidden');
    ordersSection.classList.add('hidden');

    if (role === 'Supervisor') {
      isSupervisorAuthenticated = false;
      supervisorPasswordCached = '';
    }
    
    updateUiForRoleAndStatus();
    showMessage('Lead loaded successfully (row ' + currentLoadedLead.row + ')', 'success');
  } catch (err) {
    loading.classList.remove('show');
    showMessage('Error loading lead: ' + err.message, 'error');
  }
});

function updateUiForRoleAndStatus() {
  const role = roleSelect.value;
  const approval = (currentLoadedLead && currentLoadedLead.approval) ? currentLoadedLead.approval.toString() : '';

  qualificationSelect.disabled = true;
  presentationSelect.disabled = true;
  approveBtn.style.display = 'none';
  declineBtn.style.display = 'none';
  salesRepEmailContainer.classList.add('hidden');
  salesRepAuthSection.classList.add('hidden');
  viewLeadsButtons.classList.add('hidden');
  viewGeneratedLeadsBtn.classList.add('hidden');
  viewOrdersPlacedBtn.classList.add('hidden');
  viewQualifiedLeadsBtn.classList.add('hidden');
  ordersPlacedBtn.classList.add('hidden');

  if (!role) return;

  if (role === 'Supervisor') {
    if (isSupervisorAuthenticated) {
      qualificationSelect.disabled = false;
      approveBtn.style.display = 'inline-block';
      declineBtn.style.display = 'inline-block';
      salesRepEmailContainer.classList.remove('hidden');
      viewLeadsButtons.classList.remove('hidden');
      viewGeneratedLeadsBtn.classList.remove('hidden');
      viewOrdersPlacedBtn.classList.remove('hidden');
    } else {
      showPasswordModal();
    }
  } else if (role === 'SalesRep') {
    salesRepAuthSection.classList.remove('hidden');
    
    if (approval === 'Approved') {
      presentationSelect.disabled = false;
    }

    if (salesRepEmailAuth.value.trim() && salesRepPasswordAuth.value.trim()) {
      viewLeadsButtons.classList.remove('hidden');
      viewQualifiedLeadsBtn.classList.remove('hidden');
      ordersPlacedBtn.classList.remove('hidden');
    }

    isSupervisorAuthenticated = false;
    supervisorPasswordCached = '';
  }
}

roleSelect.addEventListener('change', () => {
  currentLoadedLead = null;
  detailsSection.classList.add('hidden');
  leadsListSection.classList.add('hidden');
  ordersSection.classList.add('hidden');
  qualificationSelect.value = '';
  presentationSelect.value = '';
  updateUiForRoleAndStatus();
});

function showPasswordModal() {
  passwordModal.style.display = 'block';
  supervisorPasswordInput.focus();
}

function hidePasswordModal() {
  passwordModal.style.display = 'none';
  supervisorPasswordInput.value = '';
  passwordHint.style.display = 'none';
}

cancelPasswordBtn.addEventListener('click', () => {
  hidePasswordModal();
  roleSelect.value = '';
  updateUiForRoleAndStatus();
});

submitPasswordBtn.addEventListener('click', async () => {
  const pw = supervisorPasswordInput.value.trim();

  if (!pw) {
    passwordHint.textContent = 'Please enter the password.';
    passwordHint.style.display = 'block';
    return;
  }

  loading.classList.add('show');

  try {
    const res = await apiCall('validateSupervisorPassword', pw);
    loading.classList.remove('show');

    if (!res || !res.success) {
      passwordHint.textContent = (res && res.message) ? res.message : 'Invalid supervisor password.';
      passwordHint.style.display = 'block';
      return;
    }

    isSupervisorAuthenticated = true;
    supervisorPasswordCached = pw;

    hidePasswordModal();
    updateUiForRoleAndStatus();
    showMessage('Supervisor authenticated.', 'success');
  } catch (err) {
    loading.classList.remove('show');
    passwordHint.textContent = 'Server error: ' + err.message;
    passwordHint.style.display = 'block';
  }
});

approveBtn.addEventListener('click', async () => {
  if (!currentLoadedLead || !isSupervisorAuthenticated) {
    showMessage('Load a lead and authenticate first', 'error');
    return;
  }

  const code = customerCodeInput.value.trim();
  const qualificationValue = qualificationSelect.value;
  const salesEmail = salesRepEmailInput.value.trim();

  if (!qualificationValue) {
    showMessage('Please select a qualification status.', 'error');
    return;
  }

  submitBtn.disabled = true;
  loading.classList.add('show');

  try {
    const res = await apiCall('updateQualificationBySupervisor', code, qualificationValue, 'Approved', salesEmail, supervisorPasswordCached);
    loading.classList.remove('show');
    submitBtn.disabled = false;
    
    if (res && res.success) {
      const r2 = await apiCall('getLeadStatus', code, 'Supervisor', '', '');
      if (r2 && r2.success) {
        currentLoadedLead = r2.data;
        qualificationSelect.value = currentLoadedLead.qualification || '';
        presentationSelect.value = currentLoadedLead.presentation || '';
        salesRepEmailInput.value = currentLoadedLead.salesRepEmail || '';
        updateUiForRoleAndStatus();
      }
      showMessage('Qualification declined. Presentation locked.', 'success');
    } else {
      showMessage(res && res.message ? res.message : 'Error declining', 'error');
    }
  } catch (err) {
    loading.classList.remove('show');
    submitBtn.disabled = false;
    showMessage('Error: ' + err.message, 'error');
  }
});

// Form submit
document.getElementById('leadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const code = customerCodeInput.value.trim();
  if (!code || !currentLoadedLead) {
    showMessage('Enter a customer code and Load it first.', 'error');
    return;
  }

  const role = roleSelect.value;

  if (role === 'Supervisor') {
    if (!isSupervisorAuthenticated || !supervisorPasswordCached) {
      showMessage('Supervisor not authenticated.', 'error');
      showPasswordModal();
      return;
    }

    const qual = qualificationSelect.value;
    const salesEmail = salesRepEmailInput.value.trim();

    submitBtn.disabled = true;
    loading.classList.add('show');

    try {
      const res = await apiCall('updateQualificationBySupervisor', code, qual, '', salesEmail, supervisorPasswordCached);
      loading.classList.remove('show');
      submitBtn.disabled = false;
      
      if (res && res.success) {
        const r2 = await apiCall('getLeadStatus', code, 'Supervisor', '', '');
        if (r2 && r2.success) {
          currentLoadedLead = r2.data;
          qualificationSelect.value = currentLoadedLead.qualification || '';
          presentationSelect.value = currentLoadedLead.presentation || '';
          salesRepEmailInput.value = currentLoadedLead.salesRepEmail || '';
          updateUiForRoleAndStatus();
        }
        showMessage('Qualification updated by Supervisor.', 'success');
      } else {
        showMessage(res && res.message ? res.message : 'Error updating qualification', 'error');
      }
    } catch (err) {
      loading.classList.remove('show');
      submitBtn.disabled = false;
      showMessage('Error: ' + err.message, 'error');
    }
    return;
  }

  if (role === 'SalesRep') {
    const pres = presentationSelect.value;
    if (!pres) {
      showMessage('Select a presentation status before submitting.', 'error');
      return;
    }

    const salesRepEmail = salesRepEmailAuth.value.trim();
    const salesRepPassword = salesRepPasswordAuth.value.trim();

    if (!salesRepEmail || !salesRepPassword) {
      showMessage('Sales Rep email and password are required.', 'error');
      return;
    }

    submitBtn.disabled = true;
    loading.classList.add('show');

    try {
      const res = await apiCall('updatePresentationBySalesRep', code, pres, salesRepEmail, salesRepPassword);
      loading.classList.remove('show');
      submitBtn.disabled = false;
      
      if (res && res.success) {
        const r2 = await apiCall('getLeadStatus', code, 'SalesRep', salesRepEmail, salesRepPassword);
        if (r2 && r2.success) {
          currentLoadedLead = r2.data;
          qualificationSelect.value = currentLoadedLead.qualification || '';
          presentationSelect.value = currentLoadedLead.presentation || '';
          salesRepEmailInput.value = currentLoadedLead.salesRepEmail || '';
          updateUiForRoleAndStatus();
        }
        showMessage('Presentation updated successfully.', 'success');
      } else {
        showMessage(res && res.message ? res.message : 'Error updating presentation', 'error');
      }
    } catch (err) {
      loading.classList.remove('show');
      submitBtn.disabled = false;
      showMessage('Error: ' + err.message, 'error');
    }

    return;
  }

  showMessage('Please select a role before submitting.', 'error');
}); '');
      if (r2 && r2.success) {
        currentLoadedLead = r2.data;
        qualificationSelect.value = currentLoadedLead.qualification || '';
        presentationSelect.value = currentLoadedLead.presentation || '';
        salesRepEmailInput.value = currentLoadedLead.salesRepEmail || '';
        updateUiForRoleAndStatus();
      }
      showMessage('Qualification approved and updated.', 'success');
    } else {
      showMessage(res && res.message ? res.message : 'Error approving', 'error');
    }
  } catch (err) {
    loading.classList.remove('show');
    submitBtn.disabled = false;
    showMessage('Error: ' + err.message, 'error');
  }
});

declineBtn.addEventListener('click', async () => {
  if (!currentLoadedLead || !isSupervisorAuthenticated) {
    showMessage('Load a lead and authenticate first', 'error');
    return;
  }

  const code = customerCodeInput.value.trim();
  const qualificationValue = qualificationSelect.value;
  const salesEmail = salesRepEmailInput.value.trim();

  if (!qualificationValue) {
    showMessage('Please select a qualification status.', 'error');
    return;
  }

  submitBtn.disabled = true;
  loading.classList.add('show');

  try {
    const res = await apiCall('updateQualificationBySupervisor', code, qualificationValue, 'Declined', salesEmail, supervisorPasswordCached);
    loading.classList.remove('show');
    submitBtn.disabled = false;
    
    if (res && res.success) {
      const r2 = await apiCall('getLeadStatus', code, 'Supervisor', '',
