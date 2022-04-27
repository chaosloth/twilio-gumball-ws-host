import React from "react";
import { Card } from "@twilio-paste/core/card";
import { Heading } from "@twilio-paste/core/heading";
import { Text } from "@twilio-paste/core/text";
import { Flex, Paragraph, Stack } from "@twilio-paste/core";
import { Spinner } from "@twilio-paste/spinner";
import { Button } from "@twilio-paste/core/button";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

export const Sending: React.FC = () => {
  const user = React.useContext(UserContext);

  const [showReset, setShowReset] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setTimeout(() => setShowReset(true), 60000);
  }, []);

  const [counter, setCounter] = React.useState(60);
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
    <Flex vAlignContent="center" hAlignContent="center" height="100vh" grow>
      <Card padding="space70">
        <Text as="div" textAlign="center">
          <Heading as="h1" variant="heading10">
            Hang tight, {user.name}!
          </Heading>
          <Paragraph>
            We're sending you a verifiction code using your chosen method
            <br />
            Once you receive it, using your finger write it on the next page
          </Paragraph>
          <Flex hAlignContent="center" vertical>
            <Paragraph>
              <Spinner
                size="sizeIcon110"
                color="colorTextSuccess"
                decorative={false}
                title="Loading"
              />
            </Paragraph>
          </Flex>
        </Text>
        <Flex vAlignContent="center" hAlignContent="center" grow>
          <Stack orientation="horizontal" spacing="space60">
            <Button
              variant="primary"
              disabled={counter > 0}
              onClick={() => navigate("/channels")}
            >
              Request new code
              {counter > 0 && " in " + counter}
            </Button>
            {showReset && (
              <Button variant="secondary" onClick={() => navigate("/")}>
                Reset Game
              </Button>
            )}
          </Stack>
        </Flex>
      </Card>
    </Flex>
  );
};