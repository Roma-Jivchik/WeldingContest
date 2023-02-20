import React from 'react';
import { useParams } from 'react-router-dom';
import { ContestWorkPage } from './ContestWorkPage'

export function ContestWorkPageWrapper(props) {
    const params = useParams();
    const id = params.id;

    return (
        <>
            <ContestWorkPage changePageTitle={props.changePageTitle} id={id} />
        </>
    );
}