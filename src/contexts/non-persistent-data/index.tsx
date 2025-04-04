'use client';
import { Alert, Snackbar } from '@mui/material';
import { createContext, FC, useCallback, useContext, useMemo, useState } from 'react';

interface NonPersistentDataProps {
  children: React.ReactNode;
}
interface IData {
  data: string[];
  parent: string;
}

interface NonPersistentDataContextType {
  data: IData[];
  increaseData: (newData: IData) => void;
  removeData: (id: string) => void;
  foundData: (id: string) => string | undefined;
  clearData: () => void;
}

const defaultContextValue: NonPersistentDataContextType = {
  data: [],
  increaseData: () => {},
  removeData: () => {},
  foundData: () => undefined,
  clearData: () => {},
};

export const NonPersistentDataContext =
  createContext<NonPersistentDataContextType>(defaultContextValue);

export const NonPersistentDataProvider: FC<NonPersistentDataProps> = ({ children }) => {
  const [data, setData] = useState<IData[]>([]);

  const increaseData = useCallback((newData: IData) => {
    setData((prevData) => [...prevData, newData]);
  }, []);

  const removeData = useCallback((parent: string) => {
    setData((prevData) => prevData.filter((item) => item.parent !== parent));
  }, []);

  const foundData = useCallback(
    (parent: string) => {
      const found = data.find((item) => item.parent === parent);
      return found ? found.data[0] : undefined;
    },
    [data],
  );

  const clearData = useCallback(() => {
    setData([]);
  }, []);

  const values = useMemo(
    () => ({ data, increaseData, removeData, foundData, clearData }),
    [data, increaseData, removeData, foundData, clearData],
  );

  return (
    <NonPersistentDataContext.Provider value={values}>{children}</NonPersistentDataContext.Provider>
  );
};

export const useNonPersistentData = () => useContext(NonPersistentDataContext);
