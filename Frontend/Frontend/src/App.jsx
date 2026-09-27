import { Navigate, Route, Routes } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/shared/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import { GuestOnly, RequireAuth } from './pages/shared/RouteGuards'
import NotFound from './pages/shared/NotFound'
import ProfilePage from './pages/shared/ProfilePage'
import StudentDashboard from './pages/student/StudentDashboard'
import StudentTrips from './pages/student/StudentTrips'
import TripDetails from './pages/student/TripDetails'
import StudentReservations from './pages/student/StudentReservations'
import BoardingPass from './pages/student/BoardingPass'
import LiveTracking from './pages/student/LiveTracking'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManagementPage from './pages/admin/ManagementPage'
import AdminReservations from './pages/admin/AdminReservations'
import AdminLive from './pages/admin/AdminLive'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import UserManagement from './pages/admin/UserManagement'
import DriverDashboard from './pages/driver/DriverDashboard'
import DriverTrip from './pages/driver/DriverTrip'
import GpsSimulator from './pages/driver/GpsSimulator'
import DriverHistory from './pages/driver/DriverHistory'
import StudentNotifications from './pages/student/StudentNotifications'
import StudentExtras from './pages/student/StudentExtras'
import SeatReservation from './pages/student/SeatReservation'
import TripHistory from './pages/student/TripHistory'
import StudentSeatMap from './pages/student/StudentSeatMap'
import StudentQRCode from './pages/student/StudentQRCode'
import StudentAnalytics from './pages/student/StudentAnalytics'
import PageLoader from './components/PageLoader'

export default function App(){
  return <>
    <PageLoader/>
    <Routes>
    <Route element={<PublicLayout/>}>
      <Route path="/" element={<LandingPage/>}/>
      <Route element={<GuestOnly/>}>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
      </Route>
    </Route>

    <Route element={<RequireAuth role="STUDENT"/>}>
      <Route element={<AppLayout/>}>
        <Route path="/student" element={<StudentDashboard/>}/>
        <Route path="/student/trips" element={<StudentTrips/>}/>
        <Route path="/student/trips/:id" element={<TripDetails/>}/>
        <Route path="/student/reservations" element={<StudentReservations/>}/>
        <Route path="/student/reservations/:id/pass" element={<BoardingPass/>}/>
        <Route path="/student/live" element={<LiveTracking/>}/>
        <Route path="/student/notifications" element={<StudentNotifications/>}/>
        <Route path="/student/tools" element={<StudentExtras/>}/>
        <Route path="/student/seats" element={<SeatReservation/>}/>
        <Route path="/student/history" element={<TripHistory/>}/>
        <Route path="/student/seat-map" element={<StudentSeatMap/>}/>
        <Route path="/student/qr" element={<StudentQRCode/>}/>
        <Route path="/student/analytics" element={<StudentAnalytics/>}/>
        <Route path="/student/profile" element={<ProfilePage/>}/>
      </Route>
    </Route>

    <Route element={<RequireAuth role="ADMIN"/>}>
      <Route element={<AppLayout/>}>
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/admin/buses" element={<ManagementPage type="buses"/>}/>
        <Route path="/admin/routes" element={<ManagementPage type="routes"/>}/>
        <Route path="/admin/trips" element={<ManagementPage type="trips"/>}/>
        <Route path="/admin/reservations" element={<AdminReservations/>}/>
        <Route path="/admin/live" element={<AdminLive/>}/>
        <Route path="/admin/analytics" element={<AdminAnalytics/>}/>
        <Route path="/admin/users" element={<UserManagement/>}/>
        <Route path="/admin/profile" element={<ProfilePage/>}/>
      </Route>
    </Route>

    <Route element={<RequireAuth role="DRIVER"/>}>
      <Route element={<AppLayout/>}>
        <Route path="/driver" element={<DriverDashboard/>}/>
        <Route path="/driver/trip" element={<DriverTrip/>}/>
        <Route path="/driver/tracking" element={<GpsSimulator/>}/>
        <Route path="/driver/history" element={<DriverHistory/>}/>
        <Route path="/driver/profile" element={<ProfilePage/>}/>
      </Route>
    </Route>
    <Route path="/dashboard" element={<Navigate to="/" replace/>}/>
    <Route path="*" element={<NotFound/>}/>
    </Routes>
  </>
}
