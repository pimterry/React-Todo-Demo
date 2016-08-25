import React, { Component } from 'react';

// A quick wrapper to make using font-awesome elsewhere a little neater
export default class Icon extends Component {
    render() {
        return (
            <i className={"fa fa-" + this.props.fa}/>
        );
    }
}

Icon.propTypes = {
    fa: React.PropTypes.string.isRequired,
};
