import { defineDb, defineTable, column } from 'astro:db';

const Guestbook = defineTable({
  columns: {
    author: column.text(),
    message: column.text(),
    published: column.date({ default: new Date()}),
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: { Guestbook }
});


