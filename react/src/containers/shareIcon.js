import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TumblrShareButton,
  TumblrIcon,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";
import PropTypes from "prop-types";
import "../scss/share.scss";

export default class ShareIcon extends React.Component {
  static propTypes = {
    url: PropTypes.string,
	children: PropTypes.string,
	title: PropTypes.string
  };

  render() {
    return (
      <div className="share-container">
        <p className="share-text">
          Share your event via different social channels.
        </p>
        <div className="shareBtnWrap">
          <FacebookShareButton title={this.props.title} url={this.props.url}>
            {" "}
            <span className="share-icon">
              <FacebookIcon size={32} round={true} />
            </span>
          </FacebookShareButton>
          <TwitterShareButton title={this.props.title} url={this.props.url}>
            <span className="share-icon">
              <TwitterIcon size={32} round={true} />
            </span>
          </TwitterShareButton>
          <WhatsappShareButton title={this.props.title} url={this.props.url}>
            {" "}
            <span className="share-icon">
              <WhatsappIcon size={32} round={true} />
            </span>
          </WhatsappShareButton>
          <TumblrShareButton title={this.props.title} url={this.props.url}>
            {" "}
            <span className="share-icon">
              <TumblrIcon size={32} round={true} />
            </span>
          </TumblrShareButton>
        </div>
      </div>
    );
  }
}
