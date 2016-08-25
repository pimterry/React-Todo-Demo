import React, { Component } from 'react';
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
        var label = (<i className={ "fa " + (this.state.collapsed ?
                                             "fa-caret-right" :
                                             "fa-caret-down") } />);
        return (
            <div className="collapsable">
                <LabelledCheckbox
                 label={ label }
                 onChange={this.handleToggleCollapsed.bind(this)} />
                { this.state.collapsed ? null : this.props.children}
            </div>
        );
    }
}
