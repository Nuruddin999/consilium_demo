import React from "react";
import './style.loader.scss'

type LoaderProps = {
    title: string,
    isLoading: boolean
}

export const Loader = (props: LoaderProps): React.ReactElement => {

    return <div data-testid={props.isLoading ? 'loading' : 'loaded'} className={props.isLoading ? 'btn-loader-container' : 'btn-no-loader'}>
        <span className='btn-title'>
            {props.title}
        </span>
        {props.isLoading && <div className="lds-ring">
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
        </div>}
    </div>
}