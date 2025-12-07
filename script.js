// ==============================================
// 1. INITIAL SETUP AND DOM ELEMENTS
// ==============================================

// Global counter for line items
let itemId = 0;

// Get key DOM elements
const inputTableBody = document.querySelector('#input-items-table tbody');
const addItemButton = document.getElementById('add-item-btn');
const generatePdfButton = document.getElementById('generate-pdf-btn');

// Input fields for header data
const sellerTrnInput = document.getElementById('seller-trn');
const customerNameInput = document.getElementById('customer-name');
const customerTrnInput = document.getElementById('customer-trn');
const invoiceNoInput = document.getElementById('invoice-no');
const invoiceDateInput = document.getElementById('invoice-date');

// Display elements for totals
const inputSubtotalSpan = document.getElementById('input-subtotal');
const inputVatSpan = document.getElementById('input-vat');
const inputTotalSpan = document.getElementById('input-total');

// PDF template elements to be updated
const pdfItemRows = document.getElementById('pdf-item-rows');
const pdfSellerTrn = document.getElementById('pdf-seller-trn');
const pdfDate = document.getElementById('pdf-date');
const pdfInvoiceNo = document.getElementById('pdf-invoice-no');
const pdfCustomerName = document.getElementById('pdf-customer-name');
const pdfCustomerTrn = document.getElementById('pdf-customer-trn');
const pdfSubtotal = document.getElementById('pdf-subtotal');
const pdfVat = document.getElementById('pdf-vat');
const pdfTotal = document.getElementById('pdf-total');


// ==============================================
// 2. LINE ITEM MANAGEMENT & CALCULATIONS
// ==============================================

/**
 * Creates and adds a new editable row to the input table.
 * @param {string} description - Default item description.
 * @param {number} qty - Default quantity.
 * @param {number} rate - Default rate.
 */
function addNewItemRow(description = '', qty = 1.00, rate = 0) {
    itemId++;

    const newRow = document.createElement('tr');
    newRow.setAttribute('data-id', itemId);
    
    newRow.innerHTML = `
        <td><input type="text" name="description" value="${description}" class="item-description" required></td>
        <td><input type="number" step="0.01" name="qty" value="${qty.toFixed(2)}" class="item-qty" min="0" required></td>
        <td><input type="number" step="0.01" name="rate" value="${rate.toFixed(2)}" class="item-rate" min="0" required></td>
        <td class="net-total">0.00</td>
        <td><button class="delete-btn" data-id="${itemId}">Delete</button></td>
    `;

    inputTableBody.appendChild(newRow);

    // Attach listeners for change/input events
    const inputs = newRow.querySelectorAll('input');
    inputs.forEach(input => input.addEventListener('input', updateLineItemTotal));
}

/**
 * Calculates the net total for a single line item and recalculates the grand totals.
 * @param {Event} event - The input event object.
 */
function updateLineItemTotal(event) {
    const row = event.target.closest('tr');
    // Ensure values are parsed correctly before calculation
    const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
    const rate = parseFloat(row.querySelector('.item-rate').value) || 0;
    const netTotal = qty * rate;

    row.querySelector('.net-total').textContent = netTotal.toFixed(2);
    
    calculateGrandTotals();
}

/**
 * Recalculates Subtotal, VAT, and Final Total based on all line items.
 */
function calculateGrandTotals() {
    let subtotal = 0;
    const itemRows = inputTableBody.querySelectorAll('tr');

    itemRows.forEach(row => {
        const netTotalText = row.querySelector('.net-total').textContent;
        subtotal += parseFloat(netTotalText);
    });

    const vatRate = 0.05; // 5% VAT rate
    const vatAmount = subtotal * vatRate;
    const finalTotal = subtotal + vatAmount;

    // Update form totals display
    inputSubtotalSpan.textContent = subtotal.toFixed(2);
    inputVatSpan.textContent = vatAmount.toFixed(2);
    inputTotalSpan.textContent = finalTotal.toFixed(2);
    
    // CRITICAL for LIVE PREVIEW: Sync data to PDF template after every calculation
    syncDataToPdfTemplate(); 
}


// ==============================================
// 3. DATA SYNC AND PDF GENERATION
// ==============================================

/**
 * Synchronizes all data from the editable form to the visible PDF template.
 */
