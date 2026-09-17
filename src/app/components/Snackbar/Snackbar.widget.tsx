import * as React from "react";
import { CheckCircle, AlertTriangle, XCircle, X } from "lucide-react";
import { SnackbarProps } from "./Snackbar";

export const Snackbar = ({
  open,
  type,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  onClose,
  duration = 4000,
}: SnackbarProps) => {
  const [visible, setVisible] = React.useState(false);

  // Handle appearance
  React.useEffect(() => {
    if (open) {
      // Small delay allows the browser to render the
      // initial state before starting the transition.
      requestAnimationFrame(() => {
        setVisible(true);
      });
    } else {
      setVisible(false);
    }
  }, [open]);

  // Auto close normal notifications
  React.useEffect(() => {
    if (!open || onConfirm || onCancel) {
      return;
    }

    const timer = setTimeout(() => {
      setVisible(false);

      setTimeout(() => {
        onClose && onClose();
      }, 150);
    }, duration);

    return () => clearTimeout(timer);
  }, [open, onConfirm, onCancel, onClose, duration]);

  const config = {
    success: {
      icon: CheckCircle,
      title: "Success",
      iconColor: "text-green-500",
    },
    warning: {
      icon: AlertTriangle,
      title: "Warning",
      iconColor: "text-yellow-500",
    },
    error: {
      icon: XCircle,
      title: "Error",
      iconColor: "text-red-500",
    },
  };

  const { icon: Icon, title, iconColor } = config[type];

  const isInteractive = Boolean(onConfirm || onCancel);

  const closeSnackbar = () => {
    setVisible(false);

    setTimeout(() => {
      onClose && onClose();
    }, 200);
  };

  return (
    <div
      className={`
        fixed
        top-14
        left-1/2
        -translate-x-1/2
        z-[9999]
        w-[calc(100%-32px)]
        max-w-md
        transition-all
        duration-200
        ease-out
        ${
          open && visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }
      `}
    >
      <div
        className="
          bg-white
          rounded-xl
          shadow-2xl
          border
          border-gray-200
          overflow-hidden
        "
      >
        {/* Main notification */}
        <div className="flex items-start gap-3 p-4">
          <Icon
            size={23}
            strokeWidth={2.5}
            className={`shrink-0 mt-0.5 ${iconColor}`}
          />

          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-gray-900">{title}</p>

            <p className="text-sm font-semibold text-gray-700 mt-1 leading-5">
              {message}
            </p>
          </div>

          <button
            type="button"
            onClick={closeSnackbar}
            className="
              shrink-0
              text-gray-400
              hover:text-gray-700
              transition-colors
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Confirm / Cancel */}
        {isInteractive && (
          <div className="flex justify-end gap-2 px-4 pb-4">
            {onCancel && (
              <button
                type="button"
                onClick={() => {
                  onCancel();
                  closeSnackbar();
                }}
                className="
                  px-4
                  py-2
                  text-sm
                  font-bold
                  rounded-lg
                  border
                  border-gray-300
                  text-gray-700
                  hover:bg-gray-50
                  transition-colors
                "
              >
                {cancelText}
              </button>
            )}

            {onConfirm && (
              <button
                type="button"
                onClick={() => {
                  onConfirm();
                  closeSnackbar();
                }}
                className="
                  px-4
                  py-2
                  text-sm
                  font-bold
                  rounded-lg
                  bg-gray-900
                  text-white
                  hover:bg-gray-800
                  transition-colors
                "
              >
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Snackbar;
