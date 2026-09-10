import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Banknote,
  CheckCircle2,
  MessageSquare,
  Phone,
  MapPin,
  Clock,
  ArrowLeft,
  Lock,
} from 'lucide-react';
import { CartItem, Branch, OrderType, PaymentMethod, OrderCheckoutData } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  selectedBranch: Branch;
  orderType: OrderType;
  onOrderSuccess: (order: OrderCheckoutData) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  selectedBranch,
  orderType,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const deliveryFee = orderType === 'delivery' ? RESTAURANT_INFO.deliveryFee : 0;
  const total = subtotal + deliveryFee;

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mpesa');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderCheckoutData | null>(null);

  // Generate WhatsApp Order Message
  const generateWhatsAppMessage = (orderRef: string) => {
    let msg = `*NEW ORDER — MAMBOZ CORNER BBQ*\n`;
    msg += `*Branch:* ${selectedBranch.name} (${selectedBranch.area})\n`;
    msg += `*Order Ref:* #${orderRef}\n`;
    msg += `*Order Type:* ${orderType.toUpperCase()}\n`;
    if (orderType === 'dine-in' && tableNumber) {
      msg += `*Table Number:* ${tableNumber}\n`;
    }
    if (orderType === 'delivery' && address) {
      msg += `*Delivery Address:* ${address}\n`;
    }
    msg += `*Customer:* ${customerName || 'Guest'} (${customerPhone})\n`;
    msg += `*Payment:* ${paymentMethod.toUpperCase()}\n\n`;
    msg += `*ITEMS:*\n`;

    items.forEach((item, i) => {
      const itemSub = item.item.price * item.quantity;
      msg += `${i + 1}. ${item.item.name} x${item.quantity} = ${itemSub.toLocaleString()}/= TZS`;
      if (item.spiceLevel) msg += ` (${item.spiceLevel})`;
      if (item.notes) msg += ` [Note: ${item.notes}]`;
      msg += `\n`;
    });

    msg += `\n*Subtotal:* ${subtotal.toLocaleString()}/= TZS\n`;
    if (deliveryFee > 0) {
      msg += `*Delivery Fee:* ${deliveryFee.toLocaleString()}/= TZS\n`;
    }
    msg += `*TOTAL PAYABLE:* ${total.toLocaleString()}/= TZS\n\n`;
    if (notes) msg += `*Special Note:* ${notes}\n\n`;
    msg += `Please confirm my order. Asante!`;
    return encodeURIComponent(msg);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please provide your name and phone number to complete the order.');
      return;
    }
    if (orderType === 'delivery' && !address.trim()) {
      alert('Please provide a delivery address in Dar es Salaam.');
      return;
    }

    setIsProcessing(true);

    // Simulate secure payment gateway verification
    setTimeout(() => {
      const orderRef = `MBZ-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: OrderCheckoutData = {
        orderId: orderRef,
        customerName,
        customerPhone,
        branchId: selectedBranch.id,
        orderType,
        tableNumber: orderType === 'dine-in' ? tableNumber : undefined,
        deliveryAddress: orderType === 'delivery' ? address : undefined,
        paymentMethod,
        paymentRefNumber: `TZS-${Date.now().toString().slice(-6)}`,
        notes,
        items,
        subtotal,
        deliveryFee,
        total,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setIsProcessing(false);
      setCompletedOrder(newOrder);
      onOrderSuccess(newOrder);
    }, 1200);
  };

  // SUCCESS CONFIRMATION VIEW
  if (completedOrder) {
    const waUrl = `https://wa.me/${selectedBranch.whatsappNumber}?text=${generateWhatsAppMessage(completedOrder.orderId)}`;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
        <div className="w-full max-w-lg bg-[#121316] border border-neutral-800 rounded-3xl p-5 sm:p-7 shadow-2xl text-center text-neutral-100 animate-in zoom-in-95 duration-200">
          
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/80">
            Order Successfully Placed
          </span>

          <h2 className="text-2xl font-extrabold text-white font-display mt-2">
            ASANTE SANA!
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1">
            Your order has been transmitted to <span className="text-amber-400 font-bold">{selectedBranch.name}</span>.
          </p>

          {/* Receipt Box */}
          <div className="mt-4 p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-left space-y-2">
            <div className="flex justify-between items-center text-xs pb-2 border-b border-neutral-800">
              <span className="text-neutral-400 font-semibold">Order Reference:</span>
              <span className="font-extrabold text-amber-400 font-display text-sm tracking-wider">
                #{completedOrder.orderId}
              </span>
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-neutral-400">Branch Location:</span>
              <span className="font-semibold text-white">{selectedBranch.area}</span>
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-neutral-400">Order Method:</span>
              <span className="font-semibold text-white capitalize">{completedOrder.orderType}</span>
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-neutral-400">Payment Selected:</span>
              <span className="font-semibold text-emerald-400 uppercase">{completedOrder.paymentMethod}</span>
            </div>

            <div className="flex justify-between text-sm font-extrabold pt-2 border-t border-neutral-800">
              <span className="text-neutral-300">Total Paid / Payable:</span>
              <span className="text-amber-400 font-display">{completedOrder.total.toLocaleString()}/= TZS</span>
            </div>
          </div>

          {/* WhatsApp Direct Dispatch Notice */}
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-neutral-300">
            <p className="flex items-center justify-center gap-1 text-emerald-400 font-bold mb-1">
              <MessageSquare className="w-3.5 h-3.5" />
              Direct Kitchen WhatsApp Dispatch
            </p>
            Tap below to open your order on WhatsApp with the {selectedBranch.area} branch manager for priority grill queue!
          </div>

          {/* Actions */}
          <div className="mt-5 space-y-2.5">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm tracking-wide shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              CONFIRM ON WHATSAPP
            </a>

            <div className="flex gap-2">
              <a
                href={`tel:${selectedBranch.primaryPhone}`}
                className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-bold text-xs border border-neutral-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                Call Branch
              </a>

              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs transition-colors"
              >
                Return to Menu
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // REGULAR CHECKOUT FORM
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[95vh] flex flex-col bg-[#121316] border-t sm:border border-neutral-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 text-neutral-100">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display uppercase">
                Secure Checkout
              </h2>
              <div className="text-xs text-neutral-400 flex items-center gap-1">
                <span>{selectedBranch.name}</span>
                <span>•</span>
                <span className="capitalize">{orderType}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* Order Summary Pill */}
          <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-300">
              Total Payable ({items.length} dishes):
            </span>
            <span className="text-base font-extrabold text-amber-400 font-display">
              {total.toLocaleString()}/= TZS
            </span>
          </div>

          {/* Section 1: Customer Info */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              1. Customer Details
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Juma Rashid"
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                  Phone Number (Tanzania) *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+255 7XX XXX XXX"
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Delivery address or Dine-in table */}
            {orderType === 'delivery' && (
              <div>
                <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                  Delivery Street Address / Landmark in Dar *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Haile Selassie Road, Masaki, near Shoppers"
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            )}

            {orderType === 'dine-in' && (
              <div>
                <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                  Table Number (At {selectedBranch.area})
                </label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="e.g. Table 14"
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            )}
          </div>

          {/* Section 2: Payment Method */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                2. Secure Payment Method
              </span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3 h-3" />
                256-Bit SSL Secured
              </span>
            </div>

            {/* Payment Method Cards */}
            <div className="grid grid-cols-2 gap-2">
              {/* M-Pesa */}
              <button
                type="button"
                onClick={() => setPaymentMethod('mpesa')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'mpesa'
                    ? 'bg-red-950/40 border-red-500 text-white shadow-sm'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-extrabold text-xs text-red-400">M-PESA</span>
                  <Smartphone className="w-4 h-4 text-red-400" />
                </div>
                <div className="text-[10px] text-neutral-400 mt-1">Vodacom Lipa Namba</div>
              </button>

              {/* Tigo Pesa */}
              <button
                type="button"
                onClick={() => setPaymentMethod('tigopesa')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'tigopesa'
                    ? 'bg-blue-950/40 border-blue-500 text-white shadow-sm'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-extrabold text-xs text-blue-400">TIGO PESA</span>
                  <Smartphone className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-[10px] text-neutral-400 mt-1">Lipa Kwa Simu</div>
              </button>

              {/* Credit / Debit Card */}
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-amber-950/40 border-amber-500 text-white shadow-sm'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-extrabold text-xs text-amber-400">VISA / MC</span>
                  <CreditCard className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-[10px] text-neutral-400 mt-1">Credit / Debit Card</div>
              </button>

              {/* Cash / Counter */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'cash'
                    ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-sm'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-extrabold text-xs text-emerald-400">CASH / TILL</span>
                  <Banknote className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-[10px] text-neutral-400 mt-1">Pay on Pickup/Counter</div>
              </button>
            </div>

            {/* Mobile Money Input */}
            {(paymentMethod === 'mpesa' || paymentMethod === 'tigopesa' || paymentMethod === 'airtel') && (
              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs">
                <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
                  Enter {paymentMethod.toUpperCase()} Number for Instant Push:
                </label>
                <input
                  type="tel"
                  value={mpesaNumber || customerPhone}
                  onChange={(e) => setMpesaNumber(e.target.value)}
                  placeholder="07XX XXX XXX"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <p className="text-[10px] text-neutral-400 mt-1">
                  You will receive a prompt on your handset to authorize {total.toLocaleString()}/= TZS.
                </p>
              </div>
            )}

            {/* Card Input Simulation */}
            {paymentMethod === 'card' && (
              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-2 text-xs">
                <div>
                  <label className="text-[10px] text-neutral-400 block mb-0.5">Card Number</label>
                  <input
                    type="text"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4000 1234 5678 9010"
                    className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-0.5">MM/YY</label>
                    <input
                      type="text"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="12/28"
                      className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-0.5">CVV</label>
                    <input
                      type="password"
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="•••"
                      className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Kitchen Notes */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
              Order Notes / Requests for Mamboz Kitchen:
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Pack extra chili sauce, well-done naan, hurry please"
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          {/* Sticky Bottom Action Buttons */}
          <div className="pt-3 border-t border-neutral-800 space-y-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-sm tracking-wide shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Securing Order & Authorizing...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>PAY & CONFIRM ORDER ({total.toLocaleString()}/= TZS)</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-neutral-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              Official Mamboz Corner BBQ Digital Checkout • Dar es Salaam
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
