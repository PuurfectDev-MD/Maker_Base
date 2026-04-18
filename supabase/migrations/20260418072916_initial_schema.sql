
-- POSTS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "posts_select" ON posts
  FOR SELECT USING (
    auth.uid() = author_id OR is_public = true
  );

CREATE POLICY "posts_insert" ON posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

-- COMMENTS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "comments_insert" ON comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- DOTS
ALTER TABLE dots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "dots_insert" ON dots
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- TAGS
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tags_insert" ON tags
  FOR INSERT WITH CHECK (auth.uid() = author_id);