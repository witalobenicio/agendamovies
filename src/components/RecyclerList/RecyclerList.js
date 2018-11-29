/* @flow */
/* eslint-disable no-restricted-globals,prefer-const,no-bitwise */
import React, { Component } from 'react';

const EVENT_OPTS = {
  passive: true,
  capture: true,
};

type Props = {
  overscan: number,
  rowHeight: number,
  defaultRowHeight: number,
  gridCount: number,
  onLoadMore: () => void,
}

class ScrollViewport extends Component<Props, void> {
  state = {
    offset: 0,
    height: 0,
  };

  componentDidMount() {
    this.resized(window);
    this.scrolled(window);
    window.addEventListener('resize', this.resized, EVENT_OPTS);
    window.addEventListener('scroll', this.scrolled, EVENT_OPTS);
  }

  componentDidUpdate() {
    this.resized();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resized, EVENT_OPTS);
    window.removeEventListener('scroll', this.scrolled, EVENT_OPTS);
  }

  resized = () => {
    const height = window.innerHeight || document.documentElement.offsetHeight;
    if (height !== this.state.height) {
      this.setState({ height });
    }
  };

  scrolled = () => {
    const offset = Math.max(
      0,
      (this.base && -this.base.getBoundingClientRect().top) || 0,
    );
    this.setState({ offset });
    if (this.props.sync) this.forceUpdate();
    if (this.props.children && this.props.children.length) {
      const bottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
      if (bottom && this.props.onLoadMore) {
        this.props.onLoadMore();
      }
    }
  };

  computeRowHeight() {
    if (this.height) return this.height;
    const first =
      this.base &&
      this.base.firstElementChild &&
      this.base.firstElementChild.firstElementChild;
    // eslint-disable-next-line no-return-assign
    return (this.height = (first && first.offsetHeight) || 0);
  }

  render() {
    let {
      overscan = 10,
      rowHeight,
      defaultRowHeight,
      children,
      gridCount,
      ...props
    } = this.props;
    const { offset = 0, height = 0 } = this.state;
    rowHeight = rowHeight || this.computeRowHeight() || defaultRowHeight || 100;

    // compute estimated height based on first item height and number of items:
    const estimatedHeight = rowHeight * children.length;
    if (typeof props.style === 'string') {
      props.style += ` height:${estimatedHeight}px;`;
    } else {
      (props.style || (props.style = {})).height =
        `${estimatedHeight.toExponential()}px`;
    }

    let start = 0;
    let visibleRowCount = gridCount;

    if (rowHeight) {
      // first visible row index
      start = (offset / rowHeight) | 0;

      // actual number of visible rows (without overscan)
      visibleRowCount = (height / rowHeight) | 0;

      // Overscan: render blocks of rows modulo an overscan row count
      // This dramatically reduces DOM writes during scrolling
      if (overscan) {
        start = Math.max(0, start - (start % overscan));
        visibleRowCount += overscan;
      }
    }

    // last visible + overscan row index
    const end = start + 1 + visibleRowCount;

    // children currently in viewport plus overscan items
    const visible = children.slice(start, end);

    return (
      <div
        {...props}
        ref={base => {
          this.base = base;
        }}
      >
        <div style={{
          position: 'relative',
          top: start * rowHeight,
          paddingBottom: 70,
          // display: 'flex',
          // flexWrap: 'wrap',
        }}
        >
          {visible}
        </div>
      </div>
    );
  }
}

ScrollViewport.defaultProps = {
  gridCount: 1,
};

export default ScrollViewport;
