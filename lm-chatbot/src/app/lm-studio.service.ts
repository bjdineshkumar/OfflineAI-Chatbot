import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.private'; // Path to your environment


@Injectable({
  providedIn: 'root'
})
export class LmStudioService {
  private apiUrl = environment.lmStudioApiUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    
    // 'Authorization': `Bearer ${environment.lmStudioApiKey}` // If you enabled security in LM Studio - use this
  });

  constructor(private http: HttpClient) { }

  public sendMessage(userMessage: string): Observable<any> {
    const payload = {
      model: 'lmstudio-community/DeepSeek-R1-Distill-Qwen-7B-GGUF',  // Must match model name in LM Studio what you are using in your local machine
      messages: [{
        role: 'user',
        content: userMessage
      }],
      temperature: 0.7
    };

    return this.http.post(this.apiUrl, payload, { headers: this.headers });
  }
}