import React, { useState, useEffect, useRef } from 'react';
import './Society-Head.css';
import { 
  Users, 
  Calendar, 
  Trophy, 
  ArrowLeft,
  Bell,
  Search,
  MessageCircle,
  Award,
  Brain,
  Clock,
  MapPin,
  User,
  Send,
  CheckCircle,
  X,
  Download,
  Sparkles,
  Target,
  TrendingUp,
  Activity,
  Eye,
  Star,
  Heart,
  Settings,
  Edit,
  Save,
  Plus,
  Trash2,
  FileText,
  Mail,
  DollarSign,
  PieChart,
  BarChart,
  UserPlus,
  UserMinus,
  Filter,
  ExternalLink,
  Lightbulb,
  Zap,
  Users2,
  Building,
  GraduationCap,
  Phone,
  Globe,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  AlertTriangle,
  Image,
  Palette,
  BrainCircuit,
  TrendingDown,
  ChevronRight,
  Camera
} from 'lucide-react';

const SocietyHead = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [reportPrompt, setReportPrompt] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Event Suggestion", message: "Sarah Johnson suggested 'Web Development Bootcamp'", time: "1 hour ago", type: "suggestion", read: false },
    { id: 2, title: "Monthly Report Due", message: "October society report deadline approaching", time: "3 hours ago", type: "reminder", read: false },
    { id: 3, title: "Budget Update", message: "Event expenses updated - ₹5,000 remaining", time: "1 day ago", type: "finance", read: true }
  ]);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: "AI Assistant", message: "Hello! I'm here to help you manage your society effectively. Ask me about member insights, event planning, or analytics.", time: "10:00 AM", isBot: true },
    { id: 2, user: "You", message: "What's our member engagement rate?", time: "10:01 AM", isBot: false },
    { id: 3, user: "AI Assistant", message: "Your society has an 89% member engagement rate - that's excellent! Active members: 45/51. Most engaged in technical workshops.", time: "10:01 AM", isBot: true }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [messageText, setMessageText] = useState('');
  const modalRef = useRef(null);

  // Enhanced forms
  const [expenseForm, setExpenseForm] = useState({
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [memberForm, setMemberForm] = useState({
    name: '',
    email: '',
    role: 'Member',
    department: '',
    branch: '',
    phone: ''
  });

  const [societyData, setSocietyData] = useState({
    name: "ABC Society",
    category: "Technical Society",
    description: "A vibrant community focused on advancing technology skills and innovation among students through workshops, hackathons, and collaborative projects.",
    email: "contact@abcsociety.edu",
    coordinatorTeacher: "Dr. Priya Sharma",
    coordinatorEmail: "priya.sharma@university.edu",
    coordinatorPhone: "+91 98765 43210",
    foundedYear: "2020",
    website: "https://abcsociety.edu",
    totalMembers: 51,
    activeMembers: 45,
    eventsThisYear: 12,
    totalBudget: 50000,
    budgetUsed: 32000,
    rating: 4.5,
    memberLimit: 100,
    presidentName: "Student President",
    presidentEmail: "president@abcsociety.edu",
    presidentPhone: "+91 98765 12345",
    instagram: "@abc_society",
    facebook: "facebook.com/abcsociety",
    linkedin: "linkedin.com/company/abc-society",
    youtube: "youtube.com/@abcsociety",
    github: "github.com/abc-society",
    tags: ["Technology", "Programming", "Web Development", "AI", "Machine Learning"],
    achievements: [
      "Winner of Inter-College Hackathon 2023",
      "Organized 15+ successful workshops",
      "500+ students trained in various technologies",
      "Best Technical Society Award 2023"
    ],
    logo: null
  });

  const [membersList, setMembersList] = useState([
    { id: 1, name: "Nishtha Sood", email: "soodnishtha@soclique.com", role: "Core Member", department: "CSE", branch: "Computer Science Engineering", society: "ABC Society", status: "Active", joinDate: "2023-08-15", attendance: 92, phone: "+91 98765 43210" },
    { id: 2, name: "Aadhya Sharma", email: "aadhya017@example.com", role: "Volunteer", department: "ECE", branch: "Electronics & Communication", society: "ABC Society", status: "Active", joinDate: "2023-09-20", attendance: 85, phone: "+91 98765 43211" },
    { id: 3, name: "Mansi Bhandari", email: "mansibhandari9@example.com", role: "Core Member", department: "IT", branch: "Information Technology", society: "ABC Society", status: "Active", joinDate: "2023-07-10", attendance: 94, phone: "+91 98765 43212" },
    { id: 4, name: "Arshia Gupta", email: "arshiaa1@example.com", role: "Core Member", department: "CSE", branch: "Computer Science Engineering", society: "ABC Society", status: "Active", joinDate: "2023-10-05", attendance: 88, phone: "+91 98765 43213" },
    { id: 5, name: "Janvi Mathur", email: "mathur89@example.com", role: "Junior Council", department: "CSE", branch: "Computer Science Engineering", society: "ABC Society", status: "Active", joinDate: "2023-10-08", attendance: 91, phone: "+91 98765 43214" },
    { id: 6, name: "Sarah Johnson", email: "sarah.j@example.com", role: "Member", department: "CSE", branch: "Computer Science Engineering", society: "ABC Society", status: "Inactive", joinDate: "2023-11-15", attendance: 45, phone: "+91 98765 43215" }
  ]);

  const events = [
    { id: 1, title: "AI & ML Workshop", date: "2024-01-16", time: "14:00", venue: "Auditorium A", status: "upcoming", attendees: 85, cost: 8000, predictedAttendance: 90 },
    { id: 2, title: "Coding Bootcamp", date: "2024-01-20", time: "10:00", venue: "Lab 1", status: "upcoming", attendees: 45, cost: 5000, predictedAttendance: 50 },
    { id: 3, title: "Hackathon 2024", date: "2023-12-15", time: "09:00", venue: "Main Hall", status: "completed", attendees: 120, cost: 15000, actualAttendance: 118 },
    { id: 4, title: "Tech Talk Series", date: "2023-11-20", time: "15:30", venue: "Conference Room", status: "completed", attendees: 60, cost: 3000, actualAttendance: 58 }
  ];

  const [eventSuggestions, setEventSuggestions] = useState([
    { 
      id: 1, 
      title: "Web Development Bootcamp", 
      suggestedBy: "Sarah Johnson", 
      category: "workshop", 
      description: "3-day intensive bootcamp covering React, Node.js, and deployment", 
      votes: 23, 
      status: "pending",
      estimatedDuration: "3 days",
      expectedParticipants: "40-50 students",
      estimatedBudget: "₹12,000 - ₹15,000",
      suggestedVenue: "Computer Lab 1",
      dateSubmitted: "2024-01-10",
      additionalNotes: "This bootcamp will help students learn modern web development technologies and prepare them for internships."
    },
    { 
      id: 2, 
      title: "Mobile App Development Workshop", 
      suggestedBy: "Arshia Gupta", 
      category: "workshop", 
      description: "Flutter and React Native development workshop", 
      votes: 18, 
      status: "approved",
      estimatedDuration: "2 days",
      expectedParticipants: "30-35 students",
      estimatedBudget: "₹8,000 - ₹10,000",
      suggestedVenue: "Auditorium B",
      dateSubmitted: "2024-01-08",
      additionalNotes: "Focus on cross-platform mobile app development with hands-on projects."
    },
    { 
      id: 3, 
      title: "Cybersecurity Awareness Seminar", 
      suggestedBy: "Mansi Bhandari", 
      category: "seminar", 
      description: "Importance of cybersecurity in modern digital world", 
      votes: 31, 
      status: "pending",
      estimatedDuration: "4 hours",
      expectedParticipants: "60-80 students",
      estimatedBudget: "₹5,000 - ₹8,000",
      suggestedVenue: "Main Auditorium",
      dateSubmitted: "2024-01-05",
      additionalNotes: "Include practical demonstrations of common security threats and prevention methods."
    }
  ]);

  const [expensesList, setExpensesList] = useState([
    { id: 1, category: "Equipment", amount: 15000, description: "Laptops and projectors for workshops", date: "2023-12-01" },
    { id: 2, category: "Venue", amount: 8000, description: "Auditorium booking for hackathon", date: "2023-12-10" },
    { id: 3, category: "Refreshments", amount: 5000, description: "Snacks and beverages for events", date: "2023-12-15" },
    { id: 4, category: "Materials", amount: 4000, description: "Certificates and stationery", date: "2023-12-20" }
  ]);

  const aiInsights = {
    budgeting: [
      { title: "Cost Optimization", insight: "Moving 30% of events online could save ₹12,000 annually", priority: "high", impact: "High Cost Reduction" },
      { title: "Equipment Sharing", insight: "Partner with 2 other societies to share equipment costs", priority: "medium", impact: "15% Budget Savings" },
      { title: "Sponsor Opportunities", insight: "Tech companies show 85% interest in sponsoring hackathons", priority: "high", impact: "₹25K Additional Budget" }
    ],
    engagement: [
      { title: "Peak Activity Hours", insight: "Members are 40% more active between 4-6 PM", priority: "medium", impact: "Better Attendance" },
      { title: "Content Preference", insight: "Hands-on workshops get 60% more engagement than lectures", priority: "high", impact: "Higher Participation" },
      { title: "Social Media Impact", insight: "Instagram posts increase event registration by 35%", priority: "medium", impact: "Wider Reach" }
    ],
    attendance: [
      { title: "Attendance Pattern", insight: "Thursday events have 20% better attendance than Mondays", priority: "low", impact: "Scheduling Optimization" },
      { title: "Reminder Effectiveness", insight: "48-hour reminders increase attendance by 25%", priority: "high", impact: "Better Show-up Rate" },
      { title: "Duration Sweet Spot", insight: "2-3 hour events have optimal attendance (90%+)", priority: "medium", impact: "Event Planning" }
    ],
    growth: [
      { title: "Member Retention", insight: "Personal mentorship increases retention by 45%", priority: "high", impact: "Long-term Growth" },
      { title: "Referral Programs", insight: "Member referrals could bring 15+ new members this semester", priority: "medium", impact: "Organic Growth" },
      { title: "Cross-Society Events", insight: "Joint events with other societies boost visibility by 70%", priority: "medium", impact: "Network Expansion" }
    ]
  };

  // Helper functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const exportToJSON = (data, filename) => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', filename);
    linkElement.click();
  };

  const exportToCSV = (data, filename) => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      Object.entries(data).map(([key, value]) => `${key},${value}`).join('\n');
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', encodeURI(csvContent));
    linkElement.setAttribute('download', filename);
    linkElement.click();
  };

  // Modal and action handlers
  const openModal = (type, data = null) => {
    setModalType(type);
    if (type === 'sendMessage' || type === 'removeMember') {
      setSelectedMember(data);
    } else if (type === 'eventReport') {
      setSelectedEvent(data);
    } else if (type === 'suggestionDetails' || type === 'approveSuggestion' || type === 'rejectSuggestion') {
      setSelectedSuggestion(data);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setSelectedMember(null);
    setSelectedSuggestion(null);
    setMessageText('');
    setReportPrompt('');
    setShowExportMenu(false);
  };

  const handleDownloadReport = () => {
    if (!selectedEvent) return;
    
    const reportData = {
      event: selectedEvent.title,
      date: selectedEvent.date,
      attendees: selectedEvent.actualAttendance || selectedEvent.attendees,
      budget: selectedEvent.cost,
      venue: selectedEvent.venue,
      generatedAt: new Date().toISOString()
    };
    
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${selectedEvent.title.replace(/\s+/g, '_')}_Report_${timestamp}.json`;
    
    exportToJSON(reportData, filename);
    
    setSuccessMessage('Report downloaded successfully!');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleExportAIReport = (format = 'json') => {
    const reportData = {
      societyName: societyData.name,
      generatedAt: new Date().toISOString(),
      reportType: 'AI Insights Analysis',
      summary: {
        totalMembers: societyData.totalMembers,
        activeMembers: societyData.activeMembers,
        engagementRate: Math.round((societyData.activeMembers / societyData.totalMembers) * 100),
        eventsThisYear: societyData.eventsThisYear,
        budgetUtilization: Math.round((societyData.budgetUsed / societyData.totalBudget) * 100),
        budgetRemaining: societyData.totalBudget - societyData.budgetUsed
      },
      insights: aiInsights,
      recommendations: {
        highPriority: Object.values(aiInsights).flat().filter(insight => insight.priority === 'high').length,
        mediumPriority: Object.values(aiInsights).flat().filter(insight => insight.priority === 'medium').length,
        totalInsights: Object.values(aiInsights).flat().length
      }
    };
    
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${societyData.name.replace(/\s+/g, '_')}_AI_Insights_${timestamp}`;
    
    if (format === 'json') {
      exportToJSON(reportData, `${filename}.json`);
    } else if (format === 'csv') {
      const flattenedData = {
        'Society Name': reportData.societyName,
        'Report Date': reportData.generatedAt,
        'Total Members': reportData.summary.totalMembers,
        'Active Members': reportData.summary.activeMembers,
        'Engagement Rate': `${reportData.summary.engagementRate}%`,
        'Events This Year': reportData.summary.eventsThisYear,
        'Budget Utilization': `${reportData.summary.budgetUtilization}%`,
        'Budget Remaining': reportData.summary.budgetRemaining,
        'High Priority Insights': reportData.recommendations.highPriority,
        'Medium Priority Insights': reportData.recommendations.mediumPriority,
        'Total Insights': reportData.recommendations.totalInsights
      };
      exportToCSV(flattenedData, `${filename}.csv`);
    }
    
    setSuccessMessage(`AI Insights report exported successfully as ${format.toUpperCase()}!`);
    setShowSuccess(true);
    setShowExportMenu(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAddExpense = () => {
    if (!expenseForm.category || !expenseForm.amount || !expenseForm.description) {
      return;
    }
    
    const newExpense = {
      id: expensesList.length + 1,
      category: expenseForm.category,
      amount: parseFloat(expenseForm.amount),
      description: expenseForm.description,
      date: expenseForm.date
    };
    
    setExpensesList(prev => [...prev, newExpense]);
    
    setSocietyData(prev => ({
      ...prev,
      budgetUsed: prev.budgetUsed + newExpense.amount
    }));
    
    setSuccessMessage(`Expense of ₹${expenseForm.amount} added successfully!`);
    setShowSuccess(true);
    closeModal();
    
    setExpenseForm({
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAddMember = () => {
    if (!memberForm.name || !memberForm.email) {
      return;
    }
    
    const newMember = {
      id: membersList.length + 1,
      name: memberForm.name,
      email: memberForm.email,
      role: memberForm.role,
      department: memberForm.department,
      branch: memberForm.branch,
      phone: memberForm.phone,
      society: societyData.name,
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
      attendance: 0
    };
    
    setMembersList(prev => [...prev, newMember]);
    
    setSocietyData(prev => ({
      ...prev,
      totalMembers: prev.totalMembers + 1,
      activeMembers: prev.activeMembers + 1
    }));
    
    setSuccessMessage(`${memberForm.name} has been added to the society!`);
    setShowSuccess(true);
    closeModal();
    
    setMemberForm({
      name: '',
      email: '',
      role: 'Member',
      department: '',
      branch: '',
      phone: ''
    });
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      user: "You",
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isBot: false
    };

    setChatMessages([...chatMessages, newMsg]);
    setNewMessage('');

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        user: "AI Assistant",
        message: "I understand your query. Let me analyze the society data and provide you with actionable insights.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isBot: true
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSaveSettings = () => {
    setIsEditing(false);
    setSuccessMessage('Society profile updated successfully!');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleGenerateReport = () => {
    if (!reportPrompt.trim()) return;
    
    setSuccessMessage(`AI report generated successfully for "${selectedEvent?.title}"!`);
    setShowSuccess(true);
    closeModal();
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleRemoveMember = () => {
    setMembersList(prev => prev.filter(member => member.id !== selectedMember?.id));
    setSocietyData(prev => ({
      ...prev,
      totalMembers: prev.totalMembers - 1,
      activeMembers: prev.activeMembers - (selectedMember?.status === 'Active' ? 1 : 0)
    }));
    
    setSuccessMessage(`${selectedMember?.name} has been removed from the society`);
    setShowSuccess(true);
    closeModal();
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleApproveSuggestion = () => {
    setEventSuggestions(eventSuggestions.map(suggestion =>
      suggestion.id === selectedSuggestion?.id 
        ? { ...suggestion, status: 'approved' }
        : suggestion
    ));
    setSuccessMessage(`"${selectedSuggestion?.title}" has been approved!`);
    setShowSuccess(true);
    closeModal();
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleRejectSuggestion = () => {
    setEventSuggestions(eventSuggestions.map(suggestion =>
      suggestion.id === selectedSuggestion?.id 
        ? { ...suggestion, status: 'rejected' }
        : suggestion
    ));
    setSuccessMessage(`"${selectedSuggestion?.title}" has been rejected.`);
    setShowSuccess(true);
    closeModal();
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Render functions
  const renderDashboard = () => (
    <div className="sh-dashboard-content">
      <div className="sh-stats-grid">
        <div className="sh-stat-card" style={{'--delay': '0s'}}>
          <div className="sh-stat-icon">
            <Users size={28} />
          </div>
          <div className="sh-stat-content">
            <h3>{societyData.totalMembers}</h3>
            <p>Total Members</p>
            <div className="sh-stat-change sh-positive">+5 this month</div>
          </div>
        </div>
        
        <div className="sh-stat-card" style={{'--delay': '0.1s'}}>
          <div className="sh-stat-icon">
            <Activity size={28} />
          </div>
          <div className="sh-stat-content">
            <h3>{Math.round((societyData.activeMembers / societyData.totalMembers) * 100)}%</h3>
            <p>Member Engagement</p>
            <div className="sh-stat-change sh-positive">+8% vs last month</div>
          </div>
        </div>
        
        <div className="sh-stat-card" style={{'--delay': '0.2s'}}>
          <div className="sh-stat-icon">
            <Calendar size={28} />
          </div>
          <div className="sh-stat-content">
            <h3>{societyData.eventsThisYear}</h3>
            <p>Events This Year</p>
            <div className="sh-stat-change sh-positive">2 more planned</div>
          </div>
        </div>
        
        <div className="sh-stat-card" style={{'--delay': '0.3s'}}>
          <div className="sh-stat-icon">
            <DollarSign size={28} />
          </div>
          <div className="sh-stat-content">
            <h3>₹{((societyData.totalBudget - societyData.budgetUsed) / 1000).toFixed(0)}K</h3>
            <p>Budget Remaining</p>
            <div className="sh-stat-change sh-neutral">{Math.round(((societyData.totalBudget - societyData.budgetUsed) / societyData.totalBudget) * 100)}% left</div>
          </div>
        </div>
      </div>

      <div className="sh-dashboard-grid">
        <div className="sh-dashboard-card" style={{'--delay': '0.4s'}}>
          <div className="sh-card-header">
            <div className="sh-card-title">
              <BrainCircuit className="sh-card-icon" size={24} />
              <h3>AI Insights</h3>
            </div>
            <button className="sh-btn sh-btn-secondary" onClick={() => setActiveTab('insights')}>
              <Eye size={16} />
              View All
            </button>
          </div>
          <div className="sh-card-content">
            <div className="sh-insights-preview">
              <div className="sh-insight-item">
                <div className="sh-insight-priority sh-priority-high">
                  <TrendingUp size={16} />
                </div>
                <div className="sh-insight-content">
                  <h4>Budget Optimization</h4>
                  <p>Moving 30% events online could save ₹12K annually</p>
                  <span className="sh-insight-impact">High Impact</span>
                </div>
              </div>
              <div className="sh-insight-item">
                <div className="sh-insight-priority sh-priority-medium">
                  <Target size={16} />
                </div>
                <div className="sh-insight-content">
                  <h4>Engagement Boost</h4>
                  <p>Hands-on workshops get 60% more participation</p>
                  <span className="sh-insight-impact">Medium Impact</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sh-dashboard-card" style={{'--delay': '0.5s'}}>
          <div className="sh-card-header">
            <div className="sh-card-title">
              <Calendar className="sh-card-icon" size={24} />
              <h3>Upcoming Events</h3>
            </div>
            <button className="sh-btn sh-btn-primary">
              <Eye size={16} />
              Insights
            </button>
          </div>
          <div className="sh-events-list">
            {events.filter(event => event.status === 'upcoming').slice(0, 3).map(event => (
              <div key={event.id} className="sh-event-item">
                <div className="sh-event-date">
                  <div className="sh-event-day">{new Date(event.date).getDate()}</div>
                  <div className="sh-event-month">{new Date(event.date).toLocaleDateString('en', { month: 'short' })}</div>
                </div>
                <div className="sh-event-details">
                  <h4>{event.title}</h4>
                  <div className="sh-event-meta">
                    <span><MapPin size={14} /> {event.venue}</span>
                    <span><Clock size={14} /> {event.time}</span>
                  </div>
                  <div className="sh-event-stats">
                    <span className="sh-event-attendees">{event.attendees} registered</span>
                    <span className="sh-event-prediction">AI: {event.predictedAttendance} expected</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sh-dashboard-card" style={{'--delay': '0.6s'}}>
          <div className="sh-card-header">
            <div className="sh-card-title">
              <Lightbulb className="sh-card-icon" size={24} />
              <h3>Member Suggestions</h3>
            </div>
            <button className="sh-btn sh-btn-secondary" onClick={() => setActiveTab('suggestions')}>
              View All ({eventSuggestions.length})
            </button>
          </div>
          <div className="sh-card-content">
            <div className="sh-suggestions-preview">
              {eventSuggestions.slice(0, 3).map(suggestion => (
                <div key={suggestion.id} className="sh-suggestion-item">
                  <div className="sh-suggestion-header">
                    <h4>{suggestion.title}</h4>
                    <span className={`sh-status-badge sh-status-${suggestion.status}`}>
                      {suggestion.status}
                    </span>
                  </div>
                  <div className="sh-suggestion-meta">
                    <span className="sh-suggestion-author">by {suggestion.suggestedBy}</span>
                    <span className="sh-suggestion-votes">{suggestion.votes} votes</span>
                  </div>
                </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="sh-events-content">
      <div className="sh-content-header">
        <div className="sh-header-info">
          <h2>Society Events</h2>
          <p>Manage and track all society events with AI insights</p>
        </div>
        <div className="sh-header-actions">
          <button className="sh-btn sh-btn-secondary">
            <Eye size={16} />
            AI Insights
          </button>
          <button className="sh-btn sh-btn-primary">
            <Plus size={16} />
            Create Event
          </button>
        </div>
      </div>

      <div className="sh-events-grid">
        {events.map(event => (
          <div key={event.id} className="sh-event-card">
            <div className="sh-event-card-header">
              <div className="sh-event-title">
                <h3>{event.title}</h3>
                <span className={`sh-status-badge sh-status-${event.status}`}>
                  {event.status}
                </span>
              </div>
              <div className="sh-event-actions">
                {event.status === 'completed' && (
                  <button 
                    className="sh-action-btn sh-report-btn"
                    onClick={() => openModal('eventReport', event)}
                    title="Generate AI Report"
                  >
                    <FileText size={16} />
                  </button>
                )}
              </div>
            </div>
            
            <div className="sh-event-description">
              Join us for an exciting learning experience in {event.title.toLowerCase()}.
            </div>
            
            <div className="sh-event-info">
              <div className="sh-info-item">
                <Calendar size={16} />
                <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
              </div>
              <div className="sh-info-item">
                <MapPin size={16} />
                <span>{event.venue}</span>
              </div>
              <div className="sh-info-item">
                <Users size={16} />
                <span>{event.status === 'completed' ? event.actualAttendance || event.attendees : event.attendees} attendees</span>
              </div>
              <div className="sh-info-item">
                <DollarSign size={16} />
                <span>₹{event.cost}</span>
              </div>
            </div>
            
            {event.status === 'upcoming' && event.predictedAttendance && (
              <div className="sh-event-prediction">
                <Brain size={16} />
                <span>AI Prediction: {event.predictedAttendance} attendees</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderMembers = () => (
    <div className="sh-members-content">
      <div className="sh-content-header">
        <div className="sh-header-info">
          <h2>Society Members</h2>
          <p>Manage your society members and track their engagement</p>
        </div>
        <div className="sh-header-actions">
          <button className="sh-btn sh-btn-secondary">
            <Filter size={16} />
            Filter
          </button>
          <button 
            className="sh-btn sh-btn-primary"
            onClick={() => openModal('addMember')}
          >
            <UserPlus size={16} />
            Add Member
          </button>
        </div>
      </div>

      <div className="sh-members-table">
        <div className="sh-table-header">
          <div className="sh-table-column">Member</div>
          <div className="sh-table-column">Contact</div>
          <div className="sh-table-column">Role</div>
          <div className="sh-table-column">Attendance</div>
          <div className="sh-table-column">Status</div>
          <div className="sh-table-column">Actions</div>
        </div>
        
        <div className="sh-table-body">
          {membersList.map(member => (
            <div key={member.id} className="sh-table-row">
              <div className="sh-table-column">
                <div className="sh-member-info">
                  <div className="sh-member-avatar">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="sh-member-details">
                    <span className="sh-member-name">{member.name}</span>
                    <span className="sh-member-department">{member.department}</span>
                  </div>
                </div>
              </div>
              
              <div className="sh-table-column">
                <span className="sh-member-email">{member.email}</span>
              </div>
              
              <div className="sh-table-column">
                <span className={`sh-role-badge sh-role-${member.role.toLowerCase().replace(/\s+/g, '-')}`}>
                  {member.role}
                </span>
              </div>

              <div className="sh-table-column">
                <span className={`sh-attendance-badge ${member.attendance >= 80 ? 'sh-good' : member.attendance >= 60 ? 'sh-average' : 'sh-poor'}`}>
                  {member.attendance}%
                </span>
              </div>
              
              <div className="sh-table-column">
                <span className={`sh-status-badge sh-status-${member.status.toLowerCase()}`}>
                  {member.status}
                </span>
              </div>
              
              <div className="sh-table-column">
                <div className="sh-member-actions">
                  <button 
                    className="sh-action-btn sh-message-btn"
                    onClick={() => openModal('sendMessage', member)}
                    title="Send Message"
                  >
                    <MessageCircle size={16} />
                  </button>
                  <button 
                    className="sh-action-btn sh-edit-btn"
                    title="Edit Member"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    className="sh-action-btn sh-delete-btn"
                    onClick={() => openModal('removeMember', member)}
                    title="Remove Member"
                  >
                    <UserMinus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSuggestions = () => (
    <div className="sh-suggestions-content">
      <div className="sh-content-header">
        <div className="sh-header-info">
          <h2>Event Suggestions</h2>
          <p>Review and manage member suggestions for upcoming events</p>
        </div>
      </div>

      <div className="sh-suggestions-grid">
        {eventSuggestions.map(suggestion => (
          <div key={suggestion.id} className="sh-suggestion-card">
            <div className="sh-suggestion-card-header">
              <h3>{suggestion.title}</h3>
              <span className={`sh-status-badge sh-status-${suggestion.status}`}>
                {suggestion.status}
              </span>
            </div>
            
            <div className="sh-meta-item">
              <User size={16} />
              <span>Suggested by {suggestion.suggestedBy}</span>
            </div>
            <div className="sh-meta-item">
              <Sparkles size={16} />
              <span>{suggestion.category}</span>
            </div>
            
            <div className="sh-suggestion-description">
              {suggestion.description}
            </div>
            
            <div className="sh-suggestion-voting">
              <div className="sh-votes-count">
                <Heart size={16} />
                <span>{suggestion.votes} votes</span>
              </div>
            </div>
            
            <div className="sh-suggestion-actions">
              <button 
                className="sh-btn sh-btn-secondary"
                onClick={() => openModal('suggestionDetails', suggestion)}
              >
                <Eye size={14} />
                Details
              </button>
              {suggestion.status === 'pending' && (
                <>
                  <button 
                    className="sh-btn sh-btn-success"
                    onClick={() => {
                      setSelectedSuggestion(suggestion);
                      handleApproveSuggestion();
                    }}
                  >
                    <CheckCircle size={14} />
                    Approve
                  </button>
                  <button 
                    className="sh-btn sh-btn-danger"
                    onClick={() => {
                      setSelectedSuggestion(suggestion);
                      handleRejectSuggestion();
                    }}
                  >
                    <X size={14} />
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAIInsights = () => (
    <div className="sh-insights-content">
      <div className="sh-content-header">
        <div className="sh-header-info">
          <h2>AI Insights & Analytics</h2>
          <p>Comprehensive AI-powered recommendations for society growth</p>
        </div>
        <div className="sh-header-actions">
          <div className="sh-export-dropdown" style={{ position: 'relative' }}>
            <button 
              className="sh-btn sh-btn-primary"
              onClick={() => setShowExportMenu(!showExportMenu)}
            >
              <Download size={16} />
              Export Report
            </button>
            {showExportMenu && (
              <div className="sh-export-menu">
                <button onClick={() => handleExportAIReport('json')}>
                  Export as JSON
                </button>
                <button onClick={() => handleExportAIReport('csv')}>
                  Export as CSV
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="sh-insights-categories">
        <div className="sh-insights-category">
          <div className="sh-category-header">
            <div className="sh-category-icon sh-category-budget">
              <DollarSign size={24} />
            </div>
            <h3>Budget Optimization</h3>
          </div>
          <div className="sh-insights-list">
            {aiInsights.budgeting.map((insight, index) => (
              <div key={index} className="sh-insight-card">
                <div className="sh-insight-header">
                  <h4>{insight.title}</h4>
                  <span className={`sh-priority-badge sh-priority-${insight.priority}`}>
                    {insight.priority === "high" ? (
                      <AlertTriangle size={14} />
                    ) : insight.priority === "medium" ? (
                      <Target size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}
                  </span>
                </div>
                <p className="sh-insight-text">{insight.insight}</p>
                <div className="sh-insight-impact">
                  <span className="sh-impact-badge">{insight.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sh-insights-category">
          <div className="sh-category-header">
            <div className="sh-category-icon sh-category-engagement">
              <Users2 size={24} />
            </div>
            <h3>Member Engagement</h3>
          </div>
          <div className="sh-insights-list">
            {aiInsights.engagement.map((insight, index) => (
              <div key={index} className="sh-insight-card">
                <div className="sh-insight-header">
                  <h4>{insight.title}</h4>
                  <span className={`sh-priority-badge sh-priority-${insight.priority}`}>
                    {insight.priority === "high" ? (
                      <AlertTriangle size={14} />
                    ) : insight.priority === "medium" ? (
                      <Target size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}
                  </span>
                </div>
                <p className="sh-insight-text">{insight.insight}</p>
                <div className="sh-insight-impact">
                  <span className="sh-impact-badge">{insight.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sh-insights-category">
          <div className="sh-category-header">
            <div className="sh-category-icon sh-category-attendance">
              <Activity size={24} />
            </div>
            <h3>Attendance Optimization</h3>
          </div>
          <div className="sh-insights-list">
            {aiInsights.attendance.map((insight, index) => (
              <div key={index} className="sh-insight-card">
                <div className="sh-insight-header">
                  <h4>{insight.title}</h4>
                  <span className={`sh-priority-badge sh-priority-${insight.priority}`}>
                    {insight.priority === "high" ? (
                      <AlertTriangle size={14} />
                    ) : insight.priority === "medium" ? (
                      <Target size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}
                  </span>
                </div>
                <p className="sh-insight-text">{insight.insight}</p>
                <div className="sh-insight-impact">
                  <span className="sh-impact-badge">{insight.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sh-insights-category">
          <div className="sh-category-header">
            <div className="sh-category-icon sh-category-growth">
              <TrendingUp size={24} />
            </div>
            <h3>Growth Strategies</h3>
          </div>
          <div className="sh-insights-list">
            {aiInsights.growth.map((insight, index) => (
              <div key={index} className="sh-insight-card">
                <div className="sh-insight-header">
                  <h4>{insight.title}</h4>
                  <span className={`sh-priority-badge sh-priority-${insight.priority}`}>
                    {insight.priority === "high" ? (
                      <AlertTriangle size={14} />
                    ) : insight.priority === "medium" ? (
                      <Target size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}
                  </span>
                </div>
                <p className="sh-insight-text">{insight.insight}</p>
                <div className="sh-insight-impact">
                  <span className="sh-impact-badge">{insight.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sh-insights-summary">
        <div className="sh-summary-card">
          <div className="sh-summary-header">
            <Brain size={24} />
            <h3>Weekly AI Summary</h3>
            <span className="sh-summary-date">
              Week of {new Date().toLocaleDateString()}
            </span>
          </div>
          <div className="sh-summary-stats">
            <div className="sh-summary-stat">
              <span className="sh-stat-number">
                {Object.values(aiInsights).flat().filter(i => i.priority === 'high').length}
              </span>
              <span className="sh-stat-label">High Priority</span>
            </div>
            <div className="sh-summary-stat">
              <span className="sh-stat-number">₹15K</span>
              <span className="sh-stat-label">Potential Savings</span>
            </div>
            <div className="sh-summary-stat">
              <span className="sh-stat-number">25%</span>
              <span className="sh-stat-label">Engagement Boost</span>
            </div>
          </div>
          <div className="sh-summary-actions">
            <button 
              className="sh-btn sh-btn-primary"
              onClick={() => handleExportAIReport('json')}
            >
              <Download size={14} />
              Export Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFinance = () => (
    <div className="sh-finance-content">
      <div className="sh-content-header">
        <div className="sh-header-info">
          <h2>Financial Management</h2>
          <p>Track society expenses and manage budget allocation</p>
        </div>
        <div className="sh-header-actions">
          <button 
            className="sh-btn sh-btn-primary" 
            onClick={() => openModal('addExpense')}
          >
            <Plus size={16} />
            Add Expense
          </button>
        </div>
      </div>

      <div className="sh-finance-stats">
        <div className="sh-finance-stat-card">
          <div className="sh-finance-icon sh-finance-total">
            <DollarSign size={24} />
          </div>
          <div className="sh-finance-content">
            <div className="sh-finance-value">₹{(societyData.totalBudget / 1000).toFixed(0)}K</div>
            <div className="sh-finance-label">Total Budget</div>
          </div>
        </div>
        
        <div className="sh-finance-stat-card">
          <div className="sh-finance-icon sh-finance-used">
            <PieChart size={24} />
          </div>
          <div className="sh-finance-content">
            <div className="sh-finance-value">₹{(societyData.budgetUsed / 1000).toFixed(0)}K</div>
            <div className="sh-finance-label">Budget Used</div>
            <div className="sh-finance-percentage">{Math.round((societyData.budgetUsed / societyData.totalBudget) * 100)}%</div>
          </div>
        </div>
        
        <div className="sh-finance-stat-card">
          <div className="sh-finance-icon sh-finance-remaining">
            <BarChart size={24} />
          </div>
          <div className="sh-finance-content">
            <div className="sh-finance-value">₹{((societyData.totalBudget - societyData.budgetUsed) / 1000).toFixed(0)}K</div>
            <div className="sh-finance-label">Remaining</div>
          </div>
        </div>
      </div>

      <div className="sh-finance-grid">
        <div className="sh-finance-chart-card">
          <div className="sh-card-header">
            <div className="sh-card-title">
              <PieChart className="sh-card-icon" size={20} />
              <h3>Expense Breakdown</h3>
            </div>
          </div>
          <div className="sh-expense-breakdown">
            {[
              { category: 'Equipment', amount: 15000, color: '#98bad5' },
              { category: 'Venue', amount: 8000, color: '#4CAF50' },
              { category: 'Refreshments', amount: 5000, color: '#FF9800' },
              { category: 'Materials', amount: 4000, color: '#F44336' }
            ].map((item, index) => (
              <div key={index} className="sh-expense-item">
                <div className="sh-expense-color" style={{ backgroundColor: item.color }}></div>
                <div className="sh-expense-category">{item.category}</div>
                <div className="sh-expense-amount">₹{item.amount}</div>
                <div className="sh-expense-percentage">
                  {Math.round((item.amount / societyData.budgetUsed) * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sh-finance-expenses-card">
          <div className="sh-card-header">
            <div className="sh-card-title">
              <FileText className="sh-card-icon" size={20} />
              <h3>Recent Expenses</h3>
            </div>
          </div>
          <div className="sh-expenses-list">
            {expensesList.slice(-4).map(expense => (
              <div key={expense.id} className="sh-expense-record">
                <div className="sh-expense-info">
                  <h4>{expense.description}</h4>
                  <span className="sh-expense-category-tag">{expense.category}</span>
                </div>
                <div className="sh-expense-details">
                  <div className="sh-expense-amount">₹{expense.amount}</div>
                  <div className="sh-expense-date">{new Date(expense.date).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="sh-chat-content">
      <div className="sh-content-header">
        <div className="sh-header-info">
          <h2>AI Assistant</h2>
          <p>Get intelligent insights and manage your society efficiently</p>
        </div>
      </div>

      <div className="sh-chat-container">
        <div className="sh-chat-card">
          <div className="sh-card-header">
            <div className="sh-card-title">
              <Brain className="sh-card-icon" size={24} />
              <h3>Society Management Assistant</h3>
            </div>
          </div>
          <div className="sh-chat-messages">
            {chatMessages.map(msg => (
              <div key={msg.id} className={`sh-chat-message ${msg.isBot ? 'sh-bot-message' : 'sh-user-message'}`}>
                <div className="sh-message-avatar">
                  {msg.isBot ? <Brain size={16} /> : 'SH'}
                </div>
                <div className="sh-message-content">
                  <div className="sh-message-header">
                    <span className="sh-message-user">{msg.user}</span>
                    <span className="sh-message-time">{msg.time}</span>
                  </div>
                  <div className="sh-message-text">{msg.message}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="sh-chat-input">
            <input
              type="text"
              placeholder="Ask about member analytics, event insights, budget optimization..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="sh-message-input"
            />
            <button className="sh-send-btn" onClick={handleSendMessage}>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="sh-settings-content">
      <div className="sh-settings-header">
        <div className="sh-settings-title">
          <h2>Society Profile Settings</h2>
          <p>Manage your complete society information and preferences</p>
        </div>
        <div className="sh-settings-actions">
          {isEditing ? (
            <>
              <button className="sh-btn sh-btn-secondary" onClick={() => setIsEditing(false)}>
                <X size={16} />
                Cancel
              </button>
              <button className="sh-btn sh-btn-primary" onClick={handleSaveSettings}>
                <Save size={16} />
                Save Changes
              </button>
            </>
          ) : (
            <button className="sh-btn sh-btn-primary" onClick={() => setIsEditing(true)}>
              <Edit size={16} />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="sh-settings-grid">
        <div className="sh-society-profile">
          <div className="sh-profile-header">
            <div className="sh-profile-logo">
              {societyData.logo ? (
                <img src={societyData.logo} alt={societyData.name} />
              ) : (
                <div className="sh-logo-placeholder">
                  {societyData.name.charAt(0)}
                </div>
              )}
              {isEditing && (
                <button className="sh-logo-upload">
                  <Camera size={16} />
                </button>
              )}
            </div>
            <div className="sh-profile-info">
              <h3>{societyData.name}</h3>
              <p>{societyData.category}</p>
              <div className="sh-profile-stats">
                <span>{societyData.totalMembers} Members</span>
                <span>{societyData.eventsThisYear} Events</span>
                <span>Since {societyData.foundedYear}</span>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="sh-profile-edit">
              <div className="sh-form-group">
                <label>Society Name</label>
                <input
                  type="text"
                  value={societyData.name}
                  onChange={(e) => setSocietyData({...societyData, name: e.target.value})}
                  className="sh-form-input"
                />
              </div>
              <div className="sh-form-group">
                <label>Category</label>
                <select
                  value={societyData.category}
                  onChange={(e) => setSocietyData({...societyData, category: e.target.value})}
                  className="sh-form-select"
                >
                  <option value="Technical Society">Technical Society</option>
                  <option value="Cultural Society">Cultural Society</option>
                  <option value="Sports Society">Sports Society</option>
                  <option value="Academic Society">Academic Society</option>
                  <option value="Arts Society">Arts Society</option>
                  <option value="Music Society">Music Society</option>
                  <option value="Drama Society">Drama Society</option>
                  <option value="Dance Society">Dance Society</option>
                </select>
              </div>
              <div className="sh-form-group">
                <label>Description</label>
                <textarea
                  value={societyData.description}
                  onChange={(e) => setSocietyData({...societyData, description: e.target.value})}
                  className="sh-form-textarea"
                  rows={4}
                />
              </div>
            </div>
          )}
        </div>

        <div className="sh-settings-sections">
          <div className="sh-settings-section">
            <div className="sh-section-header">
              <Building size={20} />
              <h3>Basic Information</h3>
            </div>
            <div className="sh-form-grid">
              <div className="sh-form-group">
                <label>Founded Year</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={societyData.foundedYear}
                    onChange={(e) => setSocietyData({...societyData, foundedYear: e.target.value})}
                    className="sh-form-input"
                  />
                ) : (
                  <div className="sh-form-display">{societyData.foundedYear}</div>
                )}
              </div>
              <div className="sh-form-group">
                <label>Website</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={societyData.website}
                    onChange={(e) => setSocietyData({...societyData, website: e.target.value})}
                    className="sh-form-input"
                  />
                ) : (
                  <div className="sh-form-display">
                    <a href={societyData.website} target="_blank" rel="noopener noreferrer">
                      {societyData.website} <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </div>
              <div className="sh-form-group sh-form-full">
                <label>Society Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={societyData.email}
                    onChange={(e) => setSocietyData({...societyData, email: e.target.value})}
                    className="sh-form-input"
                  />
                ) : (
                  <div className="sh-form-display">{societyData.email}</div>
                )}
              </div>
              <div className="sh-form-group">
                <label>Rating</label>
                {isEditing ? (
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={societyData.rating}
                    onChange={(e) => setSocietyData({...societyData, rating: parseFloat(e.target.value)})}
                    className="sh-form-input"
                  />
                ) : (
                  <div className="sh-form-display">{societyData.rating}/5.0</div>
                )}
              </div>
              <div className="sh-form-group">
                <label>Member Limit</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={societyData.memberLimit}
                    onChange={(e) => setSocietyData({...societyData, memberLimit: parseInt(e.target.value)})}
                    className="sh-form-input"
                  />
                ) : (
                  <div className="sh-form-display">{societyData.memberLimit}</div>
                )}
              </div>
            </div>
          </div>

          <div className="sh-settings-section">
            <div className="sh-section-header">
              <GraduationCap size={20} />
              <h3>Leadership & Contact Information</h3>
            </div>
            <div className="sh-form-grid">
              <div className="sh-form-group">
                <label>President Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={societyData.presidentName}
                    onChange={(e) => setSocietyData({...societyData, presidentName: e.target.value})}
                    className="sh-form-input"
                  />
                ) : (
                  <div className="sh-form-display">{societyData.presidentName}</div>
                )}
              </div>
              <div className="sh-form-group">
                <label>President Email</label>
              {isEditing ? (
                  <input
                    type="email"
                    value={societyData.presidentEmail}
                    onChange={(e) => setSocietyData({...societyData, presidentEmail: e.target.value})}
                    className="sh-form-input"
                  />
                ) : (
                  <div className="sh-form-display">{societyData.presidentEmail}</div>
                )}
              </div>
              <div className="sh-form-group">
                <label>President Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={societyData.presidentPhone}
                    onChange={(e) => setSocietyData({...societyData, presidentPhone: e.target.value})}
                    className="sh-form-input"
                  />
                ) : (
                  <div className="sh-form-display">{societyData.presidentPhone}</div>
                )}
              </div>
              <div className="sh-form-group">
                <label>Coordinator Teacher</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={societyData.coordinatorTeacher}
                    onChange={(e) => setSocietyData({...societyData, coordinatorTeacher: e.target.value})}
                    className="sh-form-input"
                  />
                ) : (
                  <div className="sh-form-display">{societyData.coordinatorTeacher}</div>
                )}
              </div>
              <div className="sh-form-group">
                <label>Coordinator Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={societyData.coordinatorEmail}
                    onChange={(e) => setSocietyData({...societyData, coordinatorEmail: e.target.value})}
                    className="sh-form-input"
                  />
                ) : (
                  <div className="sh-form-display">{societyData.coordinatorEmail}</div>
                )}
              </div>
              <div className="sh-form-group">
                <label>Coordinator Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={societyData.coordinatorPhone}
                    onChange={(e) => setSocietyData({...societyData, coordinatorPhone: e.target.value})}
                    className="sh-form-input"
                  />
                ) : (
                  <div className="sh-form-display">{societyData.coordinatorPhone}</div>
                )}
              </div>
            </div>
          </div>

          <div className="sh-settings-section">
            <div className="sh-section-header">
              <Globe size={20} />
              <h3>Social Media & Links</h3>
            </div>
            <div className="sh-form-grid">
              <div className="sh-form-group">
                <label>Instagram Handle</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={societyData.instagram}
                    onChange={(e) => setSocietyData({...societyData, instagram: e.target.value})}
                    className="sh-form-input"
                    placeholder="@society_name"
                  />
                ) : (
                  <div className="sh-form-display">{societyData.instagram}</div>
                )}
              </div>
              <div className="sh-form-group">
                <label>Facebook Page</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={societyData.facebook}
                    onChange={(e) => setSocietyData({...societyData, facebook: e.target.value})}
                    className="sh-form-input"
                    placeholder="facebook.com/society"
                  />
                ) : (
                  <div className="sh-form-display">{societyData.facebook}</div>
                )}
              </div>
              <div className="sh-form-group">
                <label>LinkedIn Page</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={societyData.linkedin}
                    onChange={(e) => setSocietyData({...societyData, linkedin: e.target.value})}
                    className="sh-form-input"
                    placeholder="linkedin.com/company/society"
                  />
                ) : (
                  <div className="sh-form-display">{societyData.linkedin}</div>
                )}
              </div>
              <div className="sh-form-group">
                <label>YouTube Channel</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={societyData.youtube}
                    onChange={(e) => setSocietyData({...societyData, youtube: e.target.value})}
                    className="sh-form-input"
                    placeholder="youtube.com/@society"
                  />
                ) : (
                  <div className="sh-form-display">{societyData.youtube}</div>
                )}
              </div>
              <div className="sh-form-group">
                <label>GitHub Organization</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={societyData.github}
                    onChange={(e) => setSocietyData({...societyData, github: e.target.value})}
                    className="sh-form-input"
                    placeholder="github.com/society-name"
                  />
                ) : (
                  <div className="sh-form-display">{societyData.github}</div>
                )}
              </div>
            </div>
          </div>

          <div className="sh-settings-section">
            <div className="sh-section-header">
              <Palette size={20} />
              <h3>Tags & Specializations</h3>
            </div>
            <div className="sh-form-grid">
              <div className="sh-form-group sh-form-full">
                <label>Society Tags (comma-separated)</label>
                {isEditing ? (
                  <textarea
                    value={societyData.tags ? societyData.tags.join(', ') : ''}
                    onChange={(e) => setSocietyData({...societyData, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
                    className="sh-form-textarea"
                    placeholder="Technology, Programming, Web Development, AI, Machine Learning"
                    rows={3}
                  />
                ) : (
                  <div className="sh-form-display">
                    {societyData.tags ? societyData.tags.join(', ') : 'No tags set'}
                  </div>
                )}
              </div>
              <div className="sh-form-group sh-form-full">
                <label>Achievements (one per line)</label>
                {isEditing ? (
                  <textarea
                    value={societyData.achievements ? societyData.achievements.join('\n') : ''}
                    onChange={(e) => setSocietyData({...societyData, achievements: e.target.value.split('\n').map(ach => ach.trim()).filter(ach => ach)})}
                    className="sh-form-textarea"
                    placeholder="Winner of Inter-College Hackathon 2023&#10;Organized 15+ successful workshops&#10;500+ students trained"
                    rows={4}
                  />
                ) : (
                  <div className="sh-form-display">
                    {societyData.achievements ? (
                      <ul style={{listStyle: 'none', padding: 0}}>
                        {societyData.achievements.map((ach, idx) => (
                          <li key={idx} style={{marginBottom: '4px'}}>• {ach}</li>
                        ))}
                      </ul>
                    ) : 'No achievements listed'}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="sh-settings-section">
            <div className="sh-section-header">
              <BarChart size={20} />
              <h3>Society Statistics</h3>
            </div>
            <div className="sh-stats-overview">
              <div className="sh-stat-item">
                <Users size={20} />
                <div className="sh-stat-content">
                  <span className="sh-stat-value">{societyData.totalMembers}</span>
                  <span className="sh-stat-label">Total Members</span>
                </div>
              </div>
              <div className="sh-stat-item">
                <Activity size={20} />
                <div className="sh-stat-content">
                  <span className="sh-stat-value">{societyData.activeMembers}</span>
                  <span className="sh-stat-label">Active Members</span>
                </div>
              </div>
              <div className="sh-stat-item">
                <Calendar size={20} />
                <div className="sh-stat-content">
                  <span className="sh-stat-value">{societyData.eventsThisYear}</span>
                  <span className="sh-stat-label">Events This Year</span>
                </div>
              </div>
              <div className="sh-stat-item">
                <DollarSign size={20} />
                <div className="sh-stat-content">
                  <span className="sh-stat-value">₹{(societyData.totalBudget / 1000).toFixed(0)}K</span>
                  <span className="sh-stat-label">Total Budget</span>
                </div>
              </div>
              <div className="sh-stat-item">
                <TrendingUp size={20} />
                <div className="sh-stat-content">
                  <span className="sh-stat-value">{Math.round((societyData.activeMembers / societyData.totalMembers) * 100)}%</span>
                  <span className="sh-stat-label">Engagement Rate</span>
                </div>
              </div>
              <div className="sh-stat-item">
                <Star size={20} />
                <div className="sh-stat-content">
                  <span className="sh-stat-value">{societyData.rating}</span>
                  <span className="sh-stat-label">Average Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showExportMenu && !event.target.closest('.sh-export-dropdown')) {
        setShowExportMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showExportMenu]);

  return (
    <div className="sh-container">
      {showSuccess && (
        <div className="sh-success-message">
          <CheckCircle size={20} />
          <span>{successMessage}</span>
        </div>
      )}

      <header className="sh-header">
        <div className="sh-header-left">
          <button 
            onClick={() => setCurrentPage('getstarted')} 
            className="sh-back-button"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="sh-society-info">
            <h1>{societyData.name}</h1>
            <p>Society Head Dashboard • {societyData.totalMembers} Members</p>
          </div>
        </div>
        <div className="sh-header-right">
          <button 
            className="sh-notification-btn"
            onClick={() => openModal('notifications')}
          >
            <Bell size={20} />
            <span className="sh-notification-badge">
              {notifications.filter(n => !n.read).length}
            </span>
          </button>
          <button 
            className="sh-settings-btn"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            <Settings size={20} />
          </button>
          <div className="sh-profile-avatar">
            SH
          </div>
        </div>
      </header>

      {isSettingsOpen ? (
        renderSettings()
      ) : (
        <>
          <nav className="sh-navigation">
            <button 
              className={`sh-nav-item ${activeTab === 'dashboard' ? 'sh-active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <Activity size={16} />
              Dashboard
            </button>
            <button 
              className={`sh-nav-item ${activeTab === 'events' ? 'sh-active' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              <Calendar size={16} />
              Events
            </button>
            <button 
              className={`sh-nav-item ${activeTab === 'members' ? 'sh-active' : ''}`}
              onClick={() => setActiveTab('members')}
            >
              <Users size={16} />
              Members
            </button>
            <button 
              className={`sh-nav-item ${activeTab === 'suggestions' ? 'sh-active' : ''}`}
              onClick={() => setActiveTab('suggestions')}
            >
              <Lightbulb size={16} />
              Suggestions
            </button>
            <button 
              className={`sh-nav-item ${activeTab === 'insights' ? 'sh-active' : ''}`}
              onClick={() => setActiveTab('insights')}
            >
              <BrainCircuit size={16} />
              AI Insights
            </button>
            <button 
              className={`sh-nav-item ${activeTab === 'finance' ? 'sh-active' : ''}`}
              onClick={() => setActiveTab('finance')}
            >
              <DollarSign size={16} />
              Finance
            </button>
            <button 
              className={`sh-nav-item ${activeTab === 'chat' ? 'sh-active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              <MessageCircle size={16} />
              AI Assistant
            </button>
          </nav>

          <main className="sh-main">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'events' && renderEvents()}
            {activeTab === 'members' && renderMembers()}
            {activeTab === 'suggestions' && renderSuggestions()}
            {activeTab === 'insights' && renderAIInsights()}
            {activeTab === 'finance' && renderFinance()}
            {activeTab === 'chat' && renderChat()}
          </main>
        </>
      )}

      {isModalOpen && (
        <div className="sh-modal-backdrop">
          <div ref={modalRef} className="sh-modal-content">
            <div className="sh-modal-header">
              <h2>
                {modalType === 'notifications' && 'Notifications'}
                {modalType === 'eventReport' && 'Generate AI Event Report'}
                {modalType === 'sendMessage' && 'Send Message to Member'}
                {modalType === 'removeMember' && 'Remove Member'}
                {modalType === 'addExpense' && 'Add New Expense'}
                {modalType === 'addMember' && 'Add New Member'}
                {modalType === 'suggestionDetails' && 'Suggestion Details'}
              </h2>
              <button onClick={closeModal} className="sh-modal-close">
                <X size={20} />
              </button>
            </div>

            <div className="sh-modal-body">
              {modalType === 'addExpense' && (
                <div className="sh-expense-form">
                  <div className="sh-form-grid">
                    <div className="sh-form-group">
                      <label>Category</label>
                      <select
                        value={expenseForm.category}
                        onChange={(e) => setExpenseForm({...expenseForm, category: e.target.value})}
                        className="sh-form-select"
                      >
                        <option value="">Select Category</option>
                        <option value="Equipment">Equipment</option>
                        <option value="Venue">Venue</option>
                        <option value="Refreshments">Refreshments</option>
                        <option value="Materials">Materials</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div className="sh-form-group">
                      <label>Amount (₹)</label>
                      <input
                        type="number"
                        value={expenseForm.amount}
                        onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})}
                        className="sh-form-input"
                        placeholder="0"
                        min="0"
                      />
                    </div>
                    
                    <div className="sh-form-group sh-form-full">
                      <label>Description</label>
                      <textarea
                        value={expenseForm.description}
                        onChange={(e) => setExpenseForm({...expenseForm, description: e.target.value})}
                        className="sh-form-textarea"
                        placeholder="Describe the expense..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="sh-form-group">
                      <label>Date</label>
                      <input
                        type="date"
                        value={expenseForm.date}
                        onChange={(e) => setExpenseForm({...expenseForm, date: e.target.value})}
                        className="sh-form-input"
                      />
                    </div>
                  </div>
                  
                  <div className="sh-modal-actions">
                    <button className="sh-btn sh-btn-secondary" onClick={closeModal}>
                      Cancel
                    </button>
                    <button 
                      className="sh-btn sh-btn-primary" 
                      onClick={handleAddExpense}
                      disabled={!expenseForm.category || !expenseForm.amount || !expenseForm.description}
                    >
                      <Plus size={16} />
                      Add Expense
                    </button>
                  </div>
                </div>
              )}

              {modalType === 'addMember' && (
                <div className="sh-member-form">
                  <div className="sh-form-grid">
                    <div className="sh-form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={memberForm.name}
                        onChange={(e) => setMemberForm({...memberForm, name: e.target.value})}
                        className="sh-form-input"
                        placeholder="Enter full name"
                      />
                    </div>
                    
                    <div className="sh-form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        value={memberForm.email}
                        onChange={(e) => setMemberForm({...memberForm, email: e.target.value})}
                        className="sh-form-input"
                        placeholder="student@university.edu"
                      />
                    </div>
                    
                    <div className="sh-form-group">
                      <label>Role</label>
                      <select
                        value={memberForm.role}
                        onChange={(e) => setMemberForm({...memberForm, role: e.target.value})}
                        className="sh-form-select"
                      >
                        <option value="Member">Member</option>
                        <option value="Core Member">Core Member</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="Junior Council">Junior Council</option>
                      </select>
                    </div>
                    
                    <div className="sh-form-group">
                      <label>Department</label>
                      <select
                        value={memberForm.department}
                        onChange={(e) => setMemberForm({...memberForm, department: e.target.value})}
                        className="sh-form-select"
                      >
                        <option value="">Select Department</option>
                        <option value="CSE">Computer Science Engineering</option>
                        <option value="ECE">Electronics & Communication</option>
                        <option value="IT">Information Technology</option>
                        <option value="ME">Mechanical Engineering</option>
                        <option value="CE">Civil Engineering</option>
                        <option value="EE">Electrical Engineering</option>
                      </select>
                    </div>
                    
                    <div className="sh-form-group sh-form-full">
                      <label>Branch</label>
                      <input
                        type="text"
                        value={memberForm.branch}
                        onChange={(e) => setMemberForm({...memberForm, branch: e.target.value})}
                        className="sh-form-input"
                        placeholder="e.g., Computer Science Engineering"
                      />
                    </div>
                    
                    <div className="sh-form-group">
                      <label>Phone Number (Optional)</label>
                      <input
                        type="tel"
                        value={memberForm.phone}
                        onChange={(e) => setMemberForm({...memberForm, phone: e.target.value})}
                        className="sh-form-input"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  
                  <div className="sh-modal-actions">
                    <button className="sh-btn sh-btn-secondary" onClick={closeModal}>
                      Cancel
                    </button>
                    <button 
                      className="sh-btn sh-btn-primary" 
                      onClick={handleAddMember}
                      disabled={!memberForm.name || !memberForm.email}
                    >
                      <UserPlus size={16} />
                      Add Member
                    </button>
                  </div>
                </div>
              )}

              {modalType === 'suggestionDetails' && selectedSuggestion && (
                <div className="sh-suggestion-details">
                  <div className="sh-suggestion-header-modal">
                    <h3>{selectedSuggestion.title}</h3>
                    <span className={`sh-status-badge sh-status-${selectedSuggestion.status}`}>
                      {selectedSuggestion.status}
                    </span>
                  </div>
                  
                  <div className="sh-suggestion-meta-details">
                    <div className="sh-meta-item">
                      <User size={16} />
                      <span>Suggested by {selectedSuggestion.suggestedBy}</span>
                    </div>
                    <div className="sh-meta-item">
                      <Sparkles size={16} />
                      <span>Category: {selectedSuggestion.category}</span>
                    </div>
                    <div className="sh-meta-item">
                      <Heart size={16} />
                      <span>{selectedSuggestion.votes} votes</span>
                    </div>
                    <div className="sh-meta-item">
                      <CalendarIcon size={16} />
                      <span>Submitted: {new Date(selectedSuggestion.dateSubmitted).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="sh-suggestion-full-description">
                    <h4>Description</h4>
                    <p>{selectedSuggestion.description}</p>
                  </div>
                  
                  <div className="sh-suggestion-additional-details">
                    <h4>Event Details</h4>
                    <div className="sh-details-grid">
                      <div className="sh-detail-item">
                        <span className="sh-detail-label">Duration:</span>
                        <span className="sh-detail-value">{selectedSuggestion.estimatedDuration}</span>
                      </div>
                      <div className="sh-detail-item">
                        <span className="sh-detail-label">Expected Participants:</span>
                        <span className="sh-detail-value">{selectedSuggestion.expectedParticipants}</span>
                      </div>
                      <div className="sh-detail-item">
                        <span className="sh-detail-label">Estimated Budget:</span>
                        <span className="sh-detail-value">{selectedSuggestion.estimatedBudget}</span>
                      </div>
                      <div className="sh-detail-item">
                        <span className="sh-detail-label">Suggested Venue:</span>
                        <span className="sh-detail-value">{selectedSuggestion.suggestedVenue}</span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedSuggestion.additionalNotes && (
                    <div className="sh-suggestion-notes">
                      <h4>Additional Notes</h4>
                      <p>{selectedSuggestion.additionalNotes}</p>
                    </div>
                  )}
                  
                  <div className="sh-suggestion-voting-details">
                    <h4>Community Feedback</h4>
                    <div className="sh-voting-breakdown">
                      <div className="sh-vote-item">
                        <span className="sh-vote-label">Total Votes:</span>
                        <span className="sh-vote-count">{selectedSuggestion.votes}</span>
                      </div>
                      <div className="sh-vote-item">
                        <span className="sh-vote-label">Approval Rating:</span>
                        <span className="sh-vote-count">{Math.round((selectedSuggestion.votes / societyData.totalMembers) * 100)}%</span>
                      </div>
                      <div className="sh-vote-item">
                        <span className="sh-vote-label">Category Interest:</span>
                        <span className="sh-vote-count">High</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="sh-modal-actions">
                    <button className="sh-btn sh-btn-secondary" onClick={closeModal}>
                      Close
                    </button>
                    {selectedSuggestion.status === 'pending' && (
                      <>
                        <button 
                          className="sh-btn sh-btn-danger"
                          onClick={handleRejectSuggestion}
                        >
                          <X size={14} />
                          Reject
                        </button>
                        <button 
                          className="sh-btn sh-btn-success"
                          onClick={handleApproveSuggestion}
                        >
                          <CheckCircle size={14} />
                          Approve
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {modalType === 'eventReport' && selectedEvent && (
                <div className="sh-report-modal">
                  <div className="sh-report-header">
                    <h3>
                      <Brain size={24} />
                      Generate AI Report for "{selectedEvent.title}"
                    </h3>
                    <p>Describe what kind of report you need, and our AI will generate a comprehensive analysis based on the event data and member feedback.</p>
                  </div>
                  
                  <div className="sh-event-summary">
                    <div className="sh-summary-item">
                      <span>Event Date:</span>
                      <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                    </div>
                    <div className="sh-summary-item">
                      <span>Attendees:</span>
                      <span>{selectedEvent.actualAttendance || selectedEvent.attendees}</span>
                    </div>
                    <div className="sh-summary-item">
                      <span>Budget Used:</span>
                      <span>₹{selectedEvent.cost}</span>
                    </div>
                    <div className="sh-summary-item">
                      <span>Venue:</span>
                      <span>{selectedEvent.venue}</span>
                    </div>
                  </div>

                  <div className="sh-report-prompt">
                    <label>Report Requirements & AI Prompt</label>
                    <textarea
                      className="sh-prompt-textarea"
                      placeholder="Example: Generate a detailed post-event analysis including attendance patterns, budget utilization, member feedback summary, key achievements, areas for improvement, and recommendations for future similar events. Include visual charts and statistics for presentation to the coordinator."
                      value={reportPrompt}
                      onChange={(e) => setReportPrompt(e.target.value)}
                      rows={6}
                    />
                  </div>

                  <div className="sh-modal-actions">
                    <button className="sh-btn sh-btn-secondary" onClick={closeModal}>
                      Cancel
                    </button>
                    <button 
                      className="sh-btn sh-btn-secondary" 
                      onClick={handleDownloadReport}
                      disabled={!selectedEvent}
                    >
                      <Download size={16} />
                      Download Report Data
                    </button>
                    <button 
                      className="sh-btn sh-btn-primary" 
                      onClick={handleGenerateReport}
                      disabled={!reportPrompt.trim()}
                    >
                      <Brain size={16} />
                      Generate AI Report
                    </button>
                  </div>
                </div>
              )}

              {modalType === 'notifications' && (
                <div className="sh-notifications-list">
                  {notifications.map(notif => (
                    <div 
                      key={notif.id} 
                      className={`sh-notification-item ${notif.read ? 'sh-read' : 'sh-unread'}`}
                    >
                      <div className={`sh-notification-icon sh-${notif.type}`}>
                        {notif.type === 'suggestion' ? <Lightbulb size={16} /> :
                         notif.type === 'finance' ? <DollarSign size={16} /> :
                         <Bell size={16} />}
                      </div>
                      <div className="sh-notification-content">
                        <h4>{notif.title}</h4>
                        <p>{notif.message}</p>
                        <span className="sh-notification-time">{notif.time}</span>
                      </div>
                      {!notif.read && <div className="sh-notification-dot"></div>}
                    </div>
                  ))}
                </div>
              )}

              {modalType === 'removeMember' && selectedMember && (
                <div className="sh-remove-member">
                  <div className="sh-confirmation-content">
                    <div className="sh-warning-icon">
                      <AlertTriangle size={48} />
                    </div>
                    <h3>Remove Member</h3>
                    <p>Are you sure you want to remove <strong>{selectedMember.name}</strong> from the society?</p>
                    <p>This action cannot be undone. The member will lose access to all society resources and communications.</p>
                  </div>
                  
                  <div className="sh-modal-actions">
                    <button className="sh-btn sh-btn-secondary" onClick={closeModal}>
                      Cancel
                    </button>
                    <button 
                      className="sh-btn sh-btn-danger" 
                      onClick={handleRemoveMember}
                    >
                      <UserMinus size={16} />
                      Remove Member
                    </button>
                  </div>
                </div>
              )}

              {modalType === 'sendMessage' && selectedMember && (
                <div className="sh-send-message">
                  <div className="sh-message-recipient">
                    <div className="sh-recipient-info">
                      <div className="sh-recipient-avatar">
                        {selectedMember.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="sh-recipient-details">
                        <h4>{selectedMember.name}</h4>
                        <p>{selectedMember.email}</p>
                        <span className="sh-recipient-role">{selectedMember.role}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="sh-message-compose">
                    <div className="sh-form-group">
                      <label>Subject</label>
                      <input
                        type="text"
                        className="sh-form-input"
                        placeholder="Enter message subject"
                      />
                    </div>
                    
                    <div className="sh-form-group">
                      <label>Message</label>
                      <textarea
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="sh-form-textarea"
                        placeholder="Type your message here..."
                        rows={6}
                      />
                    </div>
                  </div>
                  
                  <div className="sh-modal-actions">
                    <button className="sh-btn sh-btn-secondary" onClick={closeModal}>
                      Cancel
                    </button>
                    <button 
                      className="sh-btn sh-btn-primary"
                      onClick={() => {
                        setSuccessMessage(`Message sent to ${selectedMember.name} successfully!`);
                        setShowSuccess(true);
                        closeModal();
                        setTimeout(() => setShowSuccess(false), 3000);
                      }}
                      disabled={!messageText.trim()}
                    >
                      <Send size={16} />
                      Send Message
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocietyHead;