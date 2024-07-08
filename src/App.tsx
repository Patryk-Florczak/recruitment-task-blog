import { Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Dashboard from 'components/Dashboard/Dashboard';
import MainLayout from 'components/MainLayout';

const queryClient = new QueryClient()

function App() {
  return (
    <MainLayout>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </QueryClientProvider>
    </MainLayout>
  )
}

export default App
