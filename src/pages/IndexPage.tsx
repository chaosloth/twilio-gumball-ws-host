import React from "react";
import { Card } from "@twilio-paste/core/card";
import { Heading } from "@twilio-paste/core/heading";
import { Text } from "@twilio-paste/core/text";
import { Flex, Paragraph } from "@twilio-paste/core";
import { Spinner } from "@twilio-paste/spinner";

export const IndexPage: React.FC = () => {
  const styles = {
    animation: "rotation 4s infinite linear",
  };

  return (
    <Flex vAlignContent="center" hAlignContent="center" height="100vh" grow>
      <Card padding="space70">
        <Text as="div" textAlign="center">
          <Heading as="h4" variant="heading40">
            Twilio Red 2022
          </Heading>
          <Paragraph>Scan your badge to start</Paragraph>
          <Flex hAlignContent="center" vertical>
            <img width="100px" style={styles} src="candy.png" />
          </Flex>
        </Text>
      </Card>
    </Flex>
  );
};
