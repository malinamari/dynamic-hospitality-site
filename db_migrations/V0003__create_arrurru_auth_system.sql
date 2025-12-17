-- Таблица пользователей ARRURRU
CREATE TABLE IF NOT EXISTS arrurru_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'manager',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица приглашений
CREATE TABLE IF NOT EXISTS arrurru_invitations (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL
);

-- Таблица сессий
CREATE TABLE IF NOT EXISTS arrurru_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица контента кабинета ARRURRU
CREATE TABLE IF NOT EXISTS arrurru_content (
  id SERIAL PRIMARY KEY,
  section VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT,
  parent_id INTEGER,
  order_index INTEGER DEFAULT 0,
  files JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_sessions_token ON arrurru_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_invitations_token ON arrurru_invitations(token);
CREATE INDEX IF NOT EXISTS idx_content_section ON arrurru_content(section);
CREATE INDEX IF NOT EXISTS idx_content_slug ON arrurru_content(slug);
