import React, { Component } from 'react';
import uuid from 'uuid';

// Generic checkbox + label component, so we can easily do nice checkbox styling
export default class LabelledCheckbox extends Component {
    render() {
        var id = this.props.id || uuid.v4();
        return (
            <div className={ "labelledCheckbox " + (this.props.className || "") }>
                <input type="checkbox"
                       id={ id }
                       checked={ this.props.value }
                       onChange={ this.props.onChange }/>
                <label htmlFor={ id } >
                       { this.props.label }
                </label>
            </div>
        );
    }
}

LabelledCheckbox.propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func,
    label: React.PropTypes.oneOfType([React.PropTypes.string,
                                    React.PropTypes.element])
};
