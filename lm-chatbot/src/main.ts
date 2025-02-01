import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './app/chat/chat.component';

bootstrapApplication(ChatComponent, {
  providers: [importProvidersFrom(HttpClientModule)]
})
.catch(err => console.error(err));