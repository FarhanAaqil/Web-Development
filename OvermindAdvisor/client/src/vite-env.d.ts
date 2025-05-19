/// <reference types="vite/client" />

// Add module declaration for path aliases
declare module "@/*" {
  const content: any;
  export default content;
}

// For importing images
declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

// React Helmet declaration
declare module 'react-helmet' {
  import * as React from 'react';
  export class Helmet extends React.Component<any> {
    static renderStatic(): any;
  }
  export default Helmet;
}