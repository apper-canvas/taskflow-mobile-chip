import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import TasksPage from '@/components/pages/TasksPage'
import TodayPage from '@/components/pages/TodayPage'
import UpcomingPage from '@/components/pages/UpcomingPage'
import CompletedPage from '@/components/pages/CompletedPage'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TodayPage />} />
          <Route path="all" element={<TasksPage />} />
          <Route path="upcoming" element={<UpcomingPage />} />
          <Route path="completed" element={<CompletedPage />} />
        </Route>
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </div>
  )
}

export default App