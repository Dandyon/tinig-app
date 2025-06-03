import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Search, Bell, UserCircle, FileText, MessageSquare, Folder, Settings, CreditCard, History, BellRing, HelpCircle, LogOut, MapPin, Filter, Phone, ChevronDown, ChevronUp, Paperclip, Send, ThumbsUp, ThumbsDown, Download, Share2, Edit3, Eye, User, Briefcase, BookOpen, Globe, CheckSquare, Menu, X, RefreshCw, Sparkles, UploadCloud, Mail, Smartphone, MessageCircle, Star } from 'lucide-react';

// --- Enhanced Mock Data ---
const legalAidProviders = [
  { id: 1, name: 'Legal Aid Center of Manila', description: 'Provides free legal assistance to low-income individuals and communities in Manila.', location: 'Manila', image: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Ph_map_manila_large.png', serviceType: 'General Legal Aid', providerType: 'NGO' },
  { id: 2, name: 'Community Legal Services of Quezon City', description: 'Offers legal advice and representation in various areas of law, including family, labor, and criminal cases.', location: 'Quezon City', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Ph_fil_quezon_city_barangay.png/1200px-Ph_fil_quezon_city_barangay.png', serviceType: 'Family Law Assistance', providerType: 'Community Center' },
  { id: 3, name: 'Public Attorney\'s Office - Makati', description: 'Government agency providing free legal services to indigent clients in Makati.', location: 'Makati', image: 'https://www.researchgate.net/publication/264464884/figure/fig1/AS:267474847399985@1440782381418/Old-Makati-New-Makati-and-the-Fort-Bonifacio-area-map-created-by-the-author.png', serviceType: 'Criminal Defense', providerType: 'Government Agency' },
  { id: 4, name: 'Women\'s Legal Bureau (WLB)', description: 'Specializes in legal assistance for women and children, focusing on issues like domestic violence and family law.', location: 'Quezon City', image: 'https://partnership.scphilippines.net/wp-content/uploads/2020/01/WLB-Logo.jpg', serviceType: 'Women & Children\'s Rights', providerType: 'NGO' },
  { id: 5, name: 'Environmental Legal Assistance Center (ELAC)', description: 'Provides legal support for environmental protection and advocacy, representing communities affected by environmental issues.', location: 'Palawan', image: 'https://upload.wikimedia.org/wikipedia/commons/7/70/ELAC_logo.jpg', serviceType: 'Environmental Law', providerType: 'NGO' },
  { id: 6, name: 'Indigenous Peoples Legal Assistance (IPLA)', description: 'Offers legal aid to indigenous communities, focusing on land rights and cultural preservation.', location: 'Mindanao', image: 'https://cdn.prod.website-files.com/67aa8b2c819df91f90141c29/67e704819e1b08252714020a_IPLA_Logo2.png', serviceType: 'Indigenous Peoples Rights', providerType: 'Community Organization' },
  { id: 7, name: 'UP College of Law Office of Legal Aid (OLA)', description: 'University-based legal aid clinic handling various cases for indigent clients.', location: 'Quezon City', image: 'https://law.upd.edu.ph/wp-content/uploads/2019/04/UP-Law-Center-955x1024.jpg', serviceType: 'General Legal Aid', providerType: 'University Legal Clinic' },
  { id: 8, name: 'Sentro ng Alternatibong Lingap Panligal (SALIGAN)', description: 'Provides legal services for farmers, workers, urban poor, women, and local communities.', location: 'Manila', image: 'https://partnership.scphilippines.net/wp-content/uploads/2018/09/saligan.jpg', serviceType: 'Labor & Agrarian Reform', providerType: 'NGO' },
];

const lawyers = [
  { id: 1, name: 'Atty. Isabella Rodriguez', type: 'Private', specializations: ['Criminal Defense', 'Family Law'], location: 'Metro Manila', languages: ['English', 'Tagalog'], rating: 4.8, reviews: 120, image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmVtYWxlJTIwbGF3eWVyJTIwYXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 2, name: 'Atty. Benjamin "Ben" Carter', type: 'Private', specializations: ['Civil Litigation', 'Corporate Law'], location: 'Cebu City', languages: ['English', 'Cebuano'], rating: 4.5, reviews: 95, image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMGxhd3llciUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 3, name: 'Atty. Sophia "Sophie" Chen-Lee', type: 'Private', specializations: ['Immigration Law', 'Human Rights Law'], location: 'Davao City', languages: ['English', 'Tagalog', 'Mandarin'], rating: 4.9, reviews: 150, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHBvcnRyYWl0JTIwYXNpYW4lMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 4, name: 'Atty. Ethan Santos', type: 'Public', specializations: ['Labor Law', 'Employment Disputes'], location: 'Quezon City', languages: ['English', 'Tagalog'], rating: 4.2, reviews: 75, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvcnRyYWl0JTIwbWFsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 5, name: 'Atty. Maria Clara De Leon', type: 'Private', specializations: ['Family Law', 'Child Custody'], location: 'Makati City', languages: ['English', 'Tagalog'], rating: 4.7, reviews: 110, image: 'https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHBvcnRyYWl0JTIwZmVtYWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 6, name: 'Atty. Jose "Joey" Rizal', type: 'Public', specializations: ['Criminal Defense', 'Human Rights Law'], location: 'Manila', languages: ['English', 'Tagalog', 'Ilocano'], rating: 4.0, reviews: 60, image: 'https://images.unsplash.com/photo-1590086782792-42dd2350140d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHBvcnRyYWl0JTIwbWFsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 7, name: 'Atty. Fatima Alonto', type: 'Private', specializations: ['Corporate Law', 'Mergers & Acquisitions'], location: 'Taguig City', languages: ['English', 'Tagalog', 'Arabic'], rating: 4.6, reviews: 88, image: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHBvcnRyYWl0JTIwZmVtYWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 8, name: 'Atty. Kenji Tanaka', type: 'Private', specializations: ['Intellectual Property', 'Tech Law'], location: 'Cebu City', languages: ['English', 'Japanese'], rating: 4.4, reviews: 70, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXNpYW4lMjBtYWxlJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&h=100&q=80' }
];

const documentTemplates = [
  { id: 1, name: 'Affidavit', icon: <FileText size={40} className="text-blue-600"/>, description: 'A written statement confirmed by oath or affirmation, for use as evidence in court.' },
  { id: 2, name: 'Complaint/Petition', icon: <FileText size={40} className="text-green-600"/>, description: 'The initial document filed with a court to begin a lawsuit.' },
  { id: 3, name: 'Contract', icon: <FileText size={40} className="text-purple-600"/>, description: 'A written or spoken agreement, especially one concerning employment, sales, or tenancy, that is intended to be enforceable by law.' },
  { id: 4, name: 'Power of Attorney', icon: <FileText size={40} className="text-red-600"/>, description: 'A legal document giving one person (the agent or attorney-in-fact) the power to act for another person (the principal).' },
  { id: 5, name: 'Demand Letter', icon: <FileText size={40} className="text-yellow-600"/>, description: 'A formal letter sent by one party to another, demanding payment or some other action.' },
  { id: 6, name: 'Memorandum of Agreement', icon: <FileText size={40} className="text-indigo-600"/>, description: 'A document that describes the broad outlines of an agreement that two or more parties have reached.' },
];

// Helper function to call Gemini API (remains the same)
const callGeminiApi = async (prompt, chatHistory = []) => {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY; 
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  let contents = [...chatHistory, { role: "user", parts: [{ text: prompt }] }];
  const payload = { contents };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Gemini API request failed:", response.status, errorBody);
      throw new Error(`API request failed: ${response.statusText} - ${errorBody}`);
    }
    const result = await response.json();
    if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
      return result.candidates[0].content.parts[0].text;
    } else if (result.promptFeedback?.blockReason) {
      return `I'm sorry, I can't respond to that due to: ${result.promptFeedback.blockReasonMessage || result.promptFeedback.blockReason}.`;
    } 
    return "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return "I'm having trouble connecting. Please try again in a moment.";
  }
};


