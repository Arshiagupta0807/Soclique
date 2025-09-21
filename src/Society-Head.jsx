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
  ChevronRight
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
  const [posterTitle, setPosterTitle] = useState('');
  const [posterDescription, setPosterDescription] = useState('');
  const [posterTheme, setPosterTheme] = useState('modern');
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
  const [selectedExpense, setSelectedExpense] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const modalRef = useRef(null);

  const [societyData, setSocietyData] = useState({
    name: "ABC Society",
    type: "Technical Society",
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
    budgetUsed: 32000
  });

  const members = [
    { id: 1, name: "Nishtha Sood", email: "soodnishtha@soclique.com", role: "Core Member", department: "CSE", branch: "Computer Science Engineering", society: "ABC Society", status: "Active", joinDate: "2023-08-15", attendance: 92 },
    { id: 2, name: "Aadhya Sharma", email: "aadhya017@example.com", role: "Volunteer", department: "ECE", branch: "Electronics & Communication", society: "ABC Society", status: "Active", joinDate: "2023-09-20", attendance: 85 },
    { id: 3, name: "Mansi Bhandari", email: "mansibhandari9@example.com", role: "Core Member", department: "IT", branch: "Information Technology", society: "ABC Society", status: "Active", joinDate: "2023-07-10", attendance: 94 },
    { id: 4, name: "Arshia Gupta", email: "arshiaa1@example.com", role: "Core Member", department: "CSE", branch: "Computer Science Engineering", society: "ABC Society", status: "Active", joinDate: "2023-10-05", attendance: 88 },
    { id: 5, name: "Janvi Mathur", email: "mathur89@example.com", role: "Junior Council", department: "CSE", branch: "Computer Science Engineering", society: "ABC Society", status: "Active", joinDate: "2023-10-08", attendance: 91 },
    { id: 6, name: "Sarah Johnson", email: "sarah.j@example.com", role: "Member", department: "CSE", branch: "Computer Science Engineering", society: "ABC Society", status: "Inactive", joinDate: "2023-11-15", attendance: 45 }
  ];

  const events = [
    { id: 1, title: "AI & ML Workshop", date: "2024-01-16", time: "14:00", venue: "Auditorium A", status: "upcoming", attendees: 85, cost: 8000, predictedAttendance: 90 },
    { id: 2, title: "Coding Bootcamp", date: "2024-01-20", time: "10:00", venue: "Lab 1", status: "upcoming", attendees: 45, cost: 5000, predictedAttendance: 50 },
    { id: 3, title: "Hackathon 2024", date: "2023-12-15", time: "09:00", venue: "Main Hall", status: "completed", attendees: 120, cost: 15000, actualAttendance: 118 },
    { id: 4, title: "Tech Talk Series", date: "2023-11-20", time: "15:30", venue: "Conference Room", status: "completed", attendees: 60, cost: 3000, actualAttendance: 58 }
  ];

  const [eventSuggestions, setEventSuggestions] = useState([
    { id: 1, title: "Web Development Bootcamp", suggestedBy: "Sarah Johnson", category: "workshop", description: "3-day intensive bootcamp covering React, Node.js, and deployment", votes: 23, status: "pending" },
    { id: 2, title: "Mobile App Development Workshop", suggestedBy: "Arshia Gupta", category: "workshop", description: "Flutter and React Native development workshop", votes: 18, status: "approved" },
    { id: 3, title: "Cybersecurity Awareness Seminar", suggestedBy: "Mansi Bhandari", category: "seminar", description: "Importance of cybersecurity in modern digital world", votes: 31, status: "pending" }
  ]);

  const expenses = [
    { id: 1, category: "Equipment", amount: 15000, description: "Laptops and projectors for workshops", date: "2023-12-01" },
    { id: 2, category: "Venue", amount: 8000, description: "Auditorium booking for hackathon", date: "2023-12-10" },
    { id: 3, category: "Refreshments", amount: 5000, description: "Snacks and beverages for events", date: "2023-12-15" },
    { id: 4, category: "Materials", amount: 4000, description: "Certificates and stationery", date: "2023-12-20" }
  ];

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

  const openModal = (type, data = null) => {
    setModalType(type);
    if (type === 'sendMessage' || type === 'removeMember') {
      setSelectedMember(data);
    } else if (type === 'eventReport' || type === 'generatePoster') {
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
    setSelectedExpense('');
    setExpenseAmount('');
    setExpenseDescription('');
    setPosterTitle('');
    setPosterDescription('');
    setPosterTheme('modern');
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

  const handleAddExpense = () => {
    if (!selectedExpense || !expenseAmount || !expenseDescription) return;
    
    setSuccessMessage(`Expense of ₹${expenseAmount} added for ${selectedExpense}`);
    setShowSuccess(true);
    closeModal();
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSendReport = () => {
    setSuccessMessage(`Event report for "${selectedEvent?.title}" sent to coordinator!`);
    setShowSuccess(true);
    closeModal();
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleRemoveMember = () => {
    setSuccessMessage(`${selectedMember?.name} has been removed from the society`);
    setShowSuccess(true);
    closeModal();
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleGeneratePoster = () => {
    if (!posterTitle.trim() || !posterDescription.trim()) return;
    
    setSuccessMessage(`AI poster generated for "${selectedEvent?.title}" successfully!`);
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

  const renderDashboard = () => (
    <div className="member-dashboard-content">
      <div className="member-stats-grid">
        <div className="member-stat-card" style={{'--delay': '0s'}}>
          <div className="member-stat-icon">
            <Users size={24} />
          </div>
          <div className="member-stat-content">
            <h3>{societyData.totalMembers}</h3>
            <p>Total Members</p>
            <span className="member-stat-change positive">+5 this month</span>
          </div>
        </div>
        
        <div className="member-stat-card" style={{'--delay': '0.1s'}}>
          <div className="member-stat-icon">
            <Activity size={24} />
          </div>
          <div className="member-stat-content">
            <h3>{Math.round((societyData.activeMembers / societyData.totalMembers) * 100)}%</h3>
            <p>Member Engagement</p>
            <span className="member-stat-change positive">+8% vs last month</span>
          </div>
        </div>
        
        <div className="member-stat-card" style={{'--delay': '0.2s'}}>
          <div className="member-stat-icon">
            <Calendar size={24} />
          </div>
          <div className="member-stat-content">
            <h3>{societyData.eventsThisYear}</h3>
            <p>Events This Year</p>
            <span className="member-stat-change positive">2 more planned</span>
          </div>
        </div>
        
        <div className="member-stat-card" style={{'--delay': '0.3s'}}>
          <div className="member-stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="member-stat-content">
            <h3>₹{((societyData.totalBudget - societyData.budgetUsed) / 1000).toFixed(0)}K</h3>
            <p>Budget Remaining</p>
            <span className="member-stat-change neutral">{Math.round(((societyData.totalBudget - societyData.budgetUsed) / societyData.totalBudget) * 100)}% left</span>
          </div>
        </div>
      </div>

      <div className="member-dashboard-grid">
        <div className="member-dashboard-card" style={{'--delay': '0.4s'}}>
          <div className="member-card-header">
            <h3><BrainCircuit size={20} /> Top AI Recommendations</h3>
            <button className="member-btn-secondary" onClick={() => setActiveTab('insights')}>
              View All Insights
            </button>
          </div>
          <div className="quick-insights-content">
            <div className="quick-insight-item">
              <div className="insight-icon high">
                <DollarSign size={16} />
              </div>
              <div className="insight-content">
                <h4>Budget Optimization</h4>
                <p>Moving 30% events online could save ₹12K annually</p>
                <span className="insight-impact">High Impact</span>
              </div>
            </div>
            <div className="quick-insight-item">
              <div className="insight-icon medium">
                <TrendingUp size={16} />
              </div>
              <div className="insight-content">
                <h4>Engagement Boost</h4>
                <p>Hands-on workshops get 60% more participation</p>
                <span className="insight-impact">High Impact</span>
              </div>
            </div>
          </div>
        </div>

        <div className="member-dashboard-card" style={{'--delay': '0.5s'}}>
          <div className="member-card-header">
            <h3><Calendar size={20} /> Upcoming Events</h3>
            <button className="member-btn-primary" onClick={() => openModal('eventInsights')}>
              <Eye size={16} />
              Event Insights
            </button>
          </div>
          <div className="member-events-list">
            {events.filter(event => event.status === 'upcoming').slice(0, 3).map(event => (
              <div key={event.id} className="member-event-item">
                <div className="member-event-date">
                  <span className="member-day">{new Date(event.date).getDate()}</span>
                  <span className="member-month">{new Date(event.date).toLocaleDateString('en', { month: 'short' })}</span>
                </div>
                <div className="member-event-content">
                  <h4>{event.title}</h4>
                  <p><MapPin size={14} /> {event.venue} • {event.time}</p>
                  <div className="event-predictions">
                    <span className="member-attendees">{event.attendees} registered</span>
                    <span className="predicted-attendance">Predicted: {event.predictedAttendance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="member-dashboard-card" style={{'--delay': '0.6s'}}>
          <div className="member-card-header">
            <h3><Lightbulb size={20} /> Member Suggestions</h3>
            <button className="member-btn-secondary" onClick={() => setActiveTab('suggestions')}>
              View All ({eventSuggestions.length})
            </button>
          </div>
          <div className="suggestions-preview">
            {eventSuggestions.slice(0, 2).map(suggestion => (
              <div key={suggestion.id} className="suggestion-preview-item">
                <h4>{suggestion.title}</h4>
                <p>by {suggestion.suggestedBy}</p>
                <div className="suggestion-meta">
                  <span className="votes">{suggestion.votes} votes</span>
                  <span className={`suggestion-status ${suggestion.status}`}>{suggestion.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="member-dashboard-content">
      <div className="member-content-header">
        <div className="member-header-left">
          <h2>Society Events</h2>
          <p>Manage and track all society events</p>
        </div>
        <div className="header-actions">
          <button className="member-btn-secondary" onClick={() => openModal('eventInsights')}>
            <Eye size={16} />
            AI Insights
          </button>
          <button className="member-btn-primary">
            <Plus size={16} />
            Create Event
          </button>
        </div>
      </div>

      <div className="member-events-grid">
        {events.map(event => (
          <div key={event.id} className="member-event-card">
            <div className="member-event-card-header">
              <h3>{event.title}</h3>
              <div className="event-actions">
                <span className={`member-event-type ${event.status}`}>
                  {event.status}
                </span>
                <div className="event-action-buttons">
                  <button 
                    className="event-action-btn poster-btn"
                    onClick={() => openModal('generatePoster', event)}
                    title="Generate Poster"
                  >
                    <Image size={14} />
                  </button>
                  {event.status === 'completed' && (
                    <button 
                      className="event-action-btn"
                      onClick={() => openModal('eventReport', event)}
                      title="Generate Report"
                    >
                      <FileText size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="member-event-description">
              Join us for an exciting learning experience in {event.title.toLowerCase()}.
            </div>
            <div className="member-event-details">
              <div className="member-event-detail">
                <Calendar size={14} />
                <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
              </div>
              <div className="member-event-detail">
                <MapPin size={14} />
                <span>{event.venue}</span>
              </div>
              <div className="member-event-detail">
                <Users size={14} />
                <span>{event.status === 'completed' ? event.actualAttendance || event.attendees : event.attendees} attendees</span>
              </div>
              <div className="member-event-detail">
                <DollarSign size={14} />
                <span>₹{event.cost}</span>
              </div>
            </div>
            {event.status === 'upcoming' && event.predictedAttendance && (
              <div className="event-prediction">
                <Brain size={14} />
                <span>AI Prediction: {event.predictedAttendance} attendees</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderMembers = () => (
    <div className="member-dashboard-content">
      <div className="member-content-header">
        <div className="member-header-left">
          <h2>Society Members</h2>
          <p>Manage your society members</p>
        </div>
        <div className="header-actions">
          <button className="member-btn-secondary">
            <Filter size={16} />
            Filter
          </button>
          <button className="member-btn-primary">
            <UserPlus size={16} />
            Add Member
          </button>
        </div>
      </div>

      <div className="members-list-container">
        <div className="members-list-header">
          <div className="member-list-column">Name</div>
          <div className="member-list-column">Email</div>
          <div className="member-list-column">Role</div>
          <div className="member-list-column">Attendance</div>
          <div className="member-list-column">Status</div>
          <div className="member-list-column">Actions</div>
        </div>
        
        {members.map(member => (
          <div key={member.id} className="member-list-item">
            <div className="member-list-column">
              <div className="member-name-cell">
                <div className="member-list-avatar">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="member-name-info">
                  <span className="member-name">{member.name}</span>
                  <span className="member-department">{member.department}</span>
                </div>
              </div>
            </div>
            
            <div className="member-list-column">
              <span className="member-email">{member.email}</span>
            </div>
            
            <div className="member-list-column">
              <span className={`member-role-tag ${member.role.toLowerCase().replace(/\s+/g, '-')}`}>
                {member.role}
              </span>
            </div>

            <div className="member-list-column">
              <span className={`attendance-badge ${member.attendance >= 80 ? 'good' : member.attendance >= 60 ? 'average' : 'poor'}`}>
                {member.attendance}%
              </span>
            </div>
            
            <div className="member-list-column">
              <span className={`status-badge ${member.status.toLowerCase()}`}>
                {member.status}
              </span>
            </div>
            
            <div className="member-list-column">
              <div className="member-actions">
                <button 
                  className="member-action-btn message-btn"
                  onClick={() => openModal('sendMessage', member)}
                  title="Send Message"
                >
                  <MessageCircle size={16} />
                </button>
                <button 
                  className="member-action-btn edit-btn"
                  title="Edit Member"
                >
                  <Edit size={16} />
                </button>
                <button 
                  className="member-action-btn delete-btn"
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
  );

  const renderSuggestions = () => (
    <div className="member-dashboard-content">
      <div className="member-content-header">
        <div className="member-header-left">
          <h2>Event Suggestions</h2>
          <p>Review member suggestions for upcoming events</p>
        </div>
      </div>

      <div className="suggestions-grid">
        {eventSuggestions.map(suggestion => (
          <div key={suggestion.id} className="suggestion-card">
            <div className="suggestion-card-header">
              <h3>{suggestion.title}</h3>
              <span className={`suggestion-status-badge ${suggestion.status}`}>
                {suggestion.status}
              </span>
            </div>
            
            <div className="suggestion-meta">
              <div className="suggestion-author">
                <User size={16} />
                <span>Suggested by {suggestion.suggestedBy}</span>
              </div>
              <div className="suggestion-category">
                <Sparkles size={16} />
                <span>{suggestion.category}</span>
              </div>
            </div>
            
            <div className="suggestion-description">
              {suggestion.description}
            </div>
            
            <div className="suggestion-voting">
              <div className="votes-count">
                <Heart size={16} />
                <span>{suggestion.votes} votes</span>
              </div>
            </div>
            
            <div className="suggestion-actions">
              <button 
                className="member-btn-secondary"
                onClick={() => openModal('suggestionDetails', suggestion)}
              >
                <Eye size={14} />
                Details
              </button>
              {suggestion.status === 'pending' && (
                <>
                  <button 
                    className="member-btn-success"
                    onClick={() => openModal('approveSuggestion', suggestion)}
                  >
                    <CheckCircle size={14} />
                    Approve
                  </button>
                  <button 
                    className="member-btn-danger"
                    onClick={() => openModal('rejectSuggestion', suggestion)}
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
<div className="member-dashboard-content">
  <div className="member-content-header">
    <div className="member-header-left">
      <h2>AI Insights & Analytics</h2>
      <p>Comprehensive AI-powered recommendations for society growth</p>
    </div>
  </div>

  <div className="insights-categories-grid">
    {/* Budget Optimization */}
    <div className="insights-category-card">
      <div className="category-header">
        <div className="category-icon budgeting">
          <DollarSign size={24} />
        </div>
        <h3>Budget Optimization</h3>
      </div>
      <div className="insights-list">
        {aiInsights.budgeting.map((insight, index) => (
          <div key={index} className="insight-item-detailed">
            <div className="insight-header">
              <h4>{insight.title}</h4>
              <span className={`priority-indicator ${insight.priority}`}>
                {insight.priority === "high" ? (
                  <TrendingUp size={14} />
                ) : insight.priority === "medium" ? (
                  <Target size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
              </span>
            </div>
            <p className="insight-text">{insight.insight}</p>
            <div className="insight-impact">
              <span className="impact-badge">{insight.impact}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Member Engagement */}
    <div className="insights-category-card">
      <div className="category-header">
        <div className="category-icon engagement">
          <Users2 size={24} />
        </div>
        <h3>Member Engagement</h3>
      </div>
      <div className="insights-list">
        {aiInsights.engagement.map((insight, index) => (
          <div key={index} className="insight-item-detailed">
            <div className="insight-header">
              <h4>{insight.title}</h4>
              <span className={`priority-indicator ${insight.priority}`}>
                {insight.priority === "high" ? (
                  <TrendingUp size={14} />
                ) : insight.priority === "medium" ? (
                  <Target size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
              </span>
            </div>
            <p className="insight-text">{insight.insight}</p>
            <div className="insight-impact">
              <span className="impact-badge">{insight.impact}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Attendance Optimization */}
    <div className="insights-category-card">
      <div className="category-header">
        <div className="category-icon attendance">
          <Activity size={24} />
        </div>
        <h3>Attendance Optimization</h3>
      </div>
      <div className="insights-list">
        {aiInsights.attendance.map((insight, index) => (
          <div key={index} className="insight-item-detailed">
            <div className="insight-header">
              <h4>{insight.title}</h4>
              <span className={`priority-indicator ${insight.priority}`}>
                {insight.priority === "high" ? (
                  <TrendingUp size={14} />
                ) : insight.priority === "medium" ? (
                  <Target size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
              </span>
            </div>
            <p className="insight-text">{insight.insight}</p>
            <div className="insight-impact">
              <span className="impact-badge">{insight.impact}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Growth Strategies */}
    <div className="insights-category-card">
      <div className="category-header">
        <div className="category-icon growth">
          <TrendingUp size={24} />
        </div>
        <h3>Growth Strategies</h3>
      </div>
      <div className="insights-list">
        {aiInsights.growth.map((insight, index) => (
          <div key={index} className="insight-item-detailed">
            <div className="insight-header">
              <h4>{insight.title}</h4>
              <span className={`priority-indicator ${insight.priority}`}>
                {insight.priority === "high" ? (
                  <TrendingUp size={14} />
                ) : insight.priority === "medium" ? (
                  <Target size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
              </span>
            </div>
            <p className="insight-text">{insight.insight}</p>
            <div className="insight-impact">
              <span className="impact-badge">{insight.impact}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* AI Summary */}
  <div className="ai-recommendations-summary">
    <div className="summary-card">
      <h3>
        <Brain size={20} /> Weekly AI Summary
      </h3>
      <div className="summary-stats">
        <div className="summary-stat">
          <span className="stat-number">8</span>
          <span className="stat-label">High Priority Insights</span>
        </div>
        <div className="summary-stat">
          <span className="stat-number">₹15K</span>
          <span className="stat-label">Potential Savings</span>
        </div>
        <div className="summary-stat">
          <span className="stat-number">25%</span>
          <span className="stat-label">Engagement Boost</span>
        </div>
      </div>
      <button className="member-btn-primary">
        <Download size={16} />
        Download Full Report
      </button>
    </div>
  </div>
</div>
    );
  const renderFinance = () => (
    <div className="member-dashboard-content">
      <div className="member-content-header">
        <div className="member-header-left">
          <h2>Financial Management</h2>
          <p>Track society expenses and budget</p>
        </div>
        <button className="member-btn-primary" onClick={() => openModal('addExpense')}>
          <Plus size={16} />
          Add Expense
        </button>
      </div>

      <div className="finance-stats-grid">
        <div className="finance-stat-card">
          <div className="finance-stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="finance-stat-content">
            <h3>₹{(societyData.totalBudget / 1000).toFixed(0)}K</h3>
            <p>Total Budget</p>
          </div>
        </div>
        
        <div className="finance-stat-card">
          <div className="finance-stat-icon">
            <PieChart size={24} />
          </div>
          <div className="finance-stat-content">
            <h3>₹{(societyData.budgetUsed / 1000).toFixed(0)}K</h3>
            <p>Budget Used</p>
            <span className="budget-percentage">{Math.round((societyData.budgetUsed / societyData.totalBudget) * 100)}%</span>
          </div>
        </div>
        
        <div className="finance-stat-card">
          <div className="finance-stat-icon">
            <BarChart size={24} />
          </div>
          <div className="finance-stat-content">
            <h3>₹{((societyData.totalBudget - societyData.budgetUsed) / 1000).toFixed(0)}K</h3>
            <p>Remaining</p>
          </div>
        </div>
      </div>

      <div className="finance-content-grid">
        <div className="finance-chart-card">
          <div className="member-card-header">
            <h3><PieChart size={20} /> Expense Breakdown</h3>
          </div>
          <div className="expense-breakdown">
            {[
              { category: 'Equipment', amount: 15000, color: '#3b82f6' },
              { category: 'Venue', amount: 8000, color: '#10b981' },
              { category: 'Refreshments', amount: 5000, color: '#f59e0b' },
              { category: 'Materials', amount: 4000, color: '#ef4444' }
            ].map((item, index) => (
              <div key={index} className="expense-item">
                <div className="expense-color" style={{ backgroundColor: item.color }}></div>
                <span className="expense-category">{item.category}</span>
                <span className="expense-amount">₹{item.amount}</span>
                <span className="expense-percentage">
                  {Math.round((item.amount / societyData.budgetUsed) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="finance-expenses-card">
          <div className="member-card-header">
            <h3><FileText size={20} /> Recent Expenses</h3>
          </div>
          <div className="expenses-list">
            {expenses.map(expense => (
              <div key={expense.id} className="expense-record">
                <div className="expense-info">
                  <h4>{expense.description}</h4>
                  <span className="expense-category-tag">{expense.category}</span>
                </div>
                <div className="expense-details">
                  <span className="expense-amount">₹{expense.amount}</span>
                  <span className="expense-date">{new Date(expense.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="member-dashboard-content">
      <div className="member-content-header">
        <div className="member-header-left">
          <h2>AI Assistant</h2>
          <p>Get insights and manage your society efficiently</p>
        </div>
      </div>

      <div className="chat-container-full">
        <div className="member-dashboard-card">
          <div className="member-card-header">
            <h3><Brain size={20} /> Society Management Assistant</h3>
          </div>
          <div className="member-chat-container">
            <div className="member-chat-messages">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`member-chat-message ${msg.isBot ? 'bot-message' : 'user-message'}`}>
                  <div className="member-message-avatar">
                    {msg.isBot ? 'AI' : 'YU'}
                  </div>
                  <div className="member-message-content">
                    <div className="member-message-header">
                      <span className="member-message-user">{msg.user}</span>
                      <span className="member-message-time">{msg.time}</span>
                    </div>
                    <div className="member-message-text">{msg.message}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="member-chat-input">
              <input
                type="text"
                placeholder="Ask about member analytics, event insights, budget optimization..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button className="member-send-btn" onClick={handleSendMessage}>
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsProfile = () => (
    <div className="settings-profile-content">
      <div className="settings-header">
        <h2>Society Profile Settings</h2>
        <div className="settings-actions">
          {isEditing ? (
            <>
              <button className="member-btn-secondary" onClick={() => setIsEditing(false)}>
                <X size={16} />
                Cancel
              </button>
              <button className="member-btn-primary" onClick={handleSaveSettings}>
                <Save size={16} />
                Save Changes
              </button>
            </>
          ) : (
            <button className="member-btn-primary" onClick={() => setIsEditing(true)}>
              <Edit size={16} />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="settings-form">
        <div className="settings-section">
          <h3><Building size={20} /> Basic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Society Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={societyData.name}
                  onChange={(e) => setSocietyData({...societyData, name: e.target.value})}
                  className="settings-input"
                />
              ) : (
                <div className="settings-display">{societyData.name}</div>
              )}
            </div>

            <div className="form-group">
              <label>Society Type</label>
              {isEditing ? (
                <select
                  value={societyData.type}
                  onChange={(e) => setSocietyData({...societyData, type: e.target.value})}
                  className="settings-input"
                >
                  <option value="Technical Society">Technical Society</option>
                  <option value="Cultural Society">Cultural Society</option>
                  <option value="Sports Society">Sports Society</option>
                  <option value="Academic Society">Academic Society</option>
                  <option value="Community Service Society">Community Service Society</option>
                </select>
              ) : (
                <div className="settings-display">{societyData.type}</div>
              )}
            </div>

            <div className="form-group">
              <label>Founded Year</label>
              {isEditing ? (
                <input
                  type="text"
                  value={societyData.foundedYear}
                  onChange={(e) => setSocietyData({...societyData, foundedYear: e.target.value})}
                  className="settings-input"
                />
              ) : (
                <div className="settings-display">{societyData.foundedYear}</div>
              )}
            </div>

            <div className="form-group">
              <label>Website</label>
              {isEditing ? (
                <input
                  type="url"
                  value={societyData.website}
                  onChange={(e) => setSocietyData({...societyData, website: e.target.value})}
                  className="settings-input"
                />
              ) : (
                <div className="settings-display">
                  <a href={societyData.website} target="_blank" rel="noopener noreferrer">
                    {societyData.website} <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="form-group full-width">
            <label>Description</label>
            {isEditing ? (
              <textarea
                value={societyData.description}
                onChange={(e) => setSocietyData({...societyData, description: e.target.value})}
                className="settings-textarea"
                rows={4}
              />
            ) : (
              <div className="settings-display">{societyData.description}</div>
            )}
          </div>
        </div>

        <div className="settings-section">
          <h3><Mail size={20} /> Contact Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Society Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={societyData.email}
                  onChange={(e) => setSocietyData({...societyData, email: e.target.value})}
                  className="settings-input"
                />
              ) : (
                <div className="settings-display">{societyData.email}</div>
              )}
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3><GraduationCap size={20} /> Coordinator Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Coordinator Teacher</label>
              {isEditing ? (
                <input
                  type="text"
                  value={societyData.coordinatorTeacher}
                  onChange={(e) => setSocietyData({...societyData, coordinatorTeacher: e.target.value})}
                  className="settings-input"
                />
              ) : (
                <div className="settings-display">{societyData.coordinatorTeacher}</div>
              )}
            </div>

            <div className="form-group">
              <label>Coordinator Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={societyData.coordinatorEmail}
                  onChange={(e) => setSocietyData({...societyData, coordinatorEmail: e.target.value})}
                  className="settings-input"
                />
              ) : (
                <div className="settings-display">{societyData.coordinatorEmail}</div>
              )}
            </div>

            <div className="form-group">
              <label>Coordinator Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={societyData.coordinatorPhone}
                  onChange={(e) => setSocietyData({...societyData, coordinatorPhone: e.target.value})}
                  className="settings-input"
                />
              ) : (
                <div className="settings-display">{societyData.coordinatorPhone}</div>
              )}
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3><BarChart size={20} /> Society Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <Users size={20} />
              <span className="stat-value">{societyData.totalMembers}</span>
              <span className="stat-label">Total Members</span>
            </div>
            <div className="stat-item">
              <Activity size={20} />
              <span className="stat-value">{societyData.activeMembers}</span>
              <span className="stat-label">Active Members</span>
            </div>
            <div className="stat-item">
              <Calendar size={20} />
              <span className="stat-value">{societyData.eventsThisYear}</span>
              <span className="stat-label">Events This Year</span>
            </div>
            <div className="stat-item">
              <DollarSign size={20} />
              <span className="stat-value">₹{(societyData.totalBudget / 1000).toFixed(0)}K</span>
              <span className="stat-label">Total Budget</span>
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

  return (
    <div className="member-society-container">
      {showSuccess && (
        <div className="success-message">
          <CheckCircle size={20} />
          <span>{successMessage}</span>
        </div>
      )}

      <header className="member-society-header">
        <div className="member-header-left">
          <button 
            onClick={() => setCurrentPage('getstarted')} 
            className="member-back-button"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="member-society-info">
            <h1>{societyData.name.toUpperCase()}</h1>
            <p>Society Head Dashboard • {societyData.totalMembers} Members</p>
          </div>
        </div>
        <div className="member-header-right">
          <button 
            className="member-notification-btn"
            onClick={() => openModal('notifications')}
          >
            <Bell size={20} />
            <span className="member-notification-badge">
              {notifications.filter(n => !n.read).length}
            </span>
          </button>
          <button 
            className="member-settings-btn"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            <Settings size={20} />
          </button>
          <div className="member-profile-avatar">
            SH
          </div>
        </div>
      </header>

      {isSettingsOpen ? (
        renderSettingsProfile()
      ) : (
        <>
          <nav className="member-society-nav">
            <button 
              className={`member-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <Activity size={16} />
              Dashboard
            </button>
            <button 
              className={`member-nav-item ${activeTab === 'events' ? 'active' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              <Calendar size={16} />
              Events
            </button>
            <button 
              className={`member-nav-item ${activeTab === 'members' ? 'active' : ''}`}
              onClick={() => setActiveTab('members')}
            >
              <Users size={16} />
              Members
            </button>
            <button 
              className={`member-nav-item ${activeTab === 'suggestions' ? 'active' : ''}`}
              onClick={() => setActiveTab('suggestions')}
            >
              <Lightbulb size={16} />
              Suggestions
            </button>
            <button 
              className={`member-nav-item ${activeTab === 'insights' ? 'active' : ''}`}
              onClick={() => setActiveTab('insights')}
            >
              <BrainCircuit size={16} />
              AI Insights
            </button>
            <button 
              className={`member-nav-item ${activeTab === 'finance' ? 'active' : ''}`}
              onClick={() => setActiveTab('finance')}
            >
              <DollarSign size={16} />
              Finance
            </button>
            <button 
              className={`member-nav-item ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              <MessageCircle size={16} />
              AI Assistant
            </button>
          </nav>

          <main className="member-society-main">
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
        <div className="member-modal-backdrop">
          <div ref={modalRef} className="member-modal-content">
            <div className="member-modal-header">
              <h2>
                {modalType === 'notifications' && 'Notifications'}
                {modalType === 'aiSuggestions' && 'AI Event Suggestions'}
                {modalType === 'eventInsights' && 'Event Insights'}
                {modalType === 'eventReport' && 'Generate Event Report'}
                {modalType === 'sendMessage' && 'Send Message to Member'}
                {modalType === 'removeMember' && 'Remove Member'}
                {modalType === 'addExpense' && 'Add New Expense'}
                {modalType === 'generatePoster' && 'AI Poster Generator'}
                {modalType === 'suggestionDetails' && 'Suggestion Details'}
                {modalType === 'approveSuggestion' && 'Approve Suggestion'}
                {modalType === 'rejectSuggestion' && 'Reject Suggestion'}
              </h2>
              <button onClick={closeModal} className="member-modal-close-button">
                <X size={20} />
              </button>
            </div>

            <div className="member-modal-body">
              {modalType === 'generatePoster' && selectedEvent && (
                <div className="poster-generator-modal">
                  <div className="poster-preview">
                    <div className="poster-mockup">
                      <div className={`poster-theme ${posterTheme}`}>
                        <h3>{posterTitle || selectedEvent.title}</h3>
                        <div className="poster-date">
                          {new Date(selectedEvent.date).toLocaleDateString('en', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="poster-time">{selectedEvent.time}</div>
                        <div className="poster-venue">{selectedEvent.venue}</div>
                        <div className="poster-description">
                          {posterDescription || `Join us for an exciting ${selectedEvent.title.toLowerCase()}`}
                        </div>
                        <div className="poster-society">
                          {societyData.name}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="poster-customization">
                    <h3><Palette size={20} /> Customize Your Poster</h3>
                    
                    <div className="form-group">
                      <label>Event Title</label>
                      <input
                        type="text"
                        className="poster-input"
                        placeholder={selectedEvent.title}
                        value={posterTitle}
                        onChange={(e) => setPosterTitle(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Event Description</label>
                      <textarea
                        className="poster-textarea"
                        placeholder="Enter event description..."
                        value={posterDescription}
                        onChange={(e) => setPosterDescription(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="form-group">
                      <label>Theme Style</label>
                      <div className="theme-options">
                        <button
                          className={`theme-option modern ${posterTheme === 'modern' ? 'selected' : ''}`}
                          onClick={() => setPosterTheme('modern')}
                        >
                          Modern
                        </button>
                        <button
                          className={`theme-option minimal ${posterTheme === 'minimal' ? 'selected' : ''}`}
                          onClick={() => setPosterTheme('minimal')}
                        >
                          Minimal
                        </button>
                        <button
                          className={`theme-option vibrant ${posterTheme === 'vibrant' ? 'selected' : ''}`}
                          onClick={() => setPosterTheme('vibrant')}
                        >
                          Vibrant
                        </button>
                        <button
                          className={`theme-option elegant ${posterTheme === 'elegant' ? 'selected' : ''}`}
                          onClick={() => setPosterTheme('elegant')}
                        >
                          Elegant
                        </button>
                      </div>
                    </div>

                    <div className="ai-suggestions-box">
                      <h4><Brain size={16} /> AI Suggestions</h4>
                      <ul>
                        <li>Use action words like "Join", "Learn", "Discover" to increase engagement</li>
                        <li>Include social media hashtags for better reach</li>
                        <li>Highlight key takeaways or what attendees will learn</li>
                      </ul>
                    </div>
                  </div>

                  <div className="poster-actions">
                    <button className="member-btn-secondary" onClick={closeModal}>
                      Cancel
                    </button>
                    <button 
                      className="member-btn-primary"
                      onClick={handleGeneratePoster}
                    >
                      <Image size={16} />
                      Generate AI Poster
                    </button>
                  </div>
                </div>
              )}

              {modalType === 'suggestionDetails' && selectedSuggestion && (
                <div className="suggestion-details-modal">
                  <div className="suggestion-header-detail">
                    <h3>{selectedSuggestion.title}</h3>
                    <span className={`suggestion-status-badge ${selectedSuggestion.status}`}>
                      {selectedSuggestion.status}
                    </span>
                  </div>

                  <div className="suggestion-meta-detail">
                    <div className="meta-item">
                      <User size={16} />
                      <span>Suggested by: <strong>{selectedSuggestion.suggestedBy}</strong></span>
                    </div>
                    <div className="meta-item">
                      <Sparkles size={16} />
                      <span>Category: <strong>{selectedSuggestion.category}</strong></span>
                    </div>
                    <div className="meta-item">
                      <Heart size={16} />
                      <span>Community votes: <strong>{selectedSuggestion.votes}</strong></span>
                    </div>
                  </div>

                  <div className="suggestion-description-detail">
                    <h4>Description</h4>
                    <p>{selectedSuggestion.description}</p>
                  </div>

                  <div className="suggestion-analysis">
                    <h4><Brain size={16} /> AI Analysis</h4>
                    <div className="analysis-metrics">
                      <div className="metric-item">
                        <span className="metric-label">Estimated Interest:</span>
                        <span className="metric-value high">High (85%)</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Estimated Cost:</span>
                        <span className="metric-value medium">₹8,000 - ₹12,000</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Best Timing:</span>
                        <span className="metric-value">Weekend, 2-3 hours</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Expected Attendance:</span>
                        <span className="metric-value">65-80 members</span>
                      </div>
                    </div>
                  </div>

                  <div className="suggestion-actions-detail">
                    <button className="member-btn-secondary" onClick={closeModal}>
                      Close
                    </button>
                    {selectedSuggestion.status === 'pending' && (
                      <>
                        <button 
                          className="member-btn-danger"
                          onClick={() => {
                            closeModal();
                            openModal('rejectSuggestion', selectedSuggestion);
                          }}
                        >
                          <X size={16} />
                          Reject
                        </button>
                        <button 
                          className="member-btn-success"
                          onClick={() => {
                            closeModal();
                            openModal('approveSuggestion', selectedSuggestion);
                          }}
                        >
                          <CheckCircle size={16} />
                          Approve
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {modalType === 'approveSuggestion' && selectedSuggestion && (
                <div className="approve-suggestion-modal">
                  <div className="approval-icon">
                    <CheckCircle size={48} color="#10b981" />
                  </div>
                  <h3>Approve Event Suggestion</h3>
                  <p>Are you sure you want to approve <strong>"{selectedSuggestion.title}"</strong>?</p>
                  
                  <div className="approval-details">
                    <div className="detail-item">
                      <span>Suggested by:</span>
                      <span>{selectedSuggestion.suggestedBy}</span>
                    </div>
                    <div className="detail-item">
                      <span>Community votes:</span>
                      <span>{selectedSuggestion.votes}</span>
                    </div>
                    <div className="detail-item">
                      <span>Category:</span>
                      <span>{selectedSuggestion.category}</span>
                    </div>
                  </div>

                  <div className="approval-next-steps">
                    <h4>Next Steps After Approval:</h4>
                    <ul>
                      <li>Event will be added to planning queue</li>
                      <li>Budget allocation will be reviewed</li>
                      <li>Suggester will be contacted for collaboration</li>
                      <li>Event planning team will be assigned</li>
                    </ul>
                  </div>

                  <div className="approval-actions">
                    <button className="member-btn-secondary" onClick={closeModal}>
                      Cancel
                    </button>
                    <button className="member-btn-success" onClick={handleApproveSuggestion}>
                      <CheckCircle size={16} />
                      Yes, Approve
                    </button>
                  </div>
                </div>
              )}

              {modalType === 'rejectSuggestion' && selectedSuggestion && (
                <div className="reject-suggestion-modal">
                  <div className="rejection-icon">
                    <X size={48} color="#ef4444" />
                  </div>
                  <h3>Reject Event Suggestion</h3>
                  <p>Are you sure you want to reject <strong>"{selectedSuggestion.title}"</strong>?</p>
                  
                  <div className="rejection-reasons">
                    <h4>Common rejection reasons:</h4>
                    <div className="reason-options">
                      <label className="reason-option">
                        <input type="radio" name="rejectionReason" />
                        <span>Budget constraints</span>
                      </label>
                      <label className="reason-option">
                        <input type="radio" name="rejectionReason" />
                        <span>Similar event already planned</span>
                      </label>
                      <label className="reason-option">
                        <input type="radio" name="rejectionReason" />
                        <span>Not aligned with society goals</span>
                      </label>
                      <label className="reason-option">
                        <input type="radio" name="rejectionReason" />
                        <span>Logistical challenges</span>
                      </label>
                      <label className="reason-option">
                        <input type="radio" name="rejectionReason" />
                        <span>Other</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Additional feedback (optional)</label>
                    <textarea
                      className="rejection-textarea"
                      placeholder="Provide constructive feedback to help the suggester improve future suggestions..."
                      rows={3}
                    />
                  </div>

                  <div className="rejection-actions">
                    <button className="member-btn-secondary" onClick={closeModal}>
                      Cancel
                    </button>
                    <button className="member-btn-danger" onClick={handleRejectSuggestion}>
                      <X size={16} />
                      Reject Suggestion
                    </button>
                  </div>
                </div>
              )}

              {modalType === 'notifications' && (
                <div className="notifications-list">
                  {notifications.map(notif => (
                    <div 
                      key={notif.id} 
                      className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                    >
                      <div className={`notification-icon ${notif.type}`}>
                        {notif.type === 'suggestion' ? <Lightbulb size={16} /> :
                         notif.type === 'finance' ? <DollarSign size={16} /> :
                         <Bell size={16} />}
                      </div>
                      <div className="notification-content">
                        <h4>{notif.title}</h4>
                        <p>{notif.message}</p>
                        <span className="notification-time">{notif.time}</span>
                      </div>
                      {!notif.read && <div className="notification-dot"></div>}
                    </div>
                  ))}
                </div>
              )}

              {modalType === 'aiSuggestions' && (
                <div className="ai-suggestions-modal">
                  <div className="suggestions-list">
                    {[
                      { title: "Blockchain Workshop", reason: "High interest in cryptocurrency trends", priority: "High", estimatedAttendance: 75 },
                      { title: "UI/UX Design Bootcamp", reason: "Many members interested in design", priority: "Medium", estimatedAttendance: 60 },
                      { title: "Data Science Masterclass", reason: "Growing demand for data skills", priority: "High", estimatedAttendance: 85 }
                    ].map((suggestion, index) => (
                      <div key={index} className="ai-suggestion-card">
                        <div className="suggestion-header">
                          <h4>{suggestion.title}</h4>
                          <span className={`priority-badge ${suggestion.priority.toLowerCase()}`}>
                            {suggestion.priority} Priority
                          </span>
                        </div>
                        <p className="suggestion-reason">{suggestion.reason}</p>
                        <div className="suggestion-metrics">
                          <div className="metric">
                            <Users size={16} />
                            <span>Est. {suggestion.estimatedAttendance} attendees</span>
                          </div>
                        </div>
                        <div className="suggestion-actions">
                          <button className="member-btn-primary">
                            <Plus size={14} />
                            Create Event
                          </button>
                          <button className="member-btn-secondary">
                            <MessageCircle size={14} />
                            Get More Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="ai-insights-section">
                    <h3><Brain size={20} /> AI Insights</h3>
                    <div className="insights-list">
                      {[
                        "Technical workshops have 23% higher attendance than general seminars",
                        "Weekend events see 15% better participation",
                        "Hybrid events (online + offline) have 18% better reach"
                      ].map((insight, index) => (
                        <div key={index} className="insight-item">
                          <Zap size={16} />
                          <span>{insight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {modalType === 'eventInsights' && (
                <div className="event-insights-modal">
                  <h3><Eye size={20} /> Upcoming Events Analysis</h3>
                  <div className="insights-grid">
                    {events.filter(event => event.status === 'upcoming').map(event => (
                      <div key={event.id} className="event-insight-card">
                        <h4>{event.title}</h4>
                        <div className="insight-metrics">
                          <div className="metric-row">
                            <span>Current Registrations:</span>
                            <span className="metric-value">{event.attendees}</span>
                          </div>
                          <div className="metric-row">
                            <span>AI Predicted Attendance:</span>
                            <span className="metric-value prediction">{event.predictedAttendance}</span>
                          </div>
                          <div className="metric-row">
                            <span>Prediction Confidence:</span>
                            <span className="metric-value confidence">87%</span>
                          </div>
                        </div>
                        <div className="insight-recommendations">
                          <h5>Recommendations:</h5>
                          <ul>
                            <li>Send reminder 48 hours before event</li>
                            <li>Prepare for {event.predictedAttendance} attendees</li>
                            <li>Consider live streaming for broader reach</li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {modalType === 'eventReport' && selectedEvent && (
                <div className="event-report-modal">
                  <h3>Generate Report for "{selectedEvent.title}"</h3>
                  <div className="report-summary">
                    <div className="report-stat">
                      <h4>Event Date</h4>
                      <p>{new Date(selectedEvent.date).toLocaleDateString()}</p>
                    </div>
                    <div className="report-stat">
                      <h4>Total Attendees</h4>
                      <p>{selectedEvent.actualAttendance || selectedEvent.attendees}</p>
                    </div>
                    <div className="report-stat">
                      <h4>Total Cost</h4>
                      <p>₹{selectedEvent.cost}</p>
                    </div>
                    <div className="report-stat">
                      <h4>Venue</h4>
                      <p>{selectedEvent.venue}</p>
                    </div>
                  </div>
                  
                  <div className="report-details">
                    <h4>Report will include:</h4>
                    <ul>
                      <li>Detailed attendance statistics</li>
                      <li>Financial breakdown</li>
                      <li>Member feedback summary</li>
                      <li>Photo gallery</li>
                      <li>Key achievements and learnings</li>
                    </ul>
                  </div>

                  <div className="report-recipients">
                    <h4>Send report to:</h4>
                    <div className="recipients-list">
                      <label className="recipient-option">
                        <input type="checkbox" defaultChecked />
                        <span>Coordinator Teacher ({societyData.coordinatorTeacher})</span>
                      </label>
                      <label className="recipient-option">
                        <input type="checkbox" />
                        <span>Dean of Students</span>
                      </label>
                      <label className="recipient-option">
                        <input type="checkbox" />
                        <span>Society Advisory Board</span>
                      </label>
                    </div>
                  </div>

                  <div className="report-actions">
                    <button className="member-btn-secondary" onClick={closeModal}>
                      Cancel
                    </button>
                    <button className="member-btn-primary" onClick={handleSendReport}>
                      <Mail size={16} />
                      Generate & Send Report
                    </button>
                  </div>
                </div>
              )}

              {modalType === 'sendMessage' && selectedMember && (
                <div className="send-message-modal">
                  <div className="message-recipient">
                    <div className="recipient-avatar">
                      {selectedMember.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="recipient-info">
                      <h4>{selectedMember.name}</h4>
                      <span>{selectedMember.role} • {selectedMember.department}</span>
                      <span>{selectedMember.email}</span>
                    </div>
                  </div>
                  
                  <div className="message-input-section">
                    <label>Your Message</label>
                    <textarea
                      className="message-textarea"
                      placeholder="Type your message here..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="message-actions">
                    <button className="member-btn-secondary" onClick={closeModal}>
                      Cancel
                    </button>
                    <button 
                      className="member-btn-primary"
                      onClick={() => {
                        setSuccessMessage(`Message sent to ${selectedMember.name}!`);
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

              {modalType === 'removeMember' && selectedMember && (
                <div className="remove-member-modal">
                  <div className="warning-icon">
                    <AlertTriangle size={48} color="#ef4444" />
                  </div>
                  <h3>Remove Member</h3>
                  <p>Are you sure you want to remove <strong>{selectedMember.name}</strong> from the society?</p>
                  
                  <div className="member-details">
                    <div className="detail-item">
                      <span>Role:</span>
                      <span>{selectedMember.role}</span>
                    </div>
                    <div className="detail-item">
                      <span>Join Date:</span>
                      <span>{new Date(selectedMember.joinDate).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-item">
                      <span>Attendance:</span>
                      <span>{selectedMember.attendance}%</span>
                    </div>
                  </div>

                  <div className="warning-text">
                    <p>This action cannot be undone. The member will lose access to:</p>
                    <ul>
                      <li>Society events and activities</li>
                      <li>Member-only resources</li>
                      <li>Group communications</li>
                      <li>Accumulated society points</li>
                    </ul>
                  </div>

                  <div className="remove-actions">
                    <button className="member-btn-secondary" onClick={closeModal}>
                      Cancel
                    </button>
                    <button className="member-btn-danger" onClick={handleRemoveMember}>
                      <UserMinus size={16} />
                      Remove Member
                    </button>
                  </div>
                </div>
              )}

              {modalType === 'addExpense' && (
                <div className="add-expense-modal">
                  <h3>Add New Expense</h3>
                  
                  <div className="expense-form">
                    <div className="form-group">
                      <label>Expense Category</label>
                      <select 
                        className="expense-select"
                        value={selectedExpense}
                        onChange={(e) => setSelectedExpense(e.target.value)}
                      >
                        <option value="">Select Category</option>
                        <option value="Equipment">Equipment</option>
                        <option value="Venue">Venue</option>
                        <option value="Refreshments">Refreshments</option>
                        <option value="Materials">Materials</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Guest Speaker">Guest Speaker</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Amount (₹)</label>
                      <input
                        type="number"
                        className="expense-input"
                        placeholder="0.00"
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        className="expense-textarea"
                        placeholder="Describe the expense details..."
                        value={expenseDescription}
                        onChange={(e) => setExpenseDescription(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="budget-info">
                      <div className="budget-stat">
                        <span>Remaining Budget:</span>
                        <span className="budget-amount">₹{((societyData.totalBudget - societyData.budgetUsed) / 1000).toFixed(0)}K</span>
                      </div>
                      {expenseAmount && (
                        <div className="budget-stat">
                          <span>After this expense:</span>
                          <span className="budget-amount">₹{(((societyData.totalBudget - societyData.budgetUsed) - parseFloat(expenseAmount)) / 1000).toFixed(0)}K</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="expense-actions">
                    <button className="member-btn-secondary" onClick={closeModal}>
                      Cancel
                    </button>
                    <button 
                      className="member-btn-primary"
                      onClick={handleAddExpense}
                      disabled={!selectedExpense || !expenseAmount || !expenseDescription}
                    >
                      <Plus size={16} />
                      Add Expense
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