import {
    READ_GRAPH
} from '../actions'

  
const initialState = {
    graph_results: []
}
  
export default (state = initialState, action) => {
    switch (action.type){
        case READ_GRAPH:
            return {
                graph_results: action.graph_results
            }
        default:
            return state
    }
}
