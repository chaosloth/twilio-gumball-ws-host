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
      
        <Text as="div" textAlign="center">
          <Heading as="h2" variant="heading40">
            Opps!
          </Heading>
          <br></br>
          <br></br>
          <Heading as="h3" variant="heading30">Looks like we hit a snag</Heading>
          <br></br>
          <Button variant="destructive_secondary" onClick={() => navigate("/")}>
            Reset Game
          </Button>
        </Text>
      
    </Flex>
  );
};