function syncDataToPdfTemplate() {
    // A. Sync Header/Meta Data
    pdfSellerTrn.textContent = sellerTrnInput.value;
    pdfCustomerName.textContent = customerNameInput.value;
    pdfCustomerTrn.textContent = customerTrnInput.value;
    pdfInvoiceNo.textContent = invoiceNoInput.value;
    
    // Format date from YYYY-MM-DD to DD-MM-YY 
    const dateValue = invoiceDateInput.value;
    if (dateValue) {
        const [year, month, day] = dateValue.split('-');
        pdfDate.textContent = `${day}-${month}-${year.slice(2)}`;
    } else {
        pdfDate.textContent = '';
    }

    // B. Sync Line Items
    pdfItemRows.innerHTML = ''; // Clear previous rows
    const itemRows = inputTableBody.querySelectorAll('tr');

    itemRows.forEach((row, index) => {
        const description = row.querySelector('.item-description').value;
        const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
        const rate = parseFloat(row.querySelector('.item-rate').value) || 0;
        const netTotal = qty * rate;

        const pdfRow = document.createElement('tr');
        // CRITICAL: Ensure 5 columns are created precisely for layout integrity
        pdfRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${description}</td>
            <td>${qty.toFixed(2)}</td>
            <td>${rate.toFixed(2)}</td>
            <td>${netTotal.toFixed(2)}</td>
        `;
        pdfItemRows.appendChild(pdfRow);
    });

    // C. Sync Totals (using the calculated values)
    pdfSubtotal.textContent = inputSubtotalSpan.textContent;
    pdfVat.textContent = inputVatSpan.textContent;
    pdfTotal.textContent = inputTotalSpan.textContent;
}

/**
 * Generates the PDF from the styled template using html2canvas and jsPDF.
 */
async function generatePDF() {
    // 1. Sync data to ensure the template is up-to-date
    syncDataToPdfTemplate();
    
    const invoiceTemplate = document.getElementById('invoice-template');
    const previewContainer = document.getElementById('invoice-preview');
    
    // Temporarily save original styles and force full A4 size for capture quality
    const originalStyle = previewContainer.getAttribute('style'); 
    const originalTemplateFontSize = invoiceTemplate.style.fontSize;

    previewContainer.style.maxWidth = '794px'; 
    previewContainer.style.border = 'none';
    previewContainer.style.boxShadow = 'none';
    invoiceTemplate.style.fontSize = '10pt'; // Use the intended print font size

    // 2. Use html2canvas to convert the template element into an image (canvas)
    const canvas = await html2canvas(invoiceTemplate, { 
        scale: 4, 
        useCORS: true 
    });

    // 3. Revert styles immediately after canvas capture
    previewContainer.setAttribute('style', originalStyle);
    invoiceTemplate.style.fontSize = originalTemplateFontSize; 
    
    // 4. Create the PDF document
    const imgData = canvas.toDataURL('image/png');
    const pdf = new window.jspdf.jsPDF('p', 'mm', 'a4'); 
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imgHeight = (canvasHeight * pdfWidth) / canvasWidth;

    // 5. Add the image to the PDF
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);

    // 6. Download the PDF
    const invoiceNumber = invoiceNoInput.value || '0000';
    const customerNameSlug = customerNameInput.value.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20);
    const filename = `INVOICE_${invoiceNumber}_${customerNameSlug}.pdf`;
    
    pdf.save(filename);
}


// ==============================================
// 4. EVENT LISTENERS AND INITIALIZATION
// ==============================================

// Listener for the "Add Item" button
addItemButton.addEventListener('click', () => {
    addNewItemRow();
    calculateGrandTotals(); // Recalculate and sync after adding a row
});

// Listener for the "Generate PDF" button
generatePdfButton.addEventListener('click', generatePDF);

// Listener for deleting a line item (uses event delegation)
inputTableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const row = event.target.closest('tr');
        if (row) {
            row.remove();
            calculateGrandTotals(); // Recalculate and sync after removal
        }
    }
});

// Listener for header/meta data inputs to update the preview
document.querySelectorAll('#invoice-form input').forEach(input => {
    // Only target inputs outside the item table, as line item inputs call updateLineItemTotal -> calculateGrandTotals -> syncDataToPdfTemplate
    if (!input.closest('#input-items-table')) {
        input.addEventListener('input', syncDataToPdfTemplate);
    }
});


// Add initial rows based on the sample PDF
function initialize() {
    // Initial data from SIP DINE 05-11-25.xlsx - Table 1.csv (Invoice No: 5037, Date: 2025-12-06)
    addNewItemRow('CARROT', 3.00, 13);
    addNewItemRow('KIYAAR', 1.00, 32);
    addNewItemRow('TOMATO', 1.00, 10);
    addNewItemRow('BANANA', 1.00, 15);
    addNewItemRow('WATERMELON', 2.00, 12);
    addNewItemRow('MANGO', 2.00, 22);
    addNewItemRow('LEMON(CHANGE)', 1.00, 7);
    addNewItemRow('GREEN CHILLY', 1.00, 22);
    addNewItemRow('GINGER', 1.00, 14);
    
    // Perform initial calculation and sync to populate both the form and the preview
    calculateGrandTotals();
}

// Start the application
initialize();
