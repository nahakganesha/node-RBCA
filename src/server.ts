import app from "./app";
import connection from "./model/Index";
const PORT = process.env.PORT || 7000;

(async () => {
    await connection.sync();
    app.listen(PORT, async () => {
        console.log(`Server running on port ${PORT}`);
    });
})();
