import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { MenuButton } from '../components/MenuButton';
import { MenuDrawer } from '../components/MenuDrawer';
import { FeatureShowcaseModal } from '../components/FeatureShowcaseModal';

export const Landing = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

    return (
        <div className="relative min-h-screen overflow-hidden text-center flex flex-col items-center justify-center p-4">

            {/* Menu Button - Fixed Top Left */}
            <div style={{ position: 'fixed', top: '1.5rem', left: '1.5rem', zIndex: 100 }}>
                <MenuButton onClick={() => setShowMenu(true)} />
            </div>

            {/* Background Elements */}
            <div
                className="absolute top-0 left-0 w-full h-full -z-10"
                style={{
                    background: 'radial-gradient(circle at 15% 50%, rgba(46, 204, 113, 0.1), transparent 25%), radial-gradient(circle at 85% 30%, rgba(52, 152, 219, 0.1), transparent 25%)',
                    backgroundColor: 'var(--color-bg-body)'
                }}
            />
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-3xl opacity-20 bg-green-300 animate-blob"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-3xl opacity-20 bg-blue-300 animate-blob animation-delay-2000"></div>

            {/* Hero Section */}
            <div className="animate-fade-in mb-12 max-w-2xl px-4">
                <h1
                    className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
                    style={{ color: 'var(--color-primary)' }}
                >
                    Fresh Operations for <br />
                    <span className="text-brand">Fresh Business</span>
                </h1>
                <p className="text-lg md:text-xl text-muted mb-8 max-w-xl mx-auto">
                    The all-in-one digital command center for Nano Fresh Fruits & Vegetables. Create professional invoices, manage orders, and track growth.
                </p>
                <div className="flex gap-md justify-center">
                    <Button variant="gradient" size="lg" onClick={() => navigate('/invoice')}>
                        Launch Invoice Generator
                    </Button>
                    <Button variant="outline" size="lg">
                        View Documentation
                    </Button>
                </div>
            </div>

            {/* Feature Cards */}
            <div className="grid gap-8 md:grid-cols-2 max-w-4xl w-full animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Card variant="glass" className="flex flex-col items-center text-center p-8 hover:transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 text-3xl shadow-sm">
                        📄
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Instant Invoicing</h2>
                    <p className="text-muted mb-6">
                        Generate tax-compliant PDF invoices in seconds. Pre-filled data, automatic VAT calculations, and professional formatting.
                    </p>
                </Card>

                <Card variant="glass" className="flex flex-col items-center text-center p-8 opacity-75">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-3xl">
                        📈
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Analytics Dashboard</h2>
                    <p className="text-muted mb-6">
                        Track sales trends, inventory levels, and customer insights to make data-driven decisions. (Coming Soon)
                    </p>
                </Card>
            </div>

            <footer className="mt-16 text-muted text-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <p>© {new Date().getFullYear()} Nano Fresh Fruits & Vegetables. All system rights reserved.</p>
            </footer>

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
