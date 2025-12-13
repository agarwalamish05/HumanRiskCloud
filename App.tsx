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
  Briefcase
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
  STRATEGIC_PRIORITIES
} from './mockData';
import { Card, RiskBadge, Button, SectionHeader } from './components/ui';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie, Legend, AreaChart, Area
} from 'recharts';

// --- Dashboard Screens Implementation ---

const DashboardView = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="flex flex-col items-center justify-center p-6 bg-slate-850 border-cyan-900/30">
          <div className="relative w-32 h-32 flex items-center justify-center">
             {/* Simple CSS ring simulation */}
             <div className="absolute inset-0 border-8 border-slate-700 rounded-full"></div>
             <div className="absolute inset-0 border-8 border-cyan-400 rounded-full border-t-transparent border-l-transparent -rotate-45"></div>
             <div className="text-center z-10">
               <span className="text-4xl font-bold text-white">72</span>
               <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">out of 100</p>
             </div>
          </div>
          <p className="mt-2 text-sm text-center text-slate-300">Organization Human Risk Score</p>
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
             <div className="bg-cyan-400 w-[18%] h-full"></div>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
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

      {/* Bottom Row: Top Risky Users & Anomalies */}
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

const RiskProfileView = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  if (selectedUser) {
    // Detail View (Screen 2(2))
    const user = HIGH_RISK_USERS.find(u => u.id === selectedUser) || HIGH_RISK_USERS[3]; // Default to Julia if not found
    
    return (
      <div className="animate-fade-in space-y-6">
        <Button onClick={() => setSelectedUser(null)} variant="secondary" className="mb-4">← Back to List</Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
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

          {/* Breakdown & Stats */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-white mb-6">Human Risk Score Breakdown</h3>
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Donut Chart Simulation */}
                 <div className="relative w-40 h-40">
                    <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
                      <path className="text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                      <path className="text-cyan-500" strokeDasharray="90, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
                      {user.riskScore}
                    </div>
                 </div>

                 <div className="flex-1 space-y-4 w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Behavior</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-slate-700 rounded-full"><div className="bg-cyan-500 h-full rounded-full w-[30%]"></div></div>
                        <span className="text-white font-mono">30</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Phishing</span>
                      <div className="flex items-center gap-2">
                         <div className="w-32 h-2 bg-slate-700 rounded-full"><div className="bg-rose-500 h-full rounded-full w-[32%]"></div></div>
                         <span className="text-white font-mono">32</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Access</span>
                      <div className="flex items-center gap-2">
                         <div className="w-32 h-2 bg-slate-700 rounded-full"><div className="bg-amber-500 h-full rounded-full w-[28%]"></div></div>
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
                    <LineChart data={[
                      {v: 20}, {v: 40}, {v: 35}, {v: 50}, {v: 45}, {v: 70}, {v: 60}
                    ]}>
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

  // List View (Screen 2(1))
  return (
    <div className="animate-fade-in">
      <SectionHeader title="Risk Profile" subtitle="High-risk users identified by the correlation engine." />
      
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Risk Profile</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search users" 
              className="bg-slate-900 border border-slate-700 text-white text-sm rounded-lg pl-10 pr-4 py-2 focus:ring-1 focus:ring-cyan-500 outline-none w-64"
            />
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
                  <tr 
                    key={user.id} 
                    className="border-b border-slate-800 hover:bg-slate-700/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedUser(user.id)}
                  >
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
        
        <div className="flex justify-between items-center mt-4 text-sm text-slate-500 px-2">
           <span>Previous</span>
           <div className="flex gap-2">
             <span className="text-cyan-400">1</span>
           </div>
           <span>Next</span>
        </div>
      </Card>
    </div>
  );
};

const RiskEventsView = () => (
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
                  <tr key={event.id} className="border-b border-slate-800 hover:bg-slate-700/30">
                    <td className="px-6 py-4 font-medium text-white">{event.user}</td>
                    <td className="px-6 py-4 text-rose-400">{event.riskLevel}</td>
                    <td className="px-6 py-4">{event.date}</td>
                    <td className="px-6 py-4">{event.timeAgo}</td>
                  </tr>
                ))}
                {/* Filling dummy data to match screen density */}
                <tr className="border-b border-slate-800 hover:bg-slate-700/30">
                   <td className="px-6 py-4 text-white">Michael Wilson</td>
                   <td className="px-6 py-4 text-green-400">4</td>
                   <td className="px-6 py-4">5 months ago</td>
                   <td className="px-6 py-4">2 months ago</td>
                </tr>
              </tbody>
      </table>
    </Card>
  </div>
);

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
               <LineChart data={[{v:10}, {v:30}, {v:20}, {v:45}, {v:30}, {v:60}]}>
                 <Line type="monotone" dataKey="v" stroke="#22d3ee" strokeWidth={2} dot={false} />
               </LineChart>
            </ResponsiveContainer>
         </div>
         <div className="text-xs text-slate-500 mt-1">Click Rate Over Time</div>
      </Card>
    </div>

    <Card>
      <div className="flex gap-8 mb-6">
         <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-slate-600"></span> No click</div>
         <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-cyan-600"></span> Clicked</div>
         <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-cyan-400"></span> Reported</div>
      </div>
      <div className="w-full h-8 flex rounded-lg overflow-hidden mb-8">
        <div className="bg-slate-700 w-[60%]"></div>
        <div className="bg-cyan-700 w-[20%]"></div>
        <div className="bg-cyan-400 w-[20%]"></div>
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
        <Card>
          <div className="text-sm text-slate-400">Automated Actions</div>
          <div className="text-3xl font-bold text-teal-400 mt-1">12</div>
        </Card>
        <Card>
          <div className="text-sm text-slate-400">Avg Completion Time</div>
          <div className="text-3xl font-bold text-white mt-1">4.2 hrs</div>
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
                      <td className={`px-4 py-4 text-right font-bold ${
                        item.priority === RiskLevel.High ? 'text-rose-500' : 
                        item.priority === RiskLevel.Medium ? 'text-amber-500' : 'text-cyan-500'
                      }`}>{item.priority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </Card>
        </div>
        <div>
           <Card className="h-full">
             <h3 className="text-lg font-semibold text-white mb-6">Auto-Remediation</h3>
             <div className="flex items-center justify-between mb-8">
               <span className="text-sm text-slate-300">Enable Auto-Remediate</span>
               <div className="w-12 h-6 bg-cyan-600 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
               </div>
             </div>
             
             <div className="space-y-4">
               <div className="p-4 bg-slate-900 rounded-lg border border-slate-700 text-sm text-center cursor-pointer hover:border-cyan-500 transition-colors">
                  Auto-assign micro-training
               </div>
               <div className="p-4 bg-slate-900 rounded-lg border border-slate-700 text-sm text-center cursor-pointer hover:border-cyan-500 transition-colors">
                  Auto-trigger device verification
               </div>
               <div className="p-4 bg-slate-900 rounded-lg border border-slate-700 text-sm text-center cursor-pointer hover:border-cyan-500 transition-colors">
                  Auto-alert manager
               </div>
             </div>
           </Card>
        </div>
     </div>
  </div>
);

