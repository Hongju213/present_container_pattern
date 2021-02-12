/* eslint-disable import/no-anonymous-default-export */
import React, { Component } from "react";
import { moviesApi, tvApi } from "../../api";
import DetailPresenter from "./DetailPresenter";

export default class extends Component {
    constructor(props){
        super(props);
        const {location: { pathname }} = props;
        this.state = {
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/")
        };
    }

    //TODO: 로직 처리 => 1. movie인지 show인지 구분, 2. :id 구분
    componentDidMount = async() => {
        const {
            match: {
                params: { id }
            },
            history: { push },
            location: { pathname }
        } = this.props;
        const { isMovie } = this.state;
        const parsedId = parseInt(id);
        if(isNaN(parsedId)){
            return push("/");
        }
        let result = null;
        try{
            if(isMovie){
                ({
                    data: result
                } = await moviesApi.movieDetail(parsedId));
            }else{
                ({
                    data: result
                } = await tvApi.showDetail(parsedId));
            }
            console.log(result);
        }catch{
            this.setState({ error: "Can't find anything..."});
        }finally{
            this.setState({ loading: false, result });
        }
    }

    render() {
        const { result, error, loading } = this.state;
        console.log(result);
        return (
            <DetailPresenter
                result={result}
                error={error}
                loading={loading}
            />
        )
    }
}