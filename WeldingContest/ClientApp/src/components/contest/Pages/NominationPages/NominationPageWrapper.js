import React from 'react';
import { useParams } from 'react-router-dom';
import { NominationPage } from './NominationPage'

export function NominationPageWrapper(props) {
    const params = useParams();
    const id = params.id;

    return (
        <>
            <NominationPage changePageTitle={props.changePageTitle} id={id} />
        </>
    );
}