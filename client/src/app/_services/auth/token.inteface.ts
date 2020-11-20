export interface TokenServiceInterface {
  
    signOut(): void;
    saveToken(token: string): void;
    isLogin(): boolean;
    getToken(): string;
}
