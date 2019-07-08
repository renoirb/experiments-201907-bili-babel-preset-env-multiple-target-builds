declare module '*package.json' {
  // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/package-json/index.d.ts

  export const name: string;

  export const version: string;

  export const description: string;

  export const bundleDependencies: { [name: string]: string };

  export const dependencies: { [name: string]: string };

  export const devDependencies: { [name: string]: string };

  export const optionalDependencies: { [name: string]: string };

  export const peerDependencies: { [name: string]: string };

  export interface Repository {
    registry: string;
    access: string;
  }

  export interface PublishConfig {
    type: string;
    url?: string;
  }

  export const repository: Repository;

  export const publishConfig: PublishConfig;
}

declare module '*.json' {
  const json: any;
  export = json;
}
