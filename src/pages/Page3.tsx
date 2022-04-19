import * as React from 'react';
import { Stack, Card, Paragraph, Heading, Button } from '@twilio-paste/core';

const Page3: React.FC = () => {
    return (
        <Stack orientation="vertical" spacing="space40">
            <Card padding="space120">
                <Heading as="h2" variant="heading20">The Transgender District</Heading>
                <Paragraph>
                    The mission of the Transgender District is to create an urban environment that fosters the rich history, culture, legacy, and empowerment of transgender
                    people and its deep roots in the southeastern Tenderloin neighborhood. The transgender district aims to stabilize and economically empower the transgender
                    community through ownership of homes, businesses, historic and cultural sites, and safe community spaces.
                </Paragraph>
                <Button variant="primary" as="a" href="https://www.transgenderdistrictsf.com/">Support The Transgender District</Button>
            </Card>
            <Card padding="space120">
                <Heading as="h2" variant="heading20">Inside Out</Heading>
                <Paragraph>
                    Inside Out empowers, educates, and advocates for LGBTQ+ of youth from the Pikes Peak Region in Southern Colorado. Inside Out does this by creating safe spaces,
                    support systems and teaching life skills to all youth in the community and working to make the community safer and more accepting of gender and sexual orientation
                    diversity.
                </Paragraph>
                <Button variant="primary" as="a" href="https://insideoutys.org/">Support Inside Out</Button>
            </Card>
            <Card padding="space120">
                <Heading as="h2" variant="heading20">The Audre Lorde Project</Heading>
                <Paragraph>
                    The Audre Lorde Project is a Lesbian, Gay, Bisexual, Two Spirit, Trans and Gender Non Conforming People of Color center for community organizing, focusing on
                    the New York City area. Through mobilization, education and capacity-building, they work for community wellness and progressive social and economic justice. Committed
                    to struggling across differences, they seek to responsibly reflect, represent and serve their various communities.
                </Paragraph>
                <Button variant="primary" as="a" href="https://alp.org/">Support The Audre Lorde Project</Button>
            </Card>
        </Stack>
    );
};
export default Page3;
