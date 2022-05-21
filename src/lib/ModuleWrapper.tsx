import React from 'react'
import ReactDOM from 'react-dom/client';
import { MainComponent, KaitakuProps } from './index'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export class Kaitaku {

  feedbackUIElementId: string = 'kaitaku-feedback-ui'

  kaitakuUserIdCookieKey: string = 'kaitakuUserId'

  // Developer can specify where to render the feedback UI. Defaults to div element with id='kaitaku-feedback-ui'
  node: HTMLElement

  // Developer can specify the project configuration and callbacks
  props: KaitakuProps

  constructor(
    props: Omit<KaitakuProps, 'userId'>, // userId is defined later in the init
    node?: HTMLElement,
  ) {
    this.props = {
      userId: '', // empty if not specified
      ...props,
    }

    this.node = this.findRenderingNode(node)

    // retrieve user ID if not exist
    if (!this.props.userId) {
      const userId = this.getUserId()
      this.props.userId = userId
    }

    ReactDOM
      .createRoot(this.node)
      .render(<MainComponent {...this.props} />);
  }

  // get or create user ID
  private getUserId() {
    let userId = cookies.get(this.kaitakuUserIdCookieKey)
    if (userId) {
      return userId
    }
    return this.createAndStoreUserId()
  }

  // create a user ID if the developer has not specified.
  // store in cookie, instead of a local storage to allow domain re-use
  private createAndStoreUserId() {
    const uid = this.generateUID()

    cookies.set(
      this.kaitakuUserIdCookieKey,
      uid);

    return uid
  }

  // Generate the UID from two parts here 
  // to ensure the random number provide enough bits.
  private generateUID() {
    const firstPart = (Math.random() * 46656) | 0;
    const secondPart = (Math.random() * 46656) | 0;
    const thirdPart = (Math.random() * 46656) | 0;
    const firstPartStr = ("000" + firstPart.toString(36)).slice(-3);
    const secondPartStr = ("000" + secondPart.toString(36)).slice(-3);
    const thirdPartStr = ("000" + thirdPart.toString(36)).slice(-3);
    return firstPartStr + secondPartStr + thirdPartStr;
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
