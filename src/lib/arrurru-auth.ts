export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'manager' | 'staff';
}

export interface Invitation {
  email: string;
  token: string;
  expiresAt: string;
}

const ADMIN_PASSWORD = 'marico2025arrurru';
const STORAGE_KEYS = {
  USERS: 'arrurru_users',
  INVITATIONS: 'arrurru_invitations',
  SESSION: 'arrurru_session',
  CURRENT_USER: 'arrurru_current_user'
};

export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const generateToken = (): string => {
  return crypto.randomUUID();
};

export const createInvitation = async (email: string, adminPassword: string): Promise<{ success: boolean; inviteUrl?: string; error?: string }> => {
  if (adminPassword !== ADMIN_PASSWORD) {
    return { success: false, error: 'Неверный пароль администратора' };
  }

  const invitations = JSON.parse(localStorage.getItem(STORAGE_KEYS.INVITATIONS) || '[]') as Invitation[];
  
  const existingIndex = invitations.findIndex(inv => inv.email === email.toLowerCase());
  
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  
  const newInvitation: Invitation = {
    email: email.toLowerCase(),
    token,
    expiresAt
  };
  
  if (existingIndex >= 0) {
    invitations[existingIndex] = newInvitation;
  } else {
    invitations.push(newInvitation);
  }
  
  localStorage.setItem(STORAGE_KEYS.INVITATIONS, JSON.stringify(invitations));
  
  const inviteUrl = `${window.location.origin}/arrurru/register?token=${token}`;
  
  return { success: true, inviteUrl };
};

export const register = async (token: string, email: string, password: string, fullName: string): Promise<{ success: boolean; user?: User; error?: string }> => {
  const invitations = JSON.parse(localStorage.getItem(STORAGE_KEYS.INVITATIONS) || '[]') as Invitation[];
  
  const invitation = invitations.find(inv => 
    inv.token === token && 
    inv.email === email.toLowerCase() &&
    new Date(inv.expiresAt) > new Date()
  );
  
  if (!invitation) {
    return { success: false, error: 'Приглашение недействительно или истекло' };
  }
  
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]') as (User & { passwordHash: string })[];
  
  if (users.find(u => u.email === email.toLowerCase())) {
    return { success: false, error: 'Пользователь уже зарегистрирован' };
  }
  
  const passwordHash = await hashPassword(password);
  
  const newUser: User & { passwordHash: string } = {
    id: crypto.randomUUID(),
    email: email.toLowerCase(),
    passwordHash,
    fullName,
    role: 'manager'
  };
  
  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  
  const updatedInvitations = invitations.filter(inv => inv.token !== token);
  localStorage.setItem(STORAGE_KEYS.INVITATIONS, JSON.stringify(updatedInvitations));
  
  const sessionToken = generateToken();
  localStorage.setItem(STORAGE_KEYS.SESSION, sessionToken);
  
  const userWithoutHash: User = {
    id: newUser.id,
    email: newUser.email,
    fullName: newUser.fullName,
    role: newUser.role
  };
  
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutHash));
  
  return { success: true, user: userWithoutHash };
};

export const login = async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]') as (User & { passwordHash: string })[];
  
  const passwordHash = await hashPassword(password);
  
  const user = users.find(u => 
    u.email === email.toLowerCase() && 
    u.passwordHash === passwordHash
  );
  
  if (!user) {
    return { success: false, error: 'Неверный email или пароль' };
  }
  
  const sessionToken = generateToken();
  localStorage.setItem(STORAGE_KEYS.SESSION, sessionToken);
  
  const userWithoutHash: User = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role
  };
  
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutHash));
  
  return { success: true, user: userWithoutHash };
};

export const logout = (): void => {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

export const getCurrentUser = (): User | null => {
  const sessionToken = localStorage.getItem(STORAGE_KEYS.SESSION);
  if (!sessionToken) return null;
  
  const userJson = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson) as User;
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(STORAGE_KEYS.SESSION) && !!getCurrentUser();
};