// Main App Component (remains largely the same)
const App = () => {
  const [currentPage, setCurrentPage] = useState('onboarding');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ 
    name: 'Guest', 
    language: 'English', 
    avatar: 'https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3Vlc3QlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=128&h=128&q=80'
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleLogin = (method = "Guest") => {
    setIsAuthenticated(true);
    const loggedInUser = {
        name: method === "Guest" ? "Guest User" : "Sarah Palma",
        language: user.language,
        avatar: method === "Guest" 
            ? 'https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3Vlc3QlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=128&h=128&q=80' 
            : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVtYWxlJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=128&h=128&q=80'
    };
    setUser(loggedInUser);
    navigateTo('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser({ 
        name: 'Guest', 
        language: 'English',
        avatar: 'https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3Vlc3QlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=128&h=128&q=80'
    });
    navigateTo('onboarding');
  };
  
  const setLanguage = (lang) => {
    setUser(prev => ({ ...prev, language: lang }));
  };

  const navLinks = [
    { name: 'Home', page: 'home' },
    { name: 'Legal Aid Directory', page: 'legalAidDirectory' },
    { name: 'Lawyer Directory', page: 'findLawyer' },
    { name: 'Legal Advice Chat (AI)', page: 'aiChat' },
    { name: 'Document Creator', page: 'documentCreator' },
    { name: 'Filing Guidance', page: 'filingGuidance' },
  ];

  const Header = () => (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigateTo(isAuthenticated ? 'home' : 'onboarding')}>TINIG</h1>
          </div>
          {isAuthenticated && (
            <>
              <nav className="hidden md:flex space-x-4">
                {navLinks.map(link => (
                  <button
                    key={link.page}
                    onClick={() => navigateTo(link.page)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === link.page ? 'text-blue-600 underline' : 'text-gray-600 hover:text-blue-500'}`}
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
              <div className="hidden md:flex items-center space-x-4">
                <button className="text-gray-500 hover:text-blue-500">
                  <Bell size={20} />
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
              <button
                key={link.page}
                onClick={() => navigateTo(link.page)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${currentPage === link.page ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}
              >
                {link.name}
              </button>
            ))}
             <button
                onClick={() => navigateTo('userProfile')}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              >
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
      if (currentPage === 'auth') return <AuthPage navigateTo={navigateTo} handleLogin={handleLogin} />;
      return <OnboardingPage navigateTo={navigateTo} setLanguage={setLanguage} handleLogin={handleLogin} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage navigateTo={navigateTo} userName={user.name} />;
      case 'legalAidDirectory':
        return <LegalAidDirectoryPage navigateTo={navigateTo} />;
      case 'findLawyer':
        return <FindLawyerPage navigateTo={navigateTo} />;
      case 'aiChat':
        return <AIChatPage navigateTo={navigateTo} userAvatar={user.avatar} />;
      case 'documentCreator':
        return <DocumentCreatorPage navigateTo={navigateTo} />;
      case 'filingGuidance':
        return <FilingGuidancePage navigateTo={navigateTo} />;
      case 'userProfile':
        return <UserProfilePage navigateTo={navigateTo} user={user} handleLogout={handleLogout} />;
      default:
        return <HomePage navigateTo={navigateTo} userName={user.name} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Header />
      <main>{renderPage()}</main>
      {isAuthenticated && <Footer />}
    </div>
  );
};

// Onboarding Page (remains the same)
const OnboardingPage = ({ navigateTo, setLanguage, handleLogin }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const handleLanguageSelect = (lang) => { setSelectedLanguage(lang); setLanguage(lang); };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-sm text-center">
        <img src="https://drive.google.com/file/d/1sAUTfo6oxucQ9cqMzus2FBN8AInp95wj/view?usp=sharing" alt="TINIG Logo" className="mx-auto mb-6 h-32 w-auto rounded-lg shadow-md object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/007BFF/FFFFFF?text=Logo"; }} />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">TINIG</h1>
        <p className="text-gray-600 mb-8 px-4">Truth, Inclusion, Narrative, Integrity, and Guidance</p>
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-700 mb-3">Language</h2>
          <div className="flex justify-center space-x-3">
            {['Filipino', 'English', 'Regional Dialects'].map(lang => (
              <button key={lang} onClick={() => handleLanguageSelect(lang)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${selectedLanguage === lang ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}>
                {lang}
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => navigateTo('auth')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg mb-3 transition duration-150">Sign Up / Log In</button>
        <button onClick={() => handleLogin('Guest')} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition duration-150">Continue as Guest</button>
      </div>
    </div>
  );
};

// Authentication Page (remains the same)
const AuthPage = ({ navigateTo, handleLogin }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-sm text-center">
        <button onClick={() => navigateTo('onboarding')} className="absolute top-4 left-4 text-blue-600 hover:text-blue-800"><ChevronLeft size={28} /></button>
        <h1 className="text-3xl font-bold text-gray-800 mb-2 mt-12">TINIG</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Get legal help in minutes</h2>
        <p className="text-gray-600 mb-8">Connect with lawyers, AI chat, and filing guidance...</p>
        <div className="space-y-3">
          <button onClick={() => handleLogin('Email')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center"><Mail size={20} className="mr-2"/> Continue with Email</button>
          <button onClick={() => handleLogin('Phone')} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg flex items-center justify-center"><Smartphone size={20} className="mr-2"/> Continue with Phone</button>
          <button onClick={() => handleLogin('Social')} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg flex items-center justify-center"><MessageCircle size={20} className="mr-2"/> Continue with Social</button>
        </div>
        <p className="text-xs text-gray-500 mt-8">By continuing, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.</p>
      </div>
    </div>
  );
};


// --- Page Components with Enhanced Filters ---
const HomePage = ({ navigateTo, userName }) => {
  // Suggested transparent PNG icon URLs (replace with your actual transparent PNGs)
  // For demonstration, using simple SVG data URLs or placeholders that imply transparency.
  const features = [
    { name: 'Consult a Lawyer', icon: 'https://cdn-icons-png.flaticon.com/128/1995/1995453.png', page: 'findLawyer', bgColor: 'bg-orange-50' },
    { name: 'Legal Aid Directory', icon: 'https://cdn-icons-png.flaticon.com/128/4252/4252360.png', page: 'legalAidDirectory', bgColor: 'bg-indigo-50' },
    { name: 'Lawyer Directory & Paid Advice', icon: 'https://cdn-icons-png.flaticon.com/128/4185/4185489.png', page: 'findLawyer', bgColor: 'bg-green-50' },
    { name: 'Legal Advice Chat (AI)', icon: 'https://cdn-icons-png.flaticon.com/128/589/589708.png', page: 'aiChat', bgColor: 'bg-amber-50' },
    { name: 'Document Creator', icon: 'https://cdn-icons-png.flaticon.com/128/9746/9746449.png', page: 'documentCreator', bgColor: 'bg-pink-50' },
    { name: 'Filing Guidance', icon: 'https://cdn-icons-png.flaticon.com/128/3767/3767084.png', page: 'filingGuidance', bgColor: 'bg-purple-50' },
  ];
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Welcome back, {userName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <button key={feature.name} onClick={() => navigateTo(feature.page)}
            className={`p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center ${feature.bgColor}`}>
            {/* Removed rounded-full and object-cover might not be needed if icons have inherent aspect ratio */}
            <img 
              src={feature.icon} 
              alt={feature.name} 
              className="w-20 h-20 mx-auto mb-4" // Adjust w- and h- as needed for your transparent icons
              onError={(e) => { 
                e.target.onerror = null; 
                // Basic text fallback if icon fails
                const iconText = feature.name.substring(0, 2).toUpperCase();
                e.target.src = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23${feature.bgColor.split('-')[1] || 'e5e7eb'}'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24px' fill='%23${feature.bgColor.includes('light') || feature.bgColor.includes('50') || feature.bgColor.includes('100') ? '4b5563' : 'ffffff'}'%3E${iconText}%3C/text%3E%3C/svg%3E`;
              }}
            />
            <h3 className="text-lg font-medium text-gray-700">{feature.name}</h3>
          </button>
        ))}
      </div>
    </div>
  );
};

