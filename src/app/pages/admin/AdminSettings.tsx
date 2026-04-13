import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import AdminLayout from '../../components/AdminLayout';
import { Save, MessageCircle } from 'lucide-react';

export default function AdminSettings() {
  const { settings, updateSettings } = useApp();
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSettings({ whatsappNumber });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      alert('Error saving settings. Please try again.');
    }
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="max-w-2xl">
          <div className="bg-background border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 text-green-700 p-3 rounded-lg">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">WhatsApp Configuration</h2>
                <p className="text-sm text-muted-foreground">
                  Configure the WhatsApp number for customer orders
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2">WhatsApp Phone Number</label>
                <input
                  type="tel"
                  value={whatsappNumber}
                  onChange={e => setWhatsappNumber(e.target.value)}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded"
                  placeholder="+234801234567"
                  required
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Include country code (e.g., +234 for Nigeria)
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <h3 className="font-medium mb-2 text-blue-900">Preview</h3>
                <p className="text-sm text-blue-700">
                  When customers click "Order via WhatsApp", they will be redirected to:
                </p>
                <p className="text-sm font-mono mt-2 text-blue-900">
                  https://wa.me/{whatsappNumber.replace(/[^0-9]/g, '')}
                </p>
              </div>

              {saved && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded"
                >
                  Settings saved successfully!
                </motion.div>
              )}

              <button
                type="submit"
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-bold hover:bg-primary/90 transition-colors"
              >
                <Save className="w-5 h-5" />
                Save Settings
              </button>
            </form>
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-medium mb-2 text-yellow-900">Note</h3>
            <p className="text-sm text-yellow-700">
              Changes to the WhatsApp number will take effect immediately across the entire platform.
              Make sure to test the link after updating.
            </p>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
