import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './contexts/AppContext'
import { Layout } from './components/layout/Layout'
import { LandingPage } from './pages/LandingPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { DecidePage } from './pages/DecidePage'
import { ChatPage } from './pages/ChatPage'
import { ResultPage } from './pages/ResultPage'
import { ProbingPage } from './pages/ProbingPage'
import { KnowledgePage } from './pages/KnowledgePage'
import { TheoriesPage } from './pages/TheoriesPage'
import { HistoryPage } from './pages/HistoryPage'
import { SettingsPage } from './pages/SettingsPage'
import { Toast } from './components/shared/Toast'

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/decide" element={<DecidePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/probing" element={<ProbingPage />} />
            <Route path="/result/:id" element={<ResultPage />} />
            <Route path="/knowledge" element={<KnowledgePage />} />
            <Route path="/beliefs" element={<KnowledgePage />} />
            <Route path="/theories" element={<TheoriesPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
        <Toast />
      </BrowserRouter>
    </AppProvider>
  )
}
