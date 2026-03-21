import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core'


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
    id: uuid('id').defaultRandom().primaryKey(),
    postId: uuid('post_id').defaultRandom().notNull(),
    authorId: uuid('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    content: text('content').notNull(),
    isPublic: boolean('is_public').notNull().default(false),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(
        () => new Date()
    ),

})


export const comments = pgTable('comments', {
    id: uuid('id').primaryKey(),
    postId: uuid('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow()
})

export const dots = pgTable('dots', {
    id: uuid('id').primaryKey(),
    postId: uuid('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow()
})

