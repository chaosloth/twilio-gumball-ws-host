import React from "react";
import { Heading } from "@twilio-paste/core/heading";
import { Text } from "@twilio-paste/core/text";
import { Flex, Stack } from "@twilio-paste/core";
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
    animation: "rotation 4s infinite linear",
  };

  return (
    <Flex padding="space200" hAlignContent="center" height="100vh" grow>
      <Text as="div" textAlign="center">
        <Heading as="h2" variant="heading10"></Heading>
        <h2 className="text_shadows">It's really you!</h2>

        <Heading as="h3" variant="heading20">
          {user.name}, Thanks for participating in RED 2022.
          <br />
          We can't wait to see <strong>what you build!</strong>
        </Heading>
        <Flex hAlignContent="center" vertical>
          <img alt="Candy" width="250px" style={styles} src="candy.png" />
        </Flex>

        <Flex vAlignContent="center" hAlignContent="center" grow>
          <Stack orientation="horizontal" spacing="space60">
            <Heading as="h3" variant="heading30">
              Game will reset in {counter}
            </Heading>
          </Stack>
        </Flex>
      </Text>
    </Flex>
  );
};
