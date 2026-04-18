-- POSTS
CREATE POLICY "posts_update" ON posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "posts_delete" ON posts
  FOR DELETE USING (auth.uid() = author_id);

-- COMMENTS
CREATE POLICY "comments_select" ON comments
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "comments_delete" ON comments
  FOR DELETE USING (auth.uid() = user_id);

-- DOTS
CREATE POLICY "dots_select" ON dots
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- USERS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select" ON users
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- TAGS
CREATE POLICY "tags_delete" ON tags
  FOR DELETE USING (auth.uid() = author_id);