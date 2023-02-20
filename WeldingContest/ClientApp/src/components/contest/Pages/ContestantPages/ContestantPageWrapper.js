import React from 'react';
import { useParams } from 'react-router-dom';
import { ContestantPage} from './ContestantPage'

export function ContestantPageWrapper(props) {
    const params = useParams();
    const id = params.id;

    return (
        <>
            <ContestantPage changePageTitle={props.changePageTitle} id={id} />
        </>
    );
}