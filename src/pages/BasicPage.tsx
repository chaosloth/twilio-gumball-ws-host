import * as React from 'react';
import { Card } from '@twilio-paste/core/card';
import { Button } from '@twilio-paste/core/button';
import { Heading } from '@twilio-paste/core/heading';
import { Text } from '@twilio-paste/core/text';
import { Flex, Paragraph } from '@twilio-paste/core';

export const BasicPage: React.FC = () => {

  const [msg, setMsg] = React.useState("Ain't no business like show business");

  return (<Flex vAlignContent="center" hAlignContent="center" height="100vh" grow>
    <Card padding="space70">
      <Text as="div" textAlign="center">
        <Heading as="h4" variant="heading40">Help First</Heading>
        <Paragraph>Welcome to a new, digital first, customer experience. Built directly into your browser.</Paragraph>
        <Paragraph>{msg}</Paragraph>
        <Button onClick={() => setMsg("Blah")} variant="primary">Press for awesomeness</Button>
      </Text>
    </Card>
  </Flex>);
};