import App from "./app";

const PORT = process.env.PORT ?? 3000;

async function start(): Promise<void> {
  try {
    const appInstance = new App();
    await appInstance.initialize();

    const app = appInstance.getApp();

    app.listen(PORT, () => {
      console.log(`Server run on http://127.0.0.1:${PORT} ✅📌`);
    });
  } catch (error) {
    console.error("Error to start server:", error);
  }
}


console.log(process.env)

start();