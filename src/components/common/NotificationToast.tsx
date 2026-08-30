import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { notifications, removeToast } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-auto">
      {notifications.map((n) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />,
          info: <Info className="w-5 h-5 text-sky-400 flex-shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
        };

        const bgColors = {
          success: 'bg-emerald-950/90 border-emerald-500/40 text-emerald-100',
          error: 'bg-rose-950/90 border-rose-500/40 text-rose-100',
          info: 'bg-sky-950/90 border-sky-500/40 text-sky-100',
          warning: 'bg-amber-950/90 border-amber-500/40 text-amber-100'
        };

        return (
          <div
            key={n.id}
            className={`flex items-start justify-between gap-3 p-3.5 rounded-xl border backdrop-blur-md shadow-2xl animate-in slide-in-from-bottom-3 duration-300 ${bgColors[n.type]}`}
          >
            <div className="flex items-start gap-2.5">
              {icons[n.type]}
              <span className="text-xs font-medium leading-relaxed">{n.message}</span>
            </div>
            <button
              onClick={() => removeToast(n.id)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
