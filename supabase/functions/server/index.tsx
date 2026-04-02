import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-94d07ce3/health", (c) => {
  return c.json({ status: "ok" });
});

// Get all tasks
app.get("/make-server-94d07ce3/tasks", async (c) => {
  try {
    const tasks = await kv.getByPrefix("task:");
    return c.json({ tasks: tasks || [] });
  } catch (error) {
    console.log("Error fetching tasks:", error);
    return c.json({ error: "Failed to fetch tasks", details: String(error) }, 500);
  }
});

// Add a new task
app.post("/make-server-94d07ce3/tasks", async (c) => {
  try {
    const body = await c.req.json();
    const { id, title, points, completed, emoji } = body;
    
    if (!id || !title || typeof points !== "number") {
      return c.json({ error: "Missing required fields: id, title, points" }, 400);
    }
    
    const task = {
      id,
      title,
      points,
      completed: completed || false,
      emoji: emoji || "✅",
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`task:${id}`, task);
    return c.json({ task });
  } catch (error) {
    console.log("Error adding task:", error);
    return c.json({ error: "Failed to add task", details: String(error) }, 500);
  }
});

// Complete a task
app.post("/make-server-94d07ce3/tasks/:id/complete", async (c) => {
  try {
    const id = c.req.param("id");
    const task = await kv.get(`task:${id}`);
    
    if (!task) {
      return c.json({ error: "Task not found" }, 404);
    }
    
    const updatedTask = {
      ...task,
      completed: true,
      completedAt: new Date().toISOString(),
    };
    
    await kv.set(`task:${id}`, updatedTask);
    return c.json({ task: updatedTask });
  } catch (error) {
    console.log("Error completing task:", error);
    return c.json({ error: "Failed to complete task", details: String(error) }, 500);
  }
});

// Update a task
app.put("/make-server-94d07ce3/tasks/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { title, points, completed, emoji } = body;
    
    const existingTask = await kv.get(`task:${id}`);
    
    const updatedTask = {
      ...existingTask,
      id,
      title: title !== undefined ? title : existingTask?.title,
      points: points !== undefined ? points : existingTask?.points,
      completed: completed !== undefined ? completed : existingTask?.completed,
      emoji: emoji !== undefined ? emoji : existingTask?.emoji,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`task:${id}`, updatedTask);
    return c.json({ task: updatedTask });
  } catch (error) {
    console.log("Error updating task:", error);
    return c.json({ error: "Failed to update task", details: String(error) }, 500);
  }
});

// Delete a task
app.delete("/make-server-94d07ce3/tasks/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`task:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log("Error deleting task:", error);
    return c.json({ error: "Failed to delete task", details: String(error) }, 500);
  }
});

// Get all rewards
app.get("/make-server-94d07ce3/rewards", async (c) => {
  try {
    const rewards = await kv.getByPrefix("reward:");
    return c.json({ rewards: rewards || [] });
  } catch (error) {
    console.log("Error fetching rewards:", error);
    return c.json({ error: "Failed to fetch rewards", details: String(error) }, 500);
  }
});

// Add a new reward
app.post("/make-server-94d07ce3/rewards", async (c) => {
  try {
    const body = await c.req.json();
    const { id, title, points, claimed, emoji } = body;
    
    if (!id || !title || typeof points !== "number") {
      return c.json({ error: "Missing required fields: id, title, points" }, 400);
    }
    
    const reward = {
      id,
      title,
      points,
      claimed: claimed || false,
      emoji: emoji || "🎁",
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`reward:${id}`, reward);
    return c.json({ reward });
  } catch (error) {
    console.log("Error adding reward:", error);
    return c.json({ error: "Failed to add reward", details: String(error) }, 500);
  }
});

// Delete a reward
app.delete("/make-server-94d07ce3/rewards/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`reward:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log("Error deleting reward:", error);
    return c.json({ error: "Failed to delete reward", details: String(error) }, 500);
  }
});

// Get user points
app.get("/make-server-94d07ce3/points", async (c) => {
  try {
    const points = await kv.get("user:points") || 0;
    return c.json({ points });
  } catch (error) {
    console.log("Error fetching points:", error);
    return c.json({ error: "Failed to fetch points", details: String(error) }, 500);
  }
});

// Update user points
app.post("/make-server-94d07ce3/points", async (c) => {
  try {
    const body = await c.req.json();
    const { points } = body;
    
    if (typeof points !== "number") {
      return c.json({ error: "Invalid points value" }, 400);
    }
    
    await kv.set("user:points", points);
    return c.json({ points });
  } catch (error) {
    console.log("Error updating points:", error);
    return c.json({ error: "Failed to update points", details: String(error) }, 500);
  }
});

// Get history
app.get("/make-server-94d07ce3/history", async (c) => {
  try {
    const history = await kv.getByPrefix("history:");
    return c.json({ history: history || [] });
  } catch (error) {
    console.log("Error fetching history:", error);
    return c.json({ error: "Failed to fetch history", details: String(error) }, 500);
  }
});

// Add history item
app.post("/make-server-94d07ce3/history", async (c) => {
  try {
    const body = await c.req.json();
    const { id, type, name, points, date } = body;
    
    const historyItem = {
      id,
      type,
      name,
      points,
      date,
    };
    
    await kv.set(`history:${id}`, historyItem);
    return c.json({ historyItem });
  } catch (error) {
    console.log("Error adding history:", error);
    return c.json({ error: "Failed to add history", details: String(error) }, 500);
  }
});

// Get daily points
app.get("/make-server-94d07ce3/daily-points", async (c) => {
  try {
    const dailyPoints = await kv.getByPrefix("daily:");
    return c.json({ dailyPoints: dailyPoints || [] });
  } catch (error) {
    console.log("Error fetching daily points:", error);
    return c.json({ error: "Failed to fetch daily points", details: String(error) }, 500);
  }
});

// Update daily points
app.post("/make-server-94d07ce3/daily-points", async (c) => {
  try {
    const body = await c.req.json();
    const { date, points } = body;
    
    await kv.set(`daily:${date}`, { date, points });
    return c.json({ success: true });
  } catch (error) {
    console.log("Error updating daily points:", error);
    return c.json({ error: "Failed to update daily points", details: String(error) }, 500);
  }
});

// Get special reward count
app.get("/make-server-94d07ce3/special-reward-count", async (c) => {
  try {
    const count = await kv.get("special:reward:count") || 0;
    return c.json({ count });
  } catch (error) {
    console.log("Error fetching special reward count:", error);
    return c.json({ error: "Failed to fetch special reward count", details: String(error) }, 500);
  }
});

// Update special reward count
app.post("/make-server-94d07ce3/special-reward-count", async (c) => {
  try {
    const body = await c.req.json();
    const { count } = body;
    
    await kv.set("special:reward:count", count);
    return c.json({ count });
  } catch (error) {
    console.log("Error updating special reward count:", error);
    return c.json({ error: "Failed to update special reward count", details: String(error) }, 500);
  }
});

Deno.serve(app.fetch);