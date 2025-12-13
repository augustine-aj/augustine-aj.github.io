import { useState, useRef, useEffect } from 'react';
import { History, FileDown, Plus } from 'lucide-react';
import { initialInvoiceData, type InvoiceData } from '../types/Invoice';
import { InvoicePreview } from '../features/InvoicePreview';
import { InvoiceForm } from '../features/InvoiceForm';
import { Button } from '../components/Button';
import { InvoiceHistoryModal } from '../components/InvoiceHistoryModal';
import { MenuDrawer } from '../components/MenuDrawer';
import { FeatureShowcaseModal } from '../components/FeatureShowcaseModal';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {
    saveDraftInvoice,
    loadDraftInvoice,
    saveDownloadedInvoice,
    clearDraftInvoice,
    generateInvoiceId
} from '../utils/storage';

export const InvoiceGenerator = () => {
    const [data, setData] = useState<InvoiceData>(() => {
        // Load draft on initial mount
        const draft = loadDraftInvoice();
        if (draft) {
            return draft;
        }
        return { ...initialInvoiceData, id: generateInvoiceId() };
    });

    const printRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

    // Auto-save draft
    useEffect(() => {
        const timer = setTimeout(() => {
            if (data.isDraft) {
                saveDraftInvoice(data);
            }
        }, 2000); // Debounce 2 seconds

        return () => clearTimeout(timer);
    }, [data]);

    const handleUpdate = (newData: Partial<InvoiceData>) => {
        setData(prev => ({ ...prev, ...newData, isDraft: true }));
    };

    const calculateTotals = () => {
        const subtotal = data.items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
        const vatAmount = subtotal * data.vatRate;
        const total = subtotal + vatAmount;
        return { subtotal, vatAmount, total };
    };

    const handleNewInvoice = () => {
        if (confirm('Create a new invoice? Any unsaved changes will be lost.')) {
            clearDraftInvoice();
            setData({ ...initialInvoiceData, id: generateInvoiceId(), isDraft: true });
        }
    };

    const handleLoadInvoice = (invoice: InvoiceData) => {
        // Create a new draft based on the loaded invoice
        setData({ ...invoice, id: generateInvoiceId(), isDraft: true });
    };

    const generatePDF = async () => {
        if (!printRef.current) return;
        setIsGenerating(true);

        try {
            const invoiceTemplate = printRef.current;
            const previewContainer = invoiceTemplate.parentElement;

            if (!previewContainer) throw new Error("Preview container not found");

            const originalStyle = previewContainer.getAttribute('style');
            const originalTemplateFontSize = invoiceTemplate.style.fontSize;

            // Enforce A4 pixel width
            previewContainer.style.maxWidth = '794px';
            previewContainer.style.width = '794px';
            previewContainer.style.border = 'none';
            previewContainer.style.boxShadow = 'none';
            previewContainer.style.margin = '0';

            // Capture with html2canvas
            const canvas = await html2canvas(invoiceTemplate, {
                scale: 4,
                useCORS: true,
                logging: false,
                width: 794,
                windowWidth: 794
            });

            // Revert styles
            if (originalStyle) {
                previewContainer.setAttribute('style', originalStyle);
            } else {
                previewContainer.removeAttribute('style');
            }
            invoiceTemplate.style.fontSize = originalTemplateFontSize;

            // Generate PDF
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imgHeight = (canvasHeight * pdfWidth) / canvasWidth;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);

            const filename = `INVOICE_${data.invoiceNo}_${data.customer.businessName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 10)}.pdf`;
            pdf.save(filename);

            // Save to history and clear draft
            saveDownloadedInvoice(data);

            // Show success message
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);

            // Create new invoice after download
            setTimeout(() => {
                setData({ ...initialInvoiceData, id: generateInvoiceId(), isDraft: true });
            }, 500);

        } catch (err) {
            console.error("PDF Generation failed", err);
            alert("Failed to generate PDF");
        } finally {
            setIsGenerating(false);
            if (printRef.current && printRef.current.parentElement) {
                printRef.current.parentElement.removeAttribute('style');
            }
        }
    };

    return (
        <div className="container py-8">
            {/* Success Notification */}
            {showSuccess && (
                <div
                    style={{
                        position: 'fixed',
                        top: '2rem',
                        right: '2rem',
                        background: 'var(--gradient-success)',
                        color: 'white',
                        padding: '1rem 1.5rem',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-xl)',
                        zIndex: 1000,
                        animation: 'slideUp 0.3s ease-out',
                        fontWeight: 600
                    }}
                >
                    ✓ Invoice downloaded successfully!
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center mb-6 mobile-stack" style={{ gap: '1rem' }}>
                <h1 className="text-2xl font-bold mobile-text-center" style={{ margin: 0 }}>
                    Invoice Generator
                </h1>
                <div className="flex gap-2 mobile-full-width mobile-stack">
                    <Button
                        variant="ghost"
                        onClick={handleNewInvoice}
                        icon={<Plus size={20} />}
                        className="mobile-full-width"
                    >
                        New Invoice
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setShowHistory(true)}
                        icon={<History size={20} />}
                        className="mobile-full-width"
                    >
                        History
                    </Button>
                    <Button
                        variant="gradient"
                        onClick={generatePDF}
                        disabled={isGenerating}
                        loading={isGenerating}
                        icon={!isGenerating && <FileDown size={20} />}
                        className="mobile-full-width"
                    >
                        {isGenerating ? 'Generating...' : 'Download PDF'}
                    </Button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Side: Form */}
                <div className="w-full lg:w-1/2 p-4 bg-white rounded shadow h-fit overflow-y-auto max-h-screen mobile-p-2">
                    <InvoiceForm
                        data={data}
                        onUpdate={handleUpdate}
                        totals={calculateTotals()}
                    />
                </div>

                {/* Right Side: Live Preview */}
                <div className="w-full lg:w-1/2">
                    <div className="sticky top-4">
                        <h2 className="text-lg font-bold mb-2 text-gray-500 mobile-text-center">Live Preview</h2>
                        <div className="border rounded shadow-lg overflow-hidden bg-white">
                            <InvoicePreview data={data} ref={printRef} totals={calculateTotals()} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Invoice History Modal */}
            <InvoiceHistoryModal
                isOpen={showHistory}
                onClose={() => setShowHistory(false)}
                onLoadInvoice={handleLoadInvoice}
            />

            {/* Menu Drawer */}
            <MenuDrawer
                isOpen={showMenu}
                onClose={() => setShowMenu(false)}
                onFeatureClick={(featureId) => {
                    setSelectedFeature(featureId);
                    setShowMenu(false);
                }}
            />

            {/* Feature Showcase Modal */}
            <FeatureShowcaseModal
                isOpen={selectedFeature !== null}
                featureId={selectedFeature}
                onClose={() => setSelectedFeature(null)}
            />
        </div>
    );
};
