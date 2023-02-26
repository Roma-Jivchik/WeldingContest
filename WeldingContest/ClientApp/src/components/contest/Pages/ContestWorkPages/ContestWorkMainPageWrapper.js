import React from 'react';
import { useParams } from 'react-router-dom';
import { ContestWorkMainPage } from './ContestWorkMainPage'

export function ContestWorkMainPageWrapper(props) {
    const params = useParams();
    const id = params.id;

    return (
        <>
            <ContestWorkMainPage changePageTitle={props.changePageTitle} contestID={id} />
        </>
    );
}