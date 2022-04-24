import React from 'react'
import ReactDOM from 'react-dom/client';
import { Hello } from './components/Main'
export * from './components/Main';

export default function init(node: any) {
  ReactDOM
    .createRoot(node)
    .render(<Hello />);
}

// @ts-ignore
window.initMyThing = init
