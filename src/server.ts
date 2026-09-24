import dotenv = require("dotenv");

dotenv.config();

import app = require("./app");

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});