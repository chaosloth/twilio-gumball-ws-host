import React from "react";
import { Heading } from "@twilio-paste/core/heading";
import { Text } from "@twilio-paste/core/text";
import { Flex, Paragraph, Stack } from "@twilio-paste/core";
import { Spinner } from "@twilio-paste/spinner";
import { Button } from "@twilio-paste/core/button";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

export const Validating: React.FC = () => {
  const user = React.useContext(UserContext);

  const navigate = useNavigate();

  const [counter, setCounter] = React.useState(60);
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
    <Flex padding="space80" hAlignContent="center" height="100vh" grow>
      <Text as="div" textAlign="center">
        <img alt="candy" src="candy.png" className="candy" />
        <Heading as="h2" variant="heading10">
          Hang tight, {user.name}!
        </Heading>
        <Heading as="h3" variant="heading30">
          Thanks! We're securely verifying your input now
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
              onClick={() => navigate("/ocr")}
            >
              Try verfification code again
              {counter > 0 && " in " + counter}
            </Button>
          </Stack>
        </Flex>
      </Text>
    </Flex>
  );
};
