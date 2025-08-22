import '@shopify/ui-extensions/preact';
import {render} from "preact";
import {useTranslate} from "@shopify/ui-extensions/checkout/preact"

export default function() {
  render(<Extension />, document.body)
}

function Extension() {
  // [START custom-header.buyer-journey]
  const {buyerJourney: {steps, activeStep}, shop: {storefrontUrl}} = shopify;
  const translate = useTranslate();

  const assembledSteps = [
    {
      label: translate('cart'),
      handle: 'cart',
      to: new URL('/cart', storefrontUrl).href,
    },
    ...steps?.current ?? [],
  ];

  const activeStepIndex = assembledSteps.findIndex(
    ({handle}) => handle === activeStep?.current?.handle,
  );

  const columns = `${assembledSteps.map((_) => '1fr').join(' ')}`
  // [END custom-header.buyer-journey]

  // [START custom-header.render]
  return (
    <s-grid
      accessibilityRole="ordered-list"
      border="base base dashed"
      borderRadius="base"
      gridTemplateColumns={columns}
    >
      {assembledSteps.map(({label, handle, to}, index) => (
        <s-grid
          accessibilityRole="list-item"
          background={index === activeStepIndex ? 'subdued' : 'transparent'}
          borderStyle={index === assembledSteps.length - 1 ? "none" : "none solid none none"}
          borderWidth="base"
          justifyItems="center"
          padding="small-300"
          key={handle}
        >
          {index < activeStepIndex || handle === 'cart' ? (
            <s-link href={to}>{label}</s-link>
          ) : (
            <s-text>{label}</s-text>
          )}
        </s-grid>
      ))}
    </s-grid>
  );
  // [END custom-header.render]
}
