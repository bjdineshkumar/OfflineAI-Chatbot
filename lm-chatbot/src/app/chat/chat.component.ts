import { Component, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LmStudioService } from '../lm-studio.service';
import { Message } from './message.model';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked {
  userMessage: string = '';
  messages: Message[] = [];

  constructor(
    private lmStudioService: LmStudioService
  ) {}

  particles = Array(15).fill(null).map(() => ({
    size: Math.random() * 40 + 20,
    left: Math.random() * 100,
    delay: Math.random() * 10
  }));

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      const element = this.messagesContainer.nativeElement;
      const shouldScroll = element.scrollTop + element.clientHeight >= element.scrollHeight - 100;
      
      if (shouldScroll) {
        setTimeout(() => {
          element.scrollTop = element.scrollHeight;
        }, 100);
      }
    } catch(err) { }
  }

  sendMessage(): void {
    if (!this.userMessage.trim()) {
      return;
    }

    this.messages.push({
      sender: 'User',
      text: this.userMessage,
      timestamp: new Date()
    });

    this.lmStudioService.sendMessage(this.userMessage).subscribe({
      next: (response: any) => {
        const rawContent = response.choices[0].message.content;
        const cleanContent = rawContent.replace(/<think>.*?<\/think>/gs, ''); // Sanitize the input to not include what DeepSeek Thinks ( Remove it to see what it thinks)
        
        this.messages.push({ 
          sender: 'Bot', 
          text: cleanContent,
          timestamp: new Date()
        });
      }
    });
    setTimeout(() => this.scrollToBottom(), 200);

    this.userMessage = '';
  }
}
