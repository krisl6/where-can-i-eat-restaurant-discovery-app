import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useUI } from '../../contexts/UIContext';

const Toast: React.FC = () => {
  const { toasts, removeToast } = useUI();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-3 bg-card border border-border rounded-lg shadow-lg p-4 min-w-[300px] animate-in slide-in-from-right"
        >
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />}
          <p className="text-sm text-foreground flex-1">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 rounded-full hover:bg-muted transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
