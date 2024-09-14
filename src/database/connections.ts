import mongoose, { connect } from "mongoose"

import { DB_BLOG_URL } from "src/config"

const handleDisconnected = () => console.log("[MONGODB] Database connection lost, reconnecting...")
const handleReconnected = () => console.log("[MONGODB] Database reconnection complete.")

export async function Connection(): Promise<void> {
  await mongoose
    .connect(DB_BLOG_URL)
    .then((db) => {
      console.log("| DATABASE: " + DB_BLOG_URL + " |")
      db.connection.on("disconnected", handleDisconnected)
      db.connection.on("reconnected", handleReconnected)
      //   mongoose.connection.db.collection("blogs").insertOne({ title: "Teste" })
    })
    .catch((err) => console.log("\n| Error on database connection |\n", err))
}
