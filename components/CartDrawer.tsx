import React from 'react';
import { X, Trash2, CreditCard } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, onRemove }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      className={`fixed inset-0 z-[60] flex justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`relative w-full max-w-md bg-dark-800 h-full shadow-2xl border-l border-gray-800 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold font-heading">Your Cart</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 mt-20">
                <p>Your cart is empty.</p>
                <button
                  onClick={onClose}
                  className="mt-4 text-codered-500 hover:underline cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 bg-dark-700 p-4 rounded-lg">
                  <div className="w-20 h-20 bg-gray-800 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || `https://picsum.photos/200?random=${item.id}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-400">{item.category}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-codered-500 font-bold">${item.price.toLocaleString()}</span>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-gray-700 bg-dark-900">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400">Total</span>
              <span className="text-2xl font-bold font-heading">${total.toLocaleString()}</span>
            </div>
            <button
              disabled={cart.length === 0}
              className="w-full bg-codered-500 hover:bg-codered-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <CreditCard className="w-5 h-5" />
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;