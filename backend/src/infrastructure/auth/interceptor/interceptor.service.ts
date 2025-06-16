import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InterceptorPort } from 'src/core/ports/auth';

@Injectable()
export class InterceptorService implements InterceptorPort {
  async checkGitHubTokenValid(accessToken: string): Promise<boolean> {
    try {
      await axios.get('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github+json',
        },
      });

      return true;
    } catch (e) {
      return false;
    }
  }
}
