import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const getContainer = container => {
  const _container = typeof container === 'function' ? container() : container
  return ReactDOM.findDOMNode(_container) || document.body // eslint-disable-line
}

class Portal extends Component {
  static defaultProps = {
    lockBody: true,
  }

  componentDidMount() {
    this._renderOverlay()
  }

  componentWillReceiveProps(nextProps) {
    if (this._overlayTarget && nextProps.container !== this.props.container) {
      this._portalContainerNode.removeChild(this._overlayTarget)
      this._portalContainerNode = getContainer(nextProps.container)
      this._portalContainerNode.appendChild(this._overlayTarget)
    }
  }

  componentDidUpdate() {
    this._renderOverlay()
  }

  componentWillUnmount() {
    this._unrenderOverlay()
    this._unmountOverlayTarget()
  }

  _mountOverlayTarget() {
    if (!this._overlayTarget) {
      this._overlayTarget = document.createElement('div')
      this._portalContainerNode = getContainer(this.props.container)
      this._portalContainerNode.appendChild(this._overlayTarget)
    }
  }

  _unmountOverlayTarget() {
    if (this._overlayTarget) {
      this._portalContainerNode.removeChild(this._overlayTarget)
      this._overlayTarget = null
    }
    this._portalContainerNode = null
  }

  _renderOverlay() {
    const overlay = !this.props.children
      ? null
      : React.Children.only(this.props.children)

    if (overlay !== null) {
      this._mountOverlayTarget()
      this._overlayInstance = ReactDOM.unstable_renderSubtreeIntoContainer(
        this,
        overlay,
        this._overlayTarget
      )
    } else {
      this._unrenderOverlay()
      this._unmountOverlayTarget()
    }
  }

  _unrenderOverlay() {
    if (this._overlayTarget) {
      ReactDOM.unmountComponentAtNode(this._overlayTarget)
      this._overlayInstance = null
    }
  }

  getMountNode() {
    return this._overlayTarget
  }

  getOverlayDOMNode() {
    if (!this.isMounted()) {
      // eslint-disable-line
      throw new Error(
        'getOverlayDOMNode(): A component must be mounted to have a DOM node.'
      )
    }

    if (this._overlayInstance) {
      if (this._overlayInstance.getWrappedDOMNode) {
        return this._overlayInstance.getWrappedDOMNode()
      }
      return ReactDOM.findDOMNode(this._overlayInstance) // eslint-disable-line
    }

    return null
  }

  render() {
    return null
  }
}

export default Portal