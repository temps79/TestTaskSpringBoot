import React, {Component} from 'react';

class FooterComponent extends Component {
    render() {
        return (
            <div>
                <footer className='footer fixed-bottom'>
                    <span className='text-muted' >
                        @2021
                    </span>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;