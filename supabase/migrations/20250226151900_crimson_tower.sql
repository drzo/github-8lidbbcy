/*
  # Fix RLS policies for users table
  
  1. Changes
    - Add RLS policy for anonymous users to insert data
    - Add RLS policy for anonymous users to read data
    - Keep existing policy for authenticated users
  
  2. Security
    - Enable RLS on users table
    - Anonymous users can only insert new users
    - Anonymous users can read all users
    - Authenticated users can only read their own data
*/

-- Add policy for anonymous inserts
CREATE POLICY "Anyone can insert users"
  ON users
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Add policy for anonymous reads  
CREATE POLICY "Anyone can read users"
  ON users
  FOR SELECT
  TO anon
  USING (true);