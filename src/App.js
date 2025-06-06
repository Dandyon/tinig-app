import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Search, Bell, UserCircle, FileText, MessageSquare, Folder, Settings, CreditCard, History, BellRing, HelpCircle, LogOut, MapPin, Filter, Phone, ChevronDown, ChevronUp, Paperclip, Send, ThumbsUp, ThumbsDown, Download, Share2, Edit3, Eye, User, Briefcase, BookOpen, Globe, CheckSquare, Menu, X, RefreshCw, Sparkles, UploadCloud, Mail, Smartphone, Mic, Trash2, Edit, PlusCircle, Calendar, DollarSign, BarChart2, Users, Shield, Map, Info, AlignLeft, ListChecks, FileBadge, CheckCircle, Clock, Star, BriefcaseMedical, Building, ExternalLink, ShoppingCart } from 'lucide-react';

// --- Enhanced Mock Data ---
const legalAidProviders = [
  { 
    id: 1, 
    name: 'Legal Aid Center of Manila', 
    description: 'Provides free legal assistance to low-income individuals and communities in Manila.', 
    location: 'Manila', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Ph_map_manila_large.png', // Image link from the new data
    serviceType: 'General Legal Aid', 
    providerType: 'NGO' 
  },
  { 
    id: 2, 
    name: 'Community Legal Services of Quezon City', 
    description: 'Offers legal advice and representation in various areas of law, including family, labor, and criminal cases.', 
    location: 'Quezon City', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Ph_fil_quezon_city_barangay.png/1200px-Ph_fil_quezon_city_barangay.png', // Image link from the new data
    serviceType: 'Family Law Assistance', 
    providerType: 'Community Center' 
  },
  { 
    id: 3, 
    name: 'Public Attorney\'s Office - Makati', 
    description: 'Government agency providing free legal services to indigent clients in Makati.', 
    location: 'Makati', 
    image: 'https://www.researchgate.net/publication/264464884/figure/fig1/AS:267474847399985@1440782381418/Old-Makati-New-Makati-and-the-Fort-Bonifacio-area-map-created-by-the-author.png', // Image link from the new data
    serviceType: 'Criminal Defense', 
    providerType: 'Government Agency' 
  },
  { 
    id: 4, 
    name: 'Women\'s Legal Bureau (WLB)', 
    description: 'Specializes in legal assistance for women and children, focusing on issues like domestic violence and family law.', 
    location: 'Quezon City', 
    image: 'https://partnership.scphilippines.net/wp-content/uploads/2020/01/WLB-Logo.jpg', // Image link from the new data
    serviceType: 'Women & Children\'s Rights', 
    providerType: 'NGO' 
  },
  { 
    id: 5, 
    name: 'Environmental Legal Assistance Center (ELAC)', 
    description: 'Provides legal support for environmental protection and advocacy, representing communities affected by environmental issues.', 
    location: 'Palawan', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/70/ELAC_logo.jpg', // Image link from the new data
    serviceType: 'Environmental Law', 
    providerType: 'NGO' 
  },
  { 
    id: 6, 
    name: 'Indigenous Peoples Legal Assistance (IPLA)', 
    description: 'Offers legal aid to indigenous communities, focusing on land rights and cultural preservation.', 
    location: 'Mindanao', 
    image: 'https://cdn.prod.website-files.com/67aa8b2c819df91f90141c29/67e704819e1b08252714020a_IPLA_Logo2.png', // Image link from the new data
    serviceType: 'Indigenous Peoples Rights', 
    providerType: 'Community Organization' 
  },
  { 
    id: 7, 
    name: 'UP College of Law Office of Legal Aid (OLA)', 
    description: 'University-based legal aid clinic handling various cases for indigent clients.', 
    location: 'Quezon City', 
    image: 'https://law.upd.edu.ph/wp-content/uploads/2019/04/UP-Law-Center-955x1024.jpg', // Image link from the new data
    serviceType: 'General Legal Aid', 
    providerType: 'University Legal Clinic' 
  },
  { 
    id: 8, 
    name: 'Sentro ng Alternatibong Lingap Panligal (SALIGAN)', 
    description: 'Provides legal services for farmers, workers, urban poor, women, and local communities.', 
    location: 'Manila', 
    image: 'https://partnership.scphilippines.net/wp-content/uploads/2018/09/saligan.jpg', // Image link from the new data
    serviceType: 'Labor & Agrarian Reform', 
    providerType: 'NGO' 
  },
];


const lawyers = [
  { 
    id: 1, 
    name: 'Atty. Isabella Rodriguez', 
    type: 'Private', 
    specializations: ['Criminal Defense', 'Family Law'], 
    location: 'Metro Manila', 
    languages: ['English', 'Tagalog'], 
    rating: 4.8, 
    reviews: 120, 
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmVtYWxlJTIwbGF3eWVyJTIwYXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=100&h=100&q=80' // Existing image link
  },
  { 
    id: 2, 
    name: 'Atty. Benjamin "Ben" Carter', 
    type: 'Private', 
    specializations: ['Civil Litigation', 'Corporate Law'], 
    location: 'Cebu City', 
    languages: ['English', 'Cebuano'], 
    rating: 4.5, 
    reviews: 95, 
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMGxhd3llciUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80' // Existing image link
  },
  { 
    id: 3, 
    name: 'Atty. Sophia "Sophie" Chen-Lee', 
    type: 'Private', 
    specializations: ['Immigration Law', 'Human Rights Law'], 
    location: 'Davao City', 
    languages: ['English', 'Tagalog', 'Mandarin'], 
    rating: 4.9, 
    reviews: 150, 
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHBvcnRyYWl0JTIwYXNpYW4lMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80' // Existing image link
  },
  { 
    id: 4, 
    name: 'Atty. Ethan Santos', 
    type: 'Public', 
    specializations: ['Labor Law', 'Employment Disputes'], 
    location: 'Quezon City', 
    languages: ['English', 'Tagalog'], 
    rating: 4.2, 
    reviews: 75, 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvcnRyYWl0JTIwbWFsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80' // Existing image link
  },
  { 
    id: 5, 
    name: 'Atty. Maria Clara De Leon', 
    type: 'Private', 
    specializations: ['Family Law', 'Child Custody'], 
    location: 'Makati City', 
    languages: ['English', 'Tagalog'], 
    rating: 4.7, 
    reviews: 110, 
    image: 'https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHBvcnRyYWl0JTIwZmVtYWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=100&h=100&q=80' // Existing image link
  },
  { 
    id: 6, 
    name: 'Atty. Jose "Joey" Rizal', 
    type: 'Public', 
    specializations: ['Criminal Defense', 'Human Rights Law'], 
    location: 'Manila', 
    languages: ['English', 'Tagalog', 'Ilocano'], 
    rating: 4.0, 
    reviews: 60, 
    image: 'https://images.unsplash.com/photo-1590086782792-42dd2350140d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHBvcnRyYWl0JTIwbWFsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80' // Existing image link
  },
  { 
    id: 7, 
    name: 'Atty. Fatima Alonto', 
    type: 'Private', 
    specializations: ['Corporate Law', 'Mergers & Acquisitions'], 
    location: 'Taguig City', 
    languages: ['English', 'Tagalog', 'Arabic'], 
    rating: 4.6, 
    reviews: 88, 
    image: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHBvcnRyYWl0JTIwZmVtYWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=100&h=100&q=80' // Existing image link
  },
  { 
    id: 8, 
    name: 'Atty. Kenji Tanaka', 
    type: 'Private', 
    specializations: ['Intellectual Property', 'Tech Law'], 
    location: 'Cebu City', 
    languages: ['English', 'Japanese'], 
    rating: 4.4, 
    reviews: 70, 
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXNpYW4lMjBtYWxlJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&h=100&q=80' // Existing image link
  }
];



const documentTemplates = [
  { id: 1, name: 'Affidavit', icon: <FileText size={40} className="text-blue-600"/>, description: 'A written statement confirmed by oath or affirmation...' },
  { id: 2, name: 'Complaint/Petition', icon: <FileText size={40} className="text-green-600"/>, description: 'The initial document filed with a court...' },
  { id: 3, name: 'Contract', icon: <FileText size={40} className="text-purple-600"/>, description: 'A written or spoken agreement...' },
  { id: 4, name: 'Power of Attorney', icon: <FileText size={40} className="text-red-600"/>, description: 'A legal document giving one person power to act for another...' },
  { id: 5, name: 'Demand Letter', icon: <FileText size={40} className="text-yellow-600"/>, description: 'A formal letter demanding payment or action...' },
  { id: 6, name: 'Memorandum of Agreement', icon: <FileText size={40} className="text-indigo-600"/>, description: 'Outlines an agreement between parties...' },
];

const plans = [
    { name: 'Free', price: 'PHP 0', features: ['Legal Advice Chat (AI)', 'Document Creator (Basic Templates)'], color: 'bg-gray-100', popular: false, buttonText: 'Current Plan', caseLimit: 'Limited AI interactions' },
    { name: 'Basic', price: 'PHP 79', priceSuffix: 'per case', features: ['Legal Advice Chat (AI)', 'Document Creator (All Templates)', 'Case Filing Assistance + Tracker'], color: 'bg-blue-100', popular: true, buttonText: 'Choose Basic', caseLimit: '1 Case Included' },
    { name: 'Premium', price: 'PHP 129', priceSuffix: 'per case', features: ['Legal Advice Chat (AI)', 'Document Creator (All Templates)', 'Case Filing Assistance + Tracker', 'Legal Aid Expert Review (1 Document)', 'Guidance & Court Referral'], color: 'bg-indigo-100', popular: false, buttonText: 'Choose Premium', caseLimit: '1 Case Included, Priority Support' },
];
const additionalServices = [
    { name: 'Additional Consultation with Legal Aid Expert', price: 'PHP 79' },
    { name: 'Certificate of File Action (CFA) Generation', price: 'PHP 199' },
];

const TINIG_LOGO_URL = "https://i.ibb.co/Xxz3Qc7Z/Transparent-Flat.png"; 

// --- Helper function to call Gemini API (remains the same) ---
const callGeminiApi = async (prompt, chatHistory = []) => {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY; 
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  let contents = [...chatHistory, { role: "user", parts: [{ text: prompt }] }];
  const payload = { contents };

  try {
    const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!response.ok) { const errorBody = await response.text(); throw new Error(`API request failed: ${response.statusText} - ${errorBody}`);}
    const result = await response.json();
    if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) { return result.candidates[0].content.parts[0].text; } 
    else if (result.promptFeedback?.blockReason) { return `I'm sorry, I can't respond to that due to: ${result.promptFeedback.blockReasonMessage || result.promptFeedback.blockReason}.`;} 
    return "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) { console.error('Error calling Gemini API:', error); return "I'm having trouble connecting. Please try again in a moment."; }
};

