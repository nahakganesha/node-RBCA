import { createClient } from "redis";

const client = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : undefined
    },
    password: process.env.REDIS_PASSWORD || undefined
});

client.on("error", (err: any) => {
    console.error("❌ Redis Error:", err);
});

const connectRedis = async () => {
    try {
        await client.connect();
        console.log("✅ Redis Connected");
    } catch (error) {
        console.error("❌ Redis Connection Failed:", error);
    }
};

export { client, connectRedis };
