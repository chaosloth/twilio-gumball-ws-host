import * as React from "react";
import { Card } from "@twilio-paste/core/card";
import { Button } from "@twilio-paste/core/button";
import { Heading } from "@twilio-paste/core/heading";
import { Text } from "@twilio-paste/core/text";
import { Flex, Paragraph } from "@twilio-paste/core";
import { useNavigate } from "react-router-dom";

export const Error: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Flex vAlignContent="center" hAlignContent="center" height="100vh" grow>
      <Card padding="space70">
        <Text as="div" textAlign="center">
          <Heading as="h4" variant="heading40">
            Opps !
          </Heading>
          <Paragraph>Looks like we hit a snag</Paragraph>
          <Button variant="primary" onClick={() => navigate("/")}>
            Reset Game
          </Button>
        </Text>
      </Card>
    </Flex>
  );
};
