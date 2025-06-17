import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InterceptorPort } from 'src/core/ports/auth';

@Injectable()
export class InterceptorService implements InterceptorPort {
  async checkGitHubTokenValid(accessToken: string): Promise<string | null> {
    try {
      const { data: gitHubEmails } = await axios.get(
        'https://api.github.com/user/emails',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/vnd.github+json',
          },
        },
      );

      return gitHubEmails[0].email;
    } catch (e) {
      return null;
    }
  }

  async checkGoogleTokenValid(accessToken: string): Promise<string | null> {
    try {
      const { data: googleData } = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return googleData.email;
    } catch (e) {
      return null;
    }
  }
}