const LegalAidDirectoryPage = ({ navigateTo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    serviceType: '',
    providerType: ''
  });

  // Get unique options for filters
  const locations = [...new Set(legalAidProviders.map(p => p.location))].sort();
  const serviceTypes = [...new Set(legalAidProviders.map(p => p.serviceType))].sort();
  const providerTypes = [...new Set(legalAidProviders.map(p => p.providerType))].sort();

  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const filteredProviders = legalAidProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filters.location === '' || provider.location === filters.location) &&
    (filters.serviceType === '' || provider.serviceType === filters.serviceType) &&
    (filters.providerType === '' || provider.providerType === filters.providerType)
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 p-6 bg-white rounded-lg shadow">
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
                <button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center text-sm">
                  <Phone size={14} className="mr-2" /> Call
                </button>
              </div>
              <img src={provider.image} alt={provider.location} className="w-full sm:w-40 h-auto sm:h-28 rounded-lg object-cover shadow-sm ml-0 sm:ml-6" 
                   onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x100/cccccc/ffffff?text=Map"; }} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No providers match your current filters.</p>
      )}
      {/* Pagination Mockup (remains the same) */}
    </div>
  );
};

const FindLawyerPage = ({ navigateTo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '', // Public vs Private
    specialization: '',
    location: '',
    language: '',
    rating: '' // e.g. "4+" for 4 stars and up
  });

  // Get unique options for filters
  const lawyerTypes = ["Public", "Private"];
  const specializations = [...new Set(lawyers.flatMap(l => l.specializations))].sort();
  const locations = [...new Set(lawyers.map(l => l.location))].sort();
  const languages = [...new Set(lawyers.flatMap(l => l.languages))].sort();
  const ratingOptions = ["Any Rating", "4+ Stars", "3+ Stars", "2+ Stars"];


  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
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
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} size={14} className="text-yellow-400 fill-yellow-400"/>)}
        {halfStar && <Star key="half" size={14} className="text-yellow-400 fill-yellow-200"/>} {/* Simplified half star */}
        {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} size={14} className="text-gray-300"/>)}
        <span className="ml-1 text-xs text-gray-500">({rating.toFixed(1)})</span>
      </div>
    );
  };


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">Find a Lawyer</h2>
      <p className="text-gray-600 mb-6">Search for lawyers based on specialization, location, language, and more.</p>
      
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
                <div className="flex items-center mb-1">
                  <StarRating rating={lawyer.rating} />
                  <span className="ml-2 text-xs text-gray-500">({lawyer.reviews} reviews)</span>
                </div>
                <p className="text-gray-600 text-sm mb-1">
                  <Briefcase size={14} className="inline mr-1 text-gray-500"/> {lawyer.specializations.join(', ')}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <MapPin size={14} className="inline mr-1 text-gray-500"/> {lawyer.location}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <Globe size={14} className="inline mr-1 text-gray-500"/> Speaks: {lawyer.languages.join(', ')}
                </p>
                <button className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg text-sm">
                  Request Consultation
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
         <p className="text-gray-600 text-center">No lawyers match your current filters.</p>
      )}
      {/* Pagination Mockup (remains the same) */}
    </div>
  );
};

