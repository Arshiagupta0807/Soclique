import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Calendar, 
  Trophy, 
  MessageCircle,
  Bell,
  BrainCircuit,
  Download,
  Image,
  ArrowLeft,
  TrendingUp,
  Star,
  Clock,
  MapPin,
  User,
  Palette,
  FileText,
  Sparkles,
  BookOpen,
  Zap,
  Activity,
  Award,
  ChevronRight,
  UserCheck,
  Target,
  PieChart,
  BarChart3,
  Send,
  Plus
} from 'lucide-react';
import './Society-Member.css';

const SocietyMember = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [generateType, setGenerateType] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const modalRef = useRef(null);

  // Sample society and user data
  const [societyData] = useState({
    name: "Tech Innovation Society",
    memberCount: 142,
    upcomingEvents: 5,
    completedEvents: 23,
    rating: 4.8,
    memberSince: "August 2023"
  });

  const [memberStats] = useState({
    eventsAttended: 12,
    certificatesEarned: 8,
    contributionScore: 85,
    networkConnections: 34
  });

  const [upcomingEvents] = useState([
    { 
      id: 1, 
      title: "AI Workshop", 
      date: "2024-02-15", 
      time: "14:00",
      venue: "Lab A-201",
      description: "Deep dive into machine learning fundamentals",
      attendees: 45,
      type: "Workshop",
      reminder: true
    },
    { 
      id: 2, 
      title: "Tech Talk: Future of Web Dev", 
      date: "2024-02-20", 
      time: "16:00",
      venue: "Auditorium",
      description: "Industry insights on emerging web technologies",
      attendees: 89,
      type: "Seminar",
      reminder: false
    },
    { 
      id: 3, 
      title: "Coding Hackathon", 
      date: "2024-03-01", 
      time: "09:00",
      venue: "Main Hall",
      description: "24-hour coding challenge with exciting prizes",
      attendees: 156,
      type: "Competition",
      reminder: true
    }
  ]);

  const [fellowMembers] = useState([
    { 
      id: 1, 
      name: "Aadhya Sharma", 
      role: "Core Member", 
      department: "CSE",
      year: "3rd Year",
      skills: ["React", "Python", "UI/UX"],
      connections: 45,
      eventsAttended: 18,
      avatar: "AS"
    },
    { 
      id: 2, 
      name: "Arjun Patel", 
      role: "Technical Lead", 
      department: "IT",
      year: "4th Year",
      skills: ["Node.js", "MongoDB", "DevOps"],
      connections: 67,
      eventsAttended: 22,
      avatar: "AP"
    },
    { 
      id: 3, 
      name: "Priya Singh", 
      role: "Designer", 
      department: "CSE",
      year: "2nd Year",
      skills: ["Figma", "Adobe Creative", "Prototyping"],
      connections: 38,
      eventsAttended: 14,
      avatar: "PS"
    },
    { 
      id: 4, 
      name: "Rohit Kumar", 
      role: "Marketing Head", 
      department: "ECE",
      year: "3rd Year",
      skills: ["Social Media", "Content Writing", "Analytics"],
      connections: 52,
      eventsAttended: 16,
      avatar: "RK"
    }
  ]);

  const [pastCertificates] = useState([
    {
      id: 1,
      eventName: "Web Development Bootcamp",
      date: "2023-12-15",
      type: "Completion Certificate",
      skills: ["HTML/CSS", "JavaScript", "React"],
      hours: 40,
      grade: "A+",
      certificateId: "TIS-WDB-2023-001"
    },
    {
      id: 2,
      eventName: "AI/ML Workshop Series",
      date: "2023-11-20",
      type: "Participation Certificate",
      skills: ["Python", "TensorFlow", "Data Analysis"],
      hours: 32,
      grade: "A",
      certificateId: "TIS-AIML-2023-002"
    },
    {
      id: 3,
      eventName: "Hackathon 2023 Winner",
      date: "2023-10-10",
      type: "Achievement Certificate",
      skills: ["Full Stack Development", "Innovation", "Teamwork"],
      hours: 24,
      grade: "Winner",
      certificateId: "TIS-HACK-2023-003"
    }
  ]);

  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: "Aadhya Sharma", message: "Hey everyone! Don't forget about the AI workshop tomorrow!", time: "10:30 AM", avatar: "AS" },
    { id: 2, user: "Tech Society Bot", message: "🤖 Reminder: Workshop materials are now available in the resources section", time: "11:15 AM", avatar: "TB", isBot: true },
    { id: 3, user: "Arjun Patel", message: "Looking forward to the hackathon next month! Anyone forming teams?", time: "11:45 AM", avatar: "AP" },
    { id: 4, user: "Priya Singh", message: "I'm working on some cool poster designs for upcoming events 🎨", time: "12:20 PM", avatar: "PS" },
    { id: 5, user: "You", message: "Great work Priya! Can't wait to see them", time: "12:22 PM", avatar: "YU", isUser: true }
  ]);

  const [aiInsights] = useState({
    eventRecommendations: [
      "Based on your interest in web development, we recommend the 'React Advanced Patterns' workshop next week",
      "You might enjoy the 'UI/UX Design Thinking' session - it aligns with your recent project work",
      "The upcoming 'Open Source Contribution' event could help expand your GitHub portfolio"
    ],
    networkingSuggestions: [
      "Connect with Aadhya Sharma - you both have similar interests in React development",
      "Rohit Kumar is organizing marketing events that could benefit from your technical insights",
      "Join the #web-dev channel - 15 active discussions about your areas of interest"
    ],
    personalGrowth: [
      "You're in the top 25% for event attendance - keep up the great participation!",
      "Consider taking a leadership role in the next project to develop management skills",
      "Your technical contributions have been noted by society leads - potential for core member role"
    ]
  });

  // Modal handlers
  const openModal = (type, data = null) => {
    setModalType(type);
    setSelectedEvent(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setGenerateType('');
  };

  // Handle outside click
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

  const handleGeneratePoster = (type) => {
    setGenerateType(type);
    // Simulate AI generation
    setTimeout(() => {
      alert(`${type} generated successfully! Check your downloads folder.`);
      closeModal();
    }, 2000);
  };

  const handleDownloadCertificate = (certificate) => {
    // Simulate certificate download
    const element = document.createElement('a');
    const file = new Blob([`Certificate: ${certificate.eventName}\nRecipient: Your Name\nDate: ${certificate.date}\nCertificate ID: ${certificate.certificateId}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${certificate.eventName}_Certificate.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: chatMessages.length + 1,
        user: "You",
        message: newMessage,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        avatar: "YU",
        isUser: true
      };
      setChatMessages([...chatMessages, newMsg]);
      setNewMessage('');
    }
  };

  const toggleReminder = (eventId) => {
    // In a real app, this would update the backend
    alert(`Reminder toggled for event ${eventId}`);
  };

  const renderDashboard = () => (
    <div className="member-dashboard-content">
      {/* Stats Cards */}
      <div className="member-stats-grid">
        <div className="member-stat-card" style={{'--delay': '0s'}}>
          <div className="member-stat-icon">
            <Calendar size={24} />
          </div>
          <div className="member-stat-content">
            <h3>{memberStats.eventsAttended}</h3>
            <p>Events Attended</p>
            <span className="member-stat-change positive">+3 this month</span>
          </div>
        </div>
        
        <div className="member-stat-card" style={{'--delay': '0.1s'}}>
          <div className="member-stat-icon">
            <Award size={24} />
          </div>
          <div className="member-stat-content">
            <h3>{memberStats.certificatesEarned}</h3>
            <p>Certificates Earned</p>
            <span className="member-stat-change positive">+2 this month</span>
          </div>
        </div>
        
        <div className="member-stat-card" style={{'--delay': '0.2s'}}>
          <div className="member-stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="member-stat-content">
            <h3>{memberStats.contributionScore}%</h3>
            <p>Contribution Score</p>
            <span className="member-stat-change positive">+5% this month</span>
          </div>
        </div>
        
        <div className="member-stat-card" style={{'--delay': '0.3s'}}>
          <div className="member-stat-icon">
            <Users size={24} />
          </div>
          <div className="member-stat-content">
            <h3>{memberStats.networkConnections}</h3>
            <p>Network Connections</p>
            <span className="member-stat-change positive">+7 this month</span>
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="member-dashboard-grid">
        <div className="member-dashboard-card">
          <div className="member-card-header">
            <h3><BrainCircuit size={20} />AI Insights & Recommendations</h3>
          </div>
          <div className="ai-insights-content">
            <div className="insight-category">
              <h4><Sparkles size={16} />Event Recommendations</h4>
              <ul className="insight-list">
                {aiInsights.eventRecommendations.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>
            
            <div className="insight-category">
              <h4><UserCheck size={16} />Networking Opportunities</h4>
              <ul className="insight-list">
                {aiInsights.networkingSuggestions.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>
            
            <div className="insight-category">
              <h4><Target size={16} />Personal Growth</h4>
              <ul className="insight-list">
                {aiInsights.personalGrowth.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="member-dashboard-card">
          <div className="member-card-header">
            <h3><Calendar size={20} />Upcoming Events</h3>
            <button className="member-btn-secondary" onClick={() => setActiveTab('events')}>
              View All
            </button>
          </div>
          <div className="member-events-list">
            {upcomingEvents.slice(0, 3).map(event => (
              <div key={event.id} className="member-event-item">
                <div className="member-event-date">
                  <span className="member-day">{new Date(event.date).getDate()}</span>
                  <span className="member-month">{new Date(event.date).toLocaleDateString('en', { month: 'short' })}</span>
                </div>
                <div className="member-event-content">
                  <h4>{event.title}</h4>
                  <p><MapPin size={14} /> {event.venue} • {event.time}</p>
                  <span className="member-attendees">{event.attendees} attending</span>
                </div>
                {event.reminder && <div className="reminder-badge">Reminder Set</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="member-events-content">
      <div className="member-content-header">
        <div className="member-header-left">
          <h2>Upcoming Events</h2>
          <p>Stay updated with society activities and workshops</p>
        </div>
        <button className="member-btn-primary" onClick={() => openModal('aiInsights')}>
          <BrainCircuit size={16} />
          AI Event Insights
        </button>
      </div>

      <div className="member-events-grid">
        {upcomingEvents.map(event => (
          <div key={event.id} className="member-event-card">
            <div className="member-event-card-header">
              <h3>{event.title}</h3>
              <span className={`member-event-type ${event.type.toLowerCase()}`}>
                {event.type}
              </span>
            </div>
            <div className="member-event-card-content">
              <p className="member-event-description">{event.description}</p>
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
                  <span>{event.attendees} attending</span>
                </div>
              </div>
            </div>
            <div className="member-event-card-actions">
              <button 
                className={`member-btn-secondary ${event.reminder ? 'active' : ''}`}
                onClick={() => toggleReminder(event.id)}
              >
                <Bell size={14} />
                {event.reminder ? 'Reminder Set' : 'Set Reminder'}
              </button>
              <button 
                className="member-btn-primary"
                onClick={() => openModal('generatePoster', event)}
              >
                <Palette size={14} />
                Generate Poster
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMembers = () => (
    <div className="member-members-content">
      <div className="member-content-header">
        <div className="member-header-left">
          <h2>Fellow Members</h2>
          <p>Connect with your society colleagues</p>
        </div>
      </div>

      <div className="member-members-grid">
        {fellowMembers.map(member => (
          <div key={member.id} className="member-member-card">
            <div className="member-member-avatar">
              {member.avatar}
            </div>
            <div className="member-member-info">
              <h3>{member.name}</h3>
              <span className="member-member-role">{member.role}</span>
              <div className="member-member-details">
                <span>{member.department} • {member.year}</span>
              </div>
              <div className="member-skills-tags">
                {member.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="member-skill-tag">{skill}</span>
                ))}
              </div>
              <div className="member-member-stats">
                <div className="member-stat">
                  <Users size={14} />
                  <span>{member.connections} connections</span>
                </div>
                <div className="member-stat">
                  <Calendar size={14} />
                  <span>{member.eventsAttended} events</span>
                </div>
              </div>
            </div>
            <div className="member-member-actions">
              <button className="member-btn-primary">
                <MessageCircle size={14} />
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCertificates = () => (
    <div className="member-certificates-content">
      <div className="member-content-header">
        <div className="member-header-left">
          <h2>My Certificates</h2>
          <p>Download your earned certificates</p>
        </div>
      </div>

      <div className="member-certificates-grid">
        {pastCertificates.map(certificate => (
          <div key={certificate.id} className="member-certificate-card">
            <div className="member-certificate-header">
              <Award className="member-certificate-icon" size={32} />
              <div className="member-certificate-badge">{certificate.type}</div>
            </div>
            <div className="member-certificate-content">
              <h3>{certificate.eventName}</h3>
              <div className="member-certificate-details">
                <div className="member-detail-item">
                  <Calendar size={14} />
                  <span>{new Date(certificate.date).toLocaleDateString()}</span>
                </div>
                <div className="member-detail-item">
                  <Clock size={14} />
                  <span>{certificate.hours} hours</span>
                </div>
                <div className="member-detail-item">
                  <Star size={14} />
                  <span>Grade: {certificate.grade}</span>
                </div>
              </div>
              <div className="member-certificate-skills">
                {certificate.skills.map((skill, index) => (
                  <span key={index} className="member-skill-tag">{skill}</span>
                ))}
              </div>
              <div className="member-certificate-id">
                ID: {certificate.certificateId}
              </div>
            </div>
            <div className="member-certificate-actions">
              <button 
                className="member-btn-primary"
                onClick={() => handleDownloadCertificate(certificate)}
              >
                <Download size={14} />
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGroupChat = () => (
    <div className="member-chat-content">
      <div className="member-content-header">
        <div className="member-header-left">
          <h2>Society Group Chat</h2>
          <p>Stay connected with your society members</p>
        </div>
      </div>

      <div className="member-chat-container">
        <div className="member-chat-messages">
          {chatMessages.map(message => (
            <div key={message.id} className={`member-chat-message ${message.isUser ? 'user-message' : ''} ${message.isBot ? 'bot-message' : ''}`}>
              <div className="member-message-avatar">{message.avatar}</div>
              <div className="member-message-content">
                <div className="member-message-header">
                  <span className="member-message-user">{message.user}</span>
                  <span className="member-message-time">{message.time}</span>
                </div>
                <div className="member-message-text">{message.message}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="member-chat-input">
          <input 
            type="text" 
            placeholder="Type your message..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage} className="member-send-btn">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="member-society-container">
      {/* Header */}
      <header className="member-society-header">
        <div className="member-header-left">
          <button 
            onClick={() => setCurrentPage('getstarted')} 
            className="member-back-button"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="member-society-info">
            <h1>{societyData.name}</h1>
            <p>Member since {societyData.memberSince} • {societyData.memberCount} members</p>
          </div>
        </div>
        <div className="member-header-right">
          <button className="member-notification-btn">
            <Bell size={20} />
            <span className="member-notification-badge">3</span>
          </button>
          <div className="member-profile-avatar">
            YU
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="member-society-nav">
        <button 
          className={`member-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <BarChart3 size={16} />
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
          Group Chat
        </button>
      </nav>

      {/* Main Content */}
      <main className="member-society-main">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'members' && renderMembers()}
        {activeTab === 'certificates' && renderCertificates()}
        {activeTab === 'chat' && renderGroupChat()}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="member-modal-backdrop">
          <div ref={modalRef} className="member-modal-content">
            <div className="member-modal-header">
              <h2>
                {modalType === 'generatePoster' && `Generate Poster - ${selectedEvent?.title}`}
                {modalType === 'aiInsights' && 'AI Event Insights'}
              </h2>
              <button onClick={closeModal} className="member-modal-close-button">
                ×
              </button>
            </div>

            <div className="member-modal-body">
              {modalType === 'generatePoster' && (
                <div className="poster-generator">
                  <h3>Choose Poster Type</h3>
                  <div className="poster-options">
                    <button 
                      className="poster-option"
                      onClick={() => handleGeneratePoster('Social Media Post')}
                    >
                      <Image size={24} />
                      <span>Social Media Post</span>
                    </button>
                    <button 
                      className="poster-option"
                      onClick={() => handleGeneratePoster('Event Poster')}
                    >
                      <FileText size={24} />
                      <span>Event Poster</span>
                    </button>
                    <button 
                      className="poster-option"
                      onClick={() => handleGeneratePoster('Instagram Story')}
                    >
                      <Palette size={24} />
                      <span>Instagram Story</span>
                    </button>
                  </div>
                  {generateType && (
                    <div className="generating-status">
                      <div className="loading-spinner"></div>
                      <p>Generating {generateType}...</p>
                    </div>
                  )}
                </div>
              )}

              {modalType === 'aiInsights' && (
                <div className="ai-insights-modal">
                  <div className="insight-section">
                    <h3><Zap size={20} />Personalized Event Recommendations</h3>
                    <div className="insight-cards">
                      <div className="insight-card">
                        <h4>High Match Events</h4>
                        <p>Based on your past attendance and interests, these events have a 95% compatibility score with your profile.</p>
                      </div>
                      <div className="insight-card">
                        <h4>Skill Development</h4>
                        <p>Events focused on React and Python development will help you achieve your learning goals faster.</p>
                      </div>
                      <div className="insight-card">
                        <h4>Networking Opportunities</h4>
                        <p>3 upcoming events have members from your target companies attending.</p>
                      </div>
                    </div>
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