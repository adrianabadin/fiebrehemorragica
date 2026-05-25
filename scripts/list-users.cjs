const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
p.user.findMany({ select: { id: true, username: true, role: true } })
  .then(r => { console.log(JSON.stringify(r, null, 2)); return p.$disconnect(); })
  .catch(e => { console.error(e); return p.$disconnect(); });
