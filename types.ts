export enum RiskLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical'
}

export interface UserRiskProfile {
  id: string;
  name: string;
  department: string;
  role: string;
  riskScore: number; // 0-100
  phishingRisk: string; // "Yes" or "No"
  anomaliesDetected: number;
  lastActivity: string;
  email: string;
  avatarUrl: string;
}

export interface RiskEventLog {
  id: string;
  user: string;
  event: string; // e.g., "Phishing email clicked"
  riskLevel: number; // Score impact
  date: string;
  timeAgo: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  event: string;
  type: 'phishing' | 'device' | 'access' | 'behavior';
  isCritical?: boolean;
}

export interface DepartmentStat {
  name: string;
  riskScore: number;
}

export interface Anomaly {
  id: string;
  type: 'Behavior' | 'Phishing' | 'Access';
  description: string;
  date: string;
  severity: RiskLevel;
}

export enum Page {
  Dashboard = 'Dashboard',
  RiskProfile = 'Risk Profile',
  RiskEvents = 'Risk Events',
  TeamRisk = 'Team Risk',
  PhishingSimulation = 'Phishing Simulation',
  BehavioralAnalytics = 'Behavioral Analytics',
  AccessMonitoring = 'Access Monitoring',
  Remediation = 'Remediation',
  OrganizationOverview = 'Organization Overview'
}