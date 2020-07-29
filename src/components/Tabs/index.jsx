import React from "react"
import "./style.less"

export default class Tabs extends React.Component {
    constructor(){
        super()
        this.state = {
            currentIndex: 0
        }
    }

    check_title_index = index=>{
        return index === this.state.currentIndex ? "Tab_title active" : "Tab_title"
    }
    check_item_index = index=>{
        return index === this.state.currentIndex ? "show" : "hide"
    }
    tabHandler(index){
        this.setState({
            currentIndex: index
        })
    }

    render() {  
        return (
            <div>
                <div className="Tab_title_wrap">
                    {
                        React.Children.map(this.props.children, (element,index)=>{
                            return(
                                <div className={this.check_title_index(index)} 
                                onClick={this.tabHandler.bind(this,index)}>
                                    {element.props.tabname}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="Tab_item_wrap">
                    {
                        React.Children.map(this.props.children, (element,index)=>{
                            return(
                                <div className={this.check_item_index(index)} >
                                    {element.props.children}
                                </div>
                            )
                        })
                    }
                </div>
            </div>            
        )
    }
}
