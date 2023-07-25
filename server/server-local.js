'use strict';
const app = require('./functions/api');

// Start Server.
let port = 5000;
app.listen(port, function () {
    console.log(`Server started on port ${port}...`);
});
