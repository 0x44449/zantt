export namespace Autho {
  export interface Client {
    clientId: string;
    clientName: string;
    clientSecret: string;
    allowRedirectUri: string;
    allowGrantTypes: string[];
    scopes: string[];
    jwks: string;
    jwksUri: string;
  }
}