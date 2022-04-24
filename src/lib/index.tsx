import React from 'react'
import ReactDOM from 'react-dom/client';
import { Kaitaku, } from './components/Main'
import { KaitakuProps } from './types/types';
export * from './components/Main';

export default function init(node: any, props: KaitakuProps) {
  ReactDOM
    .createRoot(node)
    .render(<Kaitaku {...props} />);
}

// @ts-ignore
window.initMyThing = init
