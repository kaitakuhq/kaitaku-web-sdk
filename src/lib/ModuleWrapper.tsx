import React from 'react'
import ReactDOM from 'react-dom/client';
import { MainComponent, KaitakuProps } from './index'

export class Kaitaku {

  feedbackUIElementId: string = 'kaitaku-feedback-ui'

  // Developer can specify where to render the feedback UI. Defaults to div element with id='kaitaku-feedback-ui'
  node: HTMLElement

  // Developer can specify the project configuration and callbacks
  props: KaitakuProps

  constructor(props: KaitakuProps, node?: HTMLElement) {
    this.props = props

    this.node = this.findRenderingNode(node)

    ReactDOM
      .createRoot(this.node)
      .render(<MainComponent {...this.props} />);
  }

  private findRenderingNode(node?: HTMLElement) {
    let fmtNode = node
    if (!fmtNode) {
      // prevent creating two elements
      let prevElement = document.getElementById(this.feedbackUIElementId)
      if (prevElement) {
        return prevElement
      }
      // create a place to render this element
      var elem = document.createElement('div');
      elem.id = this.feedbackUIElementId
      elem.className = 'kt-fixed kt-bottom-5 kt-right-5 kt-w-[400px] kt-h-[460px] kt-z-50'
      document.body.appendChild(elem);
      fmtNode = elem
    }
    return fmtNode
  }

  showFeedbackButton() {
    const newProps = {
      ...this.props,
      showFeedbackButton: true,
    }
    ReactDOM
      .createRoot(this.node)
      .render(<MainComponent {...newProps} />);
  }

  hideFeedbackButton() {
    const newProps = {
      ...this.props,
      showFeedbackButton: false,
    }
    ReactDOM
      .createRoot(this.node)
      .render(<MainComponent {...newProps} />);
  }

  showFeedbackUI() {
    const newProps = {
      ...this.props,
      showFeedbackUI: true,
    }
    ReactDOM
      .createRoot(this.node)
      .render(<MainComponent {...newProps} />);
  }

  hideFeedbackUI() {
    const newProps = {
      ...this.props,
      showFeedbackUI: false,
    }
    ReactDOM
      .createRoot(this.node)
      .render(<MainComponent {...newProps} />);
  }
}


declare global {
  interface Window { Kaitaku?: typeof Kaitaku; }
}

window.Kaitaku = Kaitaku
