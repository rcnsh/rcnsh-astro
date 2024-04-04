import { defineDb, defineTable, column, NOW } from "astro:db";

const Guests = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    email: column.text(),
    name: column.text(),
    message: column.text(),
    published: column.date({ default: NOW }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Guests },
});
