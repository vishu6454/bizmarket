import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ThemeProvider } from './components/contexts/ThemeContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import BusinessListing from './pages/BusinessListing'
import BusinessDetail from './pages/BusinessDetail'
import SellerDashboard from './pages/SellerDashboard'
import BuyerDashboard from './pages/BuyerDashboard'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import ListBusiness from './pages/ListBusiness'
import NotFound from './components/layout/NotFound'
import Profile from './pages/Profile'
import SuccessStories from './pages/SuccessStories'
import Pricing from './pages/Pricing'
import Blog from './pages/Blog'
import FAQ from './pages/FAQ'
import LegalDocuments from './pages/LegalDocuments'
import SupportCenter from './pages/SupportCenter'
import PaymentPage from './pages/PaymentPage'


function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<BusinessListing />} />
            <Route path="/business/:id" element={<BusinessDetail />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/list-business" element={<ListBusiness />} />
            <Route path="/edit-business/:id" element={<ListBusiness />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/legal" element={<LegalDocuments />} />
            <Route path="/support" element={<SupportCenter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App