// AIChatPage, DocumentCreatorPage, FilingGuidancePage, UserProfilePage, Footer (remain the same as previous version)
// ... (These components are long, so I'm omitting them for brevity, but they are unchanged from the previous version with image updates)
const AIChatPage = ({ navigateTo, userAvatar }) => {
  const aiAvatar = 'https://images.unsplash.com/photo-1570753692288-95d17f17e76e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFpJTIwYXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=40&h=40&q=80';
  const initialMessages = [
    { sender: 'ai', text: "Hello there! I'm here to help you with your legal questions. Please describe your situation in detail, and I'll do my best to provide you with relevant information and guidance.", avatar: aiAvatar },
  ];
  const [messages, setMessages] = useState(initialMessages);
  const [chatHistory, setChatHistory] = useState([]); 
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
  useEffect(scrollToBottom, [messages]);
  useEffect(() => {
    const history = initialMessages.map(msg => ({ role: msg.sender === 'ai' ? 'model' : 'user', parts: [{ text: msg.text }] }));
    setChatHistory(history);
  }, []);

  const handleSendMessage = async (e, quickQuestion = null) => {
    if (e) e.preventDefault();
    const messageText = quickQuestion || newMessage;
    if (messageText.trim() === '') return;
    const userMessage = { sender: 'user', text: messageText, avatar: userAvatar };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    const currentChatHistory = [...chatHistory, { role: "user", parts: [{ text: messageText }] }];
    const aiResponseText = await callGeminiApi(messageText, chatHistory); 
    const aiMessage = { sender: 'ai', text: aiResponseText, avatar: aiAvatar };
    setMessages(prev => [...prev, aiMessage]);
    setChatHistory([...currentChatHistory, { role: "model", parts: [{ text: aiResponseText }] }]);
    setIsLoading(false);
  };
  const quickQuestions = ["What are my rights as a tenant?", "How to file a complaint?", "What is the process for eviction?"];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="p-4 border-b border-gray-200 flex items-center sticky top-0 bg-white z-10">
        <button onClick={() => navigateTo('home')} className="text-blue-600 hover:text-blue-800 mr-4"><ChevronLeft size={24} /></button>
        <h2 className="text-xl font-semibold text-gray-800">AI Chat</h2>
      </div>
      <div className="flex-grow p-4 sm:p-6 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'ai' && <img src={msg.avatar} alt="AI Avatar" className="w-8 h-8 rounded-full mr-2 sm:mr-3 flex-shrink-0 object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/A0AEC0/FFFFFF?text=AI"; }} />}
            <div className={`max-w-[70%] sm:max-w-[65%] px-3 py-2 sm:px-4 sm:py-3 rounded-xl shadow-sm ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            </div>
            {msg.sender === 'user' && <img src={msg.avatar} alt="User Avatar" className="w-8 h-8 rounded-full ml-2 sm:ml-3 flex-shrink-0 object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/4A5568/FFFFFF?text=U"; }} />}
          </div>
        ))}
        {isLoading && ( <div className="flex justify-start"><img src={aiAvatar} alt="AI Avatar" className="w-8 h-8 rounded-full mr-3 object-cover" /><div className="max-w-xs lg:max-w-md px-4 py-3 rounded-xl bg-gray-100 text-gray-800 rounded-bl-none"><p className="text-sm italic">AI is thinking...</p></div></div>)}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200 bg-gray-50">
         <div className="mb-3">
            <p className="text-sm font-medium text-gray-600 mb-2">Quick Questions:</p>
            <div className="flex flex-wrap gap-2">
                {quickQuestions.map(q => (<button key={q} onClick={() => handleSendMessage(null, q)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs px-3 py-1.5 rounded-full transition-colors" disabled={isLoading}>{q}</button>))}
            </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md mb-3">
            <p className="text-sm font-medium text-gray-700 mb-1">Need more personalized advice?</p>
            <p className="text-xs text-gray-500 mb-2">If you're not satisfied... consult a qualified lawyer.</p>
            <button onClick={() => navigateTo('findLawyer')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors">Lawyer Directory & Paid Advice</button>
        </div>
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2 sm:space-x-3">
          <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your message..." className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm" disabled={isLoading}/>
          <button type="submit" className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300" disabled={isLoading}>{isLoading ? <RefreshCw size={20} className="animate-spin" /> : <Send size={20} />}</button>
        </form>
      </div>
    </div>
  );
};

const DocumentCreatorPage = ({ navigateTo }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(documentTemplates[5]);
  const [formData, setFormData] = useState({ fullName: '', emailAddress: '', statementOfFacts: '' });
  const [generatedDocumentText, setGeneratedDocumentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);
  const documentPreviewRef = useRef(null);

  const handleTemplateSelect = (template) => { setSelectedTemplate(template); setFormData({ fullName: '', emailAddress: '', statementOfFacts: '' }); setGeneratedDocumentText(''); setAiSuggestion(''); };
  const handleInputChange = (e) => { setFormData(prev => ({ ...prev, [e.target.id]: e.target.value })); };

  const generateInitialDraft = async () => {
    if (!selectedTemplate || !formData.statementOfFacts) { alert("Please select a template and provide a statement of facts."); return; }
    setIsLoading(true); setGeneratedDocumentText('');
    const prompt = `Draft a ${selectedTemplate.name} based on:\nFull Name: ${formData.fullName || 'N/A'}\nEmail: ${formData.emailAddress || 'N/A'}\nFacts: "${formData.statementOfFacts}".\nFormal, for Philippines. Include [Placeholders]. Clear sections.`;
    const draft = await callGeminiApi(prompt);
    setGeneratedDocumentText(draft); setIsLoading(false);
    if(documentPreviewRef.current) { documentPreviewRef.current.value = draft; }
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
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Generate Legal Documents</h2>
      <div className="mb-8">
        <h3 className="text-xl font-medium text-gray-700 mb-3">Select a Template</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {documentTemplates.map(template => (
            <button key={template.id} onClick={() => handleTemplateSelect(template)}
              className={`p-4 border rounded-lg text-center transition-all duration-200 ${selectedTemplate.id === template.id ? 'border-blue-500 ring-2 ring-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:shadow-md'}`}>
              <div className="flex justify-center mb-2">{template.icon}</div><p className="text-sm font-medium text-gray-700">{template.name}</p>
            </button>
          ))}
        </div>
      </div>
      {selectedTemplate && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Template Overview: {selectedTemplate.name}</h3>
            <p className="text-gray-600 text-sm">{selectedTemplate.description} ...</p>
          </div>
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-3">1. Provide Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label><input type="text" id="fullName" value={formData.fullName} onChange={handleInputChange} className="mt-1 block w-full p-2 input-std" /></div>
              <div><label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">Email</label><input type="email" id="emailAddress" value={formData.emailAddress} onChange={handleInputChange} className="mt-1 block w-full p-2 input-std" /></div>
              <div className="md:col-span-2"><label htmlFor="statementOfFacts" className="block text-sm font-medium text-gray-700">Statement of Facts</label><textarea id="statementOfFacts" value={formData.statementOfFacts} onChange={handleInputChange} rows="4" className="mt-1 block w-full p-2 input-std" placeholder="Example: Debt collection..."></textarea></div>
            </div>
          </div>
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-3">2. AI-Powered Draft Generation</h3>
            <p className="text-gray-600 text-sm mb-3">AI can help generate an initial draft...</p>
            <button onClick={generateInitialDraft} disabled={isLoading || !formData.statementOfFacts} className="btn-primary flex items-center disabled:bg-blue-300">
              {isLoading ? <RefreshCw size={16} className="mr-2 animate-spin"/> : <Sparkles size={16} className="mr-2"/>}
              {isLoading ? 'Generating...' : `Generate ${selectedTemplate.name} Draft`}
            </button>
          </div>
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-3">3. Preview & Edit Document</h3>
            <textarea id="documentPreview" ref={documentPreviewRef} rows="15" className="w-full p-3 input-std" placeholder="Draft will appear here..." value={generatedDocumentText} onChange={(e) => setGeneratedDocumentText(e.target.value)}></textarea>
            <button onClick={getAISuggestions} disabled={isSuggestionLoading || !generatedDocumentText} className="mt-3 btn-secondary flex items-center disabled:bg-green-300">
              {isSuggestionLoading ? <RefreshCw size={16} className="mr-2 animate-spin"/> : <Sparkles size={16} className="mr-2"/>}
              {isSuggestionLoading ? 'Getting Suggestions...' : 'Get AI Suggestions'}
            </button>
            {aiSuggestion && (<div className="mt-4 p-3 bg-yellow-50 border border-yellow-300 rounded-md"><h4 className="text-sm font-semibold text-yellow-700 mb-1">AI Suggestions:</h4><p className="text-xs text-yellow-600 whitespace-pre-wrap">{aiSuggestion}</p></div>)}
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-3">4. Save, Download & Share</h3>
            <div className="flex flex-wrap gap-3">
              <button className="btn-primary flex items-center"><Download size={16} className="mr-2"/> Save</button>
              <button className="btn-secondary flex items-center"><Download size={16} className="mr-2"/> Download PDF</button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .input-std { border: 1px solid #d1d5db; border-radius: 0.375rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
        .input-std:focus { outline: 2px solid transparent; outline-offset: 2px; border-color: #3b82f6; box-shadow: 0 0 0 2px #3b82f6; }
        .btn-primary { background-color: #2563eb; color: white; font-weight: 500; padding: 0.5rem 1rem; border-radius: 0.375rem; }
        .btn-primary:hover { background-color: #1d4ed8; }
        .btn-secondary { background-color: #4ade80; color: white; font-weight: 500; padding: 0.5rem 1rem; border-radius: 0.375rem; }
        .btn-secondary:hover { background-color: #22c55e; }
      `}</style>
    </div>
  );
};

