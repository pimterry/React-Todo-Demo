import React, { Component } from 'react';
import uuid from 'uuid';

export default class LabelledCheckbox extends Component {
    render() {
        var id = this.props.id || uuid.v4();
        return (
            <div className={ "labelledCheckbox " + (this.props.className || "") }>
                <input type="checkbox"
                       id={ id }
                       value={ this.props.value }
                       onChange={ this.props.onChange }
                       onClick={(e) => e.stopPropagation()} />
                <label htmlFor={ id }
                       onClick={(e) => e.stopPropagation()} >
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
