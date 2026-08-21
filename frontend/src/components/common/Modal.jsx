import { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ abierto, onClose, titulo, children }) => {
  useEffect(() => {
    if (abierto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [abierto]);

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-neutral-900">{titulo}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
