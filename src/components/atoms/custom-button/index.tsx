'use client';
import React from 'react';
import { Button, ButtonProps } from '@mui/material';

export const CustomButton: React.FC<CustomButtonProps> = ({ label, ...props }) => {
  return (
    <Button variant="contained" {...props}>
      {label}
    </Button>
  );
};

interface CustomButtonProps extends ButtonProps {
  label: string;
}
