import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, MapPin, Bike, Utensils, Store } from 'lucide-react';
import { CartItem, Branch, OrderType } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  selectedBranch: Branch;
  onOpenBranchModal: () => void;
  orderType: OrderType;
  onSelectOrderType: (type: OrderType) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  selectedBranch,
  onOpenBranchModal,
  orderType,
  onSelectOrderType,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const deliveryFee = orderType === 'delivery' ? RESTAURANT_INFO.deliveryFee : 0;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#121316] border-l border-neutral-800 shadow-2xl flex flex-col text-neutral-100">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white font-display uppercase tracking-wide">
                  Your Order Cart
                </h2>
                <p className="text-xs text-neutral-400">
                  {items.length} {items.length === 1 ? 'dish' : 'dishes'} selected
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="p-2 text-neutral-400 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors text-xs"
                  title="Clear cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            
            {/* Branch Selector Bar */}
            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-neutral-400 uppercase font-semibold">Fulfilling Branch:</div>
                  <div className="font-bold text-white">{selectedBranch.name}</div>
                </div>
              </div>
              <button
                onClick={onOpenBranchModal}
                className="text-[11px] font-bold text-amber-400 hover:text-amber-300 underline underline-offset-2"
              >
                Switch
              </button>
            </div>

            {/* Order Type Toggle (Dine-in, Takeaway, Delivery) */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Select Order Type:
              </div>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-neutral-900 rounded-xl border border-neutral-800">
                <button
                  type="button"
                  onClick={() => onSelectOrderType('takeaway')}
                  className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs font-bold transition-colors ${
                    orderType === 'takeaway'
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Store className="w-4 h-4" />
                  <span>Takeaway</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectOrderType('delivery')}
                  className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs font-bold transition-colors ${
                    orderType === 'delivery'
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Bike className="w-4 h-4" />
                  <span>Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectOrderType('dine-in')}
                  className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs font-bold transition-colors ${
                    orderType === 'dine-in'
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Utensils className="w-4 h-4" />
                  <span>Dine-In</span>
                </button>
              </div>
            </div>

            {/* Cart Items List */}
            {items.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500">
                  <ShoppingBag className="w-8 h-8 text-neutral-600" />
                </div>
                <h3 className="text-sm font-bold text-neutral-200">Your cart is empty</h3>
                <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
                  Browse the menu and add your favorite flame-grilled Sekela, Mishkaki, or Dum Biryani.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((cartItem) => {
                  const itemTotal = cartItem.item.price * cartItem.quantity;
                  return (
                    <div
                      key={cartItem.item.id}
                      className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800/90 flex gap-3 items-center"
                    >
                      {/* Thumbnail */}
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-16 h-16 rounded-lg object-cover shrink-0 bg-neutral-950"
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-white truncate font-display">
                          {cartItem.item.name}
                        </h4>
                        <div className="text-xs font-extrabold text-amber-400 font-display mt-0.5">
                          {itemTotal.toLocaleString()}/= TZS
                        </div>
                        {cartItem.spiceLevel && (
                          <div className="text-[10px] text-neutral-400">
                            Spice: {cartItem.spiceLevel}
                          </div>
                        )}
                        {cartItem.notes && (
                          <div className="text-[10px] text-amber-300/80 italic truncate">
                            &ldquo;{cartItem.notes}&rdquo;
                          </div>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-neutral-950 border border-neutral-800 p-1 rounded-lg shrink-0">
                        <button
                          onClick={() => {
                            if (cartItem.quantity <= 1) {
                              onRemoveItem(cartItem.item.id);
                            } else {
                              onUpdateQuantity(cartItem.item.id, cartItem.quantity - 1);
                            }
                          }}
                          className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                          className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950 space-y-3">
              {/* Calculations */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-200">{subtotal.toLocaleString()}/= TZS</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between text-neutral-400">
                    <span>Dar es Salaam Delivery</span>
                    <span className="font-semibold text-neutral-200">{deliveryFee.toLocaleString()}/= TZS</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold text-white pt-1.5 border-t border-neutral-800">
                  <span>Grand Total</span>
                  <span className="text-amber-400 font-display text-base">{grandTotal.toLocaleString()}/= TZS</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-sm tracking-wide shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
