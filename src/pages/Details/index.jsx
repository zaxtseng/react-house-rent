import React from 'react'
import DetailsData from './DetailsData'

export default class Details extends React.Component {
    render(){
        return (
            <div>
                <DetailsData id={this.props.match.params.id} history={ this.props.history }/>
            </div>
        )
    }
}