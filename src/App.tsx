import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Students from './pages/Students'
import Courses from './pages/Courses'
import Admissions from './pages/Admissions'
import Employees from './pages/Employees'
import Leave from './pages/Leave'
import Payroll from './pages/Payroll'
import Documents from './pages/Documents'
import Settings from './pages/Settings'
import Calendar from './pages/Calendar'
import FacultyDashboard from './pages/faculty/Dashboard'
import FacultyClasses from './pages/faculty/Classes'
import FacultyClassSection from './pages/faculty/ClassSection'
import FacultyAssessments from './pages/faculty/Assessments'
import FacultyAssessmentDetail from './pages/faculty/AssessmentDetail'
import FacultyForum from './pages/faculty/Forum'
import FacultyForumThread from './pages/faculty/ForumThread'
import FacultyGradebook from './pages/faculty/Gradebook'
import FacultyGradebookSection from './pages/faculty/GradebookSection'
import FacultyResources from './pages/faculty/Resources'
import FacultyCalendar from './pages/faculty/Calendar'
import FacultySettings from './pages/faculty/Settings'
import Reports from './pages/Reports'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          <Route path="/faculty/classes" element={<FacultyClasses />} />
          <Route path="/faculty/classes/:sectionId" element={<FacultyClassSection />} />
          <Route path="/faculty/assessments" element={<FacultyAssessments />} />
          <Route path="/faculty/assessments/:assessmentId" element={<FacultyAssessmentDetail />} />
          <Route path="/faculty/forum" element={<FacultyForum />} />
          <Route path="/faculty/forum/:threadId" element={<FacultyForumThread />} />
          <Route path="/faculty/gradebook" element={<FacultyGradebook />} />
          <Route path="/faculty/gradebook/:sectionId" element={<FacultyGradebookSection />} />
          <Route path="/faculty/resources" element={<FacultyResources />} />
          <Route path="/faculty/calendar" element={<FacultyCalendar />} />
          <Route path="/faculty/settings" element={<FacultySettings />} />
          <Route path="/classes" element={<FacultyClasses />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/students" element={<Students />} />
          <Route path="/admin/courses" element={<Courses />} />
          <Route path="/admin/admissions" element={<Admissions />} />
          <Route path="/admin/employees" element={<Employees />} />
          <Route path="/admin/leave" element={<Leave />} />
          <Route path="/admin/payroll" element={<Payroll />} />
          <Route path="/admin/resources" element={<Documents />} />
          <Route path="/admin/documents" element={<Documents />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/calendar" element={<Calendar />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/login" element={<Navigate to="/admin/login" replace />} />
          <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/users" element={<Navigate to="/admin/users" replace />} />
          <Route path="/students" element={<Navigate to="/admin/students" replace />} />
          <Route path="/courses" element={<Navigate to="/admin/courses" replace />} />
          <Route path="/admissions" element={<Navigate to="/admin/admissions" replace />} />
          <Route path="/employees" element={<Navigate to="/admin/employees" replace />} />
          <Route path="/leave" element={<Navigate to="/admin/leave" replace />} />
          <Route path="/payroll" element={<Navigate to="/admin/payroll" replace />} />
          <Route path="/resources" element={<Navigate to="/admin/resources" replace />} />
          <Route path="/documents" element={<Navigate to="/admin/documents" replace />} />
          <Route path="/reports" element={<Navigate to="/admin/reports" replace />} />
          <Route path="/calendar" element={<Navigate to="/admin/calendar" replace />} />
          <Route path="/settings" element={<Navigate to="/admin/settings" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
