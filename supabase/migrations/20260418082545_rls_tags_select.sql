CREATE POLICY "tags_select" ON tags
  FOR SELECT USING (auth.uid() = author_id);