import React, { Component } from 'react';

import Icon from './Icon';
import LabelledCheckbox from './LabelledCheckbox';

export default class CollapsibleBlock extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { collapsed: false };
    }

    handleToggleCollapsed(event) {
        this.setState({ collapsed: !this.state.collapsed });
    }

    render() {
        return (
            <div className="collapsable">
                <LabelledCheckbox
                 label={( <Icon fa={ this.state.collapsed ? "caret-right" : "caret-down" } /> )}
                 onChange={this.handleToggleCollapsed.bind(this)} />
                { this.state.collapsed ? null : this.props.children}
            </div>
        );
    }
}
