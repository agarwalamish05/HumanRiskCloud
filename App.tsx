import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  AlertTriangle, 
  ShieldAlert, 
  Fish, 
  Activity, 
  Lock, 
  CheckCircle, 
  BarChart2, 
  Search,
  Menu,
  X,
  Bell,
  User as UserIcon,
  Globe,
  Smartphone,
  MapPin,
  DownloadCloud,
  Clock,
  Briefcase,
  Monitor,
  Moon,
  Check
} from 'lucide-react';
import { Page, RiskLevel } from './types';
import { 
  HIGH_RISK_USERS, 
  RISK_EVENTS, 
  DEPARTMENT_DATA, 
  RISK_OVER_TIME_DATA, 
  PHISHING_CAMPAIGNS,
  REMEDIATION_ACTIONS,
  BEHAVIORAL_ACTIVITY_DATA,
  ANOMALY_DISTRIBUTION,
  TEAM_RISK_STATS,
  ACCESS_LOGS_DATA,
  ACCESS_OVER_TIME,
  ORG_COMPLIANCE,
  ORG_TREND_DATA,
  STRATEGIC_PRIORITIES,
  USER_TIMELINE_DATA,
  INDIVIDUAL_RISK_TREND,
  PHISHING_CLICK_RATE_TREND
} from './mockData';
import { Card, RiskBadge, Button, SectionHeader } from './components/ui';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie, Legend, AreaChart, Area
} from 'recharts';

// --- Shared Components ---

const CircularProgress = ({ score, size = "large" }: { score: number, size?: "medium" | "large" }) => {
  const radius = 15.9155;
  const circumference = 100;
  const dimension = size === "large" ? "w-32 h-32" : "w-24 h-24";
  const fontSize = size === "large" ? "text-4xl" : "text-3xl";

  return (
    <div className={`relative ${dimension} flex items-center justify-center`}>
      <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
        <path 
          className="text-slate-700" 
          d={`M18 2.0845 a ${radius} ${radius} 0 0 1 0 31.831 a ${radius} ${radius} 0 0 1 0 -31.831`} 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
        />
        <path 
          className="text-cyan-400" 
          strokeDasharray={`${score}, 100`}
          d={`M18 2.0845 a ${radius} ${radius} 0 0 1 0 31.831 a ${radius} ${radius} 0 0 1 0 -31.831`} 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <span className={`${fontSize} font-bold text-white`}>{score}</span>
        {size === "large" && <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">out of 100</p>}
      </div>
    </div>
  );
};

// --- Risk Timeline Modal ---

const RiskTimelineModal = ({ isOpen, onClose, userName }: { isOpen: boolean, onClose: () => void, userName: string }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className="relative bg-[#0b0e14] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-slate-800 shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        {/* Header Profile */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
            <UserIcon className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-medium text-slate-200">{userName}</h3>
        </div>

        {/* Risk Timeline Header */}
        <div className="mb-8">
           <h2 className="text-4xl font-bold text-white mb-2">Risk Timeline</h2>
           <div className="flex items-start gap-12 mt-6">
              <div className="space-y-1">
                 <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Human Risk Score</p>
                 <div className="text-6xl font-bold text-white">87</div>
              </div>
              
              <div className="flex-1">
                 {/* Filters and Chart Area */}
                 <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-md border border-slate-800 text-cyan-400 text-sm cursor-pointer">
                       <Check className="w-4 h-4" /> Behaviour
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-md border border-slate-800 text-cyan-400 text-sm cursor-pointer">
                       <Check className="w-4 h-4" /> Phishing
                    </div>
                 </div>
                 
                 <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={INDIVIDUAL_RISK_TREND}>
                          <defs>
                            <linearGradient id="timelineScore" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                               <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#timelineScore)" />
                          <XAxis dataKey="day" hide />
                          <YAxis hide domain={[40, 100]} />
                          <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} />
                       </AreaChart>
                    </ResponsiveContainer>
                    <div className="flex justify-between text-[10px] text-slate-500 mt-2 px-1">
                       <span>26 Feb</span>
                       <span>22</span>
                       <span>22 a</span>
                       <span>26</span>
                       <span>87</span>
                    </div>
                 </div>
              </div>

              {/* Stats Box Right */}
              <div className="w-72 bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-6">
                 <div>
                    <h4 className="text-slate-200 text-sm font-medium mb-1">Risk Increased</h4>
                    <div className="flex items-baseline gap-2">
                       <span className="text-cyan-400 text-2xl font-bold">+12</span>
                       <span className="text-slate-500 text-xs">This Week</span>
                    </div>
                    <p className="text-slate-400 text-xs mt-2 leading-relaxed">Risk score increased due to multiple phishing clicks and new device usage.</p>
                 </div>
                 
                 <div className="space-y-2">
                    <h4 className="text-slate-200 text-sm font-medium">Last 7 Days</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                       <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                       3 anomalies detected
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                       <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                       2 critical events
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Activity Section */}
        <div>
           <h3 className="text-lg font-semibold text-white mb-6">Activity</h3>
           <div className="relative pl-8 space-y-8">
              {/* Vertical line */}
              <div className="absolute left-3 top-2 bottom-2 w-px bg-slate-800"></div>

              {USER_TIMELINE_DATA.map((item, idx) => {
                 let Icon = Monitor;
                 if (item.type === 'phishing') Icon = AlertTriangle;
                 if (item.type === 'access') Icon = Moon;
                 if (item.type === 'behavior') Icon = DownloadCloud;
                 
                 return (
                    <div key={item.id} className="relative flex items-center gap-6 group">
                       {/* Date Label */}
                       <div className="w-16 text-slate-500 text-sm">{item.date}</div>
                       
                       {/* Timeline Marker */}
                       <div className="absolute left-[11px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 z-10"></div>
                       
                       {/* Content Row */}
                       <div className="flex items-center gap-4 flex-1">
                          <div className={`p-2 rounded-md ${item.isCritical ? 'bg-rose-500/10 text-rose-500' : 'bg-slate-800 text-slate-400'} border border-slate-700/50`}>
                             <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 flex items-baseline gap-2">
                             {item.isCritical && <span className="text-rose-500 font-bold text-sm">Critic!</span>}
                             <span className="text-slate-200 text-sm">{item.event}</span>
                          </div>
                       </div>
                    </div>
                 );
              })}
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Dashboard View ---

