import React from "react";
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
    <Flex padding="space200" hAlignContent="center" height="100vh" grow>
      <Text as="div" textAlign="center">
        <img alt="candy" src="candy.png" className="candy" />
        <Heading as="h2" variant="heading10">
          Hang tight, {user.name}!
        </Heading>
        <Heading as="h3" variant="heading30">
          We're sending you a verifiction code using your chosen method
          <br />
          Once you receive it, using your finger write it on the next page
        </Heading>
        <Flex hAlignContent="center" vertical>
          <Paragraph>
            <Spinner
              size="sizeIcon110"
              color="colorTextInverse"
              decorative={false}
              title="Loading"
            />
          </Paragraph>
        </Flex>
        <Flex vAlignContent="center" hAlignContent="center" grow>
          <Stack orientation="horizontal" spacing="space60">
            <Button
              variant="destructive_secondary"
              disabled={counter > 0}
              onClick={() => navigate("/channels")}
            >
              Request new code
              {counter > 0 && " in " + counter}
            </Button>
            {showReset && (
              <Button variant="destructive" onClick={() => navigate("/")}>
                Reset Game
              </Button>
            )}
          </Stack>
        </Flex>
      </Text>
    </Flex>
  );
};
