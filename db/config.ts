import { defineDb, defineTable, column } from "astro:db";

const Guestbook = defineTable({
  columns: {
    email: column.text({ primaryKey: true }),
    message: column.text(),
    published: column.date({ default: new Date() }),
  },
});

const Guests = defineTable({
  columns: {
    email: column.text({ primaryKey: true }),
    message: column.text(),
    published: column.date({ default: new Date() }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Guestbook, Guests },
});