// --- New Pages Implementation ---

const BehavioralAnalyticsView = () => (
  <div className="animate-fade-in space-y-6">
    <SectionHeader title="Behavioral Analytics" subtitle="Detect anomalies in user activity patterns and file access." />
    
    {/* KPI Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-500/20 rounded-lg text-rose-500"><AlertTriangle className="w-6 h-6"/></div>
          <div>
            <div className="text-sm text-slate-400">Total Anomalies</div>
            <div className="text-2xl font-bold text-white">42</div>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 rounded-lg text-amber-500"><DownloadCloud className="w-6 h-6"/></div>
          <div>
            <div className="text-sm text-slate-400">Data Exfiltration</div>
            <div className="text-2xl font-bold text-white">3</div>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/20 rounded-lg text-cyan-500"><Clock className="w-6 h-6"/></div>
          <div>
            <div className="text-sm text-slate-400">Off-Hour Activity</div>
            <div className="text-2xl font-bold text-white">12</div>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/20 rounded-lg text-purple-500"><ShieldAlert className="w-6 h-6"/></div>
          <div>
            <div className="text-sm text-slate-400">Shadow IT Events</div>
            <div className="text-2xl font-bold text-white">8</div>
          </div>
        </div>
      </Card>
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <h3 className="text-lg font-semibold text-white mb-6">Activity Volume & Anomalies by Hour</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={BEHAVIORAL_ACTIVITY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="hour" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                cursor={{ fill: '#334155', opacity: 0.2 }}
              />
              <Legend />
              <Bar dataKey="normal" name="Normal Activity" stackId="a" fill="#22d3ee" barSize={30} />
              <Bar dataKey="anomaly" name="Anomalous Event" stackId="a" fill="#f43f5e" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Anomaly Categories</h3>
        <div className="h-64">
           <ResponsiveContainer width="100%" height="100%">
             <PieChart>
               <Pie 
                 data={ANOMALY_DISTRIBUTION} 
                 cx="50%" 
                 cy="50%" 
                 innerRadius={60} 
                 outerRadius={80} 
                 paddingAngle={5} 
                 dataKey="value"
               >
                 {ANOMALY_DISTRIBUTION.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={entry.color} />
                 ))}
               </Pie>
               <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} />
               <Legend verticalAlign="bottom" height={36}/>
             </PieChart>
           </ResponsiveContainer>
        </div>
        <div className="text-center mt-2 text-sm text-slate-400">Distribution of last 30 days</div>
      </Card>
    </div>

    <Card>
      <h3 className="text-lg font-semibold text-white mb-4">Recent Behavioral Alerts</h3>
      <table className="w-full text-sm text-left text-slate-400">
        <thead className="text-xs text-slate-500 uppercase bg-slate-900/50">
          <tr>
            <th className="px-4 py-3">User</th>
            <th className="px-4 py-3">Event Detected</th>
            <th className="px-4 py-3">Severity</th>
            <th className="px-4 py-3 text-right">Time Detected</th>
          </tr>
        </thead>
        <tbody>
           <tr className="border-b border-slate-800">
             <td className="px-4 py-4 text-white font-medium">James Smith</td>
             <td className="px-4 py-4">High volume data download (5GB)</td>
             <td className="px-4 py-4 text-rose-500 font-bold">Critical</td>
             <td className="px-4 py-4 text-right">15 mins ago</td>
           </tr>
           <tr className="border-b border-slate-800">
             <td className="px-4 py-4 text-white font-medium">Sarah Connor</td>
             <td className="px-4 py-4">Login from new device type</td>
             <td className="px-4 py-4 text-amber-500 font-bold">Medium</td>
             <td className="px-4 py-4 text-right">2 hours ago</td>
           </tr>
           <tr className="border-b border-slate-800">
             <td className="px-4 py-4 text-white font-medium">Robert Brown</td>
             <td className="px-4 py-4">Accessed sensitive finance folder</td>
             <td className="px-4 py-4 text-cyan-400 font-bold">Low</td>
             <td className="px-4 py-4 text-right">5 hours ago</td>
           </tr>
        </tbody>
      </table>
    </Card>
  </div>
);

const AccessMonitoringView = () => (
  <div className="animate-fade-in space-y-6">
    <SectionHeader title="Access Monitoring" subtitle="Real-time monitoring of login attempts, device access, and geolocation." />

    {/* Access KPI */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <div className="text-sm text-slate-400">Total Logins (24h)</div>
        <div className="text-3xl font-bold text-white mt-1">1,420</div>
        <div className="text-xs text-green-400 mt-2">↑ 5% vs yesterday</div>
      </Card>
      <Card>
        <div className="text-sm text-slate-400">Failed Attempts</div>
        <div className="text-3xl font-bold text-rose-500 mt-1">32</div>
        <div className="text-xs text-rose-400 mt-2">↑ 12% spike detected</div>
      </Card>
      <Card>
        <div className="text-sm text-slate-400">Unique Devices</div>
        <div className="text-3xl font-bold text-white mt-1">856</div>
        <div className="text-xs text-slate-500 mt-2">Stable</div>
      </Card>
      <Card>
        <div className="text-sm text-slate-400">Unusual Locations</div>
        <div className="text-3xl font-bold text-amber-500 mt-1">5</div>
        <div className="text-xs text-slate-500 mt-2">Requires review</div>
      </Card>
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <h3 className="text-lg font-semibold text-white mb-6">Access Attempts Over Time (24h)</h3>
        <div className="h-72 w-full">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={ACCESS_OVER_TIME}>
                <defs>
                  <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
                <XAxis dataKey="time" stroke="#94a3b8" tickLine={false} axisLine={false}/>
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false}/>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}/>
                <Area type="monotone" dataKey="success" stroke="#22d3ee" fillOpacity={1} fill="url(#colorSuccess)" name="Successful Logins" />
                <Area type="monotone" dataKey="failed" stroke="#f43f5e" fillOpacity={1} fill="url(#colorFailed)" name="Failed Attempts" />
             </AreaChart>
           </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Top Locations</h3>
        <div className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-slate-400"/> <span>United States</span></div>
            <div className="w-32 bg-slate-700 h-2 rounded-full overflow-hidden">
              <div className="bg-cyan-500 w-[75%] h-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-slate-400"/> <span>Germany</span></div>
            <div className="w-32 bg-slate-700 h-2 rounded-full overflow-hidden">
              <div className="bg-cyan-500 w-[15%] h-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-slate-400"/> <span>United Kingdom</span></div>
            <div className="w-32 bg-slate-700 h-2 rounded-full overflow-hidden">
              <div className="bg-cyan-500 w-[8%] h-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-amber-500"/> <span className="text-amber-500">Russia</span></div>
            <div className="w-32 bg-slate-700 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 w-[2%] h-full"></div>
            </div>
          </div>
        </div>
      </Card>
    </div>

    {/* Log Table */}
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Live Access Logs</h3>
        <Button variant="secondary" className="text-xs py-1 h-8">Export Log</Button>
      </div>
      <table className="w-full text-sm text-left text-slate-400">
        <thead className="text-xs text-slate-500 uppercase bg-slate-900/50">
          <tr>
            <th className="px-4 py-3">User</th>
            <th className="px-4 py-3">IP Address</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Device</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Time</th>
          </tr>
        </thead>
        <tbody>
           {ACCESS_LOGS_DATA.map(log => (
             <tr key={log.id} className="border-b border-slate-800">
               <td className="px-4 py-4 text-white font-medium">{log.user}</td>
               <td className="px-4 py-4 font-mono text-xs">{log.ip}</td>
               <td className="px-4 py-4 flex items-center gap-2">
                 <MapPin className="w-3 h-3 text-slate-500"/> {log.location}
               </td>
               <td className="px-4 py-4"><span className="flex items-center gap-2"><Smartphone className="w-3 h-3"/> {log.device}</span></td>
               <td className="px-4 py-4">
                 <span className={`px-2 py-1 rounded text-xs font-bold ${
                   log.status === 'Success' ? 'bg-green-500/10 text-green-400' : 
                   log.status === 'Failed' ? 'bg-rose-500/10 text-rose-500' : 'bg-slate-700 text-slate-300'
                 }`}>
                   {log.status}
                 </span>
               </td>
               <td className="px-4 py-4 text-right text-slate-500">{log.time}</td>
             </tr>
           ))}
        </tbody>
      </table>
    </Card>
  </div>
);

