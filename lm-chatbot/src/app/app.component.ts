import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

// Import additional components if needed
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ChatComponent],
  template: `<app-chat></app-chat>`,
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}
