import React from "react";
import { Heading } from "@twilio-paste/core/heading";
import { Text } from "@twilio-paste/core/text";
import { Flex, Paragraph, Stack } from "@twilio-paste/core";
import { Spinner } from "@twilio-paste/spinner";
import { Button } from "@twilio-paste/core/button";
import { useNavigate } from "react-router-dom";

export const Incorrect: React.FC = () => {
  const navigate = useNavigate();

  const [counter, setCounter] = React.useState(15);
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
    <Flex padding="space200" hAlignContent="center" height="100vh" grow>
      <Text as="div" textAlign="center">
        <img alt="candy" src="candy.png" className="candy" />
        <Heading as="h2" variant="heading10">
          Hmmm...That's not right
        </Heading>

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

        <Flex vAlignContent="center" hAlignContent="center" grow>
          <Stack
            orientation={["vertical", "vertical", "horizontal"]}
            spacing="space60"
          >
            <Button
              variant="destructive"
              fullWidth={true}
              onClick={() => navigate("/ocr")}
            >
              Re-enter verfification code
            </Button>

            <Button
              variant="destructive_secondary"
              fullWidth={true}
              disabled={counter > 0}
              onClick={() => navigate("/channels")}
            >
              Verify me another way
              {counter > 0 && " in " + counter}
            </Button>
          </Stack>
        </Flex>
      </Text>
    </Flex>
  );
};
