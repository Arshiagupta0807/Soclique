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
  Heart
} from 'lucide-react';
import './Society-Member.css';

const SocietyMember = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Tech Workshop Tomorrow", message: "Don't forget about the AI/ML workshop at 2 PM", time: "2 hours ago", type: "reminder", read: false },
    { id: 2, title: "New Member Joined", message: "Sarah Johnson joined ABC Society", time: "5 hours ago", type: "info", read: false },
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
  const [certificateStep, setCertificateStep] = useState(1);
  const [certificateData, setCertificateData] = useState({ event: '', achievements: '' });
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
    { id: 1, name: "Nishtha Sood", email: "soodnishtha@soclique.com", role: "Core Member", department: "CSE", branch: "Computer Science Engineering", society: "ABC Society", status: "Active", joinDate: "2023-08-15" },
    { id: 2, name: "Aadhya Sharma", email: "aadhya017@example.com", role: "Volunteer", department: "ECE", branch: "Electronics & Communication", society: "ABC Society", status: "Active", joinDate: "2023-09-20" },
    { id: 3, name: "Mansi Bhandari", email: "mansibhandari9@example.com", role: "Core Member", department: "IT", branch: "Information Technology", society: "ABC Society", status: "Active", joinDate: "2023-07-10" },
    { id: 4, name: "Arshia Gupta", email: "arshiaa1@example.com", role: "Core Member", department: "CSE", branch: "Computer Science Engineering", society: "ABC Society", status: "Active", joinDate: "2023-10-05" },
    { id: 5, name: "Janvi Mathur", email: "mathur89@example.com", role: "Junior Council", department: "CSE", branch: "Computer Science Engineering", society: "ABC Society", status: "Active", joinDate: "2023-10-08" },
    { id: 6, name: "Upasna Saxena", email: "supasna2@example.com", role: "Member", department: "CSE", branch: "Computer Science Engineering", society: "ABC Society", status: "Active", joinDate: "2023-10-09" }
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
      setCertificateStep(1);
      setCertificateData({ event: '', achievements: '' });
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
  };

  const handleSendMessage = (isGroupChat = false, member = null) => {
    if (member && messageText.trim()) {
      setSuccessMessage(`Message sent to ${member.name}!`);
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
    if (certificateStep === 1 && certificateData.event) {
      setCertificateStep(2);
    } else if (certificateStep === 2 && certificateData.achievements) {
      setSuccessMessage(`Certificate generated for ${certificateData.event}! Check your downloads.`);
      setShowSuccess(true);
      closeModal();
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleSuggestEvent = () => {
    if (!eventSuggestion.trim() || !eventSuggestionCategory) return;
    
    setSuccessMessage(`Event suggestion "${eventSuggestion}" submitted successfully!`);
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
    <div className="member-dashboard-content">
      <div className="member-stats-grid">
        <div className="member-stat-card" style={{'--delay': '0s'}}>
          <div className="member-stat-icon">
            <Trophy size={24} />
          </div>
          <div className="member-stat-content">
            <h3>{memberData.societyPoints}</h3>
            <p>Society Points</p>
            <span className="member-stat-change positive">+50 this month</span>
          </div>
        </div>
        
        <div className="member-stat-card" style={{'--delay': '0.1s'}}>
          <div className="member-stat-icon">
            <Calendar size={24} />
          </div>
          <div className="member-stat-content">
            <h3>{memberData.attendance}%</h3>
            <p>Attendance Rate</p>
            <span className="member-stat-change positive">+15% vs last month</span>
          </div>
        </div>
        
        <div className="member-stat-card" style={{'--delay': '0.2s'}}>
          <div className="member-stat-icon">
            <Award size={24} />
          </div>
          <div className="member-stat-content">
            <h3>{memberData.certificatesEarned}</h3>
            <p>Certificates Earned</p>
            <span className="member-stat-change positive">+2 this month</span>
          </div>
        </div>
        
        <div className="member-stat-card" style={{'--delay': '0.3s'}}>
          <div className="member-stat-icon">
            <Activity size={24} />
          </div>
          <div className="member-stat-content">
            <h3>{memberData.eventsAttended}</h3>
            <p>Events Attended</p>
            <span className="member-stat-change positive">2 more this month</span>
          </div>
        </div>
      </div>

      <div className="member-dashboard-grid">
        <div className="member-dashboard-card" style={{'--delay': '0.4s'}}>
          <div className="member-card-header">
            <h3><Brain size={20} /> AI Insights</h3>
            <button className="member-btn-secondary" onClick={() => openModal('aiInsights')}>
              View All
            </button>
          </div>
          <div className="ai-insights-content">
            <div className="insight-category">
              <h4><Target size={16} /> Personal Insights</h4>
              <ul className="insight-list">
                {aiInsights.personal.slice(0, 2).map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="member-dashboard-card" style={{'--delay': '0.5s'}}>
          <div className="member-card-header">
            <h3><Calendar size={20} /> Upcoming Events</h3>
            <button className="member-btn-primary" onClick={() => openModal('certificate')}>
              <Award size={16} />
              Get Certificate
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
                  <span className="member-attendees">{event.attendees} registered</span>
                </div>
                {event.hasReminder && <span className="reminder-badge">Reminder Set</span>}
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
          <p>Discover and join exciting society activities</p>
        </div>
      </div>

      <div className="member-events-grid">
        {events.map(event => (
          <div key={event.id} className="member-event-card">
            <div className="member-event-card-header">
              <h3>{event.title}</h3>
              <span className={`member-event-type ${event.status}`}>
                {event.status}
              </span>
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
                <span>{event.attendees} attendees</span>
              </div>
            </div>
            <div className="member-event-card-actions">
              {event.status === 'upcoming' && (
                <button 
                  className="member-btn-primary"
                  onClick={() => openModal('reminder', event)}
                >
                  <Bell size={14} />
                  Set Reminder
                </button>
              )}
              {event.status === 'completed' && (
                <button 
                  className="member-btn-secondary"
                  onClick={() => openModal('certificate')}
                >
                  <Award size={14} />
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
    <div className="member-dashboard-content">
      <div className="member-content-header">
        <div className="member-header-left">
          <h2>Society Members</h2>
          <p>Connect with your fellow society members</p>
        </div>
        <button className="member-btn-primary" onClick={() => openModal('suggestEvent')}>
          <Sparkles size={16} />
          Suggest Event
        </button>
      </div>

      <div className="members-list-container">
        <div className="members-list-header">
          <div className="member-list-column">Name</div>
          <div className="member-list-column">Email</div>
          <div className="member-list-column">Branch</div>
          <div className="member-list-column">Role</div>
          <div className="member-list-column">Society</div>
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
                  <span className="member-status">{member.status}</span>
                </div>
              </div>
            </div>
            
            <div className="member-list-column">
              <span className="member-email">{member.email}</span>
            </div>
            
            <div className="member-list-column">
              <span className="member-branch">{member.branch}</span>
              <span className="member-department">({member.department})</span>
            </div>
            
            <div className="member-list-column">
              <span className={`member-role-tag ${member.role.toLowerCase().replace(/\s+/g, '-')}`}>
                {member.role}
              </span>
            </div>
            
            <div className="member-list-column">
              <span className="member-society">{member.society}</span>
            </div>
            
            <div className="member-list-column">
              <button 
                className="member-action-btn message-btn"
                onClick={() => openModal('sendMessage', member)}
                title="Send Message"
              >
                <MessageCircle size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCertificates = () => (
    <div className="member-dashboard-content">
      <div className="member-content-header">
        <div className="member-header-left">
          <h2>My Certificates</h2>
          <p>View and download your earned certificates</p>
        </div>
        <button className="member-btn-primary" onClick={() => openModal('certificate')}>
          <Award size={16} />
          Generate New
        </button>
      </div>

      <div className="member-certificates-grid">
        <div className="member-certificate-card">
          <div className="member-certificate-header">
            <Award size={24} className="member-certificate-icon" />
            <span className="member-certificate-badge">Verified</span>
          </div>
          <div className="member-certificate-content">
            <h3>Hackathon 2024 Participant</h3>
            <div className="member-certificate-details">
              <div className="member-detail-item">
                <Calendar size={14} />
                <span>December 15, 2023</span>
              </div>
              <div className="member-detail-item">
                <User size={14} />
                <span>ABC Society</span>
              </div>
            </div>
            <div className="member-certificate-skills">
              <span className="member-skill-tag">Coding</span>
              <span className="member-skill-tag">Innovation</span>
              <span className="member-skill-tag">Teamwork</span>
            </div>
            <div className="member-certificate-id">
              Certificate ID: CERT-2024-001
            </div>
          </div>
          <div className="member-certificate-actions">
            <button className="member-btn-primary">
              <Download size={14} />
              Download
            </button>
          </div>
        </div>

        <div className="member-certificate-card">
          <div className="member-certificate-header">
            <Award size={24} className="member-certificate-icon" />
            <span className="member-certificate-badge">Verified</span>
          </div>
          <div className="member-certificate-content">
            <h3>Tech Talk Series Attendee</h3>
            <div className="member-certificate-details">
              <div className="member-detail-item">
                <Calendar size={14} />
                <span>November 20, 2023</span>
              </div>
              <div className="member-detail-item">
                <User size={14} />
                <span>ABC Society</span>
              </div>
            </div>
            <div className="member-certificate-skills">
              <span className="member-skill-tag">AI/ML</span>
              <span className="member-skill-tag">Learning</span>
            </div>
            <div className="member-certificate-id">
              Certificate ID: CERT-2023-045
            </div>
          </div>
          <div className="member-certificate-actions">
            <button className="member-btn-primary">
              <Download size={14} />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="member-dashboard-content">
      <div className="member-content-header">
        <div className="member-header-left">
          <h2>AI Assistant & Group Chat</h2>
          <p>Get insights and connect with members</p>
        </div>
      </div>

      <div className="member-dashboard-grid">
        <div className="member-dashboard-card">
          <div className="member-card-header">
            <h3><Brain size={20} /> AI Assistant</h3>
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
                placeholder="Ask about your progress, society insights..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(false)}
              />
              <button className="member-send-btn" onClick={() => handleSendMessage(false)}>
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="member-dashboard-card">
          <div className="member-card-header">
            <h3><MessageCircle size={20} /> Group Chat</h3>
          </div>
          <div className="member-chat-container">
            <div className="member-chat-messages">
              {groupChatMessages.map(msg => (
                <div key={msg.id} className={`member-chat-message ${msg.user === 'You' ? 'user-message' : ''}`}>
                  <div className="member-message-avatar">
                    {msg.avatar}
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
                placeholder="Message the group..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(true)}
              />
              <button className="member-send-btn" onClick={() => handleSendMessage(true)}>
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
            <h1>ABC SOCIETY</h1>
            <p>Welcome back, {memberData.name} • {memberData.role}</p>
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
          <div className="member-profile-avatar">
            AJ
          </div>
        </div>
      </header>

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
          className={`member-nav-item ${activeTab === 'certificates' ? 'active' : ''}`}
          onClick={() => setActiveTab('certificates')}
        >
          <Award size={16} />
          Certificates
        </button>
        <button 
          className={`member-nav-item ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          <MessageCircle size={16} />
          Chat & AI
        </button>
      </nav>

      <main className="member-society-main">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'members' && renderMembers()}
        {activeTab === 'certificates' && renderCertificates()}
        {activeTab === 'chat' && renderChat()}
      </main>

      {isModalOpen && (
        <div className="member-modal-backdrop">
          <div ref={modalRef} className="member-modal-content">
            <div className="member-modal-header">
              <h2>
                {modalType === 'notifications' && 'Notifications'}
                {modalType === 'aiInsights' && 'AI Insights'}
                {modalType === 'certificate' && 'Generate Certificate'}
                {modalType === 'reminder' && 'Set Event Reminder'}
                {modalType === 'sendMessage' && 'Send Message'}
                {modalType === 'suggestEvent' && 'Suggest Event'}
              </h2>
              <button onClick={closeModal} className="member-modal-close-button">
                <X size={20} />
              </button>
            </div>

            <div className="member-modal-body">
              {modalType === 'notifications' && (
                <div className="notifications-list">
                  {notifications.map(notif => (
                    <div 
                      key={notif.id} 
                      className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                      onClick={() => markNotificationAsRead(notif.id)}
                    >
                      <div className={`notification-icon ${notif.type}`}>
                        {notif.type === 'reminder' ? <Clock size={16} /> :
                         notif.type === 'achievement' ? <Trophy size={16} /> :
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

              {modalType === 'aiInsights' && (
                <div className="ai-insights-modal">
                  <div className="insight-section">
                    <h3><Target size={20} /> Personal Insights</h3>
                    <div className="insight-cards">
                      {aiInsights.personal.map((insight, index) => (
                        <div key={index} className="insight-card">
                          <h4>Performance Update</h4>
                          <p>{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="insight-section">
                    <h3><TrendingUp size={20} /> Society Insights</h3>
                    <div className="insight-cards">
                      {aiInsights.society.map((insight, index) => (
                        <div key={index} className="insight-card">
                          <h4>Society Analytics</h4>
                          <p>{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {modalType === 'certificate' && (
                <div className="certificate-generator">
                  {certificateStep === 1 && (
                    <>
                      <h3>Which event would you like a certificate for?</h3>
                      <div className="certificate-events">
                        {events.filter(e => e.status === 'completed').map(event => (
                          <button
                            key={event.id}
                            className={`certificate-event-btn ${certificateData.event === event.title ? 'selected' : ''}`}
                            onClick={() => setCertificateData({...certificateData, event: event.title})}
                          >
                            <Calendar size={16} />
                            <span>{event.title}</span>
                          </button>
                        ))}
                      </div>
                      <button 
                        className="member-btn-primary"
                        onClick={handleGenerateCertificate}
                        disabled={!certificateData.event}
                      >
                        Next
                      </button>
                    </>
                  )}

                  {certificateStep === 2 && (
                    <>
                      <h3>What achievements should be mentioned?</h3>
                      <textarea
                        className="certificate-input"
                        placeholder="e.g., Participated in coding challenges, demonstrated teamwork skills, completed project successfully..."
                        value={certificateData.achievements}
                        onChange={(e) => setCertificateData({...certificateData, achievements: e.target.value})}
                        rows={4}
                      />
                      <div className="certificate-actions">
                        <button 
                          className="member-btn-secondary"
                          onClick={() => setCertificateStep(1)}
                        >
                          Back
                        </button>
                        <button 
                          className="member-btn-primary"
                          onClick={handleGenerateCertificate}
                          disabled={!certificateData.achievements}
                        >
                          Generate Certificate
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {modalType === 'reminder' && selectedEvent && (
                <div className="reminder-setup">
                  <div className="reminder-event-info">
                    <h3>{selectedEvent.title}</h3>
                    <div className="reminder-event-details">
                      <div className="reminder-detail">
                        <Calendar size={16} />
                        <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                      </div>
                      <div className="reminder-detail">
                        <Clock size={16} />
                        <span>{selectedEvent.time}</span>
                      </div>
                      <div className="reminder-detail">
                        <MapPin size={16} />
                        <span>{selectedEvent.venue}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="reminder-options">
                    <h4>When would you like to be reminded?</h4>
                    <div className="reminder-time-options">
                      <button className="reminder-option selected">
                        <Clock size={16} />
                        <span>1 hour before</span>
                      </button>
                      <button className="reminder-option">
                        <Clock size={16} />
                        <span>1 day before</span>
                      </button>
                      <button className="reminder-option">
                        <Clock size={16} />
                        <span>1 week before</span>
                      </button>
                    </div>
                  </div>

                  <div className="reminder-actions">
                    <button 
                      className="member-btn-secondary"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button 
                      className="member-btn-primary"
                      onClick={() => handleSetReminder(selectedEvent)}
                    >
                      <Bell size={16} />
                      Set Reminder
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
                    <button 
                      className="member-btn-secondary"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button 
                      className="member-btn-primary"
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
                <div className="event-suggestion-modal">
                  <h3>Suggest a New Event</h3>
                  <p>Share your ideas for upcoming society events</p>
                  
                  <div className="suggestion-form">
                    <div className="form-group">
                      <label>Event Category</label>
                      <select 
                        className="suggestion-select"
                        value={eventSuggestionCategory}
                        onChange={(e) => setEventSuggestionCategory(e.target.value)}
                      >
                        <option value="">Select Category</option>
                        <option value="workshop">Workshop</option>
                        <option value="seminar">Seminar</option>
                        <option value="competition">Competition</option>
                        <option value="hackathon">Hackathon</option>
                        <option value="networking">Networking Event</option>
                        <option value="cultural">Cultural Event</option>
                        <option value="sports">Sports Event</option>
                        <option value="community-service">Community Service</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Event Suggestion</label>
                      <textarea
                        className="suggestion-textarea"
                        placeholder="Describe your event idea, including potential topics, format, expected outcomes, and why it would benefit society members..."
                        value={eventSuggestion}
                        onChange={(e) => setEventSuggestion(e.target.value)}
                        rows={5}
                      />
                    </div>
                    
                    <div className="suggestion-tips">
                      <h5>Tips for great suggestions:</h5>
                      <ul>
                        <li>Be specific about the event format and content</li>
                        <li>Mention potential speakers or facilitators</li>
                        <li>Explain how it aligns with society goals</li>
                        <li>Consider the target audience and skill level</li>
                      </ul>
                    </div>
                  </div>

                  <div className="suggestion-actions">
                    <button 
                      className="member-btn-secondary"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button 
                      className="member-btn-primary"
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