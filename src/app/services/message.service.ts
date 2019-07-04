import { Injectable } from '@angular/core';

// Correspond to CSS classes
export enum Level {
  Info,
  Success,
  Warning,
  Danger,
}
export class Message {
  constructor(
    public level: Level,
    public text: string,
  ) { }
  levelString(): string {
    return Level[this.level].toLowerCase();
  }
  levelIcon(): string {
    switch (this.level) {
      case Level.Info: {
        return "check-circle";
        break;
      }
      case Level.Success: {
        return "info-circle";
        break;
      }
      case Level.Warning: {
        return "exclamation-circle";
        break;
      }
      case Level.Danger: {
        return "bomb";
        break;
      }
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];

  add(message: Message) {
    // Do not repeat messages
    for (let m of this.messages) {
      if (m.text == message.text && m.level == message.level) return;
    }
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
