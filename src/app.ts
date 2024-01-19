import { Elysia } from "elysia";
import { featureSwitch} from "./plugins/featureSwitch";
import { pageLock } from "./plugins/pageLock";

const app = new Elysia()
app.use(pageLock);
app.use(featureSwitch);
app.listen(3000)

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
