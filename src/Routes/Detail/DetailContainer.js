/* eslint-disable import/no-anonymous-default-export */
import React, { Component } from "react";
import DetailPresenter from "./DetailPresenter";

export default class extends Component {
    state = {
        result: null,
        error: null,
        loading: true
    };

    //TODO: 로직 처리 => 1. movie인지 show인지 구분, 2. :id 구분
    async componentDidMount() {
        const {
            match: {
                params: { id }
            }
        } = this.props;
        console.log(id);
    }

    render() {
        const { result, error, loading } = this.state;
        return (
            <DetailPresenter
                result={result}
                error={error}
                loading={loading}
            />
        )
    }
}