const TeamRiskView = () => (
  <div className="animate-fade-in space-y-6">
    <SectionHeader title="Team Risk Overview" subtitle="Compare risk exposure across different departments." />

    {/* Top Summary */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-t-4 border-t-rose-500">
         <div className="text-slate-400 text-sm mb-1">Highest Risk Department</div>
         <div className="text-3xl font-bold text-white">Sales</div>
         <div className="text-sm text-rose-400 mt-2">Risk Score: 82/100</div>
      </Card>
      <Card className="border-t-4 border-t-green-500">
         <div className="text-slate-400 text-sm mb-1">Safest Department</div>
         <div className="text-3xl font-bold text-white">Engineering</div>
         <div className="text-sm text-green-400 mt-2">Risk Score: 45/100</div>
      </Card>
      <Card className="border-t-4 border-t-cyan-500">
         <div className="text-slate-400 text-sm mb-1">Avg Organization Score</div>
         <div className="text-3xl font-bold text-white">68.4</div>
         <div className="text-sm text-slate-500 mt-2">stable from last month</div>
      </Card>
    </div>

    {/* Charts & Table */}
    <Card>
      <h3 className="text-lg font-semibold text-white mb-6">Risk Score by Department</h3>
      <div className="h-64 w-full">
         <ResponsiveContainer width="100%" height="100%">
           <BarChart data={TEAM_RISK_STATS} layout="vertical" margin={{ left: 40 }}>
             <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
             <XAxis type="number" domain={[0, 100]} hide />
             <YAxis type="category" dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} width={100} />
             <Tooltip 
               contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
               cursor={{ fill: '#334155', opacity: 0.2 }}
             />
             <Bar dataKey="riskScore" name="Risk Score" barSize={20} radius={[0, 4, 4, 0]}>
               {TEAM_RISK_STATS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.riskScore > 75 ? '#f43f5e' : entry.riskScore > 50 ? '#fbbf24' : '#22d3ee'} />
               ))}
             </Bar>
           </BarChart>
         </ResponsiveContainer>
      </div>
    </Card>

    <Card>
       <div className="flex justify-between items-center mb-4">
         <h3 className="text-lg font-semibold text-white">Department Details</h3>
         <Button variant="secondary" className="text-xs">Download Report</Button>
       </div>
       <table className="w-full text-sm text-left text-slate-400">
         <thead className="text-xs text-slate-500 uppercase bg-slate-900/50">
           <tr>
             <th className="px-6 py-4">Department</th>
             <th className="px-6 py-4">Employees</th>
             <th className="px-6 py-4">High Risk Users</th>
             <th className="px-6 py-4">Phishing Click Rate</th>
             <th className="px-6 py-4 text-right">Avg Risk Score</th>
           </tr>
         </thead>
         <tbody>
           {TEAM_RISK_STATS.map(team => (
             <tr key={team.id} className="border-b border-slate-800 hover:bg-slate-700/20">
               <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                 <Briefcase className="w-4 h-4 text-slate-500"/> {team.name}
               </td>
               <td className="px-6 py-4">{team.employees}</td>
               <td className="px-6 py-4 text-white font-medium">{team.highRiskCount}</td>
               <td className="px-6 py-4">{team.phishingRate}</td>
               <td className="px-6 py-4 text-right"><RiskBadge score={team.riskScore} /></td>
             </tr>
           ))}
         </tbody>
       </table>
    </Card>
  </div>
);

