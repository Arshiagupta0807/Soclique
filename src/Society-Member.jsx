import React, { useState, useEffect, useRef } from 'react';
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
  FileText,
  Zap,
  BookOpen,
  Shield,
  Coffee
} from 'lucide-react';
import './Society-Member.css';

const SocietyMember = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Tech Workshop Tomorrow", message: "Don't forget about the AI/ML workshop at 2 PM", time: "2 hours ago", type: "reminder", read: false },
    { id: 2, title: "New Member Joined", message: "Upasna Saxena joined Anveshan Society", time: "5 hours ago", type: "info", read: false },
    { id: 3, title: "Event Certificate Ready", message: "Your Hackathon 2024 certificate is ready for download", time: "1 day ago", type: "achievement", read: true }
  ]);
  
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: "AI Assistant", message: "Hello! I'm here to help with society insights and answer your questions.", time: "10:00 AM", isBot: true },
    { id: 2, user: "You", message: "What's my attendance rate?", time: "10:01 AM", isBot: false },
    { id: 3, user: "AI Assistant", message: "Your attendance rate is 87% across all events. You've attended 13 out of 15 events this semester. Great job!", time: "10:01 AM", isBot: true }
  ]);
  
  const [groupChatMessages, setGroupChatMessages] = useState([
    { id: 1, user: "Nishtha S.", message: "Hey everyone! Ready for tomorrow's workshop?", time: "9:30 AM", isBot: false, avatar: "NS" },
    { id: 2, user: "Aadhya S.", message: "Absolutely! I've prepared some questions about ML algorithms", time: "9:32 AM", isBot: false, avatar: "AS" },
    { id: 3, user: "You", message: "Same here! Can't wait to learn about neural networks", time: "9:35 AM", isBot: false, avatar: "YU" }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [certificateForm, setCertificateForm] = useState({
    eventTitle: '',
    participantName: '',
    dateOfCompletion: '',
    achievements: '',
    skillsGained: '',
    certificateType: 'participation',
    customMessage: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [eventSuggestion, setEventSuggestion] = useState('');
  const [eventSuggestionCategory, setEventSuggestionCategory] = useState('');
  const modalRef = useRef(null);

  const memberData = {
    name: "Alex Johnson",
    id: "MS2024001",
    role: "Active Member",
    department: "Computer Science",
    joinDate: "2023-08-15",
    attendance: 87,
    eventsAttended: 13,
    certificatesEarned: 5,
    societyPoints: 450
  };

  const events = [
    { id: 1, title: "AI & ML Workshop", date: "2024-01-16", time: "14:00", venue: "Auditorium A", status: "upcoming", attendees: 85, hasReminder: false },
    { id: 2, title: "Coding Bootcamp", date: "2024-01-20", time: "10:00", venue: "Lab 1", status: "upcoming", attendees: 45, hasReminder: true },
    { id: 3, title: "Hackathon 2024", date: "2023-12-15", time: "09:00", venue: "Main Hall", status: "completed", attendees: 120, hasReminder: false },
    { id: 4, title: "Tech Talk Series", date: "2023-11-20", time: "15:30", venue: "Conference Room", status: "completed", attendees: 60, hasReminder: false }
  ];

  const members = [
    { id: 1, name: "Nishtha Sood", email: "soodnishtha@soclique.com", role: "Core Member", department: "CSE", branch: "Computer Science Engineering",semester: "3rd", status: "Active", joinDate: "2023-08-15" },
    { id: 2, name: "Aadhya Sharma", email: "aadhya017@example.com", role: "Volunteer", department: "ECE", branch: "Electronics & Communication",semester: "3rd", status: "Active", joinDate: "2023-09-20" },
    { id: 3, name: "Mansi Bhandari", email: "mansibhandari9@example.com", role: "Core Member", department: "IT", branch: "Information Technology",semester: "3rd", status: "Active", joinDate: "2023-07-10" },
    { id: 4, name: "Arshia Gupta", email: "arshiaa1@example.com", role: "Core Member", department: "CSE", branch: "Computer Science Engineering",semester: "3rd", status: "Active", joinDate: "2023-10-05" },
    { id: 5, name: "Janvi Mathur", email: "mathur89@example.com", role: "Junior Council", department: "CSE", branch: "Computer Science Engineering",semester: "3rd", status: "Active", joinDate: "2023-10-08" },
    { id: 6, name: "Upasna Saxena", email: "supasna2@example.com", role: "Member", department: "CSE", branch: "Computer Science Engineering",semester: "3rd", status: "Active", joinDate: "2023-10-09" }
  ];

  const aiInsights = {
    personal: [
      "Your attendance has improved by 15% this month - keep it up!",
      "You're most active in technical workshops. Consider exploring leadership events too.",
      "Your engagement in group discussions ranks in the top 20% of members."
    ],
    society: [
      "Member engagement has increased by 23% this semester",
      "Technical events have the highest attendance rate (89%)",
      "New member retention rate is at an all-time high of 94%"
    ]
  };

  const openModal = (type, data = null) => {
    setModalType(type);
    if (type === 'sendMessage') {
      setSelectedMember(data);
    } else {
      setSelectedEvent(data);
    }
    setIsModalOpen(true);
    if (type === 'certificate') {
      setCertificateForm({
        eventTitle: '',
        participantName: memberData.name,
        dateOfCompletion: '',
        achievements: '',
        skillsGained: '',
        certificateType: 'participation',
        customMessage: ''
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setSelectedMember(null);
    setShowSuccess(false);
    setMessageText('');
    setEventSuggestion('');
    setEventSuggestionCategory('');
    setCertificateForm({
      eventTitle: '',
      participantName: memberData.name,
      dateOfCompletion: '',
      achievements: '',
      skillsGained: '',
      certificateType: 'participation',
      customMessage: ''
    });
  };

  const handleSendMessage = (isGroupChat = false, member = null) => {
    if (member && messageText.trim()) {
      setSuccessMessage(`Message sent to ${member.name} successfully!`);
      setShowSuccess(true);
      setMessageText('');
      closeModal();
      setTimeout(() => setShowSuccess(false), 3000);
      return;
    }

    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      user: isGroupChat ? "You" : "You",
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isBot: false,
      avatar: "YU"
    };

    if (isGroupChat) {
      setGroupChatMessages([...groupChatMessages, newMsg]);
    } else {
      setChatMessages([...chatMessages, newMsg]);
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          user: "AI Assistant",
          message: "I understand your query. Let me analyze the data and provide you with insights.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isBot: true
        };
        setChatMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
    setNewMessage('');
  };

  const handleSetReminder = (event) => {
    setSuccessMessage(`Reminder set for ${event.title} on ${new Date(event.date).toLocaleDateString()}`);
    setShowSuccess(true);
    closeModal();
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleGenerateCertificate = () => {
    const { eventTitle, participantName, dateOfCompletion, achievements } = certificateForm;
    if (!eventTitle || !participantName || !dateOfCompletion || !achievements) {
      alert('Please fill in all required fields');
      return;
    }
    
    setSuccessMessage(`Certificate generated for ${eventTitle}! Check your downloads.`);
    setShowSuccess(true);
    closeModal();
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSuggestEvent = () => {
    if (!eventSuggestion.trim() || !eventSuggestionCategory) return;
    
    setSuccessMessage(`Event suggestion "${eventSuggestion.substring(0, 30)}..." submitted successfully!`);
    setShowSuccess(true);
    setEventSuggestion('');
    setEventSuggestionCategory('');
    closeModal();
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

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

  const renderDashboard = () => (
    <div className="sm-dashboard-content">
      <div className="sm-stats-grid">
        <div className="sm-stat-card" style={{'--delay': '0s'}}>
          <div className="sm-stat-icon">
            <Trophy size={28} />
          </div>
          <div className="sm-stat-content">
            <h3>{memberData.societyPoints}</h3>
            <p>Society Points</p>
            <span className="sm-stat-change positive">+50 this month</span>
          </div>
        </div>
        
        <div className="sm-stat-card" style={{'--delay': '0.1s'}}>
          <div className="sm-stat-icon">
            <Activity size={28} />
          </div>
          <div className="sm-stat-content">
            <h3>{memberData.attendance}%</h3>
            <p>Attendance Rate</p>
            <span className="sm-stat-change positive">+15% vs last month</span>
          </div>
        </div>
        
        <div className="sm-stat-card" style={{'--delay': '0.2s'}}>
          <div className="sm-stat-icon">
            <Award size={28} />
          </div>
          <div className="sm-stat-content">
            <h3>{memberData.certificatesEarned}</h3>
            <p>Certificates Earned</p>
            <span className="sm-stat-change positive">+2 this month</span>
          </div>
        </div>
        
        <div className="sm-stat-card" style={{'--delay': '0.3s'}}>
          <div className="sm-stat-icon">
            <Calendar size={28} />
          </div>
          <div className="sm-stat-content">
            <h3>{memberData.eventsAttended}</h3>
            <p>Events Attended</p>
            <span className="sm-stat-change positive">2 more this month</span>
          </div>
        </div>
      </div>

      <div className="sm-dashboard-grid">
        <div className="sm-dashboard-card" style={{'--delay': '0.4s'}}>
          <div className="sm-card-header">
            <h3><Brain size={24} /> AI Insights & Recommendations</h3>
            <button className="sm-btn-secondary" onClick={() => openModal('aiInsights')}>
              <Eye size={16} />
              View Details
            </button>
          </div>
          <div className="sm-ai-insights-content">
            <div className="sm-insight-category">
              <h4><Target size={18} /> Personal Performance</h4>
              <ul className="sm-insight-list">
                {aiInsights.personal.slice(0, 2).map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="sm-dashboard-card" style={{'--delay': '0.5s'}}>
          <div className="sm-card-header">
            <h3><Calendar size={24} /> Upcoming Events</h3>
            <button className="sm-btn-primary" onClick={() => openModal('certificate')}>
              <Award size={16} />
              Generate Certificate
            </button>
          </div>
          <div className="sm-events-list">
            {events.filter(event => event.status === 'upcoming').slice(0, 3).map(event => (
              <div key={event.id} className="sm-event-item">
                <div className="sm-event-date">
                  <span className="sm-day">{new Date(event.date).getDate()}</span>
                  <span className="sm-month">{new Date(event.date).toLocaleDateString('en', { month: 'short' })}</span>
                </div>
                <div className="sm-event-content">
                  <h4>{event.title}</h4>
                  <p><MapPin size={16} /> {event.venue} • {event.time}</p>
                  <span className="sm-attendees">{event.attendees} registered</span>
                </div>
                {event.hasReminder && <span className="sm-reminder-badge">Reminder Set</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="sm-dashboard-content">
      <div className="sm-content-header">
        <div className="sm-header-left">
          <h2>Society Events</h2>
          <p>Discover and participate in engaging society activities</p>
        </div>
      </div>

      <div className="sm-events-grid">
        {events.map(event => (
          <div key={event.id} className="sm-event-card">
            <div className="sm-event-card-header">
              <h3>{event.title}</h3>
              <span className={`sm-event-type ${event.status}`}>
                {event.status}
              </span>
            </div>
            <div className="sm-event-description">
              Join us for an enriching learning experience in {event.title.toLowerCase()}.
            </div>
            <div className="sm-event-details">
              <div className="sm-event-detail">
                <Calendar size={16} />
                <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
              </div>
              <div className="sm-event-detail">
                <MapPin size={16} />
                <span>{event.venue}</span>
              </div>
              <div className="sm-event-detail">
                <Users size={16} />
                <span>{event.attendees} attendees</span>
              </div>
            </div>
            <div className="sm-event-card-actions">
              {event.status === 'upcoming' && (
                <button 
                  className="sm-btn-primary"
                  onClick={() => openModal('reminder', event)}
                >
                  <Bell size={16} />
                  Set Reminder
                </button>
              )}
              {event.status === 'completed' && (
                <button 
                  className="sm-btn-secondary"
                  onClick={() => openModal('certificate')}
                >
                  <Award size={16} />
                  Get Certificate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMembers = () => (
    <div className="sm-dashboard-content">
      <div className="sm-content-header">
        <div className="sm-header-left">
          <h2>Society Members</h2>
          <p>Connect and collaborate with your fellow society members</p>
        </div>
        <button className="sm-btn-primary" onClick={() => openModal('suggestEvent')}>
          <Sparkles size={16} />
          Suggest Event
        </button>
      </div>

      <div className="sm-members-container">
        <div className="sm-members-header">
          <div className="sm-member-column">Member</div>
          <div className="sm-member-column">Email</div>
          <div className="sm-member-column">Branch</div>
          <div className="sm-member-column">Role</div>
          <div className="sm-member-column">Semester</div>
          <div className="sm-member-column">Actions</div>
        </div>
        
        {members.map(member => (
          <div key={member.id} className="sm-member-item">
            <div className="sm-member-column"> 
              <div className="sm-member-profile">
                <div className="sm-member-avatar">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="sm-member-info">
                  <span className="sm-member-name">{member.name}</span>
                  <span className="sm-member-status">{member.status}</span>
                </div>
              </div>
            </div>
            
            <div className="sm-member-column">
              <span className="sm-member-email">{member.email}</span>
            </div>
            
            <div className="sm-member-column">
              <div className="sm-branch-info">
                <span className="sm-branch-name">{member.branch}</span>
                <span className="sm-department-tag">({member.department})</span>
              </div>
            </div>
            
            <div className="sm-member-column">
              <span className={`sm-role-tag ${member.role.toLowerCase().replace(/\s+/g, '-')}`}>
                {member.role}
              </span>
            </div>
            
            <div className="sm-member-column">
              <span className="sm-society-name">{member.semester}</span>
            </div>
            
            <div className="sm-member-column">
              <button 
                className="sm-action-btn"
                onClick={() => openModal('sendMessage', member)}
                title="Send Message"
              >
                <MessageCircle size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCertificates = () => (
    <div className="sm-dashboard-content">
      <div className="sm-content-header">
        <div className="sm-header-left">
          <h2>My Certificates</h2>
          <p>View and manage your earned certificates</p>
        </div>
        <button className="sm-btn-primary" onClick={() => openModal('certificate')}>
          <Award size={16} />
          Create Certificate
        </button>
      </div>

      <div className="sm-certificates-grid">
        <div className="sm-certificate-card">
          <div className="sm-certificate-header">
            <div className="sm-certificate-icon">
              <Award size={32} />
            </div>
            <span className="sm-certificate-badge verified">Verified</span>
          </div>
          <div className="sm-certificate-content">
            <h3>Hackathon 2024 Participant</h3>
            <div className="sm-certificate-details">
              <div className="sm-detail-item">
                <Calendar size={16} />
                <span>December 15, 2023</span>
              </div>
              <div className="sm-detail-item">
                <User size={16} />
                <span> Society</span>
              </div>
            </div>
            <div className="sm-certificate-skills">
              <span className="sm-skill-tag">Problem Solving</span>
              <span className="sm-skill-tag">Team Collaboration</span>
              <span className="sm-skill-tag">Innovation</span>
            </div>
            <div className="sm-certificate-id">
              Certificate ID: CERT-HAK-2024-001
            </div>
          </div>
          <div className="sm-certificate-actions">
            <button className="sm-btn-primary">
              <Download size={16} />
              Download
            </button>
          </div>
        </div>

        <div className="sm-certificate-card">
          <div className="sm-certificate-header">
            <div className="sm-certificate-icon">
              <Award size={32} />
            </div>
            <span className="sm-certificate-badge verified">Verified</span>
          </div>
          <div className="sm-certificate-content">
            <h3>AI/ML Workshop Completion</h3>
            <div className="sm-certificate-details">
              <div className="sm-detail-item">
                <Calendar size={16} />
                <span>November 20, 2023</span>
              </div>
              <div className="sm-detail-item">
                <User size={16} />
                <span>Anveshan Society</span>
              </div>
            </div>
            <div className="sm-certificate-skills">
              <span className="sm-skill-tag">Machine Learning</span>
              <span className="sm-skill-tag">Data Science</span>
            </div>
            <div className="sm-certificate-id">
              Certificate ID: CERT-WRK-2023-045
            </div>
          </div>
          <div className="sm-certificate-actions">
            <button className="sm-btn-primary">
              <Download size={16} />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="sm-dashboard-content">
      <div className="sm-content-header">
        <div className="sm-header-left">
          <h2>AI Assistant & Group Chat</h2>
          <p>Get personalized insights and connect with members</p>
        </div>
      </div>

      <div className="sm-chat-grid">
        <div className="sm-chat-container">
          <div className="sm-chat-header">
            <h3><Brain size={20} /> AI Assistant</h3>
            <span className="sm-status-indicator online">Online</span>
          </div>
          <div className="sm-chat-messages">
            {chatMessages.map(msg => (
              <div key={msg.id} className={`sm-chat-message ${msg.isBot ? 'bot-message' : 'user-message'}`}>
                <div className="sm-message-avatar">
                  {msg.isBot ? <Brain size={20} /> : 'YU'}
                </div>
                <div className="sm-message-content">
                  <div className="sm-message-header">
                    <span className="sm-message-user">{msg.user}</span>
                    <span className="sm-message-time">{msg.time}</span>
                  </div>
                  <div className="sm-message-text">{msg.message}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="sm-chat-input">
            <input
              type="text"
              placeholder="Ask about your progress, society insights..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(false)}
            />
            <button className="sm-send-btn" onClick={() => handleSendMessage(false)}>
              <Send size={18} />
            </button>
          </div>
        </div>

        <div className="sm-chat-container">
          <div className="sm-chat-header">
            <h3><MessageCircle size={20} /> Group Discussion</h3>
            <span className="sm-status-indicator online">{groupChatMessages.length} messages</span>
          </div>
          <div className="sm-chat-messages">
            {groupChatMessages.map(msg => (
              <div key={msg.id} className={`sm-chat-message ${msg.user === 'You' ? 'user-message' : ''}`}>
                <div className="sm-message-avatar">
                  {msg.avatar}
                </div>
                <div className="sm-message-content">
                  <div className="sm-message-header">
                    <span className="sm-message-user">{msg.user}</span>
                    <span className="sm-message-time">{msg.time}</span>
                  </div>
                  <div className="sm-message-text">{msg.message}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="sm-chat-input">
            <input
              type="text"
              placeholder="Message the group..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(true)}
            />
            <button className="sm-send-btn" onClick={() => handleSendMessage(true)}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="sm-container">
      {showSuccess && (
        <div className="sm-success-message">
          <CheckCircle size={22} />
          <span>{successMessage}</span>
        </div>
      )}

      <header className="sm-header">
        <div className="sm-header-left">
          <button 
            onClick={() => setCurrentPage('getstarted')} 
            className="sm-back-button"
          >
            <ArrowLeft size={22} />
          </button>
          <div className="sm-society-info">
            <h1>ANVESHAN SOCIETY</h1>
            <p>Welcome back, <strong>{memberData.name}</strong> • {memberData.role}</p>
          </div>
        </div>
        <div className="sm-header-right">
          <button 
            className="sm-notification-btn"
            onClick={() => openModal('notifications')}
          >
            <Bell size={22} />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="sm-notification-badge">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>
          <div className="sm-profile-avatar">
            {memberData.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      </header>

      <nav className="sm-nav">
        <button 
          className={`sm-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <Activity size={18} />
          Dashboard
        </button>
        <button 
          className={`sm-nav-item ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          <Calendar size={18} />
          Events
        </button>
        <button 
          className={`sm-nav-item ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          <Users size={18} />
          Members
        </button>
        <button 
          className={`sm-nav-item ${activeTab === 'certificates' ? 'active' : ''}`}
          onClick={() => setActiveTab('certificates')}
        >
          <Award size={18} />
          Certificates
        </button>
        <button 
          className={`sm-nav-item ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          <MessageCircle size={18} />
          AI & Chat
        </button>
      </nav>

      <main className="sm-main">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'members' && renderMembers()}
        {activeTab === 'certificates' && renderCertificates()}
        {activeTab === 'chat' && renderChat()}
      </main>

      {isModalOpen && (
        <div className="sm-modal-backdrop">
          <div ref={modalRef} className="sm-modal-content">
            <div className="sm-modal-header">
              <h2>
                {modalType === 'notifications' && 'Notifications'}
                {modalType === 'aiInsights' && 'AI Insights & Analytics'}
                {modalType === 'certificate' && 'Certificate Generator'}
                {modalType === 'reminder' && 'Set Event Reminder'}
                {modalType === 'sendMessage' && 'Send Message'}
                {modalType === 'suggestEvent' && 'Suggest Event'}
</h2>
              <button onClick={closeModal} className="sm-modal-close-button">
                <X size={22} />
              </button>
            </div>

            <div className="sm-modal-body">
              {modalType === 'notifications' && (
                <div className="sm-notifications-list">
                  {notifications.map(notif => (
                    <div 
                      key={notif.id} 
                      className={`sm-notification-item ${notif.read ? 'read' : 'unread'}`}
                      onClick={() => markNotificationAsRead(notif.id)}
                    >
                      <div className={`sm-notification-icon ${notif.type}`}>
                        {notif.type === 'reminder' ? <Clock size={18} /> :
                         notif.type === 'achievement' ? <Trophy size={18} /> :
                         <Bell size={18} />}
                      </div>
                      <div className="sm-notification-content">
                        <h4>{notif.title}</h4>
                        <p>{notif.message}</p>
                        <span className="sm-notification-time">{notif.time}</span>
                      </div>
                      {!notif.read && <div className="sm-notification-dot"></div>}
                    </div>
                  ))}
                </div>
              )}

              {modalType === 'aiInsights' && (
                <div className="sm-ai-insights-modal">
                  <div className="sm-insight-section">
                    <h3><Target size={22} /> Personal Performance Analytics</h3>
                    <div className="sm-insight-cards">
                      {aiInsights.personal.map((insight, index) => (
                        <div key={index} className="sm-insight-card">
                          <div className="sm-insight-card-header">
                            <Zap size={18} />
                            <h4>Performance Insight #{index + 1}</h4>
                          </div>
                          <p>{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="sm-insight-section">
                    <h3><TrendingUp size={22} /> Society-wide Analytics</h3>
                    <div className="sm-insight-cards">
                      {aiInsights.society.map((insight, index) => (
                        <div key={index} className="sm-insight-card">
                          <div className="sm-insight-card-header">
                            <Activity size={18} />
                            <h4>Society Metric #{index + 1}</h4>
                          </div>
                          <p>{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {modalType === 'certificate' && (
                <div className="sm-certificate-generator">
                  <div className="sm-certificate-form">
                    <h3><Award size={24} /> Certificate Generation Form</h3>
                    <p className="sm-form-description">Fill in the details to generate your personalized certificate</p>
                    
                    <div className="sm-form-grid">
                      <div className="sm-form-group">
                        <label>Event/Workshop Title *</label>
                        <input
                          type="text"
                          className="sm-form-input"
                          placeholder="e.g., AI/ML Workshop 2024"
                          value={certificateForm.eventTitle}
                          onChange={(e) => setCertificateForm({...certificateForm, eventTitle: e.target.value})}
                        />
                      </div>

                      <div className="sm-form-group">
                        <label>Participant Name *</label>
                        <input
                          type="text"
                          className="sm-form-input"
                          value={certificateForm.participantName}
                          onChange={(e) => setCertificateForm({...certificateForm, participantName: e.target.value})}
                        />
                      </div>

                      <div className="sm-form-group">
                        <label>Date of Completion *</label>
                        <input
                          type="date"
                          className="sm-form-input"
                          value={certificateForm.dateOfCompletion}
                          onChange={(e) => setCertificateForm({...certificateForm, dateOfCompletion: e.target.value})}
                        />
                      </div>

                      <div className="sm-form-group">
                        <label>Certificate Type</label>
                        <select
                          className="sm-form-select"
                          value={certificateForm.certificateType}
                          onChange={(e) => setCertificateForm({...certificateForm, certificateType: e.target.value})}
                        >
                          <option value="participation">Participation Certificate</option>
                          <option value="completion">Completion Certificate</option>
                          <option value="achievement">Achievement Certificate</option>
                          <option value="excellence">Excellence Award</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm-form-group sm-full-width">
                      <label>Key Achievements & Learning Outcomes *</label>
                      <textarea
                        className="sm-form-textarea"
                        placeholder="Describe what you accomplished, learned, or contributed during this event..."
                        value={certificateForm.achievements}
                        onChange={(e) => setCertificateForm({...certificateForm, achievements: e.target.value})}
                        rows={4}
                      />
                    </div>

                    <div className="sm-form-group sm-full-width">
                      <label>Skills Gained/Demonstrated</label>
                      <input
                        type="text"
                        className="sm-form-input"
                        placeholder="e.g., Python Programming, Team Leadership, Problem Solving"
                        value={certificateForm.skillsGained}
                        onChange={(e) => setCertificateForm({...certificateForm, skillsGained: e.target.value})}
                      />
                    </div>

                    <div className="sm-form-group sm-full-width">
                      <label>Additional Notes (Optional)</label>
                      <textarea
                        className="sm-form-textarea"
                        placeholder="Any additional information or special recognition..."
                        value={certificateForm.customMessage}
                        onChange={(e) => setCertificateForm({...certificateForm, customMessage: e.target.value})}
                        rows={3}
                      />
                    </div>

                    <div className="sm-certificate-actions">
                      <button 
                        className="sm-btn-secondary"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button 
                        className="sm-btn-primary"
                        onClick={handleGenerateCertificate}
                      >
                        <Award size={16} />
                        Generate Certificate
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {modalType === 'reminder' && selectedEvent && (
                <div className="sm-reminder-setup">
                  <div className="sm-reminder-event-info">
                    <div className="sm-event-header">
                      <Calendar size={24} />
                      <h3>{selectedEvent.title}</h3>
                    </div>
                    <div className="sm-reminder-details">
                      <div className="sm-reminder-detail">
                        <Clock size={18} />
                        <span>{new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}</span>
                      </div>
                      <div className="sm-reminder-detail">
                        <MapPin size={18} />
                        <span>{selectedEvent.venue}</span>
                      </div>
                      <div className="sm-reminder-detail">
                        <Users size={18} />
                        <span>{selectedEvent.attendees} attendees registered</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="sm-reminder-options">
                    <h4>Reminder Settings</h4>
                    <div className="sm-reminder-time-options">
                      <button className="sm-reminder-option selected">
                        <Clock size={16} />
                        <span>1 hour before</span>
                      </button>
                      <button className="sm-reminder-option">
                        <Clock size={16} />
                        <span>1 day before</span>
                      </button>
                      <button className="sm-reminder-option">
                        <Clock size={16} />
                        <span>1 week before</span>
                      </button>
                    </div>
                  </div>

                  <div className="sm-reminder-actions">
                    <button 
                      className="sm-btn-secondary"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button 
                      className="sm-btn-primary"
                      onClick={() => handleSetReminder(selectedEvent)}
                    >
                      <Bell size={16} />
                      Set Reminder
                    </button>
                  </div>
                </div>
              )}

              {modalType === 'sendMessage' && selectedMember && (
                <div className="sm-send-message-modal">
                  <div className="sm-message-recipient">
                    <div className="sm-recipient-avatar">
                      {selectedMember.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="sm-recipient-info">
                      <h4>{selectedMember.name}</h4>
                      <span className="sm-recipient-role">{selectedMember.role} • {selectedMember.department}</span>
                      <span className="sm-recipient-email">{selectedMember.email}</span>
                    </div>
                  </div>
                  
                  <div className="sm-message-input-section">
                    <label>Your Message</label>
                    <textarea
                      className="sm-message-textarea"
                      placeholder="Type your message here..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      rows={6}
                    />
                  </div>

                  <div className="sm-message-actions">
                    <button 
                      className="sm-btn-secondary"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button 
                      className="sm-btn-primary"
                      onClick={() => handleSendMessage(false, selectedMember)}
                      disabled={!messageText.trim()}
                    >
                      <Send size={16} />
                      Send Message
                    </button>
                  </div>
                </div>
              )}

              {modalType === 'suggestEvent' && (
                <div className="sm-event-suggestion-modal">
                  <div className="sm-suggestion-header">
                    <Sparkles size={24} />
                    <h3>Suggest a New Event</h3>
                    <p>Help us create engaging experiences for our society members</p>
                  </div>
                  
                  <div className="sm-suggestion-form">
                    <div className="sm-form-group">
                      <label>Event Category *</label>
                      <select 
                        className="sm-form-select"
                        value={eventSuggestionCategory}
                        onChange={(e) => setEventSuggestionCategory(e.target.value)}
                      >
                        <option value="">Select Category</option>
                        <option value="workshop">Technical Workshop</option>
                        <option value="seminar">Educational Seminar</option>
                        <option value="competition">Competition</option>
                        <option value="hackathon">Hackathon</option>
                        <option value="networking">Networking Event</option>
                        <option value="cultural">Cultural Event</option>
                        <option value="sports">Sports Activity</option>
                        <option value="community-service">Community Service</option>
                      </select>
                    </div>
                    
                    <div className="sm-form-group sm-full-width">
                      <label>Event Suggestion & Details *</label>
                      <textarea
                        className="sm-form-textarea"
                        placeholder="Describe your event idea in detail - include potential topics, format, expected outcomes, target audience, and how it would benefit society members..."
                        value={eventSuggestion}
                        onChange={(e) => setEventSuggestion(e.target.value)}
                        rows={8}
                      />
                    </div>
                    
                    <div className="sm-suggestion-tips">
                      <h5><BookOpen size={18} /> Tips for Great Suggestions</h5>
                      <ul>
                        <li>Be specific about the event format and content structure</li>
                        <li>Mention potential speakers, facilitators, or industry experts</li>
                        <li>Explain how it aligns with our society's mission and goals</li>
                        <li>Consider the target audience and appropriate skill levels</li>
                        <li>Include potential partnerships or sponsorship opportunities</li>
                      </ul>
                    </div>
                  </div>

                  <div className="sm-suggestion-actions">
                    <button 
                      className="sm-btn-secondary"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button 
                      className="sm-btn-primary"
                      onClick={handleSuggestEvent}
                      disabled={!eventSuggestion.trim() || !eventSuggestionCategory}
                    >
                      <Sparkles size={16} />
                      Submit Suggestion
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

export default SocietyMember;