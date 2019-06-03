import {
    READ_YOUR_GRAPH,READ_GRAPHS
} from '../actions'

  
const initialState = {
    graph_results: []
}
  
export default (state = initialState, action) => {
    switch (action.type){
        case READ_YOUR_GRAPH:
            return {
                graph_results: action.graph_results
            }
        case READ_GRAPHS:
            return {
                graph_results: action.graph_results
            }
        default:
            return state
    }
}