const OrganizationOverviewView = () => (
  <div className="animate-fade-in space-y-6">
    <SectionHeader title="Organization Overview" subtitle="Executive summary of security posture, compliance, and strategic initiatives." />

    {/* Executive KPIs */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
       <Card className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
             <div>
               <p className="text-slate-400 text-sm">Security Rating</p>
               <h3 className="text-3xl font-bold text-white mt-1">A-</h3>
             </div>
             <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                <ShieldAlert className="w-6 h-6" /> 
             </div>
          </div>
          <div className="mt-4 text-xs text-slate-500">Top 10% of industry peers</div>
       </Card>

       <Card className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
             <div>
               <p className="text-slate-400 text-sm">Compliance Readiness</p>
               <h3 className="text-3xl font-bold text-white mt-1">92%</h3>
             </div>
             <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
                <CheckCircle className="w-6 h-6" /> 
             </div>
          </div>
          <div className="mt-4 text-xs text-slate-500">Audit scheduled in 45 days</div>
       </Card>

       <Card className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
             <div>
               <p className="text-slate-400 text-sm">Active Assets</p>
               <h3 className="text-3xl font-bold text-white mt-1">3,402</h3>
             </div>
             <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                <Globe className="w-6 h-6" /> 
             </div>
          </div>
          <div className="mt-4 text-xs text-slate-500">100% covered by EDR</div>
       </Card>

       <Card className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
             <div>
               <p className="text-slate-400 text-sm">Open Risks</p>
               <h3 className="text-3xl font-bold text-rose-500 mt-1">8</h3>
             </div>
             <div className="p-2 bg-rose-500/20 rounded-lg text-rose-500">
                <AlertTriangle className="w-6 h-6" /> 
             </div>
          </div>
          <div className="mt-4 text-xs text-slate-500">3 Critical, 5 High</div>
       </Card>
    </div>

    {/* Main Content */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       {/* Trend Chart */}
       <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">12-Month Security Posture Trend</h3>
            <div className="flex gap-2 text-sm">
               <span className="flex items-center gap-1 text-slate-400"><span className="w-2 h-2 rounded-full bg-cyan-400"></span> Score</span>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={ORG_TREND_DATA}>
                 <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                    </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                 <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
                 <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} domain={[50, 100]} />
                 <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} />
                 <Area type="monotone" dataKey="score" stroke="#22d3ee" fillOpacity={1} fill="url(#colorScore)" strokeWidth={2} />
               </AreaChart>
            </ResponsiveContainer>
          </div>
       </Card>

       {/* Compliance Progress */}
       <Card>
          <h3 className="text-lg font-semibold text-white mb-6">Compliance Frameworks</h3>
          <div className="space-y-6">
             {ORG_COMPLIANCE.map((fw) => (
               <div key={fw.name}>
                 <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">{fw.name}</span>
                    <span className="text-white font-bold">{fw.progress}%</span>
                 </div>
                 <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${fw.progress}%`, backgroundColor: fw.color }}></div>
                 </div>
               </div>
             ))}
          </div>
          <Button className="w-full mt-8" variant="secondary">View Compliance Report</Button>
       </Card>
    </div>

    {/* Strategic Priorities Table */}
    <Card>
       <h3 className="text-lg font-semibold text-white mb-4">Strategic Security Initiatives</h3>
       <div className="overflow-x-auto">
         <table className="w-full text-sm text-left text-slate-400">
           <thead className="text-xs text-slate-500 uppercase bg-slate-900/50">
             <tr>
               <th className="px-4 py-3">Initiative</th>
               <th className="px-4 py-3">Owner</th>
               <th className="px-4 py-3">Due Date</th>
               <th className="px-4 py-3 text-right">Status</th>
             </tr>
           </thead>
           <tbody>
             {STRATEGIC_PRIORITIES.map((item) => (
               <tr key={item.id} className="border-b border-slate-800">
                 <td className="px-4 py-4 font-medium text-white">{item.initiative}</td>
                 <td className="px-4 py-4">{item.owner}</td>
                 <td className="px-4 py-4">{item.due}</td>
                 <td className="px-4 py-4 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      item.status === 'Completed' ? 'bg-green-500/10 text-green-400' :
                      item.status === 'On Track' ? 'bg-cyan-500/10 text-cyan-400' :
                      item.status === 'Planning' ? 'bg-slate-700 text-slate-300' :
                      'bg-rose-500/10 text-rose-500'
                    }`}>
                      {item.status}
                    </span>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
    </Card>
  </div>
);

const PlaceholderView = ({ title }: { title: string }) => (
  <div className="animate-fade-in">
    <SectionHeader title={title} />
    <Card className="h-96 flex items-center justify-center flex-col text-slate-500">
      <Activity className="w-16 h-16 mb-4 opacity-20" />
      <p>Data visualization correlation in progress...</p>
    </Card>
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

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-200 ease-in-out
    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
  `;

  return (
    <div className={sidebarClasses}>
      <div className="p-6 border-b border-slate-800 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white tracking-tight">Human<span className="text-cyan-400">Risk</span></h1>
        <button onClick={closeMobile} className="md:hidden text-slate-400"><X /></button>
      </div>
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = activePage === item.page;
          const Icon = item.icon;
          return (
            <button
              key={item.page}
              onClick={() => { setPage(item.page); closeMobile(); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive 
                  ? 'bg-cyan-900/30 text-cyan-400 border border-cyan-900/50' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
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
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      <Sidebar 
        activePage={activePage} 
        setPage={setActivePage} 
        isMobileOpen={isMobileMenuOpen}
        closeMobile={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
        {/* Header */}
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-30">
           <div className="flex items-center gap-4">
             <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-slate-400">
               <Menu />
             </button>
             <h2 className="text-lg font-semibold text-white hidden md:block">{activePage}</h2>
           </div>

           <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-white relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border border-slate-900"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
                 <div className="text-right hidden sm:block">
                   <p className="text-sm font-medium text-white">Mark Graham</p>
                   <p className="text-xs text-slate-400">Admin</p>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-cyan-900 text-cyan-400 flex items-center justify-center border border-cyan-700">
                   <UserIcon className="w-4 h-4" />
                 </div>
              </div>
           </div>
        </header>

        {/* Content */}
        <main className="p-6 flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;