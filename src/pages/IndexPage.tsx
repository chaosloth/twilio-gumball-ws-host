import React from "react";
import { Heading } from "@twilio-paste/core/heading";
import { Text } from "@twilio-paste/core/text";
import { Flex, Paragraph } from "@twilio-paste/core";

export const IndexPage: React.FC = () => {
  const styles = {
    animation: "rotation 4s infinite linear",
  };

  return (
    <Flex paddingTop="space200" hAlignContent="center" height="100vh" grow>
        <Text as="div" textAlign="center">
          <Heading id="Wonka" as="h1" variant="heading10">
            Candy
          </Heading>
          <Heading as="h2" variant="heading40">
            MACHINE
          </Heading>
          <Flex hAlignContent="center" vertical>
            <img alt="Candy" width="250px" style={styles} src="candy.png" />
          </Flex>
          <Heading as="h3" variant="heading30">Scan your badge to start</Heading>
        </Text>
     
    </Flex>
  );
};
