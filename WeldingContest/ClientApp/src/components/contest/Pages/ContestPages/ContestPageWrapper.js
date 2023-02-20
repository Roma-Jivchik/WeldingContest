import React from 'react';
import { useParams } from 'react-router-dom';
import { ContestPage} from './ContestPage'

export function ContestPageWrapper(props) {
    const params = useParams();
    const id = params.id;

    return (
        <>
            <ContestPage changePageTitle={props.changePageTitle} id={id} />
        </>
    );
}