import React from "react";
import { Card } from "@twilio-paste/core/card";
import { Heading } from "@twilio-paste/core/heading";
import { Text } from "@twilio-paste/core/text";
import { Flex, Paragraph, Stack } from "@twilio-paste/core";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

export const Dispense: React.FC = () => {
  const user = React.useContext(UserContext);

  const navigate = useNavigate();

  const [counter, setCounter] = React.useState(30);
  React.useEffect(() => {
    counter > 0 &&
      setTimeout(() => {
        setCounter(counter - 1);
        if (counter === 1) navigate("/");
      }, 1000);
  }, [counter, navigate]);

  const styles = {
    animation: "flip 0.6s infinite linear",
  };

  return (
    <Flex vAlignContent="center" hAlignContent="center" height="100vh" grow>
      <Card padding="space70">
        <Text as="div" textAlign="center">
          <Heading as="h1" variant="heading10">
            It's really you!
          </Heading>
          <Paragraph>
            {user.name}, Thanks for participating in RED 2022.
            <br />
            We can't wait to see <strong>what you build!</strong>
          </Paragraph>
          <Flex hAlignContent="center" vertical>
            <Paragraph>
              <img alt="Unicorn" width="400px" style={styles} src="uni.jpeg" />
            </Paragraph>
          </Flex>
        </Text>
        <Flex vAlignContent="center" hAlignContent="center" grow>
          <Stack orientation="horizontal" spacing="space60">
            <Text as="span">Game will reset in {counter}</Text>
          </Stack>
        </Flex>
      </Card>
    </Flex>
  );
};
