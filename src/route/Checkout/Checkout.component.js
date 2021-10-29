import {
    Checkout as SourceCheckout,
} from 'SourceRoute/Checkout/Checkout.component';

import './Checkout.override.style';
import ContentWrapper from "@scandipwa/scandipwa/src/component/ContentWrapper";

export class Checkout extends SourceCheckout {
    constructor(props) {
        super(props);

        this.state = {
            totalSteps: 0
        }
    }

    componentDidMount() {
        const stepsLength = Object.keys(this.stepMap).length;
        this.setState(prevState => ({
            ...prevState,
            totalSteps: stepsLength
        }))
    }

    render() {
        return (
            <main block="Checkout">
                <div className="progress-bar">
                    {Object.keys(this.stepMap).map((step, index) => {
                        const position = Object.keys(this.stepMap).indexOf(this.props.checkoutStep);
                        return (
                            <div className={`stepper-item ${index <= position ? 'completed' : ''}
                                 ${position === this.state.totalSteps - 1 ? 'render-after-line' : ''}`}>
                                <div className="step-counter">
                                    {index + 1}
                                </div>
                                <div className="step-name">{this.stepMap[step]?.title?.value?.replace('step', '')}</div>
                            </div>
                        )
                    })}
                </div>
                <ContentWrapper
                    wrapperMix={{block: 'Checkout', elem: 'Wrapper'}}
                    label={__('Checkout page')}
                >
                    {this.renderSummary(true)}
                    <div block="Checkout" elem="Step">
                        {this.renderTitle()}
                        {this.renderGuestForm()}
                        {this.renderStep()}
                        {this.renderLoader()}
                    </div>
                    <div>
                        {this.renderSummary()}
                        {this.renderPromo()}
                        {this.renderCoupon()}
                    </div>
                </ContentWrapper>
            </main>
        );
    }
};

export default Checkout;