const DashboardView = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="flex flex-col items-center justify-center p-6 bg-slate-850 border-cyan-900/30">
          <CircularProgress score={72} />
          <p className="mt-4 text-sm text-center text-slate-300">Organization Human Risk Score</p>
        </Card>

        <Card className="flex flex-col justify-center">
          <span className="text-4xl font-bold text-white">24</span>
          <span className="text-sm text-slate-400">High-Risk Users</span>
          <div className="w-full bg-slate-700 h-1 mt-4 rounded-full overflow-hidden">
            <div className="bg-rose-500 w-[24%] h-full"></div>
          </div>
        </Card>

        <Card className="flex flex-col justify-center">
          <span className="text-4xl font-bold text-white">16</span>
          <span className="text-sm text-slate-400">Recent Anomalies</span>
          <div className="w-full bg-slate-700 h-1 mt-4 rounded-full overflow-hidden">
             <div className="bg-amber-400 w-[16%] h-full"></div>
          </div>
        </Card>

        <Card className="flex flex-col justify-center">
          <span className="text-4xl font-bold text-white">18.5%</span>
          <span className="text-sm text-slate-400">Phishing Click Rate</span>
           <div className="w-full bg-slate-700 h-1 mt-4 rounded-full overflow-hidden">
             <div className="bg-cyan-400 w-[18.5%] h-full"></div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Human Risk Score Over Time</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={RISK_OVER_TIME_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Line type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={3} dot={{r: 4, fill: '#1e293b', strokeWidth: 2}} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Risk by Department</h3>
          <div className="h-64 w-full flex items-end justify-between px-4 gap-4">
             {DEPARTMENT_DATA.map((dept, idx) => (
               <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer">
                 <div className="text-cyan-400 mb-2 opacity-0 group-hover:opacity-100 transition-opacity font-bold">{dept.risk}</div>
                 <div className="w-full bg-slate-700 rounded-t-sm relative h-full max-h-[200px] flex items-end">
                   <div 
                      className="w-full bg-cyan-500/80 hover:bg-cyan-400 transition-all rounded-t-sm"
                      style={{ height: `${dept.risk}%` }}
                    ></div>
                 </div>
                 <span className="text-xs text-slate-400 mt-3">{dept.name}</span>
               </div>
             ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Top 10 High-Risk Users</h3>
            <button onClick={() => setPage(Page.RiskProfile)} className="text-xs text-cyan-400 hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-400">
              <thead className="text-xs text-slate-500 uppercase bg-slate-800/50">
                <tr>
                  <th className="px-4 py-2">User</th>
                  <th className="px-4 py-2">Dept</th>
                  <th className="px-4 py-2 text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {HIGH_RISK_USERS.slice(0, 5).map(user => (
                  <tr key={user.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors cursor-pointer" onClick={() => setPage(Page.RiskProfile)}>
                    <td className="px-4 py-3 font-medium text-white">{user.name}</td>
                    <td className="px-4 py-3">{user.department}</td>
                    <td className="px-4 py-3 text-right"><RiskBadge score={user.riskScore} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Anomalies</h3>
            <button onClick={() => setPage(Page.RiskEvents)} className="text-xs text-cyan-400 hover:underline">View All</button>
          </div>
          <div className="space-y-4">
             {RISK_EVENTS.slice(0, 4).map(event => (
               <div key={event.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                 <div>
                   <p className="text-sm text-white font-medium">{event.user} - {event.event}</p>
                   <p className="text-xs text-slate-500">{event.timeAgo}</p>
                 </div>
                 <span className="text-xs font-bold text-rose-500">High</span>
               </div>
             ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// --- Risk Events View ---

const RiskEventsView = () => {
  const [timelineUser, setTimelineUser] = useState<string | null>(null);

  return (
    <div className="animate-fade-in">
      <SectionHeader title="Risk Events" />
      <Card>
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Risk Events Log</h3>
            <div className="bg-slate-900 px-3 py-2 rounded-lg border border-slate-700 text-sm text-slate-400 flex items-center gap-2">
               <Search className="w-4 h-4" /> Search events...
            </div>
        </div>
        <table className="w-full text-sm text-left text-slate-400">
                <thead className="text-xs text-slate-500 uppercase bg-slate-900/50 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Risk Event</th>
                    <th className="px-6 py-4">First Event</th>
                    <th className="px-6 py-4">Last Event</th>
                  </tr>
                </thead>
                <tbody>
                  {RISK_EVENTS.map(event => (
                    <tr 
                      key={event.id} 
                      className="border-b border-slate-800 hover:bg-slate-700/30 cursor-pointer"
                      onClick={() => setTimelineUser(event.user)}
                    >
                      <td className="px-6 py-4 font-medium text-white">{event.user}</td>
                      <td className="px-6 py-4 text-rose-400">{event.riskLevel}</td>
                      <td className="px-6 py-4">{event.date}</td>
                      <td className="px-6 py-4">{event.timeAgo}</td>
                    </tr>
                  ))}
                  <tr 
                    className="border-b border-slate-800 hover:bg-slate-700/30 cursor-pointer"
                    onClick={() => setTimelineUser('Michael Wilson')}
                  >
                     <td className="px-6 py-4 text-white">Michael Wilson</td>
                     <td className="px-6 py-4 text-green-400">4</td>
                     <td className="px-6 py-4">5 months ago</td>
                     <td className="px-6 py-4">2 months ago</td>
                  </tr>
                </tbody>
        </table>
      </Card>

      <RiskTimelineModal 
        isOpen={!!timelineUser} 
        onClose={() => setTimelineUser(null)} 
        userName={timelineUser || ''} 
      />
    </div>
  );
};

// --- Risk Profile View ---

const RiskProfileView = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  if (selectedUser) {
    const user = HIGH_RISK_USERS.find(u => u.id === selectedUser) || HIGH_RISK_USERS[0];
    
    return (
      <div className="animate-fade-in space-y-6">
        <Button onClick={() => setSelectedUser(null)} variant="secondary" className="mb-4">← Back to List</Button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 flex flex-col items-center text-center">
             <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full border-4 border-slate-700 mb-4" />
             <h2 className="text-2xl font-bold text-white">{user.name}</h2>
             <p className="text-slate-400">{user.role} • {user.department}</p>
             <div className="mt-8 bg-slate-900 rounded-2xl p-6 w-full relative overflow-hidden">
                <p className="text-slate-400 text-sm mb-2 uppercase tracking-wide">Human Risk Score</p>
                <div className="text-6xl font-bold text-white">{user.riskScore}</div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500 blur-3xl opacity-20"></div>
             </div>
             <div className="w-full mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Anomalies Detected</span>
                  <span className="text-white font-bold">{user.anomaliesDetected}</span>
                </div>
             </div>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-white mb-6">Human Risk Score Breakdown</h3>
              <div className="flex flex-col md:flex-row items-center gap-8">
                 <CircularProgress score={user.riskScore} size="large" />
                 <div className="flex-1 space-y-4 w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Behavior</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-slate-700 rounded-full"><div className="bg-cyan-500 h-full rounded-full" style={{ width: '30%' }}></div></div>
                        <span className="text-white font-mono">30</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Phishing</span>
                      <div className="flex items-center gap-2">
                         <div className="w-32 h-2 bg-slate-700 rounded-full"><div className="bg-rose-500 h-full rounded-full" style={{ width: '32%' }}></div></div>
                         <span className="text-white font-mono">32</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Access</span>
                      <div className="flex items-center gap-2">
                         <div className="w-32 h-2 bg-slate-700 rounded-full"><div className="bg-amber-500 h-full rounded-full" style={{ width: '28%' }}></div></div>
                         <span className="text-white font-mono">28</span>
                      </div>
                    </div>
                 </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-sm font-semibold text-slate-300 mb-4">Training Status</h3>
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <p className="text-white font-medium">Security Awareness Training</p>
                  <p className="text-rose-400 text-sm mt-1">Incomplete</p>
                </div>
              </Card>
              <Card>
                 <h3 className="text-sm font-semibold text-slate-300 mb-4">Activity Over Time</h3>
                 <div className="h-24">
                   <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[ {v: 20}, {v: 40}, {v: 35}, {v: 50}, {v: 45}, {v: 70}, {v: 60} ]}>
                      <Line type="monotone" dataKey="v" stroke="#22d3ee" strokeWidth={2} dot={false} />
                    </LineChart>
                   </ResponsiveContainer>
                 </div>
              </Card>
            </div>
          </div>
        </div>

        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Recent Anomalies</h3>
          <table className="w-full text-sm text-left text-slate-400">
              <tbody>
                <tr className="border-b border-slate-700/50">
                  <td className="py-3">Credential sharing</td>
                  <td className="py-3 text-right text-slate-500">Sept. 11</td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="py-3">Opened suspicious email attachment</td>
                  <td className="py-3 text-right text-slate-500">Aug. 29</td>
                </tr>
                <tr>
                  <td className="py-3">Access from unusual location</td>
                  <td className="py-3 text-right text-slate-500">Aug. 18</td>
                </tr>
              </tbody>
            </table>
        </Card>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <SectionHeader title="Risk Profile" subtitle="High-risk users identified by the correlation engine." />
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Risk Profile</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search users" className="bg-slate-900 border border-slate-700 text-white text-sm rounded-lg pl-10 pr-4 py-2 focus:ring-1 focus:ring-cyan-500 outline-none w-64" />
          </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-400">
              <thead className="text-xs text-slate-500 uppercase bg-slate-900/50 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Risk Score</th>
                  <th className="px-6 py-4">Phishing Risk</th>
                  <th className="px-6 py-4">Behavior Anomalies</th>
                  <th className="px-6 py-4 text-right">Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {HIGH_RISK_USERS.map(user => (
                  <tr key={user.id} className="border-b border-slate-800 hover:bg-slate-700/30 transition-colors cursor-pointer" onClick={() => setSelectedUser(user.id)}>
                    <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                    <td className="px-6 py-4"><RiskBadge score={user.riskScore} /></td>
                    <td className="px-6 py-4 text-white">{user.phishingRisk}</td>
                    <td className="px-6 py-4 text-white">{user.anomaliesDetected}</td>
                    <td className="px-6 py-4 text-right">{user.lastActivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
};

// --- Phishing Simulation View ---

const PhishingSimulationView = () => (
  <div className="animate-fade-in space-y-6">
    <SectionHeader title="Phishing Simulation Dashboard" />
    
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-slate-850">
        <div className="text-4xl font-bold text-white">18</div>
        <div className="text-sm text-slate-400">Total simulations</div>
      </Card>
      <Card className="bg-slate-850">
        <div className="text-4xl font-bold text-white">1,250</div>
        <div className="text-sm text-slate-400">Users targeted</div>
      </Card>
      <Card className="bg-slate-850">
        <div className="text-4xl font-bold text-white">23%</div>
        <div className="text-sm text-slate-400">Click rate</div>
      </Card>
       <Card className="bg-slate-850">
         <div className="h-16">
            <ResponsiveContainer width="100%" height="100%">
               <LineChart data={PHISHING_CLICK_RATE_TREND}>
                 <Line type="monotone" dataKey="rate" stroke="#22d3ee" strokeWidth={2} dot={false} />
               </LineChart>
            </ResponsiveContainer>
         </div>
      </Card>
    </div>

    {/* Dedicated Click Rate Trend Chart */}
    <Card>
      <div className="flex justify-between items-center mb-6">
         <h3 className="text-lg font-semibold text-white">Click Rate Over Time</h3>
         <div className="text-xs text-slate-500 uppercase tracking-widest">July - December 2024</div>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={PHISHING_CLICK_RATE_TREND}>
            <defs>
              <linearGradient id="phishingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} domain={[0, 50]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
              formatter={(val) => [`${val}%`, 'Click Rate']}
            />
            <Area type="monotone" dataKey="rate" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#phishingGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>

    <Card>
      <div className="flex gap-8 mb-6">
         <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-slate-600"></span> No click</div>
         <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-cyan-600"></span> Clicked</div>
         <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-cyan-400"></span> Reported</div>
      </div>
      <table className="w-full text-sm text-left text-slate-400">
         <thead className="text-xs text-slate-500 uppercase border-b border-slate-700">
           <tr>
             <th className="px-4 py-3">Name</th>
             <th className="px-4 py-3">Launch Date</th>
             <th className="px-4 py-3">Click Rate</th>
             <th className="px-4 py-3">Reporting Rate</th>
           </tr>
         </thead>
         <tbody>
           {PHISHING_CAMPAIGNS.map((camp, i) => (
             <tr key={i} className="border-b border-slate-800">
               <td className="px-4 py-4 font-medium text-white">{camp.name}</td>
               <td className="px-4 py-4">{camp.launchDate}</td>
               <td className="px-4 py-4 font-bold text-white">{camp.clickRate}</td>
               <td className="px-4 py-4 text-white">{camp.reportingRate}</td>
             </tr>
           ))}
         </tbody>
      </table>
    </Card>
  </div>
);

// --- Remediation View ---

const RemediationView = () => (
  <div className="animate-fade-in space-y-6">
     <SectionHeader title="Action Center" subtitle="Automated and recommended actions to reduce risk." />
     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-cyan-500">
          <div className="text-sm text-slate-400">Pending Actions</div>
          <div className="text-3xl font-bold text-white mt-1">18</div>
        </Card>
        <Card>
          <div className="text-sm text-slate-400">Completed Actions</div>
          <div className="text-3xl font-bold text-cyan-400 mt-1">36</div>
        </Card>
     </div>
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
           <Card>
              <h3 className="text-lg font-semibold text-white mb-6">Recommended Actions</h3>
              <table className="w-full text-sm text-left text-slate-400">
                <thead className="text-xs text-slate-500 uppercase bg-slate-900/50">
                  <tr>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Issue Detected</th>
                    <th className="px-4 py-3">Recommended Action</th>
                    <th className="px-4 py-3 text-right">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {REMEDIATION_ACTIONS.map((item, i) => (
                    <tr key={i} className="border-b border-slate-800">
                      <td className="px-4 py-4 text-white">{item.user}</td>
                      <td className="px-4 py-4">{item.issue}</td>
                      <td className="px-4 py-4 text-white">{item.action}</td>
                      <td className={`px-4 py-4 text-right font-bold ${item.priority === RiskLevel.High ? 'text-rose-500' : 'text-amber-500'}`}>{item.priority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </Card>
        </div>
     </div>
  </div>
);

// --- Behavioral Analytics View ---

const BehavioralAnalyticsView = () => (
  <div className="animate-fade-in space-y-6">
    <SectionHeader title="Behavioral Analytics" subtitle="Detect anomalies in user activity patterns and file access." />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <h3 className="text-lg font-semibold text-white mb-6">Activity Volume & Anomalies by Hour</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={BEHAVIORAL_ACTIVITY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="hour" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} />
              <Bar dataKey="normal" name="Normal Activity" stackId="a" fill="#22d3ee" barSize={30} />
              <Bar dataKey="anomaly" name="Anomalous Event" stackId="a" fill="#f43f5e" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  </div>
);

// --- Access Monitoring View ---

const AccessMonitoringView = () => (
  <div className="animate-fade-in space-y-6">
    <SectionHeader title="Access Monitoring" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <h3 className="text-lg font-semibold text-white mb-6">Access Attempts Over Time (24h)</h3>
        <div className="h-72 w-full">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={ACCESS_OVER_TIME}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
                <XAxis dataKey="time" stroke="#94a3b8" tickLine={false} axisLine={false}/>
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false}/>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}/>
                <Area type="monotone" dataKey="success" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.1} name="Successful Logins" />
                <Area type="monotone" dataKey="failed" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.1} name="Failed Attempts" />
             </AreaChart>
           </ResponsiveContainer>
        </div>
      </Card>
    </div>
  </div>
);

// --- Team Risk View ---

const TeamRiskView = () => (
  <div className="animate-fade-in space-y-6">
    <SectionHeader title="Team Risk Overview" />
    <Card>
      <h3 className="text-lg font-semibold text-white mb-6">Risk Score by Department</h3>
      <div className="h-64 w-full">
         <ResponsiveContainer width="100%" height="100%">
           <BarChart data={TEAM_RISK_STATS} layout="vertical" margin={{ left: 40 }}>
             <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
             <XAxis type="number" domain={[0, 100]} hide />
             <YAxis type="category" dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} width={100} />
             <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} />
             <Bar dataKey="riskScore" name="Risk Score" barSize={20} radius={[0, 4, 4, 0]}>
               {TEAM_RISK_STATS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.riskScore > 75 ? '#f43f5e' : entry.riskScore > 50 ? '#fbbf24' : '#22d3ee'} />
               ))}
             </Bar>
           </BarChart>
         </ResponsiveContainer>
      </div>
    </Card>
  </div>
);

// --- Organization Overview View ---

const OrganizationOverviewView = () => (
  <div className="animate-fade-in space-y-6">
    <SectionHeader title="Organization Overview" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-6">Security Posture Trend</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={ORG_TREND_DATA}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                 <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
                 <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} domain={[50, 100]} />
                 <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} />
                 <Area type="monotone" dataKey="score" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.1} strokeWidth={2} />
               </AreaChart>
            </ResponsiveContainer>
          </div>
       </Card>
    </div>
  </div>
);

// --- Layout & Sidebar ---

const Sidebar = ({ activePage, setPage, isMobileOpen, closeMobile }: { activePage: Page, setPage: (p: Page) => void, isMobileOpen: boolean, closeMobile: () => void }) => {
  const menuItems = [
    { page: Page.Dashboard, icon: LayoutDashboard },
    { page: Page.RiskProfile, icon: Users },
    { page: Page.RiskEvents, icon: AlertTriangle },
    { page: Page.TeamRisk, icon: Users },
    { page: Page.PhishingSimulation, icon: Fish },
    { page: Page.BehavioralAnalytics, icon: Activity },
    { page: Page.AccessMonitoring, icon: Lock },
    { page: Page.Remediation, icon: CheckCircle },
    { page: Page.OrganizationOverview, icon: BarChart2 },
  ];

  const sidebarClasses = `fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-200 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`;

  return (
    <div className={sidebarClasses}>
      <div className="p-6 border-b border-slate-800 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white tracking-tight">HumanRisk<span className="text-cyan-400">Cloud</span></h1>
        <button onClick={closeMobile} className="md:hidden text-slate-400"><X /></button>
      </div>
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = activePage === item.page;
          const Icon = item.icon;
          return (
            <button key={item.page} onClick={() => { setPage(item.page); closeMobile(); }} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive ? 'bg-cyan-900/30 text-cyan-400 border border-cyan-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              {item.page}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Dashboard);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activePage) {
      case Page.Dashboard: return <DashboardView setPage={setActivePage} />;
      case Page.RiskProfile: return <RiskProfileView />;
      case Page.RiskEvents: return <RiskEventsView />;
      case Page.PhishingSimulation: return <PhishingSimulationView />;
      case Page.Remediation: return <RemediationView />;
      case Page.TeamRisk: return <TeamRiskView />;
      case Page.BehavioralAnalytics: return <BehavioralAnalyticsView />;
      case Page.AccessMonitoring: return <AccessMonitoringView />;
      case Page.OrganizationOverview: return <OrganizationOverviewView />;
      default: return <DashboardView setPage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 flex">
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
      <Sidebar activePage={activePage} setPage={setActivePage} isMobileOpen={isMobileMenuOpen} closeMobile={() => setIsMobileMenuOpen(false)} />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-30">
           <div className="flex items-center gap-4">
             <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-slate-400"><Menu /></button>
             <h2 className="text-lg font-semibold text-white hidden md:block">{activePage}</h2>
           </div>
           <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-white relative"><Bell className="w-5 h-5" /></button>
              <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
                 <div className="text-right hidden sm:block">
                   <p className="text-sm font-medium text-white">Mark Graham</p>
                   <p className="text-xs text-slate-400">Admin</p>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-cyan-900 text-cyan-400 flex items-center justify-center border border-cyan-700"><UserIcon className="w-4 h-4" /></div>
              </div>
           </div>
        </header>
        <main className="p-6 flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;