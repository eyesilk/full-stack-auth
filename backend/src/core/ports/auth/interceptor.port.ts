export interface InterceptorPort {
  checkGitHubTokenValid(accessToken: string): Promise<string | null>;
  checkGoogleTokenValid(accessToken: string): Promise<string | null>;
}
