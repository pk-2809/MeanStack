const express = require('express');

const app = express();
const PORT = 3000;

app.use('/comments', (req, res, next) => {
    
    const comments = [
        { id: '101', name: 'XYZ', comment: 'This is my favourite food.' },
        { id: '102', name: 'PQR', comment: 'This is my another favourite food.' }
    ];
    res.status(200).json({
        status: true,
        data:comments
    });
});







app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
});