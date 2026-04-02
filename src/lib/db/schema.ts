import { pgTable, text, timestamp, uuid, boolean, integer, unique } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    username: text('username').notNull().unique(),
    email: text('email').unique().notNull(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    avatarUrl: text('avatar_url'),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
})

export const posts = pgTable('posts', {
    postId: uuid('id').defaultRandom().primaryKey(),
    authorId: uuid('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    content: text('content').notNull(),
    dotsCount: integer('dots_count').notNull().default(0),
    isPublic: boolean('is_public').notNull().default(false),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
})

export const comments = pgTable('comments', {
    id: uuid('id').defaultRandom().primaryKey(),
    postSlug: text('post_slug').notNull().references(() => posts.slug, { onDelete: 'cascade' }),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    userName: text('user_name').notNull().references(() => users.username, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    content: text('comment').notNull()
})

export const dots = pgTable('dots', {
    id: uuid('id').defaultRandom().primaryKey(),
    postId: uuid('post_id').notNull().references(() => posts.postId, { onDelete: 'cascade' }),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow()
}, (table) => ({
    uniqueDot: unique().on(table.postId, table.userId)
}))