export interface InterceptorPort {
  checkGitHubTokenValid(accessToken: string): Promise<boolean>;
}
