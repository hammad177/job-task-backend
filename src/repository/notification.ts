import { Request, Response, Application } from "express";

class Notification {
  private clients: { userId: string; res: Response }[] = []; // Using array instead of Map

  constructor(private app: Application, route: string) {
    this.setupSseRoutes(route);
  }

  // Middleware to handle SSE headers
  private sseHeaders(req: Request, res: Response, next: Function) {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders(); // Make sure headers are sent immediately
    next();
  }

  // SSE endpoint to allow clients to subscribe
  private subscribeToSse(req: Request, res: Response) {
    const userId = req.params.userId;

    // Store the client response object for further notifications
    this.clients.push({ userId, res });

    console.log(`Client with userId ${userId} connected.`);

    // Send an initial message to confirm the connection
    res.write(`data: Connected to SSE stream\n\n`);

    // Handle client disconnection
    req.on("close", () => {
      console.log(`Client with userId ${userId} disconnected.`);
      this.clients = this.clients.filter((client) => client.userId !== userId); // Remove client when disconnected
      res.end();
    });
  }

  // Setup the SSE routes
  private setupSseRoutes(route: string) {
    this.app.use(
      `/api/${route}`,
      (req: Request, res: Response, next: Function) =>
        this.sseHeaders(req, res, next)
    );

    // Endpoint to subscribe clients to SSE
    this.app.get(`/api/${route}/:userId`, (req: Request, res: Response) =>
      this.subscribeToSse(req, res)
    );
  }

  // Send notification to a specific user
  public sendNotificationToUser(userId: string, message: any) {
    const client = this.clients.find((c) => c.userId === userId);
    if (client) {
      client.res.write(`data: ${JSON.stringify(message)}\n\n`);
    }
  }

  // Send notification to specific users
  public sendNotificationToUsers(userIds: string[], message: any) {
    userIds.forEach((userId) => {
      this.sendNotificationToUser(userId, message);
    });
  }

  // Send notification to all users
  public sendNotificationToAll(message: any) {
    this.clients.forEach((client) => {
      client.res.write(`data: ${JSON.stringify(message)}\n\n`);
    });
  }
}

export default Notification;
