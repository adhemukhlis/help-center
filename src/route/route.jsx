import React, {Component} from 'react';
import {DisableReactDevTools} from '../lib/devtool-killer'
import {devmode} from "../config/config";
import {get_gps_location} from '../lib/gps'
import BaseLayout from "./base";
import {initGlobalState} from '../global-state/global-state'
initGlobalState()
class Route extends Component {
    componentDidMount() {
        DisableReactDevTools(!devmode)
        get_gps_location((pos) => console.log(pos.coords.latitude))
    }
    render() {
        return (<BaseLayout/>)
    }
}
export default Route;
