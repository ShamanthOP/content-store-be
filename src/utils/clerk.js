import { createClerkClient } from "@clerk/clerk-sdk-node";

const clerk = createClerkClient({
    apiKey: process.env.CLERK_API_KEY,
});

export default clerk;
