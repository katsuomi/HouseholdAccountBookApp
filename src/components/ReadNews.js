import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {readNews} from "../actions";
import Typography from '@material-ui/core/Typography';


class ReadNews extends Component {
    constructor(props){
        super(props)
        this.goNewsUrl = this.goNewsUrl.bind(this)
    }

    componentDidMount(){
        this.props.readNews()
    }

    goNewsUrl(url){
        window.open(url,'_blank')
    }

    renderNews(){
        return this.props.news.map((article, i) => (
            <div key={i}>
                <Card onClick={() => {this.goNewsUrl(article.url)} }>
                    <CardActionArea>
                        <CardContent>
                            <Typography color="primary" variant="h5" component="h2">
                                {article.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {article.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <br/>
            </div>
        ))
    }

    render(){
        return (
            <div>
                <h2>お金を稼ぐ為のニュース</h2>
                {this.renderNews()}
            </div>
        );
    }
}


const mapDispatchToProps = ({readNews  })

const mapStateToProps = state => ({news: state.news.news })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadNews))