const FilingGuidancePage = ({ navigateTo }) => {
  const [step, setStep] = useState(1); const totalSteps = 5;
  const [checkboxes, setCheckboxes] = useState({ validId: false, evidence: false, affidavits: false });
  const handleCheckboxChange = (e) => setCheckboxes({ ...checkboxes, [e.target.name]: e.target.checked });
  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps)); const prevStep = () => setStep(s => Math.max(s - 1, 1));
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-0">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center"><button onClick={() => navigateTo('home')} className="text-blue-600 hover:text-blue-800 mr-4"><ChevronLeft size={24} /></button><h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Filing a Case</h2></div>
        <div className="p-4 sm:p-6"><p className="text-sm text-blue-600 font-medium mb-2">Step {step} of {totalSteps}</p><div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(step / totalSteps) * 100}%` }}></div></div></div>
        <div className="p-4 sm:p-6">
          {step === 1 && (<div><h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3">Gather Necessary Documents</h3><p className="text-gray-600 text-sm mb-4">Before filing...</p>
              <div className="space-y-3 mb-6">{['validId', 'evidence', 'affidavits'].map(item => (<label key={item} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer"><input type="checkbox" name={item} checked={checkboxes[item]} onChange={handleCheckboxChange} className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" /><span className="ml-3 text-gray-700 capitalize">{item.replace(/([A-Z])/g, ' $1')}</span></label>))}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3">Find a Court</h3><p className="text-gray-600 text-sm mb-4">Locate the nearest court...</p>
              <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center mb-6 overflow-hidden"><img src="https://images.unsplash.com/photo-1590954256050-16f50003c8e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3QlMjBjaXR5JTIwbWFwfGVufDB8fDB8fHww&auto=format&fit=crop&w=300&h=150&q=80" alt="Abstract City Map" className="rounded-md object-cover w-full h-full" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x150/007bff/ffffff?text=Map"; }}/></div></div>)}
          {step > 1 && <div className="text-center py-10"><h3 className="text-xl font-semibold text-gray-700 mb-2">Step {step} Content</h3><p className="text-gray-600">Details for step {step}.</p></div>}
        </div>
        <div className="p-4 sm:p-6 border-t border-gray-200">
          {step < totalSteps ? <button onClick={nextStep} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg">Next</button>
            : <button onClick={() => alert('Guidance Complete!')} className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg">Finish</button>}
          {step > 1 && <button onClick={prevStep} className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg">Previous</button>}
        </div></div></div>);};

const UserProfilePage = ({ navigateTo, user, handleLogout }) => {
  const profileUser = { name: user?.name || 'User', email: user?.email || 'user@example.com', avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=128&h=128&q=80' };
  const menuItems = { manage: [{ name: 'Personal Info', icon: <User/> }, { name: 'Saved Documents', icon: <Folder/> }, { name: 'Chat History', icon: <MessageSquare/> }], settings: [{ name: 'Payment Methods', icon: <CreditCard/> }, { name: 'Consultation History', icon: <History/> }, { name: 'Notifications', icon: <BellRing/> }, { name: 'Help Center', icon: <HelpCircle/> }]};
  return (<div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-0"><div className="bg-gray-800 shadow-xl rounded-lg w-full max-w-md">
        <div className="p-4 sm:p-6 border-b border-gray-700 flex items-center"><button onClick={() => navigateTo('home')} className="text-blue-400 hover:text-blue-300 mr-4"><ChevronLeft size={24} /></button><h2 className="text-xl sm:text-2xl font-semibold">Account</h2></div>
        <div className="p-6 flex flex-col items-center border-b border-gray-700"><img src={profileUser.avatar} alt={profileUser.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-4 shadow-md object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/128x128/cccccc/ffffff?text=User"; }} /><h3 className="text-xl sm:text-2xl font-semibold">{profileUser.name}</h3><p className="text-sm text-blue-400">{profileUser.email}</p></div>
        <div className="p-2 sm:p-4">{Object.entries(menuItems).map(([sectionTitle, items]) => (<div key={sectionTitle} className="mb-4"><h4 className="px-4 py-2 text-sm font-semibold text-gray-400 uppercase">{sectionTitle}</h4><ul className="space-y-1">{items.map(item => (<li key={item.name}><button className="w-full flex items-center px-4 py-3 text-left text-gray-200 hover:bg-gray-700 rounded-lg"><span className="text-gray-500 mr-3">{React.cloneElement(item.icon, { size: 20 })}</span><span className="flex-1">{item.name}</span><ChevronUp size={16} className="transform rotate-90 text-gray-500" /></button></li>))}</ul></div>))}</div>
        <div className="p-4 sm:p-6 border-t border-gray-700"><button onClick={handleLogout} className="w-full flex items-center justify-center py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg"><LogOut size={20} className="mr-2" /> Log Out</button></div>
  </div></div>);};

const Footer = () => ( <footer className="bg-gray-800 text-white py-8 text-center"> <div className="container mx-auto px-4"> <p>&copy; {new Date().getFullYear()} TINIG. All rights reserved.</p> <p className="text-sm text-gray-400 mt-1">Your Voice in Legal Matters.</p> </div> </footer> );

export default App;
