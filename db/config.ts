import { defineDb, defineTable, column } from "astro:db";

const Guests = defineTable({
  columns: {
    email: column.text({ primaryKey: true }),
    name: column.text(),
    message: column.text(),
    published: column.date({ default: new Date() }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Guests },
});
