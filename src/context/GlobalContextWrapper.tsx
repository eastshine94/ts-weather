import React from 'react';
import { ReactQueryProvider } from './react-query-provider';

interface GlobalContextWrapperProps {
  children: React.ReactNode;
}

export default function GlobalContextWrapper({
  children,
}: GlobalContextWrapperProps) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
