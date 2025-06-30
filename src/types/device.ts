
export interface Device {
  id: string;
  name: string;
  model: string;
  macAddress: string; // Formato: XX:XX:XX:XX:XX:XX
  location: string;
  status: 'online' | 'offline';
  qrHash: string; // Hash único para o QR code
  lastActivity: Date;
  manufacturer?: string;
  type: string;
  description?: string;
}

export interface AccessLog {
  id: string;
  deviceId: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  scannedBy?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'technician' | 'viewer';
}
