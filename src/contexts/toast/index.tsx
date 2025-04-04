'use client';
import { Alert, Snackbar } from '@mui/material';
import { createContext, FC, useCallback, useContext, useMemo, useState } from 'react';

export enum Severity {
  error = 'error',
  success = 'success',
  warning = 'warning',
  info = 'info',
}

interface IDefineToast {
  text: string;
  severity: Severity;
}

export const ToastContext = createContext({
  defineToast: (values: IDefineToast) => {},
});

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<IDefineToast>({
    text: '',
    severity: Severity.info,
  });

  const defineToast = (values: IDefineToast) => {
    setOpen(true);
    setToast(values);
  };

  const values = useMemo(() => ({ defineToast }), [defineToast]);

  return (
    <ToastContext.Provider value={values}>
      {children}
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert
          onClose={() => setOpen(false)}
          severity={toast.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toast.text}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