// --- Main App Component ---
const App = () => {
  const [currentPage, setCurrentPage] = useState('onboarding');
  const [authFormType, setAuthFormType] = useState(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSchedulingModal, setShowSchedulingModal] = useState(false);
  const [schedulingTarget, setSchedulingTarget] = useState(null); 
  const [showBarangayInfoModal, setShowBarangayInfoModal] = useState(false);
  const [showCaseFormModal, setShowCaseFormModal] = useState(null); 
  const [showPaymentModal, setShowPaymentModal] = useState(false); // General payment modal
  const [showPaymentForFilingModal, setShowPaymentForFilingModal] = useState(false); // Specific for filing
  const [filingDataForPayment, setFilingDataForPayment] = useState(null); // To pass to payment modal

  const [user, setUser] = useState({ 
    name: 'Guest', email: 'guest@example.com', phone: '', address: '', birthday: '', language: 'English', 
    avatar: 'https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3Vlc3QlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=128&h=128&q=80',
    plan: 'Free' 
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

const navigateTo = (page, params = {}) => {
    setCurrentPage(page);
    if(params.authFormType) setAuthFormType(params.authFormType);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleLogin = (method = "Guest", formData = null) => { 
    setIsAuthenticated(true);
    const loggedInUser = {
        name: formData?.fullName || (method === "Guest" ? "Guest User" : "Sarah Palma"),
        email: formData?.email || (method === "Guest" ? "guest@example.com" : "sarah.palma@example.com"),
        phone: formData?.phone || '', address: '', birthday: '', language: user.language,
        avatar: method === "Guest" ? 'https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?auto=format&fit=crop&w=128&h=128&q=80' : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128&q=80',
        plan: user.plan };
    setUser(loggedInUser); navigateTo('home');
  };

const handleLogout = () => {
    setIsAuthenticated(false);
    setUser({ 
        name: 'Guest', email: 'guest@example.com', phone: '', address: '', birthday: '', language: 'English',
        avatar: 'https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3Vlc3QlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=128&h=128&q=80',
        plan: 'Free'
    });
    navigateTo('onboarding');
  };


  const setLanguage = (lang) => { setUser(prev => ({ ...prev, language: lang })); };
  const updateUserProfile = (updatedInfo) => { setUser(prev => ({ ...prev, ...updatedInfo })); };
  const openSchedulingModal = (targetType, item) => { setSchedulingTarget({ type: targetType, item }); setShowSchedulingModal(true); };


  const navLinks = [
    { name: 'Home', page: 'home' },
    { name: 'Legal Aid Directory', page: 'legalAidDirectory' },
    { name: 'Lawyer Directory', page: 'findLawyer' },
    { name: 'Legal Advice Chat (AI)', page: 'aiChat' },
    { name: 'Document Creator', page: 'documentCreator' },
    { name: 'Case Filing', page: 'filingTypeSelection' }, // Changed from Filing Guidance
    { name: 'Case Tracker', page: 'caseTracker' },
    { name: 'Support & FAQ', page: 'helpCenter' }, // Added to main nav as well
  ];

  const Header = () => (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src={TINIG_LOGO_URL} alt="TINIG Logo" className="h-20 w-auto cursor-pointer" onClick={() => navigateTo(isAuthenticated ? 'home' : 'onboarding')} />
          </div>
          {isAuthenticated && (
            <>
              <nav className="hidden md:flex space-x-3">
                {navLinks.map(link => (
                  <button key={link.page} onClick={() => navigateTo(link.page)}
                    className={`px-3 py-2 rounded-md text-xs lg:text-sm font-medium ${currentPage === link.page ? 'text-blue-600 underline' : 'text-gray-600 hover:text-blue-500'}`}>
                    {link.name}
                  </button>
                ))}
              </nav>
              <div className="hidden md:flex items-center space-x-4">
                <button className="text-gray-500 hover:text-blue-500 relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                </button>
                <button onClick={() => navigateTo('userProfile')} className="text-gray-500 hover:text-blue-500">
                  <img src={user.avatar} alt="User" className="w-8 h-8 rounded-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/32x32/cccccc/ffffff?text=U"; }}/>
                </button>
              </div>
            </>
          )}
          <div className="md:hidden flex items-center">
            {isAuthenticated && (
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-blue-500">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>
      </div>
      {isAuthenticated && isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => (
              <button key={link.page} onClick={() => navigateTo(link.page)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${currentPage === link.page ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}>
                {link.name}
              </button>
            ))}
             <button onClick={() => navigateTo('userProfile')}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                Profile & Settings
              </button>
          </nav>
        </div>
      )}
    </header>
  );

  const renderPage = () => {
    if (!isAuthenticated) {
      if (currentPage === 'onboarding') return <OnboardingPage navigateTo={navigateTo} setLanguage={setLanguage} handleLogin={handleLogin} />;
      if (currentPage === 'auth') return <AuthPage navigateTo={navigateTo} />;
      if (currentPage === 'authForm') return <AuthFormPage navigateTo={navigateTo} handleLogin={handleLogin} formType={authFormType} />;
      return <OnboardingPage navigateTo={navigateTo} setLanguage={setLanguage} handleLogin={handleLogin} />;
    }

    switch (currentPage) {
      case 'home': return <HomePage navigateTo={navigateTo} userName={user.name} />;
      case 'legalAidDirectory': return <LegalAidDirectoryPage navigateTo={navigateTo} openSchedulingModal={openSchedulingModal} />;
      case 'findLawyer': return <FindLawyerPage navigateTo={navigateTo} openSchedulingModal={openSchedulingModal} />;
      case 'aiChat': return <AIChatPage navigateTo={navigateTo} userAvatar={user.avatar} />;
      case 'documentCreator': return <DocumentCreatorPage navigateTo={navigateTo} />;
      case 'filingTypeSelection': return <FilingTypeSelectionPage navigateTo={navigateTo} setShowBarangayInfoModal={setShowBarangayInfoModal} />;
      case 'filingGuidance': return <FilingGuidancePage navigateTo={navigateTo} setShowCaseFormModal={setShowCaseFormModal} userPlan={user.plan} setShowPaymentForFilingModal={setShowPaymentForFilingModal} />;
      case 'barangayCaseInfo': return <BarangayCaseInfoPage navigateTo={navigateTo} />; 
      case 'caseTracker': return <CaseTrackerPage navigateTo={navigateTo} />;
      case 'userProfile': return <UserProfilePage navigateTo={navigateTo} user={user} handleLogout={handleLogout} />;
      case 'editProfile': return <EditProfilePage navigateTo={navigateTo} user={user} updateUserProfile={updateUserProfile} />;
      case 'savedDocuments': return <SavedDocumentsPage navigateTo={navigateTo} />;
      case 'helpCenter': return <HelpCenterPage navigateTo={navigateTo} />;
      case 'paymentMethods': return <PaymentMethodsPage navigateTo={navigateTo} setShowPaymentModal={setShowPaymentModal} />;
      case 'plansAndPricing': return <PlansAndPricingPage navigateTo={navigateTo} userPlan={user.plan} />;
      case 'contact': return <ContactPage navigateTo={navigateTo} />;
      case 'admin': return <AdminPage navigateTo={navigateTo} />;
      default: return <HomePage navigateTo={navigateTo} userName={user.name} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Header />
      <main className="pb-16">{renderPage()}</main>
      {isAuthenticated && <Footer navigateTo={navigateTo}/>}
      {showSchedulingModal && schedulingTarget && <SchedulingModal item={schedulingTarget.item} type={schedulingTarget.type} onClose={() => setShowSchedulingModal(false)} navigateTo={navigateTo} />}
      {showBarangayInfoModal && <BarangayCaseInfoModal onClose={() => setShowBarangayInfoModal(false)} />}
      {showCaseFormModal && <CaseFormModal formType={showCaseFormModal} onClose={() => setShowCaseFormModal(false)} />}
      {showPaymentModal && <AddPaymentMethodModal onClose={() => setShowPaymentModal(false)} />}
      {showPaymentForFilingModal && <PaymentForFilingModal data={filingDataForPayment} onClose={() => setShowPaymentForFilingModal(false)} onPaymentSuccess={() => { setShowPaymentForFilingModal(false); navigateTo('caseTracker', { newCase: true }); }} />}
    </div>
  );
};

// --- Authentication Flow Components ---
const OnboardingPage = ({ navigateTo, setLanguage, handleLogin }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const handleLanguageSelect = (lang) => { setSelectedLanguage(lang); setLanguage(lang); };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-600 p-4"> {/* Blue background */}
        <div className="w-full max-w-sm text-center bg-white p-8 rounded-xl shadow-2xl"> {/* Boxed */}
            <img src={TINIG_LOGO_URL} alt="TINIG Logo" className="mx-auto mb-6 h-26 w-auto object-contain" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x50/007BFF/FFFFFF?text=TINIG"; }} />
            <p className="text-gray-600 mb-8 px-4 text-sm">Truth, inclusion, narrative, integrity, and guidance. A voice for the unheard.</p>
            <div className="mb-8">
            <h2 className="text-md font-medium text-gray-700 mb-3">Language</h2>
            <div className="flex justify-center space-x-2">
                {['Filipino', 'English', 'Cebuano'].map(lang => (
                <button key={lang} onClick={() => handleLanguageSelect(lang)}
                    className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${selectedLanguage === lang ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}>
                    {lang}
                </button>
                ))}
            </div>
            </div>
            <button onClick={() => navigateTo('auth')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg mb-3 transition duration-150 text-sm">Sign Up / Log In</button>
            <button onClick={() => handleLogin('Guest')} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition duration-150 text-sm">Continue as Guest</button>
        </div>
    </div>
  );
};


const AuthPage = ({ navigateTo }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-600 p-4">
      <div className="w-full max-w-sm text-center bg-white p-8 rounded-xl shadow-2xl relative">
        {/* Logo at the top of the box content */}
        <img src={TINIG_LOGO_URL} alt="TINIG Logo" className="mx-auto mb-6 h-12 w-auto object-contain" />
        <button onClick={() => navigateTo('onboarding')} className="absolute top-4 left-4 text-gray-500 hover:text-blue-700">
            <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Get legal help in minutes</h2>
        {/* ... rest of AuthPage ... */}
        <p className="text-gray-500 mb-6 text-sm">Connect with lawyers, AI chat, and filing guidance in the Philippines.</p>
        <div className="space-y-3">
          <button onClick={() => navigateTo('authForm', { authFormType: 'email' })} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center text-sm"><Mail size={18} className="mr-2"/> Continue with Email</button>
          <button onClick={() => navigateTo('authForm', { authFormType: 'phone' })} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center text-sm"><Smartphone size={18} className="mr-2"/> Continue with Phone</button>
          <button onClick={() => navigateTo('authForm', { authFormType: 'social' })} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center text-sm"><Users size={18} className="mr-2"/> Continue with Social</button>
        </div>
        <p className="text-xs text-gray-400 mt-6">By continuing, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.</p>
      </div>
    </div>
  );
};

const AuthFormPage = ({ navigateTo, handleLogin, formType }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [isSignUp, setIsSignUp] = useState(true); // Default to Sign Up

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add basic validation if needed
        if (isSignUp && password !== confirmPassword && formType === 'email') {
            alert("Passwords do not match!");
            return;
        }
        // Mock login/signup
        handleLogin(formType, { email, phone, fullName: "New User" }); 
    };

    const title = isSignUp ? "Create your Account" : "Welcome Back!";

    if (formType === 'social') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-blue-600 p-4">
                <div className="w-full max-w-sm text-center bg-white p-8 rounded-xl shadow-2xl">
                    <img src={TINIG_LOGO_URL} alt="TINIG Logo" className="mx-auto mb-4 h-10 object-contain" />
                    <h2 className="text-xl font-semibold text-gray-700 mb-3">Connecting with Social Account...</h2>
                    <RefreshCw className="mx-auto h-12 w-12 text-blue-600 animate-spin my-4" />
                    <p className="text-gray-500 text-sm">Please wait while we securely connect your account.</p>
                    <button onClick={() => navigateTo('auth')} className="mt-6 text-sm text-blue-600 hover:underline">Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-600 p-4">
             <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-2xl">
                <button onClick={() => navigateTo('auth')} className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 z-10"> {/* Adjusted for visibility */}
                    <ChevronLeft size={24} />
                </button>
                <img src={TINIG_LOGO_URL} alt="TINIG Logo" className="mx-auto mb-4 h-10 object-contain" />
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-1">{title}</h2>
                <p className="text-center text-gray-500 text-sm mb-6">
                    {isSignUp ? "Let's get you started." : "Log in to continue."}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {formType === 'email' && (
                        <>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 input-std" />
                            </div>
                            {isSignUp && (
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                    <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 input-std" />
                                </div>
                            )}
                        </>
                    )}
                    {formType === 'phone' && (
                        <>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input type="tel" name="phone" id="phone" value={phone} onChange={e => setPhone(e.target.value)} required className="mt-1 block w-full px-3 py-2 input-std" placeholder="+63 9XX XXX XXXX"/>
                            </div>
                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">One-Time Pin (OTP)</label>
                                <input type="text" name="otp" id="otp" value={otp} onChange={e => setOtp(e.target.value)} required className="mt-1 block w-full px-3 py-2 input-std" maxLength="6" />
                                <button type="button" className="mt-1 text-xs text-blue-600 hover:underline">Resend OTP</button>
                            </div>
                        </>
                    )}
                    {!isSignUp && formType === 'email' && (
                        <div className="text-right">
                            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                        </div>
                    )}
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm">
                        {isSignUp ? 'Sign Up' : 'Log In'}
                    </button>
                    <div className="text-center">
                        <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-sm text-blue-600 hover:underline">
                            {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- Page Components ---
const HomePage = ({ navigateTo, userName }) => {
  // Using placeholder image URLs. Replace with your actual transparent PNGs.
const features = [
    { name: 'Consult a Lawyer', icon: 'https://cdn-icons-png.flaticon.com/128/1995/1995453.png', page: 'findLawyer', bgColor: 'bg-orange-50' },
    { name: 'Legal Aid Directory', icon: 'https://cdn-icons-png.flaticon.com/128/4252/4252360.png', page: 'legalAidDirectory', bgColor: 'bg-indigo-50' },
    { name: 'Legal Advice Chat (AI)', icon: 'https://cdn-icons-png.flaticon.com/128/589/589708.png', page: 'aiChat', bgColor: 'bg-amber-50' },
    { name: 'Document Creator', icon: 'https://cdn-icons-png.flaticon.com/128/9746/9746449.png', page: 'documentCreator', bgColor: 'bg-pink-50' },
    { name: 'File or Submit a Case', icon: 'https://cdn-icons-png.flaticon.com/128/3767/3767084.png', page: 'filingGuidance', bgColor: 'bg-purple-50' },
    { name: 'Help Center', icon: 'https://cdn-icons-png.flaticon.com/128/561/561127.png', page: 'helpCenter', bgColor: 'bg-yellow-50' }, // Support feature added here
];




  const homeGuidelines = [
    { title: "Ask AI", description: "Get instant answers to your legal questions from our AI assistant.", icon: <MessageSquare size={18} className="text-blue-500" /> },
    { title: "Find Help", description: "Browse directories for lawyers or legal aid organizations.", icon: <Search size={18} className="text-green-500" /> },
    { title: "Create Documents", description: "Generate common legal documents with AI assistance.", icon: <FileText size={18} className="text-purple-500" /> },
    { title: "File Your Case", description: "Get guidance on the case filing process, step-by-step.", icon: <Send size={18} className="text-red-500" /> },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Welcome back, {userName}!</h2>
      
      {/* Step-by-step Guidelines */}
      <div className="mb-12 p-6 bg-blue-50 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">How TINIG Can Help You:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {homeGuidelines.map((item, index) => (
            <div key={index} className="flex items-start p-3 bg-white rounded-md shadow-sm">
              <div className="flex-shrink-0 mr-3 mt-1">{item.icon}</div>
              <div>
                <h4 className="font-medium text-gray-700 text-sm">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {features.map((feature) => (
          <button key={feature.name} onClick={() => navigateTo(feature.page)}
            className={`p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center ${feature.bgColor} flex flex-col items-center justify-center`}>
            <img 
              src={feature.icon} 
              alt={feature.name} 
              className="w-16 h-16 mx-auto mb-3" // Adjusted size for potentially non-square icons
              onError={(e) => { 
                e.target.onerror = null; 
                const iconText = feature.name.substring(0, 2).toUpperCase();
                e.target.src = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect width='64' height='64' fill='%23${feature.bgColor.split('-')[1] || 'e5e7eb'}'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20px' fill='%23${feature.bgColor.includes('light') || feature.bgColor.includes('50') || feature.bgColor.includes('100') ? '4b5563' : 'ffffff'}'%3E${iconText}%3C/text%3E%3C/svg%3E`;
              }}
            />
            <h3 className="text-sm lg:text-md font-medium">{feature.name}</h3>
          </button>
        ))}
      </div>

      {/* Plans and Pricing Section */}
      <div className="py-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Plans & Pricing</h2>
            <p className="text-gray-500 text-sm">Choose a plan that works for you. Start for free!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
            {plans.map((plan) => (
                <div key={plan.name} className={`p-6 rounded-lg border ${plan.popular ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200'} ${plan.color} flex flex-col`}>
                    {plan.popular && <div className="text-xs text-center font-semibold text-blue-600 bg-blue-200 py-1 px-3 rounded-full mb-3 self-center">POPULAR</div>}
                    <h3 className="text-xl font-semibold text-gray-700 text-center">{plan.name}</h3>
                    <p className="text-3xl font-bold text-gray-800 text-center my-3">{plan.price} <span className="text-sm font-normal text-gray-500">{plan.priceSuffix}</span></p>
                    <ul className="space-y-2 text-sm text-gray-600 flex-grow mb-6">
                        {plan.features.map(feature => <li key={feature} className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2" /> {feature}</li>)}
                    </ul>
                    <p className="text-xs text-gray-500 text-center mb-4">{plan.caseLimit}</p>
                    <button onClick={() => navigateTo('plansAndPricing')} className={`w-full py-2 px-4 rounded-md font-semibold text-sm ${plan.name === 'Free' ? 'bg-gray-300 text-gray-700 cursor-default' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                        {plan.buttonText}
                    </button>
                </div>
            ))}
        </div>
        <div className="text-center mt-6">
            <a onClick={() => navigateTo('plansAndPricing')} className="text-blue-600 hover:underline text-sm cursor-pointer">View full plan details & add-ons</a>
        </div>
      </div>

    </div>
  );
};

const LegalAidDirectoryPage = ({ navigateTo, openSchedulingModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ location: '', serviceType: '', providerType: '' });
  const locations = [...new Set(legalAidProviders.map(p => p.location))].sort();
  const serviceTypes = [...new Set(legalAidProviders.map(p => p.serviceType))].sort();
  const providerTypes = [...new Set(legalAidProviders.map(p => p.providerType))].sort();
  const handleFilterChange = (e) => { setFilters(prev => ({ ...prev, [e.target.name]: e.target.value })); };
  const filteredProviders = legalAidProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filters.location === '' || provider.location === filters.location) &&
    (filters.serviceType === '' || provider.serviceType === filters.serviceType) &&
    (filters.providerType === '' || provider.providerType === filters.providerType)
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 p-6 bg-white rounded-lg shadow">
        {/* Search and Filters */}
        <div className="relative mb-4">
          <input type="text" placeholder="Search for legal aid services" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <select name="location" value={filters.location} onChange={handleFilterChange} className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
            <option value="">Location (All)</option>
            {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          <select name="serviceType" value={filters.serviceType} onChange={handleFilterChange} className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
            <option value="">Type of Service (All)</option>
            {serviceTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
          <select name="providerType" value={filters.providerType} onChange={handleFilterChange} className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
            <option value="">Provider Type (All)</option>
            {providerTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Legal Aid Providers ({filteredProviders.length})</h2>
      {filteredProviders.length > 0 ? (
        <div className="space-y-6">
          {filteredProviders.map(provider => (
            <div key={provider.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex-1 mb-4 sm:mb-0">
                <h3 className="text-xl font-semibold text-blue-600">{provider.name}</h3>
                <p className="text-gray-600 mt-1 text-sm">{provider.description}</p>
                <div className="mt-2 text-xs text-gray-500">
                  <span><MapPin size={12} className="inline mr-1"/>{provider.location}</span> | 
                  <span><Briefcase size={12} className="inline mx-1"/>{provider.serviceType}</span> | 
                  <span><UserCircle size={12} className="inline mx-1"/>{provider.providerType}</span>
                </div>
                 <div className="mt-3 space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-3 rounded-md inline-flex items-center text-xs">
                        <Phone size={12} className="mr-1" /> Call
                    </button>
                    <button onClick={() => openSchedulingModal('aid', provider)} className="bg-green-500 hover:bg-green-600 text-white font-medium py-1.5 px-3 rounded-md inline-flex items-center text-xs">
                        <Calendar size={12} className="mr-1" /> Schedule
                    </button>
                 </div>
              </div>
              <img src={provider.image} alt={provider.location} className="w-full sm:w-32 h-auto sm:h-24 rounded-lg object-cover shadow-sm ml-0 sm:ml-6" 
                   onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x100/cccccc/ffffff?text=Map"; }} />
            </div>
          ))}
        </div>
      ) : ( <p className="text-gray-600 text-center">No providers match your current filters.</p> )}
    </div>
  );
};

const FindLawyerPage = ({ navigateTo, openSchedulingModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ type: '', specialization: '', location: '', language: '', rating: '' });
  const lawyerTypes = ["Public", "Private"];
  const specializations = [...new Set(lawyers.flatMap(l => l.specializations))].sort();
  const locations = [...new Set(lawyers.map(l => l.location))].sort();
  const languages = [...new Set(lawyers.flatMap(l => l.languages))].sort();
  const ratingOptions = ["Any Rating", "4+ Stars", "3+ Stars", "2+ Stars"];
  const handleFilterChange = (e) => { setFilters(prev => ({ ...prev, [e.target.name]: e.target.value })); };
  const filteredLawyers = lawyers.filter(lawyer => {
    const nameMatch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = filters.type === '' || lawyer.type === filters.type;
    const specializationMatch = filters.specialization === '' || lawyer.specializations.includes(filters.specialization);
    const locationMatch = filters.location === '' || lawyer.location === filters.location;
    const languageMatch = filters.language === '' || lawyer.languages.includes(filters.language);
    let ratingMatch = true;
    if (filters.rating === "4+ Stars") ratingMatch = lawyer.rating >= 4;
    else if (filters.rating === "3+ Stars") ratingMatch = lawyer.rating >= 3;
    else if (filters.rating === "2+ Stars") ratingMatch = lawyer.rating >= 2;
    return nameMatch && typeMatch && specializationMatch && locationMatch && languageMatch && ratingMatch;
  });

  const StarRating = ({ rating }) => { 
    const fullStars = Math.floor(rating); const halfStar = rating % 1 !== 0; const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (<div className="flex items-center">{[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} size={14} className="text-yellow-400 fill-yellow-400"/>)}{halfStar && <Star key="half" size={14} className="text-yellow-400 fill-yellow-200"/>}{[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} size={14} className="text-gray-300"/>)}<span className="ml-1 text-xs text-gray-500">({rating.toFixed(1)})</span></div>);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <div className="mb-8 p-6 bg-white rounded-lg shadow">
        <div className="relative mb-4">
          <input type="text" placeholder="Search by name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <select name="type" value={filters.type} onChange={handleFilterChange} className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm">
            <option value="">Public vs. Private (All)</option>
            {lawyerTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
          <select name="specialization" value={filters.specialization} onChange={handleFilterChange} className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm">
            <option value="">Specialization (All)</option>
            {specializations.map(spec => <option key={spec} value={spec}>{spec}</option>)}
          </select>
          <select name="location" value={filters.location} onChange={handleFilterChange} className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm">
            <option value="">Location (All)</option>
            {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          <select name="language" value={filters.language} onChange={handleFilterChange} className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm">
            <option value="">Language (All)</option>
            {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>
          <select name="rating" value={filters.rating} onChange={handleFilterChange} className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm">
            {ratingOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Lawyers ({filteredLawyers.length})</h2>
      {filteredLawyers.length > 0 ? (
        <div className="space-y-6">
          {filteredLawyers.map(lawyer => (
            <div key={lawyer.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-start">
              <img src={lawyer.image} alt={lawyer.name} className="w-24 h-24 rounded-full object-cover mr-0 mb-4 sm:mr-6 sm:mb-0 shadow-sm flex-shrink-0" 
                   onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/cccccc/ffffff?text=Lawyer"; }}/>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-1">
                    <h3 className="text-xl font-semibold text-blue-600">{lawyer.name}</h3>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${lawyer.type === 'Public' ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700'}`}>{lawyer.type}</span>
                </div>
                <div className="flex items-center mb-1"><StarRating rating={lawyer.rating} /><span className="ml-2 text-xs text-gray-500">({lawyer.reviews} reviews)</span></div>
                <p className="text-gray-600 text-sm mb-1"><Briefcase size={14} className="inline mr-1 text-gray-500"/> {lawyer.specializations.join(', ')}</p>
                <p className="text-gray-600 text-sm mb-1"><MapPin size={14} className="inline mr-1 text-gray-500"/> {lawyer.location}</p>
                <p className="text-gray-600 text-sm mb-2"><Globe size={14} className="inline mr-1 text-gray-500"/> Speaks: {lawyer.languages.join(', ')}</p>
                <div className="mt-2 space-x-2">
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-1.5 px-3 rounded-md text-xs">Request Consultation</button>
                    <button onClick={() => openSchedulingModal('lawyer', lawyer)} className="bg-green-500 hover:bg-green-600 text-white font-medium py-1.5 px-3 rounded-md inline-flex items-center text-xs">
                        <Calendar size={12} className="mr-1" /> Schedule
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : ( <p className="text-gray-600 text-center">No lawyers match your current filters.</p> )}
    </div>
  );
};

const AIChatPage = ({ navigateTo, userAvatar }) => {
  const aiAvatar = 'https://images.unsplash.com/photo-1570753692288-95d17f17e76e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFpJTIwYXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=40&h=40&q=80';
  const initialAiMessage = "Hello there! I'm TINIG AI, your legal assistant. How can I help you today? You can describe your situation, or choose an option below to start.";
  const baseChoices = [ // General choices if no specific context
    { text: "Ask about a different topic", isGeneral: true },
    { text: "Help me find a lawyer", action: () => navigateTo('findLawyer') },
    { text: "Help me create a document", action: () => navigateTo('documentCreator') },
    { text: "Go to Home", action: () => navigateTo('home') },
  ];
  const initialChoices = [
    { text: "Landlord/Tenant Issues", followUpPrompt: "Okay, landlord/tenant issues. Could you specify if it's about: \n1. Eviction \n2. Unpaid Rent \n3. Lease Agreement \n4. Repairs & Maintenance \n5. Other (please specify)", nextChoicesKey: 'tenant' },
    { text: "Employment Matters", followUpPrompt: "Employment matters. Is this related to: \n1. Unfair Dismissal \n2. Salary/Wage Dispute \n3. Workplace Harassment \n4. Contract Issues \n5. Other (please specify)", nextChoicesKey: 'employment' },
    { text: "Family Law Concerns", followUpPrompt: "Family law. Are you looking for information on: \n1. Annulment/Divorce \n2. Child Custody/Support \n3. Domestic Violence \n4. Property Division \n5. Other (please specify)", nextChoicesKey: 'family' },
    ...baseChoices.slice(1) // Add general actions except "ask different topic"
  ];

  // More detailed follow-up choices (example structure)
  const followUpChoiceSets = {
    tenant: [ {text: "Eviction Process"}, {text: "My rights as a tenant"}, {text: "What about my security deposit?"}, ...baseChoices ],
    employment: [ {text: "What is unfair dismissal?"}, {text: "How to file a labor complaint?"}, {text: "Regarding my final pay..."}, ...baseChoices ],
    family: [ {text: "How to get a protection order?"}, {text: "Child support calculation basics"}, {text: "Grounds for annulment"}, ...baseChoices ],
    general: baseChoices,
  };

  const [messages, setMessages] = useState([{ sender: 'ai', text: initialAiMessage, avatar: aiAvatar, choices: initialChoices }]);
  const [chatHistory, setChatHistory] = useState([{ role: 'model', parts: [{ text: initialAiMessage }]}]); 
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false); 
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e, messageTextOverride = null, choiceMade = null) => {
    if (e) e.preventDefault();
    const currentMessageText = messageTextOverride || newMessage;
    if (currentMessageText.trim() === '') return;

    const userMessage = { sender: 'user', text: currentMessageText, avatar: userAvatar };
    setMessages(prev => [...prev.map(m => ({...m, choices: null})), userMessage]); 
    setNewMessage('');
    setIsLoading(true);

    const currentHistory = [...chatHistory, { role: "user", parts: [{ text: currentMessageText }] }];
    
    let aiResponseText;
    let nextChoices = followUpChoiceSets.general; // Default to general choices

    if (choiceMade && choiceMade.followUpPrompt) { 
        aiResponseText = choiceMade.followUpPrompt;
        if(choiceMade.nextChoicesKey && followUpChoiceSets[choiceMade.nextChoicesKey]) {
            nextChoices = followUpChoiceSets[choiceMade.nextChoicesKey];
        }
    } else {
        aiResponseText = await callGeminiApi(currentMessageText, chatHistory); 
        // Simplified logic to pick next choices based on AI response keywords
        if (aiResponseText.toLowerCase().includes("document") || aiResponseText.toLowerCase().includes("affidavit")) {
            nextChoices = [{ text: "Create Document Now", action: () => navigateTo('documentCreator') }, ...baseChoices];
        } else if (aiResponseText.toLowerCase().includes("lawyer") || aiResponseText.toLowerCase().includes("legal aid")) {
            nextChoices = [{ text: "Find a Lawyer", action: () => navigateTo('findLawyer')}, { text: "Find Legal Aid", action: () => navigateTo('legalAidDirectory')}, ...baseChoices];
        } else if (aiResponseText.toLowerCase().includes("eviction") || aiResponseText.toLowerCase().includes("lease")) {
            nextChoices = followUpChoiceSets.tenant;
        }
    }
    
    const aiMessage = { sender: 'ai', text: aiResponseText, avatar: aiAvatar, choices: nextChoices };
    setMessages(prev => [...prev, aiMessage]);
    setChatHistory([...currentHistory, { role: "model", parts: [{ text: aiResponseText }] }]);
    setIsLoading(false);
  };
  
  const handleChoiceClick = (choice) => {
    if (choice.action) {
        choice.action();
        // Optionally send a message like "Navigating to [Page]..."
        setMessages(prev => [...prev, { sender: 'ai', text: `Okay, let's go to ${choice.text.replace("Help me ", "").replace("Go to ","")}.`, avatar: aiAvatar, choices: followUpChoiceSets.general }]);
    } else {
        handleSendMessage(null, choice.text, choice); 
    }
  };

  const toggleListen = () => {
    if (isListening) {
      setIsListening(false);
      setNewMessage(prev => prev + " (dummy voice input)"); 
    } else {
      setIsListening(true);
      setTimeout(() => { 
          if (isListening) { 
            setIsListening(false);
            setNewMessage(prev => prev + " (recognized text)");
          }
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="p-4 border-b border-gray-200 flex items-center sticky top-0 bg-white z-10">
        <button onClick={() => navigateTo('home')} className="text-blue-600 hover:text-blue-800 mr-4"><ChevronLeft size={24} /></button>
        <h2 className="text-xl font-semibold text-gray-800">AI Legal Assistant</h2>
      </div>
      <div className="flex-grow p-4 sm:p-6 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} >
            <div className={`flex items-start ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'ai' && <img src={msg.avatar} alt="AI Avatar" className="w-8 h-8 rounded-full mr-2 sm:mr-3 flex-shrink-0 object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/A0AEC0/FFFFFF?text=AI"; }} />}
              <div className={`max-w-[75%] sm:max-w-[70%] px-3 py-2 sm:px-4 sm:py-3 rounded-xl shadow-sm ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
              {msg.sender === 'user' && <img src={msg.avatar} alt="User Avatar" className="w-8 h-8 rounded-full ml-2 sm:ml-3 flex-shrink-0 object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/4A5568/FFFFFF?text=U"; }} />}
            </div>
            {msg.sender === 'ai' && msg.choices && (
                <div className="mt-2 flex flex-wrap gap-2 ml-10">
                    {msg.choices.map((choice, idx) => (
                        <button key={idx} onClick={() => handleChoiceClick(choice)}
                            className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs px-3 py-1.5 rounded-full transition-colors">
                            {choice.text}
                        </button>
                    ))}
                </div>
            )}
          </div>
        ))}
        {isLoading && ( <div className="flex justify-start"><img src={aiAvatar} alt="AI Avatar" className="w-8 h-8 rounded-full mr-3 object-cover" /><div className="max-w-xs lg:max-w-md px-4 py-3 rounded-xl bg-gray-100 text-gray-800 rounded-bl-none"><p className="text-sm italic">AI is thinking...</p></div></div>)}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2 sm:space-x-3">
          <button type="button" onClick={toggleListen} className={`p-3 rounded-lg ${isListening ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`} title="Voice Input">
            <Mic size={20} />
          </button>
          <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder={isListening ? "Listening..." : "Type your message..."} className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm" disabled={isLoading}/>
          <button type="submit" className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300" disabled={isLoading || newMessage.trim() === ''}>
            {isLoading ? <RefreshCw size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </form>
      </div>
    </div>
  );
};

const DocumentCreatorPage = ({ navigateTo }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(documentTemplates[0]);
  const [formData, setFormData] = useState({ fullName: '', emailAddress: '', statementOfFacts: '', attorneyTemplate: '' });
  const [generatedDocumentText, setGeneratedDocumentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);
  const [outputLanguage, setOutputLanguage] = useState('English');
  const [showMarkupEditor, setShowMarkupEditor] = useState(false); 

  const languages = ['English', 'Filipino', 'Cebuano']; 

  const handleInputChange = (e) => { setFormData(prev => ({ ...prev, [e.target.id]: e.target.value })); };

  const generateInitialDraft = async () => {
    if (!selectedTemplate || !formData.statementOfFacts) { alert("Please select a template and provide a statement of facts."); return; }
    setIsLoading(true); setGeneratedDocumentText('');
    let prompt = `Draft a ${selectedTemplate.name} in ${outputLanguage} based on:\nFull Name: ${formData.fullName || 'N/A'}\nEmail: ${formData.emailAddress || 'N/A'}\nFacts: "${formData.statementOfFacts}".\n`;
    if (formData.attorneyTemplate.trim() !== '') {
        prompt += `Use the following attorney-provided template structure as a primary guide:\nTEMPLATE START\n${formData.attorneyTemplate}\nTEMPLATE END\nMake sure to fill in the details based on the facts provided. `;
    }
    prompt += `The document should be formal and suitable for legal purposes in the Philippines. Include placeholders like [Date], [Signature], etc., where appropriate. Structure the document with clear sections. If generating in Filipino or Cebuano, ensure accurate legal terminology for that language.`;
    
    const draft = await callGeminiApi(prompt);
    setGeneratedDocumentText(draft); setIsLoading(false);
  };
  
  const getAISuggestions = async () => { 
      if (!generatedDocumentText) { alert("Please generate or type a document first."); return; }
      setIsSuggestionLoading(true); setAiSuggestion('');
      const prompt = `Review this legal document text for improvement (clarity, completeness, legal phrasing). Type: ${selectedTemplate.name}. Content: "${generatedDocumentText}"`;
      const suggestion = await callGeminiApi(prompt);
      setAiSuggestion(suggestion); setIsSuggestionLoading(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Generate Legal Documents</h2>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">1. Select a Template</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {documentTemplates.map(template => ( <button key={template.id} onClick={() => setSelectedTemplate(template)} className={`p-3 border rounded-lg text-center transition-all duration-200 ${selectedTemplate.id === template.id ? 'border-blue-500 ring-2 ring-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400 hover:shadow-sm'}`}><div className="flex justify-center mb-1 text-blue-600">{React.cloneElement(template.icon, {size: 32})}</div><p className="text-xs font-medium text-gray-600">{template.name}</p></button> ))}
        </div>
      </div>

      {selectedTemplate && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-blue-700 mb-1">Overview: {selectedTemplate.name}</h3>
            <p className="text-gray-500 text-xs">{selectedTemplate.description}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-md font-medium text-gray-700 mb-2">2. Provide Basic Information</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label htmlFor="fullName" className="block text-xs font-medium text-gray-600">Full Name</label><input type="text" id="fullName" value={formData.fullName} onChange={handleInputChange} className="mt-1 block w-full p-2 input-std text-sm" /></div>
              <div><label htmlFor="emailAddress" className="block text-xs font-medium text-gray-600">Email</label><input type="email" id="emailAddress" value={formData.emailAddress} onChange={handleInputChange} className="mt-1 block w-full p-2 input-std text-sm" /></div>
              <div className="md:col-span-2"><label htmlFor="statementOfFacts" className="block text-xs font-medium text-gray-600">Brief Statement of Facts / Purpose</label><textarea id="statementOfFacts" value={formData.statementOfFacts} onChange={handleInputChange} rows="3" className="mt-1 block w-full p-2 input-std text-sm" placeholder="e.g., I need a demand letter for an unpaid debt..."></textarea></div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="attorneyTemplate" className="block text-xs font-medium text-gray-600">Attorney-Provided Template (Optional)</label>
            <textarea id="attorneyTemplate" value={formData.attorneyTemplate} onChange={handleInputChange} rows="3" className="mt-1 block w-full p-2 input-std text-sm" placeholder="Paste an existing template structure here for the AI to follow."></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="outputLanguage" className="block text-xs font-medium text-gray-700">Output Language</label>
            <select id="outputLanguage" value={outputLanguage} onChange={(e) => setOutputLanguage(e.target.value)} className="mt-1 block w-full p-2 input-std text-sm">
                {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
          </div>
          <div className="mb-6">
            <button onClick={generateInitialDraft} disabled={isLoading || !formData.statementOfFacts} className="btn-primary flex items-center disabled:bg-blue-300 text-sm"><Sparkles size={16} className="mr-2"/>{isLoading ? 'Generating...' : `Generate ${selectedTemplate.name} Draft`}</button>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-medium text-gray-700">3. Preview & Edit Document</h3>
              <button onClick={() => setShowMarkupEditor(!showMarkupEditor)} className="text-xs text-blue-600 hover:underline">{showMarkupEditor ? "Switch to Rich Text (Visual)" : "Switch to Markup (Advanced)"}</button>
            </div>
            {showMarkupEditor ? (
                 <textarea id="documentMarkupPreview" rows="12" className="w-full p-3 input-std font-mono text-xs" placeholder="Markup view (e.g., Markdown)..." value={generatedDocumentText} onChange={(e) => setGeneratedDocumentText(e.target.value)}></textarea>
            ) : (
                <textarea id="documentPreview" rows="12" className="w-full p-3 input-std text-sm" placeholder="Your document draft will appear here..." value={generatedDocumentText} onChange={(e) => setGeneratedDocumentText(e.target.value)}></textarea>
            )}
            <button onClick={getAISuggestions} disabled={isSuggestionLoading || !generatedDocumentText} className="mt-3 btn-secondary-alt flex items-center disabled:bg-green-300 text-xs"><Sparkles size={14} className="mr-1"/>{isSuggestionLoading ? 'Getting Suggestions...' : 'Get AI Suggestions'}</button>
            {aiSuggestion && (<div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-xs"><h4 className="font-semibold text-yellow-700 mb-1">AI Suggestions:</h4><p className="text-yellow-600 whitespace-pre-wrap">{aiSuggestion}</p></div>)}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-2">
                <button className="btn-secondary flex items-center text-sm"><Download size={14} className="mr-1"/> Save & Download PDF</button>
            </div>
            <button onClick={() => navigateTo('filingTypeSelection')} className="btn-primary flex items-center text-sm">Proceed to Case Filing <ChevronUp size={16} className="ml-1 transform rotate-90" /></button>
          </div>
        </div>
      )}
      <style jsx>{`
        .input-std { border: 1px solid #d1d5db; border-radius: 0.375rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
        .input-std:focus { outline: 2px solid transparent; outline-offset: 2px; border-color: #3b82f6; box-shadow: 0 0 0 2px #3b82f6; }
        .btn-primary { background-color: #2563eb; color: white; font-weight: 500; padding: 0.5rem 1rem; border-radius: 0.375rem; }
        .btn-primary:hover { background-color: #1d4ed8; }
        .btn-secondary { background-color: #10b981; color: white; font-weight: 500; padding: 0.5rem 1rem; border-radius: 0.375rem; }
        .btn-secondary:hover { background-color: #059669; }
        .btn-secondary-alt { background-color: #06b6d4; color: white; font-weight: 500; padding: 0.375rem 0.75rem; border-radius: 0.375rem; }
        .btn-secondary-alt:hover { background-color: #0891b2; }
      `}</style>
    </div>
  );
};

// --- Case Filing Flow Components ---
const FilingTypeSelectionPage = ({ navigateTo, setShowBarangayInfoModal }) => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="bg-white p-8 rounded-lg shadow-xl">
                <div className="text-center mb-6">
                    <Send size={48} className="mx-auto text-blue-600 mb-3" />
                    <h2 className="text-2xl font-semibold text-gray-800">Start Your Case Filing Process</h2>
                    <p className="text-gray-600 mt-2">Please select the type of case you intend to file.</p>
                </div>
                
                <div className="space-y-4">
                    <button 
                        onClick={() => navigateTo('filingGuidance', { caseType: 'barangay' })}
                        className="w-full flex flex-col items-center p-6 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors duration-150 text-left"
                    >
                        <h3 className="text-lg font-semibold text-blue-700">File a Barangay Level Case</h3>
                        <p className="text-sm text-blue-600 mt-1">For disputes covered by the Katarungang Pambarangay (Barangay Justice System).</p>
                    </button>

                    <button 
                        onClick={() => navigateTo('filingGuidance', { caseType: 'court' })}
                        className="w-full flex flex-col items-center p-6 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors duration-150 text-left"
                    >
                        <h3 className="text-lg font-semibold text-indigo-700">File Cases Not Covered by Barangay</h3>
                        <p className="text-sm text-indigo-600 mt-1">For cases that need to be filed directly with the courts (e.g., criminal cases not under KP, civil cases exceeding value limits).</p>
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <button 
                        onClick={() => setShowBarangayInfoModal(true)}
                        className="text-sm text-gray-600 hover:text-blue-700 hover:underline inline-flex items-center"
                    >
                        <Info size={16} className="mr-1.5" /> What cases are covered by the Barangay Justice System?
                    </button>
                </div>
                 <div className="mt-6 text-center">
                    <button onClick={() => navigateTo('home')} className="text-sm text-gray-500 hover:text-gray-700">
                        <ChevronLeft size={16} className="inline mr-1" /> Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};
const FilingGuidancePage = ({ navigateTo, setShowCaseFormModal }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4; // Adjusted steps for this prototype
  const [checkboxes, setCheckboxes] = useState({ validId: false, evidence: false, complaintAffidavit: false, barangayCert: false });
  const [agreementChecked, setAgreementChecked] = useState(false);

  const handleCheckboxChange = (e) => setCheckboxes({ ...checkboxes, [e.target.name]: e.target.checked });
  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const currentCaseType = new URLSearchParams(window.location.search).get('caseType') || 'court'; // Get caseType from URL or default

  const commonDocs = [
    { name: 'validId', label: 'Valid ID of Complainant' },
    { name: 'evidence', label: 'Relevant Evidence (Photos, Contracts, etc.)' },
    { name: 'complaintAffidavit', label: 'Complaint-Affidavit (Sinumpaang Salaysay)', formType: 'complaint_affidavit_form' },
  ];
  const barangaySpecificDocs = [
    { name: 'barangayCert', label: 'Certificate to File Action (from Barangay, if applicable)', formType: 'cfa_form' },
  ];
  const documentsForStep = currentCaseType === 'barangay' ? commonDocs : [...commonDocs, ...barangaySpecificDocs];


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-lg">
        <div className="p-5 border-b border-gray-200 flex items-center">
          <button onClick={() => navigateTo('filingTypeSelection')} className="text-blue-600 hover:text-blue-800 mr-3"><ChevronLeft size={22} /></button>
          <h2 className="text-xl font-semibold text-gray-800">Case Filing Guidance ({currentCaseType === 'barangay' ? 'Barangay Level' : 'Court Level'})</h2>
        </div>
        <div className="p-5">
          <p className="text-xs text-blue-600 font-medium mb-1">Step {step} of {totalSteps}</p>
          <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(step / totalSteps) * 100}%` }}></div></div>
        </div>
        <div className="p-5 min-h-[300px]">
          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">1. Prepare Necessary Documents</h3>
              <p className="text-gray-600 text-xs mb-3">Ensure you have the following documents ready. Click on a form name to see a sample.</p>
              <div className="space-y-2 mb-4">
                {documentsForStep.map(doc => (
                  <label key={doc.name} className="flex items-center p-2.5 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 cursor-pointer">
                    <input type="checkbox" name={doc.name} checked={checkboxes[doc.name]} onChange={handleCheckboxChange} className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                    <span className="ml-2.5 text-xs text-gray-700 flex-1">{doc.label}</span>
                    {doc.formType && <button onClick={() => setShowCaseFormModal(doc.formType)} className="text-xs text-blue-500 hover:underline ml-2">View Sample</button>}
                  </label>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">2. Understand the Process</h3>
              <p className="text-gray-600 text-xs mb-3">Familiarize yourself with the general steps involved in filing your case type.</p>
              <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                <li>{currentCaseType === 'barangay' ? 'Submit complaint to the Lupon Tagapamayapa.' : 'Draft and notarize your complaint/information.'}</li>
                <li>{currentCaseType === 'barangay' ? 'Attend mediation/conciliation hearings.' : 'Pay filing fees at the Office of the Clerk of Court (OCC).'}</li>
                <li>{currentCaseType === 'barangay' ? 'If unsettled, request a Certificate to File Action.' : 'Submit documents to the OCC.'}</li>
                <li>{currentCaseType === 'barangay' ? 'Use CFA to file case in court if needed.' : 'Await summons/notices from the court.'}</li>
              </ul>
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-xs text-yellow-700">
                <strong>Disclaimer:</strong> This is a simplified guide. Procedures may vary. It's highly recommended to consult a lawyer or visit the specific court/barangay hall for precise instructions.
              </div>
            </div>
          )}
          {step === 3 && (
             <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">3. Locate {currentCaseType === 'barangay' ? 'Your Barangay Hall' : 'the Appropriate Court'}</h3>
              <p className="text-gray-600 text-xs mb-3">Use our directory or an online map to find the contact details and address.</p>
              <button onClick={() => navigateTo(currentCaseType === 'barangay' ? 'legalAidDirectory' : 'findLawyer')} className="btn-secondary text-xs mb-3">
                <Map size={14} className="mr-1"/> Open Directory
              </button>
              <div className="bg-gray-200 h-40 rounded-lg flex items-center justify-center overflow-hidden">
                <img src="https://www.hatchwise.com/wp-content/uploads/2022/08/google-maps-satellite-1024x469.png" alt="Map Placeholder" className="rounded-md object-cover w-full h-full"/>
              </div>
            </div>
          )}
          {step === 4 && (
             <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">4. Agreement & Next Steps</h3>
              <p className="text-gray-600 text-xs mb-3">Please read and agree to the terms before proceeding.</p>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-600 mb-3 max-h-24 overflow-y-auto">
                <p>By proceeding, you acknowledge that TINIG provides general guidance and document generation assistance. It is not a law firm and does not provide legal advice. The information and tools provided are not a substitute for consultation with a qualified legal professional.</p>
                <p className="mt-1">You are responsible for the accuracy of the information you provide and for correctly filing your documents with the appropriate authorities. TINIG is not liable for any errors, omissions, or outcomes of your case.</p>
              </div>
              <label className="flex items-center p-2.5 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 cursor-pointer">
                <input type="checkbox" name="agreement" checked={agreementChecked} onChange={(e) => setAgreementChecked(e.target.checked)} className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                <span className="ml-2.5 text-xs text-gray-700">I have read, understood, and agree to the terms.</span>
              </label>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-200 flex justify-between">
          <button onClick={prevStep} disabled={step === 1} className="btn-secondary-outline text-xs disabled:opacity-50">Previous</button>
          {step < totalSteps ? 
            <button onClick={nextStep} className="btn-primary text-xs">Next</button>
            : <button onClick={() => { if(agreementChecked) { navigateTo('caseTracker', { newCase: true }); } else { alert("Please agree to the terms to proceed.");} }} 
                      disabled={!agreementChecked} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-lg text-xs disabled:opacity-50">
                Confirm & Proceed to Tracker
              </button>
          }
        </div>
      </div>
       <style jsx>{`
        .btn-primary { background-color: #2563eb; color: white; font-weight: 500; padding: 0.5rem 1rem; border-radius: 0.375rem; }
        .btn-primary:hover { background-color: #1d4ed8; }
        .btn-secondary { background-color: #10b981; color: white; font-weight: 500; padding: 0.5rem 1rem; border-radius: 0.375rem; }
        .btn-secondary:hover { background-color: #059669; }
        .btn-secondary-outline { background-color: transparent; color: #4b5563; border: 1px solid #d1d5db; font-weight: 500; padding: 0.5rem 1rem; border-radius: 0.375rem; }
        .btn-secondary-outline:hover { background-color: #f3f4f6; }
      `}</style>
    </div>
  );
};

// Placeholder for BarangayCaseInfoPage (can be expanded or remain a modal trigger)
const BarangayCaseInfoPage = ({ navigateTo }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => navigateTo('filingTypeSelection')} className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
                <ChevronLeft size={20} className="mr-1" /> Back to Filing Options
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Barangay Case Information</h2>
            <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-700">This page would contain detailed information about cases covered by the Katarungang Pambarangay, similar to the modal content, but perhaps more structured with links to resources or specific sections of R.A. 7160.</p>
                <p className="mt-4 text-sm text-gray-600">For now, please refer to the information provided in the modal accessible from the 'Case Filing Type Selection' screen.</p>
            </div>
        </div>
    );
};


const EditProfilePage = ({ navigateTo, user, updateUserProfile }) => {
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '', 
        phone: user.phone || '',
        address: user.address || '',
        birthday: user.birthday || '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
    const handleSubmit = (e) => { e.preventDefault(); /* ... validation ... */ updateUserProfile(formData); alert("Profile updated!"); navigateTo('userProfile'); };

    return (
        <div className="container mx-auto px-4 py-8 max-w-lg">
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <div className="flex items-center mb-6"><button onClick={() => navigateTo('userProfile')} className="text-blue-600 hover:text-blue-800 mr-3"><ChevronLeft size={24} /></button><h2 className="text-xl font-semibold text-gray-800">Edit Personal Information</h2></div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label><input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full input-std" /></div>
                    <div><label htmlFor="email_display" className="block text-sm font-medium text-gray-700">Email Address (Cannot be changed)</label><input type="email" name="email_display" id="email_display" value={formData.email} disabled className="mt-1 block w-full input-std bg-gray-100 cursor-not-allowed" /></div>
                    <div><label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label><input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full input-std" /></div>
                    <div><label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label><textarea name="address" id="address" value={formData.address} onChange={handleChange} rows="2" className="mt-1 block w-full input-std"></textarea></div>
                    <div><label htmlFor="birthday" className="block text-sm font-medium text-gray-700">Birthday</label><input type="date" name="birthday" id="birthday" value={formData.birthday} onChange={handleChange} className="mt-1 block w-full input-std" /></div>
                    <hr className="my-6"/>
                    <h3 className="text-md font-medium text-gray-700">Change Password</h3>
                    <div><label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label><input type="password" name="currentPassword" id="currentPassword" value={formData.currentPassword} onChange={handleChange} className="mt-1 block w-full input-std" /></div>
                    <div><label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label><input type="password" name="newPassword" id="newPassword" value={formData.newPassword} onChange={handleChange} className="mt-1 block w-full input-std" /></div>
                    <div><label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label><input type="password" name="confirmNewPassword" id="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} className="mt-1 block w-full input-std" /></div>
                    <div className="pt-2"><button type="submit" className="w-full btn-primary">Save Changes</button></div>
                </form>
            </div>
            <style jsx>{` .input-std { border: 1px solid #d1d5db; ...} .btn-primary { ...} `}</style>
        </div>
    );
};

// --- New Placeholder/Dummy Pages & Modals ---
const SavedDocumentsPage = ({ navigateTo }) => {
    const dummyDocs = [
        { id: 'doc1', name: 'Demand Letter - J. Dela Cruz', date: '2024-05-15', type: 'Demand Letter' },
        { id: 'doc2', name: 'Affidavit of Loss - ID', date: '2024-04-22', type: 'Affidavit' },
        { id: 'doc3', name: 'MOA - Project Phoenix', date: '2024-03-10', type: 'Memorandum of Agreement' },
    ];
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
                <button onClick={() => navigateTo('userProfile')} className="text-blue-600 hover:text-blue-800 mr-3"><ChevronLeft size={24} /></button>
                <h2 className="text-2xl font-semibold text-gray-800">Saved Documents</h2>
            </div>
            {dummyDocs.length > 0 ? (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <ul className="divide-y divide-gray-200">
                        {dummyDocs.map(doc => (
                            <li key={doc.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <div>
                                    <p className="text-md font-medium text-blue-600">{doc.name}</p>
                                    <p className="text-xs text-gray-500">Type: {doc.type} | Saved: {doc.date}</p>
                                </div>
                                <div className="mt-3 sm:mt-0 space-x-2">
                                    <button className="btn-secondary-outline text-xs"><Eye size={14} className="inline mr-1"/> View/Edit</button>
                                    <button className="btn-primary text-xs"><Download size={14} className="inline mr-1"/> Download</button>
                                    <button className="text-red-500 hover:text-red-700 text-xs p-1"><Trash2 size={14}/></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-gray-600 text-center py-10">You have no saved documents yet.</p>
            )}
             <style jsx>{`
                .btn-primary { background-color: #2563eb; color: white; font-weight: 500; padding: 0.5rem 0.75rem; border-radius: 0.375rem; }
                .btn-primary:hover { background-color: #1d4ed8; }
                .btn-secondary-outline { background-color: transparent; color: #4b5563; border: 1px solid #d1d5db; font-weight: 500; padding: 0.5rem 0.75rem; border-radius: 0.375rem; }
                .btn-secondary-outline:hover { background-color: #f3f4f6; }
            `}</style>
        </div>
    );
};

const HelpCenterPage = ({ navigateTo }) => {
    const faqCategories = [
        { name: "Getting Started", icon: <Sparkles size={18}/>, questions: ["How do I sign up?", "What is TINIG?", "Is my data secure?"] },
        { name: "AI Chat", icon: <MessageSquare size={18}/>, questions: ["How does the AI Chat work?", "What kind of legal questions can I ask?", "Is the AI advice legally binding? (No)"] },
        { name: "Document Creator", icon: <FileText size={18}/>, questions: ["How to generate a document?", "Can I upload my own templates?", "Are the documents legally valid?"] },
        { name: "Case Filing", icon: <Send size={18}/>, questions: ["What's the difference between Barangay and Court cases?", "How do I track my case?"] },
        { name: "Account & Billing", icon: <UserCircle size={18}/>, questions: ["How to change my plan?", "What payment methods are accepted?"] },
    ];
     const [openCategory, setOpenCategory] = useState(null);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
                 <button onClick={() => navigateTo('home')} className="text-blue-600 hover:text-blue-800 mr-3"><ChevronLeft size={24} /></button>
                <h2 className="text-2xl font-semibold text-gray-800">Help Center & FAQ</h2>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-6">
                    <input type="search" placeholder="Search for help..." className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm" />
                </div>
                <div className="space-y-3">
                    {faqCategories.map(category => (
                        <div key={category.name} className="border border-gray-200 rounded-md">
                            <button onClick={() => setOpenCategory(openCategory === category.name ? null : category.name)}
                                className="w-full flex justify-between items-center p-3 text-left hover:bg-gray-50">
                                <span className="font-medium text-gray-700 flex items-center"><span className="mr-2 text-blue-600">{category.icon}</span>{category.name}</span>
                                <ChevronDown size={20} className={`transform transition-transform ${openCategory === category.name ? 'rotate-180' : ''}`} />
                            </button>
                            {openCategory === category.name && (
                                <div className="p-3 border-t border-gray-200 bg-gray-50">
                                    <ul className="space-y-1.5 pl-4 list-disc list-inside text-xs text-gray-600">
                                        {category.questions.map(q => <li key={q} className="hover:text-blue-600 cursor-pointer">{q}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ContactPage = ({ navigateTo }) => {
    return (
         <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
                <button onClick={() => navigateTo('home')} className="text-blue-600 hover:text-blue-800 mr-3"><ChevronLeft size={24} /></button>
                <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Get in Touch</h3>
                    <p className="text-sm text-gray-600 mb-4">Have questions or need support? Reach out to us!</p>
                    <div className="space-y-3 text-sm">
                        <p className="flex items-center"><MapPin size={16} className="text-blue-600 mr-2"/> 123 Justicia St., Legal City, Metro Manila, Philippines</p>
                        <p className="flex items-center"><Phone size={16} className="text-blue-600 mr-2"/> +63 (2) 8888-4444</p>
                        <p className="flex items-center"><Mail size={16} className="text-blue-600 mr-2"/> support@tinig.ph</p>
                        <p className="flex items-center"><Clock size={16} className="text-blue-600 mr-2"/> Mon - Fri, 9:00 AM - 5:00 PM (PHT)</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Send us a Message</h3>
                    <form className="space-y-3">
                        <div><input type="text" placeholder="Your Name" className="w-full p-2.5 input-std text-sm"/></div>
                        <div><input type="email" placeholder="Your Email" className="w-full p-2.5 input-std text-sm"/></div>
                        <div><input type="text" placeholder="Subject" className="w-full p-2.5 input-std text-sm"/></div>
                        <div><textarea placeholder="Your Message" rows="4" className="w-full p-2.5 input-std text-sm"></textarea></div>
                        <div><button type="submit" className="btn-primary text-sm w-full">Send Message</button></div>
                    </form>
                </div>
            </div>
             <style jsx>{`
                .input-std { border: 1px solid #d1d5db; border-radius: 0.375rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
                .input-std:focus { outline: 2px solid transparent; outline-offset: 2px; border-color: #3b82f6; box-shadow: 0 0 0 2px #3b82f6; }
                .btn-primary { background-color: #2563eb; color: white; font-weight: 500; padding: 0.625rem 1rem; border-radius: 0.375rem; }
                .btn-primary:hover { background-color: #1d4ed8; }
            `}</style>
        </div>
    );
};

const PaymentMethodsPage = ({ navigateTo, setShowPaymentModal }) => {
    const [paymentMethods, setPaymentMethods] = useState([
        { id: 'pm1', type: 'GCash', details: '**** **** **89', default: true },
        { id: 'pm2', type: 'Credit Card', details: 'Visa **** **** **** 1234', default: false },
    ]);
     return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
                <button onClick={() => navigateTo('userProfile')} className="text-blue-600 hover:text-blue-800 mr-3"><ChevronLeft size={24} /></button>
                <h2 className="text-2xl font-semibold text-gray-800">Payment Methods</h2>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                 <button onClick={() => setShowPaymentModal(true)} className="w-full sm:w-auto btn-primary text-sm mb-6 flex items-center justify-center">
                    <PlusCircle size={16} className="mr-2"/> Add New Payment Method
                </button>
                {paymentMethods.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {paymentMethods.map(method => (
                            <li key={method.id} className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-gray-700">{method.type} {method.default && <span className="text-xs text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full ml-1">Default</span>}</p>
                                    <p className="text-xs text-gray-500">{method.details}</p>
                                </div>
                                <div className="space-x-2">
                                    {!method.default && <button className="text-xs text-blue-600 hover:underline">Set as Default</button>}
                                    <button className="text-red-500 hover:text-red-700 text-xs p-1"><Trash2 size={14}/></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : ( <p className="text-gray-500 text-sm text-center py-5">No payment methods added yet.</p> )}
            </div>
             <style jsx>{`
                .btn-primary { background-color: #2563eb; color: white; font-weight: 500; padding: 0.625rem 1rem; border-radius: 0.375rem; }
                .btn-primary:hover { background-color: #1d4ed8; }
            `}</style>
        </div>
    );
};

const AddPaymentMethodModal = ({ onClose }) => {
    // Basic modal structure
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Payment Method</h3>
                <div className="space-y-3">
                    <button className="w-full p-3 border rounded-md text-left text-sm hover:bg-gray-50">E-Wallets (GCash, Maya, etc.)</button>
                    <button className="w-full p-3 border rounded-md text-left text-sm hover:bg-gray-50">Credit/Debit Card</button>
                    {/* Add form fields based on selection here */}
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                    <button onClick={onClose} className="btn-secondary-outline text-sm">Cancel</button>
                    <button className="btn-primary text-sm">Add Method</button>
                </div>
            </div>
            <style jsx>{`
                .btn-primary { background-color: #2563eb; color: white; font-weight: 500; padding: 0.5rem 1rem; border-radius: 0.375rem; }
                .btn-primary:hover { background-color: #1d4ed8; }
                .btn-secondary-outline { background-color: transparent; color: #4b5563; border: 1px solid #d1d5db; font-weight: 500; padding: 0.5rem 1rem; border-radius: 0.375rem; }
                .btn-secondary-outline:hover { background-color: #f3f4f6; }
            `}</style>
        </div>
    );
};


const PlansAndPricingPage = ({ navigateTo, userPlan }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
                <button onClick={() => navigateTo('userProfile')} className="text-blue-600 hover:text-blue-800 mr-3"><ChevronLeft size={24} /></button>
                <h2 className="text-2xl font-semibold text-gray-800">Plans & Pricing</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <div key={plan.name} className={`p-6 rounded-lg border ${plan.popular ? 'border-blue-600 ring-2 ring-blue-500' : 'border-gray-200'} ${plan.color} flex flex-col`}>
                        {plan.popular && <div className="text-xs text-center font-semibold text-blue-600 bg-blue-200 py-1 px-3 rounded-full mb-3 self-center">POPULAR</div>}
                        <h3 className="text-xl font-semibold text-gray-700 text-center">{plan.name}</h3>
                        <p className="text-3xl font-bold text-gray-800 text-center my-3">{plan.price} <span className="text-sm font-normal text-gray-500">{plan.priceSuffix}</span></p>
                        <ul className="space-y-2 text-sm text-gray-600 flex-grow mb-6">
                            {plan.features.map(feature => <li key={feature} className="flex items-start"><CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" /> {feature}</li>)}
                        </ul>
                        <p className="text-xs text-gray-500 text-center mb-4">{plan.caseLimit}</p>
                        <button className={`w-full py-2 px-4 rounded-md font-semibold text-sm ${userPlan === plan.name ? 'bg-gray-300 text-gray-700 cursor-default' : (plan.name === 'Free' ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700')}`}>
                            {userPlan === plan.name ? 'Current Plan' : (plan.name === 'Free' ? 'Select Free Plan' : `Upgrade to ${plan.name}`)}
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-10 bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Additional Services (Pay-per-use)</h3>
                <ul className="divide-y divide-gray-200">
                    {additionalServices.map(service => (
                        <li key={service.name} className="py-3 flex justify-between items-center text-sm">
                            <span className="text-gray-600">{service.name}</span>
                            <span className="font-semibold text-gray-700">{service.price}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const AdminPage = ({ navigateTo }) => {
    // This is a placeholder admin page
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-blue-600 mb-2 flex items-center"><BarChart2 size={20} className="mr-2"/> Data Analytics</h3>
                    <p className="text-sm text-gray-600">View platform usage statistics, user demographics, popular features, etc. (Placeholder)</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-green-600 mb-2 flex items-center"><Users size={20} className="mr-2"/> User Management</h3>
                    <p className="text-sm text-gray-600">View, edit, or manage user accounts. Handle support tickets. (Placeholder - CRUD operations would be here)</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-purple-600 mb-2 flex items-center"><FileText size={20} className="mr-2"/> Content Management</h3>
                    <p className="text-sm text-gray-600">Manage FAQ content, document templates, legal information articles. (Placeholder)</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-red-600 mb-2 flex items-center"><Shield size={20} className="mr-2"/> Platform Settings & Security</h3>
                    <p className="text-sm text-gray-600">Configure AI parameters, manage API keys, view security logs. (Placeholder)</p>
                </div>
            </div>
        </div>
    );
};

const CaseTrackerPage = ({ navigateTo }) => {
    const dummyCase = { 
        id: 'CASE-TNG-2024-00123', 
        title: 'Small Claims - Unpaid Rent (PHP 15,000)', 
        filedOn: '2024-06-01',
        complainant: 'Juan Dela Cruz',
        respondent: 'Maria Santos',
        currentStatus: 'Pending Court Assignment',
        expectedNextStepDate: '2024-06-15',
        history: [
            { date: '2024-06-01', event: 'Case Filed Online via TINIG', details: 'Complaint and supporting documents submitted. Filing fee PHP 79 paid.' },
            { date: '2024-06-02', event: 'Initial Verification', details: 'Documents checked for completeness by TINIG system.' },
            { date: '2024-06-03', event: 'Submitted to Office of the Clerk of Court (OCC)', details: 'Case docketed. Awaiting assignment to a specific court branch.' },
        ],
        upcomingSteps: [
            { name: 'Court Assignment & Summons Issuance', estimated: 'Within 7-14 days' },
            { name: 'Preliminary Conference / Mediation', estimated: 'Approx. 30-45 days after summons' },
            { name: 'Hearing Dates (if needed)', estimated: 'Varies' },
            { name: 'Decision/Judgment', estimated: 'Varies' },
        ]
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="flex items-center mb-6">
                 <button onClick={() => navigateTo('home')} className="text-blue-600 hover:text-blue-800 mr-3"><ChevronLeft size={24} /></button>
                <h2 className="text-2xl font-semibold text-gray-800">Case Tracker</h2>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <div className="flex flex-col sm:flex-row justify-between items-start pb-4 border-b border-gray-200">
                    <div>
                        <h3 className="text-xl font-semibold text-blue-700">{dummyCase.title}</h3>
                        <p className="text-xs text-gray-500">Case ID: {dummyCase.id} | Filed On: {dummyCase.filedOn}</p>
                    </div>
                    <span className="mt-2 sm:mt-0 text-sm font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700 self-start sm:self-center">{dummyCase.currentStatus}</span>
                </div>

                <div className="py-4">
                    <h4 className="text-md font-semibold text-gray-700 mb-3">Case Details:</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                        <p><strong>Complainant:</strong> {dummyCase.complainant}</p>
                        <p><strong>Respondent:</strong> {dummyCase.respondent}</p>
                        <p><strong>Expected Next Update:</strong> {dummyCase.expectedNextStepDate}</p>
                    </div>
                </div>
                
                <div className="py-4 border-t border-gray-200">
                    <h4 className="text-md font-semibold text-gray-700 mb-3">Case History & Milestones:</h4>
                    <div className="space-y-4">
                        {dummyCase.history.map((entry, index) => (
                            <div key={index} className="flex">
                                <div className="flex flex-col items-center mr-3">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${index === dummyCase.history.length -1 ? 'bg-blue-500' : 'bg-green-500'}`}>
                                        <CheckCircle size={12} className="text-white"/>
                                    </div>
                                    {index < dummyCase.history.length - 1 && <div className="w-px h-full bg-gray-300 my-1"></div>}
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">{entry.date}</p>
                                    <p className="text-sm font-medium text-gray-700">{entry.event}</p>
                                    <p className="text-xs text-gray-600">{entry.details}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                 <div className="py-4 border-t border-gray-200">
                    <h4 className="text-md font-semibold text-gray-700 mb-3">Upcoming Steps (Estimated):</h4>
                     <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 pl-1">
                        {dummyCase.upcomingSteps.map(step => (
                            <li key={step.name}>{step.name} <span className="text-xs text-gray-500">({step.estimated})</span></li>
                        ))}
                    </ul>
                </div>
                 <div className="mt-6 text-center">
                    <button onClick={() => alert("Refresh Mock Data")} className="btn-secondary-outline text-xs mr-2">Refresh Status</button>
                    <button onClick={() => navigateTo('home')} className="btn-primary text-xs">Back to Dashboard</button>
                </div>
            </div>
             <style jsx>{`
                .btn-primary { background-color: #2563eb; ... }
                .btn-secondary-outline { background-color: transparent; ... }
            `}</style>
        </div>
    );
};

// --- Modals ---
const SchedulingModal = ({ item, type, onClose, navigateTo }) => {
    const targetName = type === 'lawyer' ? item.name : item.name;
    const contactInfo = type === 'lawyer' ? item.email : item.contact;
    const addressInfo = type === 'lawyer' ? item.officeAddress : item.address;
    const availableSlots = item.availableSlots || ['09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '02:00 PM - 03:00 PM'];
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [notes, setNotes] = useState('');

    const today = new Date().toISOString().split('T')[0];
    const oneMonthLater = new Date(new Date().setMonth(new Date().getMonth()+1)).toISOString().split('T')[0];


    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-5 rounded-lg shadow-xl w-full max-w-lg">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">Schedule Consultation</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
                </div>
                
                <div className="mb-4 p-3 bg-gray-50 rounded-md border">
                    <p className="text-sm font-medium text-blue-700">{targetName}</p>
                    <p className="text-xs text-gray-500">{type === 'lawyer' ? 'Lawyer' : 'Legal Aid Provider'}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1"><MapPin size={12} className="mr-1"/> {addressInfo}</p>
                    <p className="text-xs text-gray-500 flex items-center"><Mail size={12} className="mr-1"/> {contactInfo}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                        <label className="text-xs font-medium text-gray-700 block mb-1">Select Date</label>
                        <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} min={today} max={oneMonthLater} className="w-full input-std text-sm"/>
                        {/* Mock Calendar - for visual only */}
                        <div className="mt-2 p-2 border rounded-md text-xs text-center bg-gray-50">
                            <p className="font-semibold mb-1">{selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Mini Calendar Preview"}</p>
                            <div className="grid grid-cols-7 gap-0.5 text-gray-500">
                                {['S','M','T','W','T','F','S'].map(d=><span key={d} className="font-medium">{d}</span>)}
                                {/* Dummy days */}
                                {Array.from({length:35}).map((_,i) => <span key={i} className={`p-0.5 rounded ${(i+1)%8 === 0 ? 'bg-blue-100 text-blue-600':''}`}>{(i%30)+1 > 30 ? '' : (i%30)+1}</span> )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-700 block mb-1">Available Time Slots</label>
                        {selectedDate ? (
                            <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                                {availableSlots.map(slot => (
                                    <button key={slot} onClick={() => setSelectedSlot(slot)}
                                        className={`p-1.5 border rounded-md text-xs text-center transition-colors ${selectedSlot === slot ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-blue-100'}`}>
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        ) : <p className="text-xs text-gray-400 italic mt-1">Please select a date first.</p>}
                    </div>
                </div>
                
                <div>
                    <label className="text-xs font-medium text-gray-700 block mb-1">Reason for Consultation / Notes (Optional)</label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} rows="2" className="w-full input-std text-sm" placeholder="e.g., Urgent advice needed for eviction notice..."></textarea>
                </div>

                <div className="mt-5 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                    <button onClick={onClose} className="btn-secondary-outline text-sm w-full sm:w-auto">Cancel</button>
                    <button 
                        onClick={() => { 
                            if(!selectedDate || !selectedSlot) { alert("Please select date and time slot."); return; }
                            alert(`Consultation request sent for ${selectedDate} at ${selectedSlot} (Mock)!`); 
                            onClose(); 
                            navigateTo('documentCreator');
                        }} 
                        className="btn-primary text-sm w-full sm:w-auto"
                        disabled={!selectedDate || !selectedSlot}
                    >
                        Request Schedule & Prepare Docs
                    </button>
                </div>
            </div>
            <style jsx>{` .input-std { border: 1px solid #d1d5db; ...} .btn-primary { ... } .btn-secondary-outline { ... } `}</style>
        </div>
    );
};

const PaymentForFilingModal = ({ data, onClose, onPaymentSuccess }) => {
    const { amount = 79, description = "Case Filing Fee" } = data || {};
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-center">
                <ShoppingCart size={36} className="mx-auto text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Payment Required</h3>
                <p className="text-sm text-gray-600 mb-1">To proceed with case filing:</p>
                <p className="text-md font-medium text-gray-700 mb-3">{description}</p>
                <p className="text-2xl font-bold text-blue-700 mb-4">PHP {amount.toFixed(2)}</p>
                
                <div className="space-y-2 text-sm mb-5">
                    <p className="font-medium">Select Payment Method:</p>
                    <button className="w-full p-2.5 border rounded-md text-left hover:bg-gray-50">GCash / Maya</button>
                    <button className="w-full p-2.5 border rounded-md text-left hover:bg-gray-50">Credit/Debit Card</button>
                    <button className="w-full p-2.5 border rounded-md text-left hover:bg-gray-50">Bank Transfer</button>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <button onClick={onClose} className="btn-secondary-outline text-sm w-full sm:w-auto">Cancel Filing</button>
                    <button 
                        onClick={() => { 
                            alert(`Payment of PHP ${amount.toFixed(2)} successful (Mock)!`); 
                            onPaymentSuccess();
                        }} 
                        className="btn-primary text-sm w-full sm:w-auto"
                    >
                        Pay PHP {amount.toFixed(2)} Securely
                    </button>
                </div>
            </div>
            <style jsx>{` .btn-primary { ... } .btn-secondary-outline { ... } `}</style>
        </div>
    )
};


const BarangayCaseInfoModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Cases Covered by Katarungang Pambarangay</h3>
                <div className="text-xs text-gray-600 space-y-2 max-h-80 overflow-y-auto pr-2">
                    <p>The Katarungang Pambarangay (KP) Law (R.A. 7160) mandates conciliation at the barangay level for certain disputes before they can be filed in court. Generally, it covers:</p>
                    <ul className="list-disc list-inside pl-4 space-y-1">
                        <li>Disputes between individuals residing in the same city or municipality.</li>
                        <li>Offenses punishable by imprisonment not exceeding one (1) year or a fine not exceeding PHP 5,000.</li>
                        <li>Offenses where there is no private offended party (e.g., alarm and scandal).</li>
                        <li>Civil disputes (e.g., small claims, property disputes within certain value limits, family matters not involving annulment or legal separation).</li>
                    </ul>
                    <p className="font-medium mt-2">Common Examples:</p>
                    <ul className="list-disc list-inside pl-4 space-y-1">
                        <li>Slight physical injuries and threats</li>
                        <li>Oral defamation and slander</li>
                        <li>Damage to property (minor)</li>
                        <li>Unpaid debts (small amounts)</li>
                        <li>Boundary disputes between neighbors</li>
                    </ul>
                     <p className="font-medium mt-2">NOT Covered (Generally, file directly in court):</p>
                    <ul className="list-disc list-inside pl-4 space-y-1">
                        <li>Where one party is the government or any subdivision or instrumentality thereof.</li>
                        <li>Where one party is a public officer or employee, and the dispute relates to the performance of official duties.</li>
                        <li>Offenses punishable by imprisonment exceeding one (1) year or a fine exceeding PHP 5,000.</li>
                        <li>Offenses where there is no private offended party, unless the law specifically provides otherwise.</li>
                        <li>Where the dispute involves real properties located in different cities or municipalities (unless parties agree otherwise).</li>
                        <li>Disputes requiring urgent legal action (e.g., habeas corpus).</li>
                        <li>Labor disputes.</li>
                    </ul>
                    <p className="mt-3 text-red-600"><strong>Important:</strong> This is a general guide. It is best to consult with the Barangay Lupon or a lawyer for specific advice regarding your situation.</p>
                </div>
                <div className="mt-5 text-right">
                    <button onClick={onClose} className="btn-primary text-sm">Close</button>
                </div>
            </div>
             <style jsx>{` .btn-primary { background-color: #2563eb; color: white; ... } `}</style>
        </div>
    );
};

const CaseFormModal = ({ formType, onClose }) => {
    let title = "Sample Form";
    let content = <p>Sample content for the selected form will appear here.</p>;

    if (formType === 'complaint_affidavit_form') {
        title = "Sample Complaint-Affidavit";
        content = <div className="text-xs text-gray-700 space-y-1"><p><strong>REPUBLIKA NG PILIPINAS</strong><br/>LALAWIGAN/LUNSOD NG __________<br/>BARANGAY __________</p><p><strong>SINUMPAANG SALAYSAY NG PAGREREKLAMO</strong></p><p>Ako, si [Pangalan ng Nagrereklamo], may sapat na gulang, [Estado Sibil], naninirahan sa [Tirahan], matapos makapanumpa nang naaayon sa batas, ay nagsasalaysay ng mga sumusunod: ...</p><p><i>(Detailed statement of facts, allegations, and relief sought)</i></p><p>SA KATUNAYAN NG LAHAT NG ITO, ako ay lumagda sa ibaba nito ngayong ika-__ ng [Buwan], [Taon] dito sa [Lugar].</p><p>_________________________<br/>[Pangalan at Lagda ng Nagrereklamo]</p><p>NILAGDAAN AT SINUMPAAN sa harap ko...</p></div>;
    } else if (formType === 'cfa_form') {
        title = "Sample Certificate to File Action";
        content = <div className="text-xs text-gray-700 space-y-1"><p><strong>REPUBLIKA NG PILIPINAS</strong><br/>LALAWIGAN/LUNSOD NG __________<br/>BARANGAY __________</p><p><strong>TANGGAPAN NG LUPONG TAGAPAMAYAPA</strong></p><p><strong>KATIBAYAN UPANG MAKAPAGSAMPA NG AKSIYON</strong><br/>(CERTIFICATE TO FILE ACTION)</p><p>Ito ay nagpapatunay na: ... (Details of parties and failure of settlement) ...</p><p>NGAYONG ika-__ ng [Buwan], [Taon].</p><p>_________________________<br/>Punong Barangay/Lupon Chairman</p></div>;
    }

    return (
         <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-5 rounded-lg shadow-xl w-full max-w-lg">
                <h3 className="text-md font-semibold text-gray-800 mb-3">{title}</h3>
                <div className="border border-gray-200 p-3 rounded bg-gray-50 max-h-80 overflow-y-auto">
                    {content}
                </div>
                <div className="mt-4 text-xs text-red-600">Note: This is a simplified sample for informational purposes only. Actual forms may vary.</div>
                <div className="mt-4 text-right">
                    <button onClick={onClose} className="btn-primary text-sm">Close</button>
                </div>
            </div>
             <style jsx>{` .btn-primary { background-color: #2563eb; color: white; ... } `}</style>
        </div>
    );
};

const Footer = ({ navigateTo }) => (
  <footer className="bg-gray-800 text-white py-10 text-sm">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div><h5 className="font-semibold mb-2">TINIG</h5><p className="text-gray-400">Your Voice in Legal Matters...</p></div>
        <div><h5 className="font-semibold mb-2">Quick Links</h5><ul className="space-y-1"><li><a onClick={() => navigateTo('home')} className="text-gray-400 hover:text-white cursor-pointer">Home</a></li><li><a onClick={() => navigateTo('helpCenter')} className="text-gray-400 hover:text-white cursor-pointer">FAQ & Support</a></li><li><a onClick={() => navigateTo('contact')} className="text-gray-400 hover:text-white cursor-pointer">Contact Us</a></li><li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li><li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li></ul></div>
        <div><h5 className="font-semibold mb-2">Connect</h5><p className="text-gray-400">Follow us on social media.</p></div>
    </div>
    <div className="text-center text-gray-500 mt-8 pt-6 border-t border-gray-700">
      &copy; {new Date().getFullYear()} TINIG Platform. All rights reserved.
    </div>
  </footer>
);


const UserProfilePage = ({ navigateTo, user, handleLogout }) => {
  const profileUser = { name: user?.name || 'User', email: user?.email || 'user@example.com', avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=128&h=128&q=80', plan: user?.plan || 'Free' };
  const menuItems = {
    manage: [
      { name: 'Personal Info', icon: <User />, action: () => navigateTo('editProfile') },
      { name: 'Saved Documents', icon: <Folder />, action: () => navigateTo('savedDocuments') },
      { name: 'My Cases & Tracker', icon: <ListChecks />, action: () => navigateTo('caseTracker') },
      { name: 'Chat History', icon: <MessageSquare />, action: () => navigateTo('aiChat') }, // Could be a dedicated history page
    ],
    settings: [
      { name: 'Plans & Pricing', icon: <DollarSign/>, action: () => navigateTo('plansAndPricing') },
      { name: 'Payment Methods', icon: <CreditCard />, action: () => navigateTo('paymentMethods') },
      { name: 'Consultation History', icon: <History />, action: () => {/*navigateTo('consultationHistory')*/} },
      { name: 'Notifications', icon: <BellRing />, action: () => {/*navigateTo('notifications')*/} },
      { name: 'Help Center', icon: <HelpCircle />, action: () => navigateTo('helpCenter') },
      { name: 'Admin Dashboard', icon: <Settings />, action: () => navigateTo('admin'), adminOnly: true }, // Simple admin link
    ]
  };

  return (<div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-0"><div className="bg-gray-800 shadow-xl rounded-lg w-full max-w-md">
        <div className="p-4 sm:p-6 border-b border-gray-700 flex items-center"><button onClick={() => navigateTo('home')} className="text-blue-400 hover:text-blue-300 mr-4"><ChevronLeft size={24} /></button><h2 className="text-xl sm:text-2xl font-semibold">Account & Settings</h2></div>
        <div className="p-6 flex flex-col items-center border-b border-gray-700">
          <img src={profileUser.avatar} alt={profileUser.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-3 shadow-md object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/128x128/cccccc/ffffff?text=User"; }} />
          <h3 className="text-lg sm:text-xl font-semibold">{profileUser.name}</h3>
          <p className="text-xs text-blue-400 mb-1">{profileUser.email}</p>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-600 text-white">Plan: {profileUser.plan}</span>
        </div>
        <div className="p-2 sm:p-4 max-h-[50vh] overflow-y-auto">
          {Object.entries(menuItems).map(([sectionTitle, items]) => {
            const visibleItems = items.filter(item => !(item.adminOnly && profileUser.email !== 'admin@tinig.ph')); // Simple admin check
            if (visibleItems.length === 0) return null;
            return (
                <div key={sectionTitle} className="mb-3">
                <h4 className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">{sectionTitle}</h4>
                <ul className="space-y-0.5">
                    {visibleItems.map(item => (<li key={item.name}><button onClick={item.action} className="w-full flex items-center px-4 py-2.5 text-left text-sm text-gray-200 hover:bg-gray-700 rounded-lg transition-colors"><span className="text-gray-400 mr-3">{React.cloneElement(item.icon, { size: 18 })}</span><span className="flex-1">{item.name}</span><ChevronUp size={16} className="transform rotate-90 text-gray-500" /></button></li>))}
                </ul>
                </div>
            );
          })}
        </div>
        <div className="p-4 sm:p-5 border-t border-gray-700">
            <button onClick={handleLogout} className="w-full flex items-center justify-center py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-sm"><LogOut size={18} className="mr-2" /> Log Out</button>
        </div>
  </div></div>);};

export default App;

