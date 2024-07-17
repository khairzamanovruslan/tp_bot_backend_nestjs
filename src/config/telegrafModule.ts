import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';

const sessions = new LocalSession({ database: 'session_db.json' });

export function telegrafModule() {
  return TelegrafModule.forRoot({
    middlewares: [sessions.middleware()],
    token: process.env.TOKEN_TG,
  });
}
