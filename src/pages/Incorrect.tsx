import React from "react";
import { Card } from "@twilio-paste/core/card";
import { Heading } from "@twilio-paste/core/heading";
import { Text } from "@twilio-paste/core/text";
import { Flex, Paragraph, Stack } from "@twilio-paste/core";
import { Spinner } from "@twilio-paste/spinner";
import { Button } from "@twilio-paste/core/button";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

export const Incorrect: React.FC = () => {
  const user = React.useContext(UserContext);
  const navigate = useNavigate();

  const [counter, setCounter] = React.useState(15);
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
    <Flex vAlignContent="center" hAlignContent="center" height="100vh" grow>
      <Card padding="space70">
        <Text as="div" textAlign="center">
          <Heading as="h1" variant="heading20">
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
        </Text>

        <Flex vAlignContent="center" hAlignContent="center" grow>
          <Stack
            orientation={["vertical", "vertical", "horizontal"]}
            spacing="space60"
          >
            <Button
              variant="primary"
              fullWidth={true}
              onClick={() => navigate("/ocr")}
            >
              Re-enter verfification code
            </Button>

            <Button
              variant="secondary"
              fullWidth={true}
              disabled={counter > 0}
              onClick={() => navigate("/channels")}
            >
              Verify me another way
              {counter > 0 && " in " + counter}
            </Button>
          </Stack>
        </Flex>
      </Card>
    </Flex>
  );
};
