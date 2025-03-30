/*
  # Initial schema setup
  
  1. New Tables
    - `users`
      - `id` (uuid, primary key) - User's unique identifier
      - `email` (text, unique) - User's email address
      - `created_at` (timestamptz) - When the user was created
  
  2. Security
    - Enable RLS on users table
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);